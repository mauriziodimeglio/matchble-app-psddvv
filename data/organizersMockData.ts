
import { FirestoreOrganizer } from '@/types';

/**
 * Mock data for Italian sports organizers
 * Real organizations with verified information
 */

export const mockOrganizers: FirestoreOrganizer[] = [
  // ============================================
  // CALCIO (Football)
  // ============================================
  {
    id: 'org_figc',
    name: 'FIGC',
    fullName: 'Federazione Italiana Giuoco Calcio',
    acronym: 'FIGC',
    logo: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?w=200',
    color: '#0066CC',
    description: 'La Federazione Italiana Giuoco Calcio è l\'organo di governo del calcio in Italia. Fondata nel 1898, coordina tutte le attività calcistiche nazionali, dalle serie professionistiche al calcio dilettantistico e giovanile.',
    sport: 'calcio',
    type: 'national',
    scope: {
      level: 'national',
    },
    website: 'https://www.figc.it',
    email: 'info@figc.it',
    verified: true,
    official: true,
    totalTournaments: 245,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'org_figc_lombardia',
    name: 'FIGC Lombardia',
    fullName: 'Comitato Regionale Lombardia FIGC',
    acronym: 'FIGC LOM',
    logo: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?w=200',
    color: '#0066CC',
    description: 'Il Comitato Regionale Lombardia della FIGC coordina tutte le attività calcistiche dilettantistiche nella regione Lombardia, organizzando campionati e tornei per squadre amatoriali e giovanili.',
    sport: 'calcio',
    type: 'regional',
    scope: {
      level: 'regional',
      region: 'Lombardia',
    },
    website: 'https://www.figc.it/it/comitati/lombardia',
    email: 'lombardia@figc.it',
    verified: true,
    official: true,
    totalTournaments: 89,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'org_lnd',
    name: 'LND',
    fullName: 'Lega Nazionale Dilettanti',
    acronym: 'LND',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200',
    color: '#009933',
    description: 'La Lega Nazionale Dilettanti è la lega della FIGC che organizza i campionati dilettantistici di calcio in Italia, dalla Serie D alle categorie regionali e provinciali, promuovendo lo sport di base.',
    sport: 'calcio',
    type: 'national',
    scope: {
      level: 'national',
    },
    website: 'https://www.lnd.it',
    email: 'info@lnd.it',
    verified: true,
    official: true,
    totalTournaments: 312,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'org_csi',
    name: 'CSI',
    fullName: 'Centro Sportivo Italiano',
    acronym: 'CSI',
    logo: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200',
    color: '#FF6600',
    description: 'Il Centro Sportivo Italiano è un\'associazione sportiva che promuove lo sport per tutti attraverso valori educativi e sociali. Organizza tornei e campionati di calcio amatoriale in tutta Italia.',
    sport: 'calcio',
    type: 'national',
    scope: {
      level: 'national',
    },
    website: 'https://www.csi-net.it',
    email: 'info@csi-net.it',
    verified: true,
    official: true,
    totalTournaments: 178,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },

  // ============================================
  // BASKET (Basketball)
  // ============================================
  {
    id: 'org_fip',
    name: 'FIP',
    fullName: 'Federazione Italiana Pallacanestro',
    acronym: 'FIP',
    logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200',
    color: '#E30613',
    description: 'La Federazione Italiana Pallacanestro è l\'organo di governo della pallacanestro in Italia. Fondata nel 1921, coordina tutte le attività cestistiche nazionali, dai campionati professionistici al basket giovanile e amatoriale.',
    sport: 'basket',
    type: 'national',
    scope: {
      level: 'national',
    },
    website: 'https://www.fip.it',
    email: 'info@fip.it',
    verified: true,
    official: true,
    totalTournaments: 198,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'org_fip_lombardia',
    name: 'FIP Lombardia',
    fullName: 'Comitato Regionale Lombardia FIP',
    acronym: 'FIP LOM',
    logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200',
    color: '#E30613',
    description: 'Il Comitato Regionale Lombardia della FIP coordina tutte le attività cestistiche nella regione Lombardia, organizzando campionati regionali, tornei giovanili e promuovendo la pallacanestro di base.',
    sport: 'basket',
    type: 'regional',
    scope: {
      level: 'regional',
      region: 'Lombardia',
    },
    website: 'https://www.fip.it/lombardia',
    email: 'lombardia@fip.it',
    verified: true,
    official: true,
    totalTournaments: 67,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },

  // ============================================
  // VOLLEY (Volleyball)
  // ============================================
  {
    id: 'org_fipav',
    name: 'FIPAV',
    fullName: 'Federazione Italiana Pallavolo',
    acronym: 'FIPAV',
    logo: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=200',
    color: '#0051A5',
    description: 'La Federazione Italiana Pallavolo è l\'organo di governo della pallavolo in Italia. Fondata nel 1946, coordina tutte le attività pallavolistiche nazionali, dalle serie professionistiche alla pallavolo giovanile e amatoriale.',
    sport: 'volley',
    type: 'national',
    scope: {
      level: 'national',
    },
    website: 'https://www.federvolley.it',
    email: 'info@federvolley.it',
    verified: true,
    official: true,
    totalTournaments: 223,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'org_fipav_lombardia',
    name: 'FIPAV Lombardia',
    fullName: 'Comitato Regionale Lombardia FIPAV',
    acronym: 'FIPAV LOM',
    logo: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=200',
    color: '#0051A5',
    description: 'Il Comitato Regionale Lombardia della FIPAV coordina tutte le attività pallavolistiche nella regione Lombardia, organizzando campionati regionali, tornei giovanili e promuovendo la pallavolo di base.',
    sport: 'volley',
    type: 'regional',
    scope: {
      level: 'regional',
      region: 'Lombardia',
    },
    website: 'https://www.federvolley.it/lombardia',
    email: 'lombardia@federvolley.it',
    verified: true,
    official: true,
    totalTournaments: 94,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },

  // ============================================
  // PADEL
  // ============================================
  {
    id: 'org_fit',
    name: 'FIT',
    fullName: 'Federazione Italiana Tennis e Padel',
    acronym: 'FIT',
    logo: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200',
    color: '#00843D',
    description: 'La Federazione Italiana Tennis e Padel è l\'organo di governo del tennis e del padel in Italia. Coordina tutte le attività tennistiche e padelistiche nazionali, dai circuiti professionistici ai tornei amatoriali.',
    sport: 'padel',
    type: 'national',
    scope: {
      level: 'national',
    },
    website: 'https://www.federtennis.it',
    email: 'info@federtennis.it',
    verified: true,
    official: true,
    totalTournaments: 156,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
];

/**
 * Helper function to get organizers by sport
 */
export function getOrganizersBySport(sport: string): FirestoreOrganizer[] {
  return mockOrganizers.filter(org => org.sport === sport);
}

/**
 * Helper function to get official organizers
 */
export function getOfficialOrganizers(): FirestoreOrganizer[] {
  return mockOrganizers.filter(org => org.official);
}

/**
 * Helper function to get organizer by ID
 */
export function getOrganizerById(id: string): FirestoreOrganizer | undefined {
  return mockOrganizers.find(org => org.id === id);
}
