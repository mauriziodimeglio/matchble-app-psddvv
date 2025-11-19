
export type Sport = 'calcio' | 'basket' | 'volley' | 'padel';

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export type TournamentStatus = 'upcoming' | 'ongoing' | 'finished';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export type NotificationType = 'match_result' | 'tournament_start' | 'tournament_update' | 'team_invite';

export type ReferenceType = 'match' | 'tournament' | 'team';

export type TournamentFormat = 'league' | 'knockout' | 'groups';

export type TournamentLevel = 'beginner' | 'intermediate' | 'advanced' | 'open';

export type FormResult = 'W' | 'L' | 'D';

export type UserRole = 'regular' | 'verified' | 'superuser';

export type OrganizerType = 'national' | 'regional' | 'private';

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
// ORGANIZER TYPES
// ============================================

export interface FirestoreOrganizer {
  id: string;
  name: string;
  fullName: string;
  acronym: string;
  logo: string;
  color: string;
  description: string;
  sport: Sport;
  type: OrganizerType;
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
 * User document structure for Firestore
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
  verifiedBy?: string; // superuser userId
  verifiedAt?: Date;
  organizerId?: string; // ID organizzatore rappresentato
  organizerRole?: string; // "Delegato FIGC Lombardia"
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
