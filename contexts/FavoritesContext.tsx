
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favoriteTournaments: string[];
  favoriteGroups: string[];
  favoriteTeams: string[];
  toggleTournamentFavorite: (tournamentId: string) => void;
  toggleGroupFavorite: (groupId: string) => void;
  toggleTeamFavorite: (teamId: string) => void;
  isTournamentFavorite: (tournamentId: string) => boolean;
  isGroupFavorite: (groupId: string) => boolean;
  isTeamFavorite: (teamId: string) => boolean;
  clearAllFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [favoriteTournaments, setFavoriteTournaments] = useState<string[]>([]);
  const [favoriteGroups, setFavoriteGroups] = useState<string[]>([]);
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);

  // Load favorites from user profile when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // In a real app, load from database or AsyncStorage
      // For now, initialize empty arrays
      setFavoriteTournaments([]);
      setFavoriteGroups([]);
      setFavoriteTeams(user.favoriteTeams || []);
    } else {
      // Clear favorites when logged out
      setFavoriteTournaments([]);
      setFavoriteGroups([]);
      setFavoriteTeams([]);
    }
  }, [isAuthenticated, user]);

  const toggleTournamentFavorite = (tournamentId: string) => {
    setFavoriteTournaments(prev => {
      const newFavorites = prev.includes(tournamentId)
        ? prev.filter(id => id !== tournamentId)
        : [...prev, tournamentId];
      
      // In a real app, save to database or AsyncStorage
      console.log('Tournament favorites updated:', newFavorites);
      return newFavorites;
    });
  };

  const toggleGroupFavorite = (groupId: string) => {
    setFavoriteGroups(prev => {
      const newFavorites = prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId];
      
      console.log('Group favorites updated:', newFavorites);
      return newFavorites;
    });
  };

  const toggleTeamFavorite = (teamId: string) => {
    setFavoriteTeams(prev => {
      const newFavorites = prev.includes(teamId)
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId];
      
      console.log('Team favorites updated:', newFavorites);
      return newFavorites;
    });
  };

  const isTournamentFavorite = (tournamentId: string): boolean => {
    return favoriteTournaments.includes(tournamentId);
  };

  const isGroupFavorite = (groupId: string): boolean => {
    return favoriteGroups.includes(groupId);
  };

  const isTeamFavorite = (teamId: string): boolean => {
    return favoriteTeams.includes(teamId);
  };

  const clearAllFavorites = () => {
    setFavoriteTournaments([]);
    setFavoriteGroups([]);
    setFavoriteTeams([]);
    console.log('All favorites cleared');
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteTournaments,
        favoriteGroups,
        favoriteTeams,
        toggleTournamentFavorite,
        toggleGroupFavorite,
        toggleTeamFavorite,
        isTournamentFavorite,
        isGroupFavorite,
        isTeamFavorite,
        clearAllFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
