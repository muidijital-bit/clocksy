export type Role = "customer" | "business_owner";
export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Profile {
  id: string;
  role: Role;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Business {
  id: string;
  owner_id: string;
  slug: string;
  name: string;
  type: string;
  address: string | null;
  phone: string | null;
  about: string | null;
  verified: boolean;
  rating: number;
  review_count: number;
  price_range: string | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
}

export interface BusinessHour {
  id: string;
  business_id: string;
  day_of_week: number; // 0=Sun, 1=Mon ... 6=Sat
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
}

export interface BusinessService {
  id: string;
  business_id: string;
  name: string;
  duration_minutes: number;
  price: number;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Staff {
  id: string;
  business_id: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  customer_id: string | null;
  business_id: string;
  service_id: string | null;
  staff_id: string | null;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  notes: string | null;
  price: number | null;
  created_at: string;
  // joined
  profiles?: Pick<Profile, "full_name" | "phone">;
  businesses?: Pick<Business, "name" | "slug">;
  business_services?: Pick<BusinessService, "name" | "duration_minutes">;
  staff?: Pick<Staff, "name">;
}

export interface Review {
  id: string;
  appointment_id: string | null;
  customer_id: string | null;
  business_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}
