
import {
  FirestoreMatch,
  FirestoreTournament,
  FirestoreTeam,
  FirestoreStanding,
  FirestoreUser,
  FirestoreNotification,
  Sport,
  FormResult,
  UserAffiliation
} from '@/types';

/**
 * Mock data for Firestore collections
 * This data structure matches the Firebase Firestore schema
 */

// ============================================
// MATCHES COLLECTION
// ============================================
export const mockFirestoreMatches: FirestoreMatch[] = [
  {
    id: 'match_001',
    sport: 'calcio',
    matchType: 'tournament',
    date: new Date('2025-01-15T15:00:00Z'),
    status: 'live',
    homeTeam: 'FC Milano',
    awayTeam: 'AS Roma',
    homeScore: 3,
    awayScore: 2,
    location: {
      name: 'Stadio San Siro',
      address: 'Via Piccolomini 5',
      city: 'Milano',
      coordinates: { lat: 45.4780, lng: 9.1240 }
    },
    tournamentId: 'tournament_001',
    tournamentName: 'Coppa Italia Amatori',
    photos: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20'
    ],
    submittedBy: 'user_001',
    submittedByName: 'Marco Rossi',
    verified: true,
    verificationStatus: 'verified',
    createdAt: new Date('2025-01-15T14:30:00Z'),
    updatedAt: new Date('2025-01-15T15:45:00Z'),
    mvp: 'user_001',
    attendance: 150
  },
  {
    id: 'match_002',
    sport: 'basket',
    matchType: 'tournament',
    date: new Date('2025-01-15T18:00:00Z'),
    status: 'live',
    homeTeam: 'Olimpia Milano',
    awayTeam: 'Virtus Bologna',
    homeScore: 78,
    awayScore: 65,
    location: {
      name: 'Forum Assago',
      address: 'Via G. Di Vittorio 6',
      city: 'Milano',
      coordinates: { lat: 45.4167, lng: 9.1333 }
    },
    tournamentId: 'tournament_002',
    tournamentName: 'Torneo Regionale Basket',
    photos: ['https://images.unsplash.com/photo-1546519638-68e109498ffc'],
    submittedBy: 'user_002',
    submittedByName: 'Luca Bianchi',
    verified: true,
    verificationStatus: 'verified',
    createdAt: new Date('2025-01-15T17:30:00Z'),
    updatedAt: new Date('2025-01-15T18:30:00Z'),
    mvp: null,
    attendance: 200
  },
  {
    id: 'match_003',
    sport: 'volley',
    matchType: 'friendly',
    date: new Date('2025-01-14T20:00:00Z'),
    status: 'finished',
    homeTeam: 'Trentino Volley',
    awayTeam: 'Perugia',
    homeScore: 3,
    awayScore: 1,
    location: {
      name: 'BLM Group Arena',
      address: 'Via Fersina 1',
      city: 'Trento',
      coordinates: { lat: 46.0664, lng: 11.1257 }
    },
    tournamentId: null,
    tournamentName: null,
    photos: [],
    submittedBy: 'user_003',
    submittedByName: 'Giuseppe Verdi',
    verified: false,
    verificationStatus: 'pending',
    createdAt: new Date('2025-01-14T22:30:00Z'),
    updatedAt: new Date('2025-01-14T22:30:00Z'),
    mvp: null,
    attendance: 80
  }
];

// ============================================
// TOURNAMENTS COLLECTION
// ============================================
export const mockFirestoreTournaments: FirestoreTournament[] = [
  {
    id: 'tournament_001',
    name: 'Coppa Italia Amatori',
    sport: 'calcio',
    startDate: new Date('2025-01-10T00:00:00Z'),
    endDate: new Date('2025-02-15T00:00:00Z'),
    registrationDeadline: new Date('2025-01-05T23:59:59Z'),
    location: {
      name: 'Vari Stadi',
      city: 'Milano',
      address: 'Milano, Italia',
      coordinates: { lat: 45.4642, lng: 9.1900 }
    },
    maxTeams: 16,
    currentTeams: 14,
    format: 'knockout',
    level: 'intermediate',
    status: 'ongoing',
    isPublic: true,
    description: 'Torneo amatoriale di calcio a 11 per squadre della regione Lombardia',
    rules: 'Regolamento FIGC, partite da 90 minuti',
    prizePool: '€2000 per il vincitore',
    entryFee: 150,
    coverImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
    organizerId: 'org_figc_lombardia',
    organizerName: 'FIGC Lombardia',
    organizerContact: 'lombardia@figc.it',
    organizerLogo: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?w=200',
    isOfficial: true,
    championshipInfo: {
      season: '2024/2025',
      division: 'Serie D',
      group: 'Girone A',
    },
    verifiedBy: 'user_superuser_001',
    createdAt: new Date('2024-12-01T10:00:00Z'),
    updatedAt: new Date('2025-01-15T12:00:00Z'),
    totalMatches: 15,
    completedMatches: 8,
    views: 1250
  },
  {
    id: 'tournament_002',
    name: 'Torneo Regionale Basket',
    sport: 'basket',
    startDate: new Date('2025-01-15T00:00:00Z'),
    endDate: new Date('2025-03-01T00:00:00Z'),
    registrationDeadline: new Date('2025-01-10T23:59:59Z'),
    location: {
      name: 'Forum Assago',
      city: 'Milano',
      address: 'Via G. Di Vittorio 6, Milano',
      coordinates: { lat: 45.4167, lng: 9.1333 }
    },
    maxTeams: 12,
    currentTeams: 12,
    format: 'league',
    level: 'advanced',
    status: 'ongoing',
    isPublic: true,
    description: 'Campionato regionale di basket 5vs5',
    rules: 'Regolamento FIP, partite da 40 minuti',
    prizePool: '€3000 per il vincitore',
    entryFee: 200,
    coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
    organizerId: 'org_fip_lombardia',
    organizerName: 'FIP Lombardia',
    organizerContact: 'lombardia@fip.it',
    organizerLogo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200',
    isOfficial: true,
    championshipInfo: {
      season: '2024/2025',
      division: 'Serie C',
    },
    verifiedBy: 'user_superuser_001',
    createdAt: new Date('2024-12-15T10:00:00Z'),
    updatedAt: new Date('2025-01-15T18:00:00Z'),
    totalMatches: 66,
    completedMatches: 12,
    views: 2100
  }
];

// ============================================
// TEAMS COLLECTION
// ============================================
export const mockFirestoreTeams: FirestoreTeam[] = [
  {
    id: 'team_001',
    name: 'FC Milano',
    sport: 'calcio',
    city: 'Milano',
    logo: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12',
    color: '#FF0000',
    captainId: 'user_001',
    captainName: 'Marco Rossi',
    playerIds: ['user_001', 'user_004', 'user_005', 'user_006', 'user_007', 'user_008', 'user_009', 'user_010', 'user_011', 'user_012', 'user_013'],
    playerCount: 11,
    matchesPlayed: 8,
    wins: 6,
    losses: 1,
    draws: 1,
    goalsFor: 22,
    goalsAgainst: 10,
    points: 19,
    createdAt: new Date('2024-11-01T10:00:00Z'),
    verified: true
  },
  {
    id: 'team_002',
    name: 'AS Roma',
    sport: 'calcio',
    city: 'Roma',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55',
    color: '#8B0000',
    captainId: 'user_014',
    captainName: 'Francesco Totti',
    playerIds: ['user_014', 'user_015', 'user_016', 'user_017', 'user_018', 'user_019', 'user_020', 'user_021', 'user_022', 'user_023', 'user_024'],
    playerCount: 11,
    matchesPlayed: 8,
    wins: 5,
    losses: 2,
    draws: 1,
    goalsFor: 18,
    goalsAgainst: 12,
    points: 16,
    createdAt: new Date('2024-11-01T10:00:00Z'),
    verified: true
  },
  {
    id: 'team_003',
    name: 'Olimpia Milano',
    sport: 'basket',
    city: 'Milano',
    logo: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a',
    color: '#FFFFFF',
    captainId: 'user_002',
    captainName: 'Luca Bianchi',
    playerIds: ['user_002', 'user_025', 'user_026', 'user_027', 'user_028'],
    playerCount: 5,
    matchesPlayed: 12,
    wins: 9,
    losses: 3,
    draws: 0,
    goalsFor: 1020,
    goalsAgainst: 890,
    points: 21,
    createdAt: new Date('2024-11-15T10:00:00Z'),
    verified: true
  }
];

// ============================================
// STANDINGS COLLECTION
// ============================================
export const mockFirestoreStandings: FirestoreStanding[] = [
  {
    id: 'tournament_001_team_001',
    tournamentId: 'tournament_001',
    teamId: 'team_001',
    teamName: 'FC Milano',
    sport: 'calcio',
    position: 1,
    played: 8,
    won: 6,
    drawn: 1,
    lost: 1,
    goalsFor: 22,
    goalsAgainst: 10,
    goalDifference: 12,
    points: 19,
    form: ['W', 'W', 'D', 'W', 'W'],
    lastUpdated: new Date('2025-01-15T16:00:00Z')
  },
  {
    id: 'tournament_001_team_002',
    tournamentId: 'tournament_001',
    teamId: 'team_002',
    teamName: 'AS Roma',
    sport: 'calcio',
    position: 2,
    played: 8,
    won: 5,
    drawn: 1,
    lost: 2,
    goalsFor: 18,
    goalsAgainst: 12,
    goalDifference: 6,
    points: 16,
    form: ['W', 'L', 'W', 'W', 'D'],
    lastUpdated: new Date('2025-01-15T16:00:00Z')
  },
  {
    id: 'tournament_001_team_004',
    tournamentId: 'tournament_001',
    teamId: 'team_004',
    teamName: 'Juventus Amatori',
    sport: 'calcio',
    position: 3,
    played: 8,
    won: 4,
    drawn: 2,
    lost: 2,
    goalsFor: 15,
    goalsAgainst: 11,
    goalDifference: 4,
    points: 14,
    form: ['D', 'W', 'L', 'W', 'D'],
    lastUpdated: new Date('2025-01-15T16:00:00Z')
  },
  {
    id: 'tournament_002_team_003',
    tournamentId: 'tournament_002',
    teamId: 'team_003',
    teamName: 'Olimpia Milano',
    sport: 'basket',
    position: 1,
    played: 12,
    won: 9,
    drawn: 0,
    lost: 3,
    goalsFor: 1020,
    goalsAgainst: 890,
    goalDifference: 130,
    points: 21,
    form: ['W', 'W', 'L', 'W', 'W'],
    lastUpdated: new Date('2025-01-15T19:00:00Z')
  },
  {
    id: 'tournament_002_team_005',
    tournamentId: 'tournament_002',
    teamId: 'team_005',
    teamName: 'Virtus Bologna',
    sport: 'basket',
    position: 2,
    played: 12,
    won: 8,
    drawn: 0,
    lost: 4,
    goalsFor: 980,
    goalsAgainst: 920,
    goalDifference: 60,
    points: 20,
    form: ['L', 'W', 'W', 'W', 'L'],
    lastUpdated: new Date('2025-01-15T19:00:00Z')
  }
];

// ============================================
// USERS COLLECTION - UPDATED WITH MULTIPLE AFFILIATIONS
// ============================================
export const mockFirestoreUsers: FirestoreUser[] = [
  {
    uid: 'user_001',
    email: 'marco.rossi@email.com',
    displayName: 'Marco Rossi',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    favoriteSports: ['calcio', 'basket'],
    favoriteCity: 'Milano',
    favoriteTeams: ['team_001', 'team_003'],
    matchesSubmitted: 15,
    tournamentsCreated: 2,
    tournamentsJoined: 5,
    notificationsEnabled: true,
    notificationToken: 'fcm_token_abc123',
    trustScore: 92,
    verifiedMatches: 14,
    rejectedMatches: 1,
    role: 'verified',
    // NEW: Multiple affiliations
    affiliations: [
      {
        organizerId: 'org_figc_lombardia',
        organizerName: 'FIGC Lombardia',
        organizerLogo: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?w=200',
        role: 'Delegato Regionale',
        verifiedBy: 'user_superuser_001',
        verifiedAt: new Date('2024-11-15T10:00:00Z'),
        active: true,
      },
      {
        organizerId: 'org_csi_milano',
        organizerName: 'CSI Milano',
        organizerLogo: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200',
        role: 'Responsabile Tornei',
        verifiedBy: 'user_superuser_001',
        verifiedAt: new Date('2024-12-01T10:00:00Z'),
        active: true,
      },
    ],
    // Deprecated fields (kept for backwards compatibility)
    verifiedBy: 'user_superuser_001',
    verifiedAt: new Date('2024-11-15T10:00:00Z'),
    organizerId: 'org_figc_lombardia',
    organizerRole: 'Delegato FIGC Lombardia',
    canCreateOfficialTournaments: true,
    createdAt: new Date('2024-10-01T10:00:00Z'),
    lastActive: new Date('2025-01-15T16:30:00Z')
  },
  {
    uid: 'user_002',
    email: 'luca.bianchi@email.com',
    displayName: 'Luca Bianchi',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    favoriteSports: ['basket', 'volley'],
    favoriteCity: 'Milano',
    favoriteTeams: ['team_003'],
    matchesSubmitted: 22,
    tournamentsCreated: 3,
    tournamentsJoined: 8,
    notificationsEnabled: true,
    notificationToken: 'fcm_token_def456',
    trustScore: 95,
    verifiedMatches: 21,
    rejectedMatches: 1,
    role: 'verified',
    // NEW: Multiple affiliations
    affiliations: [
      {
        organizerId: 'org_fip_lombardia',
        organizerName: 'FIP Lombardia',
        organizerLogo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200',
        role: 'Responsabile Tornei',
        verifiedBy: 'user_superuser_001',
        verifiedAt: new Date('2024-10-20T10:00:00Z'),
        active: true,
      },
    ],
    // Deprecated fields
    verifiedBy: 'user_superuser_001',
    verifiedAt: new Date('2024-10-20T10:00:00Z'),
    organizerId: 'org_fip_lombardia',
    organizerRole: 'Responsabile Tornei FIP Lombardia',
    canCreateOfficialTournaments: true,
    createdAt: new Date('2024-09-15T10:00:00Z'),
    lastActive: new Date('2025-01-15T18:45:00Z')
  },
  {
    uid: 'user_003',
    email: 'giuseppe.verdi@email.com',
    displayName: 'Giuseppe Verdi',
    photoURL: null,
    favoriteSports: ['volley', 'padel'],
    favoriteCity: 'Trento',
    favoriteTeams: [],
    matchesSubmitted: 8,
    tournamentsCreated: 0,
    tournamentsJoined: 3,
    notificationsEnabled: false,
    notificationToken: null,
    trustScore: 78,
    verifiedMatches: 6,
    rejectedMatches: 2,
    role: 'regular',
    affiliations: [], // No affiliations
    canCreateOfficialTournaments: false,
    createdAt: new Date('2024-11-20T10:00:00Z'),
    lastActive: new Date('2025-01-14T22:30:00Z')
  },
  {
    uid: 'user_004',
    email: 'anna.ferrari@email.com',
    displayName: 'Anna Ferrari',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    favoriteSports: ['volley', 'calcio'],
    favoriteCity: 'Napoli',
    favoriteTeams: [],
    matchesSubmitted: 12,
    tournamentsCreated: 1,
    tournamentsJoined: 4,
    notificationsEnabled: true,
    notificationToken: 'fcm_token_ghi789',
    trustScore: 88,
    verifiedMatches: 11,
    rejectedMatches: 1,
    role: 'verified',
    // NEW: Multiple affiliations across different sports and levels
    affiliations: [
      {
        organizerId: 'org_fipav_napoli',
        organizerName: 'FIPAV Napoli',
        organizerLogo: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=200',
        role: 'Delegato Provinciale',
        verifiedBy: 'user_superuser_001',
        verifiedAt: new Date('2024-11-01T10:00:00Z'),
        active: true,
      },
      {
        organizerId: 'org_figc_napoli',
        organizerName: 'FIGC Napoli',
        organizerLogo: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?w=200',
        role: 'Responsabile Comunicazione',
        verifiedBy: 'user_superuser_001',
        verifiedAt: new Date('2024-11-15T10:00:00Z'),
        active: true,
      },
      {
        organizerId: 'org_csi_napoli',
        organizerName: 'CSI Napoli',
        organizerLogo: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200',
        role: 'Coordinatore Tornei',
        verifiedBy: 'user_superuser_001',
        verifiedAt: new Date('2024-12-01T10:00:00Z'),
        active: true,
      },
    ],
    canCreateOfficialTournaments: true,
    createdAt: new Date('2024-10-15T10:00:00Z'),
    lastActive: new Date('2025-01-15T19:00:00Z')
  },
  {
    uid: 'user_superuser_001',
    email: 'admin@matchble.it',
    displayName: 'Admin Matchble',
    photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    favoriteSports: ['calcio', 'basket', 'volley', 'padel'],
    favoriteCity: 'Milano',
    favoriteTeams: [],
    matchesSubmitted: 0,
    tournamentsCreated: 0,
    tournamentsJoined: 0,
    notificationsEnabled: true,
    notificationToken: 'fcm_token_superuser',
    trustScore: 100,
    verifiedMatches: 0,
    rejectedMatches: 0,
    role: 'superuser',
    affiliations: [], // Superuser doesn't need affiliations
    canCreateOfficialTournaments: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    lastActive: new Date('2025-01-15T20:00:00Z')
  }
];

// ============================================
// NOTIFICATIONS COLLECTION
// ============================================
export const mockFirestoreNotifications: FirestoreNotification[] = [
  {
    id: 'notif_001',
    userId: 'user_001',
    type: 'match_result',
    title: 'Risultato Partita',
    body: 'FC Milano ha vinto 3-2 contro AS Roma!',
    icon: '⚽',
    referenceId: 'match_001',
    referenceType: 'match',
    read: false,
    readAt: null,
    createdAt: new Date('2025-01-15T16:50:00Z')
  },
  {
    id: 'notif_002',
    userId: 'user_001',
    type: 'tournament_update',
    title: 'Aggiornamento Torneo',
    body: 'Coppa Italia Amatori: nuova classifica disponibile',
    icon: '🏆',
    referenceId: 'tournament_001',
    referenceType: 'tournament',
    read: true,
    readAt: new Date('2025-01-15T17:00:00Z'),
    createdAt: new Date('2025-01-15T16:55:00Z')
  },
  {
    id: 'notif_003',
    userId: 'user_002',
    type: 'match_result',
    title: 'Risultato Partita',
    body: 'Olimpia Milano ha vinto 78-65 contro Virtus Bologna!',
    icon: '🏀',
    referenceId: 'match_002',
    referenceType: 'match',
    read: false,
    readAt: null,
    createdAt: new Date('2025-01-15T19:35:00Z')
  },
  {
    id: 'notif_004',
    userId: 'user_002',
    type: 'tournament_start',
    title: 'Torneo Iniziato',
    body: 'Il Torneo Regionale Basket è iniziato!',
    icon: '🎉',
    referenceId: 'tournament_002',
    referenceType: 'tournament',
    read: true,
    readAt: new Date('2025-01-15T18:10:00Z'),
    createdAt: new Date('2025-01-15T18:05:00Z')
  },
  {
    id: 'notif_005',
    userId: 'user_003',
    type: 'team_invite',
    title: 'Invito Squadra',
    body: 'Sei stato invitato a unirti a Trentino Volley',
    icon: '👥',
    referenceId: 'team_006',
    referenceType: 'team',
    read: false,
    readAt: null,
    createdAt: new Date('2025-01-14T15:00:00Z')
  }
];

/**
 * Helper function to convert Firestore timestamp to Date
 * Use this when fetching data from Firestore
 */
export function firestoreTimestampToDate(timestamp: any): Date {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate();
  }
  return new Date(timestamp);
}

/**
 * Helper function to convert Date to Firestore timestamp
 * Use this when writing data to Firestore
 */
export function dateToFirestoreTimestamp(date: Date): any {
  // In actual Firebase implementation, use:
  // import { Timestamp } from 'firebase/firestore';
  // return Timestamp.fromDate(date);
  return date;
}
