export interface User {
  id: number;
  name: string;
  username: string;
  vorname: string;
  shortname: string;
  nachname: string;
  steamid: string;
  avatar: string;
  email: string;
  email_verified_at: null;
  admin: number;
  created_at: string;
  updated_at: string;
  discord_id: string;
  profile_extras: string;
  origin: string;
  c_rating: number;
  cc_rating: number;
  twitch_channel: string;
  is_tv_broadcaster: number;
  youtube_channel: string;
  popometer_id: null;
  license: string;
  safety_rating: string;
  division: number;
  valid_license: number;
  darkmode: number;
  patreon: number;
  fav_sim: number;
  deleted: boolean;
  isAdmin: boolean;
  isReko: boolean;
  lastCars: LastCar[];
  gameservers: any[];
  rating_by_sim: RatingBySim[];
  sr_license: string;
  on_lfm_discord: boolean;
  discord_linked: boolean;
  patreon_linked: boolean;
  blocked_for_reporting: boolean;
  discord_popup: boolean;
  name_change_req: number;
  pending_self_acceptance_reports: number;
}

export interface LastCar {
  GT3: boolean | GT3Class;
  GTE?: boolean;
  LMP2?: boolean;
  CHL?: boolean;
  CUP?: boolean;
  GT4?: boolean | GT3Class;
  ST?: boolean;
  TCX?: boolean;
  'Alpine A110 Cup'?: boolean;
  BTCC?: boolean;
  'Class 1'?: boolean;
  'Clio RS Cup V'?: boolean;
  'Dallara IR18'?: boolean;
  F3?: boolean;
  LMH?: boolean;
  'Porsche 992 GT3 Cup'?: boolean;
  'Stockcar 2018 X'?: boolean;
  'USF 2000'?: boolean;
}

export interface GT3Class {
  model: number;
  livery: number;
}

export interface RatingBySim {
  rating: number;
  sim_id: number;
  name: string;
  logo_url: string;
  license: string;
  division: number;
  ranked_races: number;
}
