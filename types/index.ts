
export type Sport = 'calcio' | 'basket' | 'volley' | 'padel';

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export type TournamentStatus = 'upcoming' | 'ongoing' | 'finished';

export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export type NotificationType = 'match_result' | 'tournament_start' | 'tournament_update' | 'team_invite' | 'verification_approved' | 'verification_rejected';

export type ReferenceType = 'match' | 'tournament' | 'team';

export type TournamentFormat = 'league' | 'knockout' | 'groups';

export type TournamentLevel = 'beginner' | 'intermediate' | 'advanced' | 'open';

export type FormResult = 'W' | 'L' | 'D';

export type UserRole = 'regular' | 'verified' | 'club_manager' | 'superuser';

export type OrganizerType = 'national' | 'regional' | 'private';

export type VerificationRequestStatus = 'pending' | 'approved' | 'rejected';

export type TerritorialLevel = 'nazionale' | 'regionale' | 'provinciale' | 'comunale' | 'locale';

export type Gender = 'male' | 'female' | 'mixed';

import { PermissionsType, PermissionPreset } from './permissions';
export type { PermissionsType, PermissionPreset };

export interface Team {
  id: string;
  name: string;
  logo?: string;
  score?: number;
  gender?: Gender;
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
  gender?: Gender;
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
  gender?: Gender;
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
  
  parentId?: string;
  rootId: string;
  level: TerritorialLevel;
  
  territory: {
    region?: string;
    province?: string;
    city?: string;
    code?: string;
  };
  
  children?: string[];
  hierarchyPath: string;
  
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

export interface FirestoreVerificationRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhotoURL: string | null;
  organizerId: string;
  organizerName: string;
  organizerLogo: string;
  organizerRole: string;
  
  documents: {
    idCard: string;
    delegationLetter: string;
  };
  
  motivation: string;
  
  status: VerificationRequestStatus;
  reviewedBy?: string;
  reviewedAt?: Date;
  rejectionReason?: string;
  
  permissionsPreset?: PermissionPreset;
  customPermissions?: PermissionsType;
  
  createdAt: Date;
}

export interface UserAffiliation {
  organizerId: string;
  organizerName: string;
  organizerLogo: string;
  role: string;
  verifiedBy: string;
  verifiedAt: Date;
  active: boolean;
  
  permissions?: PermissionsType;
  permissionsPreset?: PermissionPreset;
}

export interface SportsClub {
  id: string;
  name: string;
  logo: string;
  sport: Sport;
  city: string;
  region: string;
  foundedYear: number;
  description: string;
  managerId: string;
  managerName: string;
  teams: string[];
  verified: boolean;
  createdAt: Date;
}

export interface FirestoreMatch {
  id: string;
  sport: Sport;
  matchType: 'tournament' | 'friendly';
  date: Date;
  status: MatchStatus;
  gender: Gender;
  
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  
  location: {
    name: string;
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
  };
  
  tournamentId: string | null;
  tournamentName: string | null;
  
  photos: string[];
  
  submittedBy: string;
  submittedByName: string;
  verified: boolean;
  verificationStatus: VerificationStatus;
  createdAt: Date;
  updatedAt: Date;
  
  mvp: string | null;
  attendance: number | null;
}

export interface FirestoreTournament {
  id: string;
  name: string;
  sport: Sport;
  gender: Gender;
  
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  
  location: {
    name: string;
    city: string;
    address: string;
    coordinates: { lat: number; lng: number };
  };
  
  maxTeams: number;
  currentTeams: number;
  format: TournamentFormat;
  level: TournamentLevel;
  
  status: TournamentStatus;
  isPublic: boolean;
  
  description: string;
  rules: string;
  prizePool: string | null;
  entryFee: number | null;
  
  coverImage: string;
  
  organizerId: string;
  organizerName: string;
  organizerContact: string;
  organizerLogo?: string;
  
  isOfficial: boolean;
  championshipInfo?: {
    season: string;
    division: string;
    group?: string;
  };
  verifiedBy?: string;
  
  clubId?: string;
  
  createdAt: Date;
  updatedAt: Date;
  
  totalMatches: number;
  completedMatches: number;
  views: number;
}

export interface FirestoreTeam {
  id: string;
  name: string;
  sport: Sport;
  city: string;
  gender: Gender;
  
  logo: string | null;
  color: string;
  
  captainId: string;
  captainName: string;
  
  playerIds: string[];
  playerCount: number;
  
  clubId?: string;
  
  matchesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  
  createdAt: Date;
  verified: boolean;
}

export interface FirestoreStanding {
  id: string;
  tournamentId: string;
  teamId: string;
  teamName: string;
  sport: string;
  
  position: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  
  form: FormResult[];
  
  lastUpdated: Date;
}

export interface FirestoreUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  
  favoriteSports: Sport[];
  favoriteCity: string;
  favoriteTeams: string[];
  
  matchesSubmitted: number;
  tournamentsCreated: number;
  tournamentsJoined: number;
  
  notificationsEnabled: boolean;
  notificationToken: string | null;
  
  trustScore: number;
  verifiedMatches: number;
  rejectedMatches: number;
  
  role: UserRole;
  verifiedBy?: string;
  verifiedAt?: Date;
  
  affiliations: UserAffiliation[];
  
  managedClubId?: string;
  
  organizerId?: string;
  organizerRole?: string;
  canCreateOfficialTournaments: boolean;
  
  createdAt: Date;
  lastActive: Date;
}

export interface FirestoreNotification {
  id: string;
  userId: string;
  type: NotificationType;
  
  title: string;
  body: string;
  icon: string;
  
  referenceId: string;
  referenceType: ReferenceType;
  
  read: boolean;
  readAt: Date | null;
  
  createdAt: Date;
}

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

export interface BulkUploadTeam {
  name: string;
  gender: Gender;
  clubId?: string;
  city: string;
}

export interface BulkUploadTournament {
  name: string;
  sport: Sport;
  gender: Gender;
  startDate: string;
  endDate: string;
  city: string;
  maxTeams: number;
  division?: string;
  group?: string;
}

export interface BulkUploadMatchDay {
  tournamentId: string;
  date: string;
  matches: Array<{
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;
    awayScore?: number;
    venue: string;
  }>;
}

export interface ScoringSystem {
  sport: Sport;
  winPoints: number;
  drawPoints: number;
  lossPoints: number;
  bonusPoints?: {
    type: string;
    points: number;
  }[];
}
