
import { 
  FirestoreOrganizer, 
  FirestoreUser, 
  FirestoreVerificationRequest, 
  Sport,
  TerritorialLevel,
  UserAffiliation
} from '@/types';
import { organizersHierarchy, getOrganizerById as getOrgById } from '@/data/organizersHierarchyData';
import { mockOrganizers } from '@/data/organizersMockData';

// Combine both data sources for backwards compatibility
const allOrganizers = [...organizersHierarchy, ...mockOrganizers.filter(
  org => !organizersHierarchy.find(h => h.id === org.id)
)];

/**
 * Get organizers filtered by sport
 */
export function getOrganizersBySport(sport: Sport): FirestoreOrganizer[] {
  return allOrganizers.filter(org => org.sport === sport);
}

/**
 * Get all official organizers
 */
export function getOfficialOrganizers(): FirestoreOrganizer[] {
  return allOrganizers.filter(org => org.official);
}

/**
 * Check if user can create official tournaments
 * Now checks all active affiliations
 */
export function canUserCreateOfficialTournament(user: FirestoreUser): boolean {
  // Superusers can always create official tournaments
  if (user.role === 'superuser') {
    return true;
  }
  
  // Check if user has any active affiliations
  if (user.affiliations && user.affiliations.length > 0) {
    const hasActiveAffiliation = user.affiliations.some(aff => aff.active);
    if (hasActiveAffiliation) {
      return true;
    }
  }
  
  // Backwards compatibility: check old fields
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
  return allOrganizers.find(org => org.id === id);
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
  return allOrganizers.filter(org => 
    org.territory?.region === region || 
    (org.scope.level === 'regional' && org.scope.region === region)
  );
}

/**
 * Get national organizers
 */
export function getNationalOrganizers(): FirestoreOrganizer[] {
  return allOrganizers.filter(org => 
    org.level === 'nazionale' || org.scope.level === 'national'
  );
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
 * Approve a verification request - NEW: Creates affiliation
 * @param request - The verification request to approve
 * @param superuserId - The superuser ID approving the request
 * @returns Updated user data and verification request
 */
export function approveVerificationRequest(
  request: FirestoreVerificationRequest,
  superuserId: string
): { user: Partial<FirestoreUser>, request: FirestoreVerificationRequest } {
  const now = new Date();
  const organizer = getOrganizerById(request.organizerId);

  // Create new affiliation
  const newAffiliation: UserAffiliation = {
    organizerId: request.organizerId,
    organizerName: request.organizerName,
    organizerLogo: request.organizerLogo,
    role: request.organizerRole,
    verifiedBy: superuserId,
    verifiedAt: now,
    active: true,
  };

  // Update user data - add to affiliations array
  const updatedUser: Partial<FirestoreUser> = {
    role: 'verified',
    affiliations: [newAffiliation], // This should be merged with existing affiliations in actual implementation
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

// ============================================
// NEW: HIERARCHY HELPER FUNCTIONS
// ============================================

/**
 * Get children organizers for a parent
 */
export function getChildrenOrganizers(parentId: string): FirestoreOrganizer[] {
  return allOrganizers.filter(org => org.parentId === parentId);
}

/**
 * Get organizers by territorial level
 */
export function getOrganizersByLevel(level: TerritorialLevel): FirestoreOrganizer[] {
  return allOrganizers.filter(org => org.level === level);
}

/**
 * Get organizers by province
 */
export function getOrganizersByProvince(province: string): FirestoreOrganizer[] {
  return allOrganizers.filter(org => org.territory?.province === province);
}

/**
 * Get root organizers (national level without parent)
 */
export function getRootOrganizers(): FirestoreOrganizer[] {
  return allOrganizers.filter(org => 
    (org.level === 'nazionale' || org.scope.level === 'national') && !org.parentId
  );
}

/**
 * Get full hierarchy path for an organizer
 * Returns array from root to current organizer
 */
export function getOrganizerHierarchy(organizerId: string): FirestoreOrganizer[] {
  const hierarchy: FirestoreOrganizer[] = [];
  let currentOrg = getOrganizerById(organizerId);
  
  while (currentOrg) {
    hierarchy.unshift(currentOrg);
    if (currentOrg.parentId) {
      currentOrg = getOrganizerById(currentOrg.parentId);
    } else {
      break;
    }
  }
  
  return hierarchy;
}

/**
 * Get hierarchy path as string
 */
export function getHierarchyPathString(organizerId: string): string {
  const organizer = getOrganizerById(organizerId);
  return organizer?.hierarchyPath || '';
}

/**
 * Check if organizer is descendant of another
 */
export function isDescendantOf(organizerId: string, ancestorId: string): boolean {
  const hierarchy = getOrganizerHierarchy(organizerId);
  return hierarchy.some(org => org.id === ancestorId);
}

/**
 * Get all descendants of an organizer (children, grandchildren, etc.)
 */
export function getAllDescendants(organizerId: string): FirestoreOrganizer[] {
  const descendants: FirestoreOrganizer[] = [];
  const children = getChildrenOrganizers(organizerId);
  
  for (const child of children) {
    descendants.push(child);
    descendants.push(...getAllDescendants(child.id));
  }
  
  return descendants;
}

/**
 * Get territorial level display name
 */
export function getTerritorialLevelName(level: TerritorialLevel): string {
  const names: Record<TerritorialLevel, string> = {
    nazionale: 'Nazionale',
    regionale: 'Regionale',
    provinciale: 'Provinciale',
    comunale: 'Comunale',
    locale: 'Locale',
  };
  return names[level];
}

/**
 * Get organizers for a specific sport and region
 */
export function getOrganizersBySportAndRegion(sport: Sport, region: string): FirestoreOrganizer[] {
  return allOrganizers.filter(org => 
    org.sport === sport && 
    (org.territory?.region === region || org.scope.region === region)
  );
}

/**
 * Get organizers for a specific sport and level
 */
export function getOrganizersBySportAndLevel(sport: Sport, level: TerritorialLevel): FirestoreOrganizer[] {
  return allOrganizers.filter(org => org.sport === sport && org.level === level);
}

// ============================================
// NEW: USER AFFILIATION HELPERS
// ============================================

/**
 * Get active affiliations for a user
 */
export function getActiveAffiliations(user: FirestoreUser): UserAffiliation[] {
  return user.affiliations?.filter(aff => aff.active) || [];
}

/**
 * Check if user has affiliation with specific organizer
 */
export function hasAffiliationWith(user: FirestoreUser, organizerId: string): boolean {
  return user.affiliations?.some(aff => aff.organizerId === organizerId && aff.active) || false;
}

/**
 * Get user's primary affiliation (first active one)
 */
export function getPrimaryAffiliation(user: FirestoreUser): UserAffiliation | undefined {
  return user.affiliations?.find(aff => aff.active);
}

/**
 * Get all organizers user is affiliated with
 */
export function getUserOrganizers(user: FirestoreUser): FirestoreOrganizer[] {
  const activeAffiliations = getActiveAffiliations(user);
  return activeAffiliations
    .map(aff => getOrganizerById(aff.organizerId))
    .filter((org): org is FirestoreOrganizer => org !== undefined);
}

/**
 * Check if user can manage tournaments for an organizer
 * User can manage if they have affiliation with organizer or any of its ancestors
 */
export function canManageTournamentsFor(user: FirestoreUser, organizerId: string): boolean {
  if (user.role === 'superuser') {
    return true;
  }
  
  const activeAffiliations = getActiveAffiliations(user);
  
  // Check direct affiliation
  if (activeAffiliations.some(aff => aff.organizerId === organizerId)) {
    return true;
  }
  
  // Check if user has affiliation with any ancestor organizer
  const hierarchy = getOrganizerHierarchy(organizerId);
  return activeAffiliations.some(aff => 
    hierarchy.some(org => org.id === aff.organizerId)
  );
}

/**
 * Get count of active affiliations
 */
export function getAffiliationsCount(user: FirestoreUser): number {
  return getActiveAffiliations(user).length;
}

/**
 * Format affiliation role for display
 */
export function formatAffiliationRole(affiliation: UserAffiliation): string {
  const organizer = getOrganizerById(affiliation.organizerId);
  if (!organizer) {
    return affiliation.role;
  }
  return `${affiliation.role} - ${organizer.name}`;
}
