
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, FirestoreUser, Sport } from '@/types';
import { mockFirestoreUsers } from '@/data/firestoreMockData';
import Constants from 'expo-constants';

interface AuthContextType {
  user: FirestoreUser | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<FirestoreUser>) => Promise<void>;
  logout: () => void;
  setDemoUser: (userId: string) => void;
  setGuestMode: () => void;
  updateUserPreferences: (preferences: { favoriteSports?: Sport[]; favoriteTournaments?: string[]; favoriteGroups?: string[] }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirestoreUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(true);

  const adminEmail = Constants.expoConfig?.extra?.ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'admin@matchble.it';
  const adminPassword = Constants.expoConfig?.extra?.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || 'admin123';

  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    console.log('Admin login attempt:', email);
    if (email === adminEmail && password === adminPassword) {
      const adminUser: FirestoreUser = {
        uid: 'admin_001',
        email: adminEmail,
        displayName: 'Admin',
        photoURL: null,
        favoriteSports: ['calcio', 'basket', 'volley', 'padel'],
        favoriteCity: '',
        favoriteTeams: [],
        matchesSubmitted: 0,
        tournamentsCreated: 0,
        tournamentsJoined: 0,
        notificationsEnabled: true,
        notificationToken: null,
        trustScore: 100,
        verifiedMatches: 0,
        rejectedMatches: 0,
        role: 'superuser',
        affiliations: [],
        canCreateOfficialTournaments: true,
        createdAt: new Date(),
        lastActive: new Date(),
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      setIsGuest(false);
      return true;
    }
    return false;
  };

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', email);
    
    // Check if admin login
    const isAdmin = await adminLogin(email, password);
    if (isAdmin) {
      return;
    }

    // Regular user login
    const foundUser = mockFirestoreUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      setIsGuest(false);
    }
  };

  const register = async (userData: Partial<FirestoreUser>) => {
    console.log('Register attempt:', userData);
    const newUser: FirestoreUser = {
      uid: `user_${Date.now()}`,
      email: userData.email || '',
      displayName: userData.displayName || '',
      photoURL: null,
      favoriteSports: userData.favoriteSports || [],
      favoriteCity: userData.favoriteCity || '',
      favoriteTeams: [],
      matchesSubmitted: 0,
      tournamentsCreated: 0,
      tournamentsJoined: 0,
      notificationsEnabled: true,
      notificationToken: null,
      trustScore: 50,
      verifiedMatches: 0,
      rejectedMatches: 0,
      role: 'regular',
      affiliations: [],
      canCreateOfficialTournaments: false,
      createdAt: new Date(),
      lastActive: new Date(),
    };
    setUser(newUser);
    setIsAuthenticated(true);
    setIsGuest(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsGuest(true);
  };

  const setDemoUser = (userId: string) => {
    const foundUser = mockFirestoreUsers.find(u => u.uid === userId);
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      setIsGuest(false);
    }
  };

  const setGuestMode = () => {
    setUser(null);
    setIsAuthenticated(false);
    setIsGuest(true);
  };

  const updateUserPreferences = (preferences: { favoriteSports?: Sport[]; favoriteTournaments?: string[]; favoriteGroups?: string[] }) => {
    if (user) {
      setUser({
        ...user,
        favoriteSports: preferences.favoriteSports || user.favoriteSports,
        // Add favoriteTournaments and favoriteGroups to user type if needed
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isGuest,
        login,
        adminLogin,
        register,
        logout,
        setDemoUser,
        setGuestMode,
        updateUserPreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
