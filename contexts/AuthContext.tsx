
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, FirestoreUser } from '@/types';
import { mockFirestoreUsers } from '@/data/firestoreMockData';

interface AuthContextType {
  user: FirestoreUser | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<FirestoreUser>) => Promise<void>;
  logout: () => void;
  setDemoUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirestoreUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    console.log('Login attempt:', email);
    const foundUser = mockFirestoreUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
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
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const setDemoUser = (userId: string) => {
    const foundUser = mockFirestoreUsers.find(u => u.uid === userId);
    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isGuest: !isAuthenticated,
        login,
        register,
        logout,
        setDemoUser,
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
