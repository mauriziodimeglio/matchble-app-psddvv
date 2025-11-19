
import { BulkUploadTeam, BulkUploadTournament, BulkUploadMatchDay, Sport, Gender } from '@/types';

export interface BulkUploadResult {
  success: boolean;
  created: number;
  errors: string[];
}

export function parseTeamsCSV(csvContent: string): BulkUploadTeam[] {
  const lines = csvContent.trim().split('\n');
  const teams: BulkUploadTeam[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = line.split(',').map(p => p.trim());
    if (parts.length < 3) continue;
    
    teams.push({
      name: parts[0],
      gender: (parts[1].toLowerCase() as Gender) || 'male',
      city: parts[2],
      clubId: parts[3] || undefined
    });
  }
  
  return teams;
}

export function parseTournamentsCSV(csvContent: string): BulkUploadTournament[] {
  const lines = csvContent.trim().split('\n');
  const tournaments: BulkUploadTournament[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = line.split(',').map(p => p.trim());
    if (parts.length < 7) continue;
    
    tournaments.push({
      name: parts[0],
      sport: parts[1].toLowerCase() as Sport,
      gender: (parts[2].toLowerCase() as Gender) || 'male',
      startDate: parts[3],
      endDate: parts[4],
      city: parts[5],
      maxTeams: parseInt(parts[6]) || 16,
      division: parts[7] || undefined,
      group: parts[8] || undefined
    });
  }
  
  return tournaments;
}

export function parseMatchDaysCSV(csvContent: string): BulkUploadMatchDay[] {
  const lines = csvContent.trim().split('\n');
  const matchDays: BulkUploadMatchDay[] = [];
  let currentMatchDay: BulkUploadMatchDay | null = null;
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const parts = line.split(',').map(p => p.trim());
    
    if (parts[0] && parts[1] && !parts[2]) {
      if (currentMatchDay) {
        matchDays.push(currentMatchDay);
      }
      currentMatchDay = {
        tournamentId: parts[0],
        date: parts[1],
        matches: []
      };
    } else if (currentMatchDay && parts.length >= 3) {
      currentMatchDay.matches.push({
        homeTeam: parts[0],
        awayTeam: parts[1],
        venue: parts[2],
        homeScore: parts[3] ? parseInt(parts[3]) : undefined,
        awayScore: parts[4] ? parseInt(parts[4]) : undefined
      });
    }
  }
  
  if (currentMatchDay) {
    matchDays.push(currentMatchDay);
  }
  
  return matchDays;
}

export function generateTeamsCSVTemplate(): string {
  return `Nome Squadra,Genere (male/female/mixed),Città,ID Società (opzionale)
AC Milan,male,Milano,
Inter Women,female,Milano,
Polisportiva Mista,mixed,Roma,`;
}

export function generateTournamentsCSVTemplate(): string {
  return `Nome Torneo,Sport (calcio/basket/volley/padel),Genere (male/female/mixed),Data Inizio (YYYY-MM-DD),Data Fine (YYYY-MM-DD),Città,Max Squadre,Divisione (opzionale),Girone (opzionale)
Campionato Primavera,calcio,male,2025-03-01,2025-06-30,Milano,16,Under 19,Girone A
Torneo Femminile,basket,female,2025-04-01,2025-05-31,Roma,12,Serie C,`;
}

export function generateMatchDaysCSVTemplate(): string {
  return `ID Torneo,Data (YYYY-MM-DD),,,,
tournament_001,2025-03-15,,,,
Squadra Casa,Squadra Trasferta,Campo,Gol Casa (opzionale),Gol Trasferta (opzionale)
AC Milan,Inter,San Siro,2,1
Roma,Juventus,Olimpico,0,3
tournament_001,2025-03-22,,,,
Inter,Roma,San Siro,1,1
Juventus,AC Milan,Allianz Stadium,2,0`;
}

export function validateTeamsData(teams: BulkUploadTeam[]): string[] {
  const errors: string[] = [];
  
  teams.forEach((team, index) => {
    if (!team.name || team.name.length < 2) {
      errors.push(`Riga ${index + 2}: Nome squadra non valido`);
    }
    if (!['male', 'female', 'mixed'].includes(team.gender)) {
      errors.push(`Riga ${index + 2}: Genere non valido (deve essere male, female o mixed)`);
    }
    if (!team.city || team.city.length < 2) {
      errors.push(`Riga ${index + 2}: Città non valida`);
    }
  });
  
  return errors;
}

export function validateTournamentsData(tournaments: BulkUploadTournament[]): string[] {
  const errors: string[] = [];
  const validSports = ['calcio', 'basket', 'volley', 'padel'];
  
  tournaments.forEach((tournament, index) => {
    if (!tournament.name || tournament.name.length < 3) {
      errors.push(`Riga ${index + 2}: Nome torneo non valido`);
    }
    if (!validSports.includes(tournament.sport)) {
      errors.push(`Riga ${index + 2}: Sport non valido (deve essere calcio, basket, volley o padel)`);
    }
    if (!['male', 'female', 'mixed'].includes(tournament.gender)) {
      errors.push(`Riga ${index + 2}: Genere non valido`);
    }
    if (!tournament.startDate || !tournament.endDate) {
      errors.push(`Riga ${index + 2}: Date non valide`);
    }
    if (tournament.maxTeams < 2 || tournament.maxTeams > 100) {
      errors.push(`Riga ${index + 2}: Numero squadre non valido (2-100)`);
    }
  });
  
  return errors;
}
