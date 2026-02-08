export enum AccommodationType {
  HOSTEL = 'Hostel',
  PG = 'PG',
  APARTMENT = 'Apartment'
}

export interface Amenity {
  icon: string; // Name of the lucide icon
  label: string;
}

export interface Hostel {
  id: string;
  name: string;
  type: AccommodationType;
  pricePerMonth: number;
  currency: string;
  distance: string; // e.g. "0.5 km"
  rating: number; // 1-5
  reviewCount: number;
  amenities: string[];
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  availability: number; // number of beds left
}

export interface MarketInsight {
  month: string;
  avgPrice: number;
}

export interface SearchResult {
  locationSummary: string;
  hostels: Hostel[];
  marketInsights: MarketInsight[];
}

export interface Booking {
  id: string;
  hostelId: string;
  hostelName: string;
  studentName: string;
  email: string;
  phoneNumber: string;
  moveInDate: string;
  duration: string;
  submittedAt: string;
}
