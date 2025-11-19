
import { FirestoreOrganizer, FirestoreUser, Sport } from '@/types';
import { mockOrganizers } from '@/data/organizersMockData';

/**
 * Get organizers filtered by sport
 */
export function getOrganizersBySport(sport: Sport): FirestoreOrganizer[] {
  return mockOrganizers.filter(org => org.sport === sport);
}

/**
 * Get all official organizers
 */
export function getOfficialOrganizers(): FirestoreOrganizer[] {
  return mockOrganizers.filter(org => org.official);
}

/**
 * Check if user can create official tournaments
 */
export function canUserCreateOfficialTournament(user: FirestoreUser): boolean {
  // Superusers can always create official tournaments
  if (user.role === 'superuser') {
    return true;
  }
  
  // Verified users with organizer association can create official tournaments
  if (user.role === 'verified' && user.organizerId && user.canCreateOfficialTournaments) {
    return true;
  }
  
  return false;
}

/**
 * Get badge information for organizer
 */
export function getOrganizerBadge(official: boolean): { emoji: string; color: string } {
  if (official) {
    return {
      emoji: '🏆',
      color: '#FFD700', // Gold
    };
  }
  
  return {
    emoji: '✅',
    color: '#4CAF50', // Green
  };
}

/**
 * Get organizer by ID
 */
export function getOrganizerById(id: string): FirestoreOrganizer | undefined {
  return mockOrganizers.find(org => org.id === id);
}

/**
 * Sort organizers: official first, then alphabetically
 */
export function sortOrganizers(organizers: FirestoreOrganizer[]): FirestoreOrganizer[] {
  return [...organizers].sort((a, b) => {
    // Official organizers first
    if (a.official && !b.official) return -1;
    if (!a.official && b.official) return 1;
    
    // Then alphabetically by name
    return a.name.localeCompare(b.name);
  });
}

/**
 * Get organizers by region
 */
export function getOrganizersByRegion(region: string): FirestoreOrganizer[] {
  return mockOrganizers.filter(org => 
    org.scope.level === 'regional' && org.scope.region === region
  );
}

/**
 * Get national organizers
 */
export function getNationalOrganizers(): FirestoreOrganizer[] {
  return mockOrganizers.filter(org => org.scope.level === 'national');
}

/**
 * Check if organizer is verified
 */
export function isOrganizerVerified(organizerId: string): boolean {
  const organizer = getOrganizerById(organizerId);
  return organizer?.verified ?? false;
}

/**
 * Get organizer display name with acronym
 */
export function getOrganizerDisplayName(organizer: FirestoreOrganizer): string {
  return `${organizer.name} - ${organizer.acronym}`;
}
