
import { FirestoreVerificationRequest } from '@/types';

/**
 * Mock data for verification requests
 */

export const mockVerificationRequests: FirestoreVerificationRequest[] = [
  {
    id: 'vreq_001',
    userId: 'user_004',
    userEmail: 'paolo.maldini@email.com',
    userName: 'Paolo Maldini',
    userPhotoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
    organizerId: 'org_figc_lombardia',
    organizerName: 'FIGC Lombardia',
    organizerLogo: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?w=200',
    organizerRole: 'Delegato Provinciale Milano',
    documents: {
      idCard: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
      delegationLetter: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4',
    },
    motivation: 'Sono responsabile dell\'organizzazione dei tornei amatoriali di calcio nella provincia di Milano. Ho bisogno dell\'account verificato per poter creare tornei ufficiali FIGC e gestire le iscrizioni delle squadre.',
    status: 'pending',
    createdAt: new Date('2025-01-14T10:00:00Z'),
  },
  {
    id: 'vreq_002',
    userId: 'user_005',
    userEmail: 'sara.gama@email.com',
    userName: 'Sara Gama',
    userPhotoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    organizerId: 'org_fip_lombardia',
    organizerName: 'FIP Lombardia',
    organizerLogo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200',
    organizerRole: 'Responsabile Comunicazione',
    documents: {
      idCard: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
      delegationLetter: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc',
    },
    motivation: 'Mi occupo della comunicazione e promozione dei tornei di basket regionali. Vorrei poter pubblicare risultati ufficiali e aggiornamenti sui tornei FIP Lombardia attraverso la piattaforma.',
    status: 'pending',
    createdAt: new Date('2025-01-13T15:30:00Z'),
  },
  {
    id: 'vreq_003',
    userId: 'user_006',
    userEmail: 'andrea.pirlo@email.com',
    userName: 'Andrea Pirlo',
    userPhotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    organizerId: 'org_csi',
    organizerName: 'CSI',
    organizerLogo: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200',
    organizerRole: 'Arbitro Regionale',
    documents: {
      idCard: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07',
      delegationLetter: 'https://images.unsplash.com/photo-1586281380923-93e93e3b8d6f',
    },
    motivation: 'Sono arbitro certificato CSI e vorrei poter inserire i risultati delle partite che arbitro direttamente sulla piattaforma con verifica immediata.',
    status: 'pending',
    createdAt: new Date('2025-01-12T09:15:00Z'),
  },
  {
    id: 'vreq_004',
    userId: 'user_007',
    userEmail: 'giulia.rossi@email.com',
    userName: 'Giulia Rossi',
    userPhotoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    organizerId: 'org_fipav_lombardia',
    organizerName: 'FIPAV Lombardia',
    organizerLogo: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=200',
    organizerRole: 'Dirigente Settore Giovanile',
    documents: {
      idCard: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818',
      delegationLetter: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4',
    },
    motivation: 'Gestisco il settore giovanile della FIPAV Lombardia e organizzo tornei per le categorie Under 16 e Under 18. Ho bisogno di creare tornei ufficiali e gestire le iscrizioni.',
    status: 'approved',
    reviewedBy: 'user_superuser_001',
    reviewedAt: new Date('2025-01-13T14:00:00Z'),
    createdAt: new Date('2025-01-10T11:00:00Z'),
  },
  {
    id: 'vreq_005',
    userId: 'user_008',
    userEmail: 'marco.verdi@email.com',
    userName: 'Marco Verdi',
    userPhotoURL: null,
    organizerId: 'org_fit',
    organizerName: 'FIT',
    organizerLogo: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=200',
    organizerRole: 'Istruttore Padel',
    documents: {
      idCard: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07',
      delegationLetter: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc',
    },
    motivation: 'Sono istruttore di padel ma non ho fornito documentazione sufficiente.',
    status: 'rejected',
    reviewedBy: 'user_superuser_001',
    reviewedAt: new Date('2025-01-11T16:30:00Z'),
    rejectionReason: 'La documentazione fornita non è sufficiente. È necessaria una lettera di delega ufficiale firmata dal presidente FIT con timbro della federazione.',
    createdAt: new Date('2025-01-09T14:00:00Z'),
  },
];

/**
 * Get pending verification requests
 */
export function getPendingVerificationRequests(): FirestoreVerificationRequest[] {
  return mockVerificationRequests.filter(req => req.status === 'pending');
}

/**
 * Get verification request by ID
 */
export function getVerificationRequestById(id: string): FirestoreVerificationRequest | undefined {
  return mockVerificationRequests.find(req => req.id === id);
}

/**
 * Get verification requests by user ID
 */
export function getVerificationRequestsByUserId(userId: string): FirestoreVerificationRequest[] {
  return mockVerificationRequests.filter(req => req.userId === userId);
}
