
export type Sport = 'calcio' | 'basket' | 'volley' | 'padel';

export type MatchStatus = 'scheduled' | 'live' | 'finished';

export type TournamentStatus = 'upcoming' | 'ongoing' | 'finished';

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
