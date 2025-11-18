
import { Match, Tournament, Sport } from '@/types';

export const mockMatches: Match[] = [
  {
    id: '1',
    sport: 'calcio',
    homeTeam: { id: '1', name: 'FC Milano', score: 3 },
    awayTeam: { id: '2', name: 'AS Roma', score: 2 },
    status: 'live',
    location: { venue: 'Stadio San Siro', city: 'Milano' },
    datetime: { scheduled: '2025-01-15T15:00:00Z', started: '2025-01-15T15:05:00Z' },
    tournament: { id: 't1', name: 'Coppa Italia Amatori' },
  },
  {
    id: '2',
    sport: 'basket',
    homeTeam: { id: '3', name: 'Olimpia Milano', score: 78 },
    awayTeam: { id: '4', name: 'Virtus Bologna', score: 65 },
    status: 'live',
    location: { venue: 'Forum Assago', city: 'Milano' },
    datetime: { scheduled: '2025-01-15T18:00:00Z', started: '2025-01-15T18:10:00Z' },
    tournament: { id: 't2', name: 'Torneo Regionale' },
  },
  {
    id: '3',
    sport: 'volley',
    homeTeam: { id: '5', name: 'Trentino Volley', score: 3 },
    awayTeam: { id: '6', name: 'Perugia', score: 1 },
    status: 'finished',
    location: { venue: 'BLM Group Arena', city: 'Trento' },
    datetime: { 
      scheduled: '2025-01-14T20:00:00Z', 
      started: '2025-01-14T20:05:00Z',
      finished: '2025-01-14T22:15:00Z'
    },
    tournament: { id: 't3', name: 'Serie A Amatori' },
  },
  {
    id: '4',
    sport: 'padel',
    homeTeam: { id: '7', name: 'Team Alpha', score: 6 },
    awayTeam: { id: '8', name: 'Team Beta', score: 4 },
    status: 'finished',
    location: { venue: 'Padel Club Roma', city: 'Roma' },
    datetime: { 
      scheduled: '2025-01-14T16:00:00Z',
      started: '2025-01-14T16:10:00Z',
      finished: '2025-01-14T17:30:00Z'
    },
  },
  {
    id: '5',
    sport: 'calcio',
    homeTeam: { id: '9', name: 'Juventus Amatori', score: 2 },
    awayTeam: { id: '10', name: 'Inter Amatori', score: 2 },
    status: 'finished',
    location: { venue: 'Campo Comunale', city: 'Torino' },
    datetime: { 
      scheduled: '2025-01-13T15:00:00Z',
      started: '2025-01-13T15:05:00Z',
      finished: '2025-01-13T16:50:00Z'
    },
    tournament: { id: 't1', name: 'Coppa Italia Amatori' },
  },
  {
    id: '6',
    sport: 'basket',
    homeTeam: { id: '11', name: 'Napoli Basket', score: 0 },
    awayTeam: { id: '12', name: 'Palermo Basket', score: 0 },
    status: 'scheduled',
    location: { venue: 'PalaBarbuto', city: 'Napoli' },
    datetime: { scheduled: '2025-01-16T19:00:00Z' },
  },
];

export const mockTournaments: Tournament[] = [
  {
    id: 't1',
    name: 'Coppa Italia Amatori',
    sport: 'calcio',
    location: { venue: 'Vari Stadi', city: 'Milano' },
    dates: { start: '2025-01-10T00:00:00Z', end: '2025-02-15T00:00:00Z' },
    status: 'ongoing',
    maxTeams: 16,
    registeredTeams: 14,
    isPublic: true,
  },
  {
    id: 't2',
    name: 'Torneo Regionale Basket',
    sport: 'basket',
    location: { venue: 'Forum Assago', city: 'Milano' },
    dates: { start: '2025-01-15T00:00:00Z', end: '2025-03-01T00:00:00Z' },
    status: 'ongoing',
    maxTeams: 12,
    registeredTeams: 12,
    isPublic: true,
  },
  {
    id: 't3',
    name: 'Serie A Amatori Volley',
    sport: 'volley',
    location: { venue: 'BLM Group Arena', city: 'Trento' },
    dates: { start: '2025-01-05T00:00:00Z', end: '2025-04-30T00:00:00Z' },
    status: 'ongoing',
    maxTeams: 10,
    registeredTeams: 10,
    isPublic: true,
  },
  {
    id: 't4',
    name: 'Padel Championship',
    sport: 'padel',
    location: { venue: 'Padel Club Roma', city: 'Roma' },
    dates: { start: '2025-02-01T00:00:00Z', end: '2025-02-28T00:00:00Z' },
    status: 'upcoming',
    maxTeams: 8,
    registeredTeams: 6,
    isPublic: true,
  },
  {
    id: 't5',
    name: 'Torneo Estivo Calcio',
    sport: 'calcio',
    location: { venue: 'Campo Sportivo', city: 'Firenze' },
    dates: { start: '2025-06-01T00:00:00Z', end: '2025-07-15T00:00:00Z' },
    status: 'upcoming',
    maxTeams: 20,
    registeredTeams: 8,
    isPublic: true,
  },
];

export const sportIcons: Record<Sport, { emoji: string; color: string }> = {
  calcio: { emoji: '⚽', color: '#4CAF50' },
  basket: { emoji: '🏀', color: '#FF9800' },
  volley: { emoji: '🏐', color: '#2196F3' },
  padel: { emoji: '🎾', color: '#9C27B0' },
};

export const sportLabels: Record<Sport, string> = {
  calcio: 'Calcio',
  basket: 'Basket',
  volley: 'Volley',
  padel: 'Padel',
};
