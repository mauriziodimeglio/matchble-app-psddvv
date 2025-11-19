
import {
  FirestoreMatch,
  FirestoreTournament,
  FirestoreTeam,
  FirestoreStanding,
  FirestoreUser,
  FirestoreNotification,
  Sport,
  FormResult
} from '@/types';

/**
 * Firestore Helper Functions
 * These functions help with common Firestore operations
 */

// ============================================
// STANDINGS HELPERS
// ============================================

/**
 * Calculate points based on wins, draws, and losses
 * Standard football scoring: Win = 3 points, Draw = 1 point, Loss = 0 points
 */
export function calculatePoints(won: number, drawn: number, lost: number): number {
  return (won * 3) + (drawn * 1) + (lost * 0);
}

/**
 * Calculate goal difference
 */
export function calculateGoalDifference(goalsFor: number, goalsAgainst: number): number {
  return goalsFor - goalsAgainst;
}

/**
 * Update standing after a match result
 */
export function updateStandingAfterMatch(
  standing: FirestoreStanding,
  result: 'W' | 'L' | 'D',
  goalsFor: number,
  goalsAgainst: number
): FirestoreStanding {
  const updatedStanding = { ...standing };
  
  // Update match count
  updatedStanding.played += 1;
  
  // Update result counts
  if (result === 'W') {
    updatedStanding.won += 1;
  } else if (result === 'L') {
    updatedStanding.lost += 1;
  } else {
    updatedStanding.drawn += 1;
  }
  
  // Update goals
  updatedStanding.goalsFor += goalsFor;
  updatedStanding.goalsAgainst += goalsAgainst;
  updatedStanding.goalDifference = calculateGoalDifference(
    updatedStanding.goalsFor,
    updatedStanding.goalsAgainst
  );
  
  // Update points
  updatedStanding.points = calculatePoints(
    updatedStanding.won,
    updatedStanding.drawn,
    updatedStanding.lost
  );
  
  // Update form (keep last 5 results)
  updatedStanding.form = [...updatedStanding.form, result].slice(-5);
  
  // Update timestamp
  updatedStanding.lastUpdated = new Date();
  
  return updatedStanding;
}

/**
 * Sort standings by position
 * Primary: Points (descending)
 * Secondary: Goal difference (descending)
 * Tertiary: Goals for (descending)
 */
export function sortStandings(standings: FirestoreStanding[]): FirestoreStanding[] {
  return standings.sort((a, b) => {
    // First by points
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    
    // Then by goal difference
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }
    
    // Finally by goals for
    return b.goalsFor - a.goalsFor;
  });
}

/**
 * Update positions after sorting
 */
export function updateStandingPositions(standings: FirestoreStanding[]): FirestoreStanding[] {
  const sorted = sortStandings(standings);
  return sorted.map((standing, index) => ({
    ...standing,
    position: index + 1
  }));
}

/**
 * Get form emoji representation
 */
export function getFormEmoji(form: FormResult[]): string {
  return form.map(result => {
    switch (result) {
      case 'W': return '🟢';
      case 'L': return '🔴';
      case 'D': return '🟡';
      default: return '⚪';
    }
  }).join('');
}

/**
 * Get form text representation
 */
export function getFormText(form: FormResult[]): string {
  return form.join('-');
}

// ============================================
// USER HELPERS
// ============================================

/**
 * Calculate user trust score based on verified and rejected matches
 */
export function calculateTrustScore(verifiedMatches: number, rejectedMatches: number): number {
  const totalMatches = verifiedMatches + rejectedMatches;
  if (totalMatches === 0) return 50; // Default score for new users
  
  const score = (verifiedMatches / totalMatches) * 100;
  return Math.round(score);
}

/**
 * Update user stats after submitting a match
 */
export function updateUserStatsAfterMatch(
  user: FirestoreUser,
  verified: boolean
): FirestoreUser {
  const updatedUser = { ...user };
  
  updatedUser.matchesSubmitted += 1;
  
  if (verified) {
    updatedUser.verifiedMatches += 1;
  } else {
    updatedUser.rejectedMatches += 1;
  }
  
  updatedUser.trustScore = calculateTrustScore(
    updatedUser.verifiedMatches,
    updatedUser.rejectedMatches
  );
  
  updatedUser.lastActive = new Date();
  
  return updatedUser;
}

/**
 * Get trust score badge
 */
export function getTrustScoreBadge(trustScore: number): { emoji: string; label: string; color: string } {
  if (trustScore >= 90) {
    return { emoji: '🏆', label: 'Eccellente', color: '#FFD700' };
  } else if (trustScore >= 75) {
    return { emoji: '⭐', label: 'Ottimo', color: '#4CAF50' };
  } else if (trustScore >= 60) {
    return { emoji: '👍', label: 'Buono', color: '#2196F3' };
  } else if (trustScore >= 40) {
    return { emoji: '⚠️', label: 'Medio', color: '#FF9800' };
  } else {
    return { emoji: '❌', label: 'Basso', color: '#F44336' };
  }
}

// ============================================
// NOTIFICATION HELPERS
// ============================================

/**
 * Create a match result notification
 */
export function createMatchResultNotification(
  userId: string,
  match: FirestoreMatch
): Omit<FirestoreNotification, 'id'> {
  const sportEmojis: Record<Sport, string> = {
    calcio: '⚽',
    basket: '🏀',
    volley: '🏐',
    padel: '🎾'
  };
  
  return {
    userId,
    type: 'match_result',
    title: 'Risultato Partita',
    body: `${match.homeTeam} ${match.homeScore} - ${match.awayScore} ${match.awayTeam}`,
    icon: sportEmojis[match.sport],
    referenceId: match.id,
    referenceType: 'match',
    read: false,
    readAt: null,
    createdAt: new Date()
  };
}

/**
 * Create a tournament start notification
 */
export function createTournamentStartNotification(
  userId: string,
  tournament: FirestoreTournament
): Omit<FirestoreNotification, 'id'> {
  return {
    userId,
    type: 'tournament_start',
    title: 'Torneo Iniziato',
    body: `${tournament.name} è iniziato!`,
    icon: '🎉',
    referenceId: tournament.id,
    referenceType: 'tournament',
    read: false,
    readAt: null,
    createdAt: new Date()
  };
}

/**
 * Create a tournament update notification
 */
export function createTournamentUpdateNotification(
  userId: string,
  tournament: FirestoreTournament,
  updateMessage: string
): Omit<FirestoreNotification, 'id'> {
  return {
    userId,
    type: 'tournament_update',
    title: 'Aggiornamento Torneo',
    body: `${tournament.name}: ${updateMessage}`,
    icon: '🏆',
    referenceId: tournament.id,
    referenceType: 'tournament',
    read: false,
    readAt: null,
    createdAt: new Date()
  };
}

/**
 * Create a team invite notification
 */
export function createTeamInviteNotification(
  userId: string,
  team: FirestoreTeam
): Omit<FirestoreNotification, 'id'> {
  return {
    userId,
    type: 'team_invite',
    title: 'Invito Squadra',
    body: `Sei stato invitato a unirti a ${team.name}`,
    icon: '👥',
    referenceId: team.id,
    referenceType: 'team',
    read: false,
    readAt: null,
    createdAt: new Date()
  };
}

/**
 * Create a verification approved notification
 * @param userId - The user ID to send the notification to
 * @param organizerName - The name of the organizer the user was verified for
 * @returns A notification object without ID (to be assigned by Firestore)
 */
export function createVerificationApprovedNotification(
  userId: string,
  organizerName: string
): Omit<FirestoreNotification, 'id'> {
  return {
    userId,
    type: 'verification_approved',
    title: 'Verifica Approvata',
    body: `La tua richiesta di verifica per ${organizerName} è stata approvata! Ora puoi creare tornei ufficiali.`,
    icon: '✅',
    referenceId: userId,
    referenceType: 'team', // Using 'team' as a generic reference type
    read: false,
    readAt: null,
    createdAt: new Date()
  };
}

/**
 * Create a verification rejected notification
 * @param userId - The user ID to send the notification to
 * @param reason - The reason for rejection
 * @returns A notification object without ID (to be assigned by Firestore)
 */
export function createVerificationRejectedNotification(
  userId: string,
  reason: string
): Omit<FirestoreNotification, 'id'> {
  return {
    userId,
    type: 'verification_rejected',
    title: 'Verifica Rifiutata',
    body: `La tua richiesta di verifica è stata rifiutata. Motivo: ${reason}`,
    icon: '❌',
    referenceId: userId,
    referenceType: 'team', // Using 'team' as a generic reference type
    read: false,
    readAt: null,
    createdAt: new Date()
  };
}

/**
 * Mark notification as read
 */
export function markNotificationAsRead(notification: FirestoreNotification): FirestoreNotification {
  return {
    ...notification,
    read: true,
    readAt: new Date()
  };
}

/**
 * Get unread notification count
 */
export function getUnreadNotificationCount(notifications: FirestoreNotification[]): number {
  return notifications.filter(n => !n.read).length;
}

// ============================================
// TEAM HELPERS
// ============================================

/**
 * Update team stats after a match
 */
export function updateTeamStatsAfterMatch(
  team: FirestoreTeam,
  result: 'W' | 'L' | 'D',
  goalsFor: number,
  goalsAgainst: number
): FirestoreTeam {
  const updatedTeam = { ...team };
  
  updatedTeam.matchesPlayed += 1;
  
  if (result === 'W') {
    updatedTeam.wins += 1;
  } else if (result === 'L') {
    updatedTeam.losses += 1;
  } else {
    updatedTeam.draws += 1;
  }
  
  updatedTeam.goalsFor += goalsFor;
  updatedTeam.goalsAgainst += goalsAgainst;
  updatedTeam.points = calculatePoints(updatedTeam.wins, updatedTeam.draws, updatedTeam.losses);
  
  return updatedTeam;
}

/**
 * Calculate team win percentage
 */
export function calculateWinPercentage(team: FirestoreTeam): number {
  if (team.matchesPlayed === 0) return 0;
  return Math.round((team.wins / team.matchesPlayed) * 100);
}

// ============================================
// TOURNAMENT HELPERS
// ============================================

/**
 * Check if tournament registration is open
 */
export function isTournamentRegistrationOpen(tournament: FirestoreTournament): boolean {
  const now = new Date();
  return (
    tournament.status === 'upcoming' &&
    now < tournament.registrationDeadline &&
    tournament.currentTeams < tournament.maxTeams
  );
}

/**
 * Calculate tournament progress percentage
 */
export function calculateTournamentProgress(tournament: FirestoreTournament): number {
  if (tournament.totalMatches === 0) return 0;
  return Math.round((tournament.completedMatches / tournament.totalMatches) * 100);
}

/**
 * Get tournament status badge
 */
export function getTournamentStatusBadge(status: string): { emoji: string; label: string; color: string } {
  switch (status) {
    case 'upcoming':
      return { emoji: '📅', label: 'Prossimo', color: '#FFC107' };
    case 'ongoing':
      return { emoji: '🔴', label: 'In Corso', color: '#F44336' };
    case 'completed':
      return { emoji: '✅', label: 'Completato', color: '#4CAF50' };
    case 'cancelled':
      return { emoji: '❌', label: 'Annullato', color: '#9E9E9E' };
    default:
      return { emoji: '❓', label: 'Sconosciuto', color: '#9E9E9E' };
  }
}

// ============================================
// MATCH HELPERS
// ============================================

/**
 * Determine match result for a team
 */
export function getMatchResult(
  teamScore: number,
  opponentScore: number
): 'W' | 'L' | 'D' {
  if (teamScore > opponentScore) return 'W';
  if (teamScore < opponentScore) return 'L';
  return 'D';
}

/**
 * Format match score
 */
export function formatMatchScore(homeScore: number, awayScore: number): string {
  return `${homeScore} - ${awayScore}`;
}

/**
 * Get match status badge
 */
export function getMatchStatusBadge(status: string): { emoji: string; label: string; color: string } {
  switch (status) {
    case 'scheduled':
      return { emoji: '📅', label: 'Programmata', color: '#FFC107' };
    case 'live':
      return { emoji: '🔴', label: 'LIVE', color: '#F44336' };
    case 'finished':
      return { emoji: '✅', label: 'Finita', color: '#4CAF50' };
    default:
      return { emoji: '❓', label: 'Sconosciuto', color: '#9E9E9E' };
  }
}

/**
 * Check if match is live
 */
export function isMatchLive(match: FirestoreMatch): boolean {
  return match.status === 'live';
}

/**
 * Check if match is finished
 */
export function isMatchFinished(match: FirestoreMatch): boolean {
  return match.status === 'finished';
}
