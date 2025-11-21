
import { Sport } from './index';

export type FieldType = 'calcio' | 'basket' | 'volley' | 'padel';

export type CalcioFieldType = 'campo_11' | 'campo_7' | 'campo_5' | 'campo_8';
export type BasketFieldType = 'campo_regolamentare' | 'campo_3x3' | 'campo_minibasket';
export type VolleyFieldType = 'campo_indoor' | 'campo_beach' | 'campo_park';
export type PadelFieldType = 'campo_singolo' | 'campo_doppio';

export interface CalcioFieldDetails {
  type: CalcioFieldType;
  dimensions: {
    length: number; // meters
    width: number; // meters
  };
  surface: 'erba_naturale' | 'erba_sintetica' | 'terra' | 'cemento';
  lighting: boolean;
  covered: boolean;
  seatingCapacity?: number;
}

export interface BasketFieldDetails {
  type: BasketFieldType;
  dimensions: {
    length: number; // meters
    width: number; // meters
  };
  surface: 'parquet' | 'gomma' | 'cemento' | 'sintetico';
  hoopHeight: number; // meters
  indoor: boolean;
  seatingCapacity?: number;
}

export interface VolleyFieldDetails {
  type: VolleyFieldType;
  dimensions: {
    length: number; // meters
    width: number; // meters
  };
  surface: 'parquet' | 'gomma' | 'sabbia' | 'erba';
  netHeight: {
    male: number; // meters
    female: number; // meters
  };
  indoor: boolean;
  seatingCapacity?: number;
}

export interface PadelFieldDetails {
  type: PadelFieldType;
  dimensions: {
    length: number; // meters (usually 20)
    width: number; // meters (usually 10)
  };
  surface: 'cemento' | 'erba_sintetica' | 'resina';
  wallType: 'vetro' | 'muro' | 'rete';
  lighting: boolean;
  covered: boolean;
}

export type SportFieldDetails = 
  | CalcioFieldDetails 
  | BasketFieldDetails 
  | VolleyFieldDetails 
  | PadelFieldDetails;

export interface VenueField {
  id: string;
  venueId: string;
  name: string; // e.g., "Campo 1", "Campo Centrale"
  sport: Sport;
  fieldDetails: SportFieldDetails;
  available: boolean;
  maintenanceNotes?: string;
  photos: string[];
  bookingUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VenueWithFields {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  region: string;
  sports: Sport[];
  coordinates: {
    lat: number;
    lng: number;
  };
  fields: VenueField[];
  contactPhone?: string;
  contactEmail?: string;
  openingHours?: string;
  verified: boolean;
  createdBy: string;
  createdAt: Date;
}

// Helper functions for field type validation
export function getFieldTypeLabel(sport: Sport, fieldType: string): string {
  switch (sport) {
    case 'calcio':
      switch (fieldType as CalcioFieldType) {
        case 'campo_11': return 'Campo 11 vs 11';
        case 'campo_7': return 'Campo 7 vs 7';
        case 'campo_5': return 'Campo 5 vs 5 (Calcetto)';
        case 'campo_8': return 'Campo 8 vs 8';
        default: return fieldType;
      }
    case 'basket':
      switch (fieldType as BasketFieldType) {
        case 'campo_regolamentare': return 'Campo Regolamentare';
        case 'campo_3x3': return 'Campo 3x3';
        case 'campo_minibasket': return 'Campo Minibasket';
        default: return fieldType;
      }
    case 'volley':
      switch (fieldType as VolleyFieldType) {
        case 'campo_indoor': return 'Campo Indoor';
        case 'campo_beach': return 'Campo Beach Volley';
        case 'campo_park': return 'Campo Park Volley';
        default: return fieldType;
      }
    case 'padel':
      switch (fieldType as PadelFieldType) {
        case 'campo_singolo': return 'Campo Singolo';
        case 'campo_doppio': return 'Campo Doppio';
        default: return fieldType;
      }
    default:
      return fieldType;
  }
}

export function getDefaultFieldDimensions(sport: Sport, fieldType: string): { length: number; width: number } {
  switch (sport) {
    case 'calcio':
      switch (fieldType as CalcioFieldType) {
        case 'campo_11': return { length: 105, width: 68 };
        case 'campo_7': return { length: 65, width: 45 };
        case 'campo_5': return { length: 40, width: 20 };
        case 'campo_8': return { length: 70, width: 50 };
        default: return { length: 100, width: 60 };
      }
    case 'basket':
      switch (fieldType as BasketFieldType) {
        case 'campo_regolamentare': return { length: 28, width: 15 };
        case 'campo_3x3': return { length: 15, width: 11 };
        case 'campo_minibasket': return { length: 22, width: 12 };
        default: return { length: 28, width: 15 };
      }
    case 'volley':
      return { length: 18, width: 9 };
    case 'padel':
      return { length: 20, width: 10 };
    default:
      return { length: 0, width: 0 };
  }
}
