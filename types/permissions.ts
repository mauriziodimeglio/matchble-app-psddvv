
/**
 * Granular Permission System Types
 * Defines all possible permissions for verified delegates
 */

export interface PermissionsType {
  // TOURNAMENTS
  tournaments_createOfficial: boolean;
  tournaments_modifyOwn: boolean;
  tournaments_modifyAll: boolean;
  tournaments_delete: boolean;
  
  // RESULTS
  results_insert: boolean;
  results_bulkImportCSV: boolean;
  results_modifyOwn: boolean;
  results_modifyAll: boolean;
  results_verifyOthers: boolean;
  
  // ORGANIZERS
  organizers_manageOwn: boolean;
  organizers_manageAll: boolean;
  
  // USERS
  users_viewList: boolean;
  users_approveVerifications: boolean;
  users_revokeVerifications: boolean;
  
  // ANALYTICS
  analytics_viewOwn: boolean;
  analytics_viewAll: boolean;
  
  // SYSTEM
  system_adminPanel: boolean;
  system_manageReports: boolean;
  system_createSuperuser: boolean;
}

export type PermissionPreset = 'base' | 'manager' | 'custom';

export interface PermissionPresetConfig {
  id: PermissionPreset;
  name: string;
  description: string;
  emoji: string;
  permissions: PermissionsType;
}

/**
 * Permission Presets
 */
export const PERMISSION_PRESETS: PermissionPresetConfig[] = [
  {
    id: 'base',
    name: 'Base',
    description: 'Crea tornei ufficiali, inserisci risultati in blocco, modifica i propri risultati',
    emoji: '📝',
    permissions: {
      // Tournaments
      tournaments_createOfficial: true,
      tournaments_modifyOwn: true,
      tournaments_modifyAll: false,
      tournaments_delete: false,
      
      // Results
      results_insert: true,
      results_bulkImportCSV: true,
      results_modifyOwn: true,
      results_modifyAll: false,
      results_verifyOthers: false,
      
      // Organizers
      organizers_manageOwn: true,
      organizers_manageAll: false,
      
      // Users
      users_viewList: false,
      users_approveVerifications: false,
      users_revokeVerifications: false,
      
      // Analytics
      analytics_viewOwn: true,
      analytics_viewAll: false,
      
      // System
      system_adminPanel: false,
      system_manageReports: false,
      system_createSuperuser: false,
    },
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Tutto di Base + Verifica risultati di altri, Analytics propri organizzatori',
    emoji: '👔',
    permissions: {
      // Tournaments
      tournaments_createOfficial: true,
      tournaments_modifyOwn: true,
      tournaments_modifyAll: true,
      tournaments_delete: false,
      
      // Results
      results_insert: true,
      results_bulkImportCSV: true,
      results_modifyOwn: true,
      results_modifyAll: true,
      results_verifyOthers: true,
      
      // Organizers
      organizers_manageOwn: true,
      organizers_manageAll: false,
      
      // Users
      users_viewList: true,
      users_approveVerifications: false,
      users_revokeVerifications: false,
      
      // Analytics
      analytics_viewOwn: true,
      analytics_viewAll: false,
      
      // System
      system_adminPanel: false,
      system_manageReports: true,
      system_createSuperuser: false,
    },
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Scegli manualmente ogni singolo permesso',
    emoji: '⚙️',
    permissions: {
      // All false by default - superuser will configure
      tournaments_createOfficial: false,
      tournaments_modifyOwn: false,
      tournaments_modifyAll: false,
      tournaments_delete: false,
      results_insert: false,
      results_bulkImportCSV: false,
      results_modifyOwn: false,
      results_modifyAll: false,
      results_verifyOthers: false,
      organizers_manageOwn: false,
      organizers_manageAll: false,
      users_viewList: false,
      users_approveVerifications: false,
      users_revokeVerifications: false,
      analytics_viewOwn: false,
      analytics_viewAll: false,
      system_adminPanel: false,
      system_manageReports: false,
      system_createSuperuser: false,
    },
  },
];

/**
 * Permission Categories for UI Organization
 */
export interface PermissionCategory {
  id: string;
  name: string;
  emoji: string;
  permissions: Array<{
    key: keyof PermissionsType;
    label: string;
    description: string;
  }>;
}

export const PERMISSION_CATEGORIES: PermissionCategory[] = [
  {
    id: 'tournaments',
    name: 'Tornei',
    emoji: '🏆',
    permissions: [
      {
        key: 'tournaments_createOfficial',
        label: 'Crea Tornei Ufficiali',
        description: 'Può creare tornei ufficiali per gli organizzatori affiliati',
      },
      {
        key: 'tournaments_modifyOwn',
        label: 'Modifica Propri Tornei',
        description: 'Può modificare i tornei che ha creato',
      },
      {
        key: 'tournaments_modifyAll',
        label: 'Modifica Tutti i Tornei',
        description: 'Può modificare qualsiasi torneo degli organizzatori affiliati',
      },
      {
        key: 'tournaments_delete',
        label: 'Elimina Tornei',
        description: 'Può eliminare tornei (richiede conferma)',
      },
    ],
  },
  {
    id: 'results',
    name: 'Risultati',
    emoji: '📊',
    permissions: [
      {
        key: 'results_insert',
        label: 'Inserisci Risultati',
        description: 'Può inserire risultati di partite',
      },
      {
        key: 'results_bulkImportCSV',
        label: 'Import CSV in Blocco',
        description: 'Può importare risultati da file CSV',
      },
      {
        key: 'results_modifyOwn',
        label: 'Modifica Propri Risultati',
        description: 'Può modificare i risultati che ha inserito',
      },
      {
        key: 'results_modifyAll',
        label: 'Modifica Tutti i Risultati',
        description: 'Può modificare qualsiasi risultato',
      },
      {
        key: 'results_verifyOthers',
        label: 'Verifica Risultati Altri',
        description: 'Può approvare/rifiutare risultati inseriti da altri',
      },
    ],
  },
  {
    id: 'organizers',
    name: 'Organizzatori',
    emoji: '🏢',
    permissions: [
      {
        key: 'organizers_manageOwn',
        label: 'Gestisci Propri Affiliati',
        description: 'Può gestire solo gli organizzatori a cui è affiliato',
      },
      {
        key: 'organizers_manageAll',
        label: 'Gestisci Tutti',
        description: 'Può gestire tutti gli organizzatori del sistema',
      },
    ],
  },
  {
    id: 'users',
    name: 'Utenti',
    emoji: '👥',
    permissions: [
      {
        key: 'users_viewList',
        label: 'Visualizza Lista Utenti',
        description: 'Può vedere la lista di tutti gli utenti',
      },
      {
        key: 'users_approveVerifications',
        label: 'Approva Verifiche',
        description: 'Può approvare richieste di verifica (solo superuser)',
      },
      {
        key: 'users_revokeVerifications',
        label: 'Revoca Verifiche',
        description: 'Può revocare verifiche esistenti (solo superuser)',
      },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    emoji: '📈',
    permissions: [
      {
        key: 'analytics_viewOwn',
        label: 'Visualizza Statistiche Proprie',
        description: 'Può vedere statistiche dei propri organizzatori',
      },
      {
        key: 'analytics_viewAll',
        label: 'Visualizza Tutte le Statistiche',
        description: 'Può vedere statistiche di tutti gli organizzatori',
      },
    ],
  },
  {
    id: 'system',
    name: 'Sistema',
    emoji: '⚙️',
    permissions: [
      {
        key: 'system_adminPanel',
        label: 'Accesso Admin Panel',
        description: 'Può accedere al pannello di amministrazione',
      },
      {
        key: 'system_manageReports',
        label: 'Gestione Segnalazioni',
        description: 'Può gestire segnalazioni e report',
      },
      {
        key: 'system_createSuperuser',
        label: 'Crea Altri Superuser',
        description: 'Può creare altri account superuser (solo superuser)',
      },
    ],
  },
];

/**
 * Helper function to get preset by ID
 */
export function getPermissionPreset(presetId: PermissionPreset): PermissionPresetConfig | undefined {
  return PERMISSION_PRESETS.find(p => p.id === presetId);
}

/**
 * Helper function to check if user has specific permission
 */
export function hasPermission(
  permissions: PermissionsType | undefined,
  permission: keyof PermissionsType
): boolean {
  if (!permissions) return false;
  return permissions[permission] === true;
}

/**
 * Helper function to get all enabled permissions
 */
export function getEnabledPermissions(permissions: PermissionsType): Array<keyof PermissionsType> {
  return Object.entries(permissions)
    .filter(([_, value]) => value === true)
    .map(([key]) => key as keyof PermissionsType);
}

/**
 * Helper function to count enabled permissions
 */
export function countEnabledPermissions(permissions: PermissionsType): number {
  return getEnabledPermissions(permissions).length;
}
