
export type Sport = 'calcio' | 'basket' | 'volley' | 'padel';

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export type TournamentStatus = 'upcoming' | 'ongoing' | 'finished';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export type NotificationType = 'match_result' | 'tournament_start' | 'tournament_update' | 'team_invite' | 'verification_approved' | 'verification_rejected';

export type ReferenceType = 'match' | 'tournament' | 'team';

export type TournamentFormat = 'league' | 'knockout' | 'groups';

export type TournamentLevel = 'beginner' | 'intermediate' | 'advanced' | 'open';

export type FormResult = 'W' | 'L' | 'D';

export type UserRole = 'regular' | 'verified' | 'superuser';

export type OrganizerType = 'national' | 'regional' | 'private';

export type VerificationRequestStatus = 'pending' | 'approved' | 'rejected';

// NEW: Territorial hierarchy types
export type TerritorialLevel = 'nazionale' | 'regionale' | 'provinciale' | 'comunale' | 'locale';

export interface Team {
  id: string;
  name: string;
  logo?: string;
  score?: number;
}

export interface Match {
  id: string;
  sport: Sport;
  homeTeam: Team;
  awayTeam: Team;
  status: MatchStatus;
  location: {
    venue: string;
    city: string;
  };
  datetime: {
    scheduled: string;
    started?: string;
    finished?: string;
  };
  tournament?: {
    id: string;
    name: string;
  };
  media?: string[];
}

export interface Tournament {
  id: string;
  name: string;
  sport: Sport;
  location: {
    venue: string;
    city: string;
  };
  dates: {
    start: string;
    end: string;
  };
  status: TournamentStatus;
  maxTeams: number;
  registeredTeams: number;
  isPublic: boolean;
}

export interface Standing {
  position: number;
  teamName: string;
  played: number;
  wins: number;
  losses: number;
  points: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  sports: Sport[];
  location: {
    city: string;
    region: string;
  };
  stats: {
    matches: number;
    wins: number;
    losses: number;
  };
}

// ============================================
// ORGANIZER TYPES - UPDATED WITH HIERARCHY
// ============================================

export interface FirestoreOrganizer {
  id: string;
  name: string; // "FIPAV Napoli"
  fullName: string;
  acronym: string; // "FIPAV"
  logo: string;
  color: string;
  description: string;
  sport: Sport;
  type: OrganizerType;
  
  // NEW: Gerarchia territoriale
  parentId?: string; // ID organizzatore parent (FIPAV Napoli → parent: FIPAV Campania)
  rootId: string; // ID federazione/ente nazionale (sempre FIPAV nazionale)
  level: TerritorialLevel;
  
  // NEW: Territorio
  territory: {
    region?: string; // "Campania"
    province?: string; // "Napoli"
    city?: string; // "Napoli"
    code?: string; // Codice ufficiale (es: "NA" per provincia)
  };
  
  // NEW: Gerarchia
  children?: string[]; // IDs organizzatori figli
  hierarchyPath: string; // "FIPAV > Campania > Napoli"
  
  // Existing fields (kept for backwards compatibility)
  scope: {
    level: 'national' | 'regional';
    region?: string;
  };
  
  website: string;
  email: string;
  verified: boolean;
  official: boolean;
  totalTournaments: number;
  createdAt: Date;
}

// ============================================
// VERIFICATION REQUEST TYPES
// ============================================

export interface FirestoreVerificationRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhotoURL: string | null;
  organizerId: string;
  organizerName: string;
  organizerLogo: string;
  organizerRole: string; // "Delegato Regionale"
  
  // Documenti
  documents: {
    idCard: string; // URL documento identità
    delegationLetter: string; // URL lettera delega
  };
  
  // Motivazione
  motivation: string; // Testo libero
  
  // Status
  status: VerificationRequestStatus;
  reviewedBy?: string; // superuser userId
  reviewedAt?: Date;
  rejectionReason?: string;
  
  createdAt: Date;
}

// ============================================
// USER AFFILIATION TYPE - NEW
// ============================================

export interface UserAffiliation {
  organizerId: string;
  organizerName: string;
  organizerLogo: string;
  role: string; // "Delegato Provinciale"
  verifiedBy: string; // superuser userId
  verifiedAt: Date;
  active: boolean;
}

// ============================================
// FIREBASE FIRESTORE DOCUMENT TYPES
// ============================================

/**
 * Match document structure for Firestore
 * Collection: matches
 */
export interface FirestoreMatch {
  id: string;
  sport: Sport;
  matchType: 'tournament' | 'friendly';
  date: Date;
  status: MatchStatus;
  
  // Teams & Scores
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  
  // Location
  location: {
    name: string;
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
  };
  
  // Tournament reference (if applicable)
  tournamentId: string | null;
  tournamentName: string | null;
  
  // Media
  photos: string[];
  
  // Metadata
  submittedBy: string; // userId
  submittedByName: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
  
  // Stats (optional)
  mvp: string | null; // userId
  attendance: number | null;
}

/**
 * Tournament document structure for Firestore
 * Collection: tournaments
 */
export interface FirestoreTournament {
  id: string;
  name: string;
  sport: Sport;
  
  // Dates
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  
  // Location
  location: {
    name: string;
    city: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  
  // Config
  maxTeams: number;
  currentTeams: number;
  format: TournamentFormat;
  level: TournamentLevel;
  
  // Status
  status: TournamentStatus;
  isPublic: boolean;
  
  // Details
  description: string;
  rules: string;
  prizePool: string | null;
  entryFee: number | null;
  
  // Media
  coverImage: string;
  
  // Organizer
  organizerId: string; // userId or organizer id
  organizerName: string;
  organizerContact: string;
  organizerLogo?: string;
  
  // Official tournament fields
  isOfficial: boolean;
  championshipInfo?: {
    season: string;
    division: string;
    group?: string;
  };
  verifiedBy?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  
  // Stats
  totalMatches: number;
  completedMatches: number;
  views: number;
}

/**
 * Team document structure for Firestore
 * Collection: teams
 */
export interface FirestoreTeam {
  id: string;
  name: string;
  sport: Sport;
  city: string;
  
  // Visual
  logo: string | null;
  color: string;
  
  // Captain
  captainId: string; // userId
  captainName: string;
  
  // Members
  playerIds: string[]; // userIds
  playerCount: number;
  
  // Stats
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  
  // Metadata
  createdAt: Date;
  verified: boolean;
}

/**
 * Standing document structure for Firestore
 * Collection: standings
 * Document ID format: "tournamentId_teamId"
 */
export interface FirestoreStanding {
  id: string; // "tournamentId_teamId"
  tournamentId: string;
  teamId: string;
  teamName: string;
  sport: string;
  
  // Stats
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  
  // Form (last 5 matches)
  form: FormResult[];
  
  // Metadata
  lastUpdated: Date;
}

/**
 * User document structure for Firestore - UPDATED WITH MULTIPLE AFFILIATIONS
 * Collection: users
 * Document ID: Firebase Auth UID
 */
export interface FirestoreUser {
  uid: string; // from Firebase Auth
  email: string;
  displayName: string;
  photoURL: string | null;
  
  // Preferences
  favoriteSports: Sport[];
  favoriteCity: string;
  favoriteTeams: string[]; // teamIds
  
  // Stats
  matchesSubmitted: number;
  tournamentsCreated: number;
  tournamentsJoined: number;
  
  // Settings
  notificationsEnabled: boolean;
  notificationToken: string | null;
  
  // Trust & Reputation
  trustScore: number; // 0-100
  verifiedMatches: number;
  rejectedMatches: number;
  
  // User role and verification
  role: UserRole;
  verifiedBy?: string; // superuser userId (deprecated - use affiliations)
  verifiedAt?: Date; // deprecated - use affiliations
  
  // NEW: Multiple affiliations support
  affiliations: UserAffiliation[];
  
  // DEPRECATED: Single organizer fields (kept for backwards compatibility)
  organizerId?: string;
  organizerRole?: string;
  canCreateOfficialTournaments: boolean;
  
  // Metadata
  createdAt: Date;
  lastActive: Date;
}

/**
 * Notification document structure for Firestore
 * Collection: notifications
 */
export interface FirestoreNotification {
  id: string;
  userId: string;
  type: NotificationType;
  
  // Content
  title: string;
  body: string;
  icon: string; // emoji
  
  // References
  referenceId: string; // matchId | tournamentId
  referenceType: ReferenceType;
  
  // Status
  read: boolean;
  readAt: Date | null;
  
  // Metadata
  createdAt: Date;
}

/**
 * Firestore Index Configuration
 * These indexes should be created in Firebase Console for optimal performance
 */
export interface FirestoreIndexes {
  matches: {
    composite: [
      ['sport', 'status', 'date'],
      ['tournamentId', 'date']
    ];
  };
  tournaments: {
    composite: [
      ['sport', 'status', 'startDate']
    ];
  };
  standings: {
    composite: [
      ['tournamentId', 'points']
    ];
  };
  users: {
    composite: [
      ['favoriteCity', 'favoriteSports']
    ];
  };
}
