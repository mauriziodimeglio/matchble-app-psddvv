
import { FirestoreOrganizer, FirestoreUser, FirestoreVerificationRequest, Sport } from '@/types';
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

/**
 * Create a verification request
 * @param user - The user requesting verification
 * @param organizerId - The organizer ID the user wants to be verified for
 * @param data - Additional verification request data
 * @returns A verification request object without ID (to be assigned by Firestore)
 */
export function createVerificationRequest(
  user: FirestoreUser,
  organizerId: string,
  data: Partial<FirestoreVerificationRequest>
): Omit<FirestoreVerificationRequest, 'id'> {
  const organizer = getOrganizerById(organizerId);
  
  if (!organizer) {
    throw new Error('Organizer not found');
  }

  return {
    userId: user.uid,
    userEmail: user.email,
    userName: user.displayName,
    userPhotoURL: user.photoURL,
    organizerId: organizer.id,
    organizerName: organizer.name,
    organizerLogo: organizer.logo,
    organizerRole: data.organizerRole || '',
    documents: data.documents || {
      idCard: '',
      delegationLetter: '',
    },
    motivation: data.motivation || '',
    status: 'pending',
    createdAt: new Date(),
  };
}

/**
 * Approve a verification request
 * @param request - The verification request to approve
 * @param superuserId - The superuser ID approving the request
 * @returns Updated user data and verification request
 */
export function approveVerificationRequest(
  request: FirestoreVerificationRequest,
  superuserId: string
): { user: Partial<FirestoreUser>, request: FirestoreVerificationRequest } {
  const now = new Date();

  // Update user data
  const updatedUser: Partial<FirestoreUser> = {
    role: 'verified',
    verifiedBy: superuserId,
    verifiedAt: now,
    organizerId: request.organizerId,
    organizerRole: request.organizerRole,
    canCreateOfficialTournaments: true,
  };

  // Update verification request
  const updatedRequest: FirestoreVerificationRequest = {
    ...request,
    status: 'approved',
    reviewedBy: superuserId,
    reviewedAt: now,
  };

  return {
    user: updatedUser,
    request: updatedRequest,
  };
}

/**
 * Reject a verification request
 * @param request - The verification request to reject
 * @param superuserId - The superuser ID rejecting the request
 * @param reason - The reason for rejection
 * @returns Updated verification request
 */
export function rejectVerificationRequest(
  request: FirestoreVerificationRequest,
  superuserId: string,
  reason: string
): FirestoreVerificationRequest {
  const now = new Date();

  return {
    ...request,
    status: 'rejected',
    reviewedBy: superuserId,
    reviewedAt: now,
    rejectionReason: reason,
  };
}

/**
 * Check if user can access admin dashboard
 * @param user - The user to check
 * @returns True if user is a superuser
 */
export function canAccessAdminDashboard(user: FirestoreUser): boolean {
  return user.role === 'superuser';
}
