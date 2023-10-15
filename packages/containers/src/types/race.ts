// Generated by https://quicktype.io

import { Track } from "./track";
export interface Race {
  race_id:                   number;
  server_region:             string;
  event_id:                  number;
  track:                     Track;
  race_date:                 string;
  logfile:                   string;
  server_settings:           RaceServerSettings;
  live_video:                string;
  vod_link:                  string;
  livetiming:                string;
  closed:                    number;
  season_week:               number;
  session_running:           number;
  sof:                       number;
  session_broadcaster:       number;
  splitted_race:             number;
  split2_session_running:    number;
  split3_session_running:    number;
  split4_session_running:    number;
  split5_session_running:    number;
  split6_session_running:    number;
  split7_session_running:    number;
  split8_session_running:    number;
  split9_session_running:    number;
  split10_session_running:   number;
  split11_session_running:   number;
  split12_session_running:   number;
  split13_session_running:   number;
  split14_session_running:   number;
  split15_session_running:   number;
  split2_sof:                number;
  split3_sof:                number;
  split4_sof:                number;
  split5_sof:                number;
  split6_sof:                number;
  split7_sof:                number;
  split8_sof:                number;
  split9_sof:                number;
  split10_sof:               number;
  split11_sof:               number;
  split12_sof:               number;
  split13_sof:               number;
  split14_sof:               number;
  split15_sof:               number;
  split_data:                string;
  team_race_settings:        string;
  event_test_race:           number;
  extra_qualifying_day:      number;
  qualifying_format:         string;
  qualifying_date:           null;
  qualifying_extra_settings: string;
  reverse_grid_race_id:      null;
  reverse_grid_settings:     string;
  points_override:           string;
  point_multiplier:          string;
  forced_single_make_car:    number;
  eligible_for_bop_budget:   number;
  team_drivers:              number;
  split1_pid:                number;
  split2_pid:                number;
  split3_pid:                number;
  split4_pid:                number;
  split5_pid:                number;
  split6_pid:                number;
  split7_pid:                number;
  split8_pid:                number;
  split9_pid:                number;
  split10_pid:               number;
  split11_pid:               number;
  split12_pid:               number;
  split13_pid:               number;
  split14_pid:               number;
  split15_pid:               number;
  real_weather:              number;
  cooldown:                  boolean;
  reporting_window_open:     boolean;
  event:                     RaceEvent;
  entrylist:                 Entrylist;
  participants:              Participant;
  splits:                    Splits;
  multiTwitch:               Array<any[]>;
  videolink:                 string;
  isLive:                    number;
  race_results:              RaceResults;
  quali_results:             QualiResult[];
  chat:                      Array<Chat[]>;
  race_results_splits:       RaceResults[];
  quali_results_splits:      Array<QualiResult[]>;
}

export interface Chat {
  id:                number;
  race_id:           number;
  split:             number;
  name:              string;
  session:           SessionEnum;
  server_timestamp:  number;
  server_time:       string;
  session_timestamp: number;
  session_time:      string;
  message:           string;
}

export enum SessionEnum {
  Q = "Q",
  R = "R",
}

export interface Entrylist {
  entries:        EntrylistEntry[];
  forceEntryList: number;
}

export interface EntrylistEntry {
  drivers:                      Driver[];
  raceNumber:                   number;
  forcedCarModel:               number;
  overrideDriverInfo:           number;
  defaultGridPosition:          number;
  ballastKg:                    number;
  restrictor:                   number;
  customCar:                    CustomCar;
  overrideCarModelForCustomCar: number;
  isServerAdmin:                number;
}

export enum CustomCar {
  Empty = "",
  The75561D2ADf8711Ed97850242F537F1DeJSON = "75561d2a-df87-11ed-9785-0242f537f1de.json",
}

export interface Driver {
  firstName:      string;
  lastName:       string;
  shortName:      string;
  driverCategory: number;
  playerID:       string;
}

export interface RaceEvent {
  event_id:                       number;
  event_name:                     string;
  event_type:                     string;
  server_start:                   string;
  server_hosting:                 string;
  season_special_event:           number;
  sim_id:                         number;
  start_date:                     string;
  end_date:                       string;
  slots:                          number;
  fixed_car:                      number;
  closed:                         number;
  entrylist:                      string;
  thumbnail:                      string;
  url_code:                       string;
  standings:                      string;
  game_server:                    number;
  settings:                       EventSettings;
  gameservers:                    string;
  practice_server:                string;
  broadcasting_settings:          string;
  rules_de:                       string;
  rules_en:                       string;
  information_de:                 string;
  information_en:                 string;
  caster:                         string;
  reko:                           string;
  season_id:                      number;
  season_event_order:             number;
  elo_active:                     number;
  car_pics:                       number;
  mini_thumnbnail:                string;
  special_badge:                  null;
  chat_group:                     number;
  max_split_size:                 number;
  split_threshold:                number;
  splits_active:                  number;
  gameserver_split2:              number;
  gameserver_split3:              number;
  gameserver_split4:              number;
  gameserver_split5:              number;
  gameserver_split6:              number;
  gameserver_split7:              number;
  gameserver_split8:              number;
  gameserver_split9:              number;
  gameserver_split10:             number;
  gameserver_split11:             number;
  gameserver_split12:             number;
  gameserver_split13:             number;
  gameserver_split14:             number;
  gameserver_split15:             number;
  team_event:                     number;
  minimum_elo:                    number;
  minimum_sr:                     string;
  maximum_sr:                     number;
  min_sr_lic:                     null;
  min_license:                    License;
  team_min_drivers:               number;
  team_max_drivers:               number;
  signup_start:                   string;
  signup_stop:                    string;
  full_custom_liveries:           number;
  free_livery_upload:             number;
  spotterguide_screenshot_upload: number;
  live_stewarding:                number;
  reports_per_driver:             number;
  penalty_points_active:          number;
  points_deduction:               string;
  k_factor:                       string;
  sr_threshold_factor:            string;
  bop_active:                     number;
  bop_type:                       null;
  bop_settings:                   null;
  sponsor_big:                    string;
  sponsor_link:                   string;
  community:                      number;
  prizes:                         number;
  prize_html_de:                  string;
  prize_html_en:                  string;
  website_short_text:             string;
  patreon_only:                   number;
}

export enum License {
  Bronze = "BRONZE+",
  Gold = "GOLD+",
  Iron = "IRON",
  LicenseBRONZE = "BRONZE",
  LicenseGOLD = "GOLD",
  LicenseIRON = "IRON+",
  LicenseSILVER = "SILVER",
  Silver = "SILVER+",
}

export interface EventSettings {
  championship_settings: ChampionshipSettings;
  season_event_settings: SeasonEventSettings;
}

export interface ChampionshipSettings {
  teams:       number;
  car_classes: CarClassElement[];
}

export interface CarClassElement {
  class:              CarClassEnum;
  point_system:       any[];
  cup_classes_active: number;
}

export enum CarClassEnum {
  Gt3 = "GT3",
}

export interface SeasonEventSettings {
  car_class:               CarClassEnum;
  first_slot:              number;
  daily_races:             number;
  races_every:             number;
  week_schedule:           string[];
  slots_per_race:          number;
  standard_points_sof:     number;
  default_server_settings: DefaultServerSettings;
}

export interface DefaultServerSettings {
  race:                  Qualifying;
  weather:               Weather;
  practice:              Practice;
  qualifying:            Qualifying;
  pitstop_mandatory:     number;
  refueling_allowed:     number;
  refueling_mandatory:   number;
  refueling_time_fixed:  number;
  tire_change_mandatory: number;
  formation_lap_time:    number;
  short_formation_lap:   number;
  car_class:             CarClassEnum;
}

export interface Practice {
  day:    number;
  hour:   number;
  length: number;
}

export interface Qualifying {
  day:                    number;
  hour:                   number[];
  length:                 number;
  pre_race_waiting_time?: number;
}

export interface Weather {
  rain:                number;
  clouds:              number;
  randomness:          number;
  average_temperature: number;
}

export interface Participant {
  entries:        ParticipantsEntry[];
  forceEntryList: number;
}

export interface ParticipantsEntry {
  raceNumber:      number;
  vorname:         string;
  nachname:        string;
  shortname:       string;
  steam_id:        string;
  avatar:          string;
  origin:          string;
  elo:             number;
  car_model:       number;
  twitch_channel:  string;
  youtube_channel: string;
  is_live:         boolean;
  license:         License;
  user_id:         number;
  safety_rating:   string;
  team_id:         number;
  team_name:       string;
  team_logo:       string;
  split:           number;
  patreon:         number;
  car_class:       CarClassEnum;
  livery:          number | null;
  name_on_server:  boolean;
}

export interface QualiResult {
  vorname:        string;
  nachname:       string;
  user_id:        number;
  race_id:        number;
  event_id:       number;
  car_model:      number;
  car_name:       CarName;
  username:       string;
  name:           string;
  steamid:        string;
  team_car_id:    number;
  origin:         string;
  avatar:         string;
  laps:           number;
  splits:         string[];
  gap:            string;
  best_lap:       string;
  position:       number;
  class_position: number;
  participant_id: number;
  safety_rating:  string;
  car_number:     number;
  cc_rating:      number;
}

export enum CarName {
  AMRV8Vantage = "AMR V8 Vantage",
  AudiR8LMSGT3EvoII = "Audi R8 LMS GT3 evo II",
  BentleyContinental = "Bentley Continental",
  BmwM4Gt3 = "BMW M4 GT3",
  Ferrari296GT3 = "Ferrari 296 GT3",
  Ferrari488GT3Evo = "Ferrari 488 GT3 Evo",
  LamborghiniHuracanGT3EVO2 = "Lamborghini Huracan GT3 EVO 2",
  McLaren720SGT3 = "McLaren 720S GT3",
  McLaren720SGT3Evo = "McLaren 720S GT3 Evo",
  MercedesAMGGT3 = "Mercedes-AMG GT3",
  Porsche991IIGT3R = "Porsche 991II GT3 R",
  Porsche992GT3R = "Porsche 992 GT3 R",
}

export interface RaceResults {
  GT3: Gt3;
}

export interface Gt3 {
  OVERALL: Overall[];
}

export interface Overall {
  season_week:    number;
  steamid:        string;
  vorname:        string;
  nachname:       string;
  origin:         string;
  avatar:         string;
  user_id:        number;
  car_model:      number;
  car_name:       CarName;
  result_id:      number;
  race_id:        number;
  cup:            number;
  position:       number;
  class_position: number;
  cup_position:   number;
  driver_id:      number;
  team_car_id:    number;
  laps:           number;
  bestlap:        string;
  time:           string;
  time_penalty:   number;
  dnf:            number;
  points:         string;
  cup_points:     string;
  laps_detail:    string;
  gap:            string;
  dns:            number;
  dsq:            number;
  split:          number;
  car_id:         number;
  sim_id:         number;
  class:          CarClassEnum;
  car_number:     number;
  bestOfTheWeek:  boolean;
  lapDetail:      LapDetail[];
  positionGain:   number;
  incidentDetail: IncidentDetail[];
  license:        License;
  rating:         number;
  ratingGain:     number;
  sr_change:      number;
  incidents:      number;
  sr:             number;
}

export interface IncidentDetail {
  id:               number;
  race_id:          number;
  user_id:          number;
  server_timestamp: number;
  server_time:      string;
  incident_type:    IncidentType;
  created_at:       null;
  updated_at:       null;
  split:            number;
  session_time:     string;
  vorname:          string;
  nachname:         string;
}

export enum IncidentType {
  C = "C",
  D = "D",
}

export interface LapDetail {
  lap_id:                number;
  event_id:              number;
  race_id:               number;
  track_id:              number;
  participant_id:        number;
  user_id:               number;
  lap:                   number;
  lap_valid:             number;
  session_type:          SessionEnum;
  created_at:            null;
  updated_at:            null;
  splits:                string[];
  car_lap:               number;
  split:                 number;
  car_id:                number;
  gameversion:           number;
  lfm_track_bop_version: number;
  ballast:               number;
  lapTime:               string;
}

export interface RaceServerSettings {
  server_settings: ServerSettingsServerSettings;
}

export interface ServerSettingsServerSettings {
  event:       ServerSettingsEvent;
  assistRules: AssistRules;
  eventRules:  EventRules;
  settings:    ServerSettingsSettings;
}

export interface AssistRules {
  file: string;
  data: AssistRulesData;
}

export interface AssistRulesData {
  disableIdealLine:         number;
  disableAutosteer:         number;
  stabilityControlLevelMax: number;
  disableAutoPitLimiter:    number;
  disableAutoGear:          number;
  disableAutoClutch:        number;
  disableAutoEngineStart:   number;
  disableAutoWiper:         number;
  disableAutoLights:        number;
}

export interface ServerSettingsEvent {
  file: string;
  data: EventData;
}

export interface EventData {
  track:                         string;
  preRaceWaitingTimeSeconds:     number;
  postRaceSeconds:               number;
  sessionOverTimeSeconds:        number;
  ambientTemp:                   number;
  cloudLevel:                    number;
  rain:                          number;
  weatherRandomness:             number;
  simracerWeatherConditions:     number;
  isFixedConditionQualification: number;
  sessions:                      SessionElement[];
  configVersion:                 number;
}

export interface SessionElement {
  hourOfDay:              number;
  dayOfWeekend:           number;
  timeMultiplier:         number;
  sessionType:            string;
  sessionDurationMinutes: number;
}

export interface EventRules {
  file: string;
  data: EventRulesData;
}

export interface EventRulesData {
  qualifyStandingType:                  number;
  pitWindowLengthSec:                   number;
  driverStintTimeSec:                   number;
  mandatoryPitstopCount:                number;
  maxTotalDrivingTime:                  number;
  maxDriversCount:                      number;
  tyreSetCount:                         number;
  isRefuellingAllowedInRace:            boolean;
  isRefuellingTimeFixed:                boolean;
  isMandatoryPitstopRefuellingRequired: boolean;
  isMandatoryPitstopTyreChangeRequired: boolean;
  isMandatoryPitstopSwapDriverRequired: boolean;
}

export interface ServerSettingsSettings {
  file: string;
  data: SettingsData;
}

export interface SettingsData {
  serverName:                 string;
  password:                   string;
  spectatorPassword:          string;
  centralEntryListPath:       string;
  carGroup:                   CarClassEnum;
  trackMedalsRequirement:     number;
  safetyRatingRequirement:    number;
  racecraftRatingRequirement: number;
  maxCarSlots:                number;
  isRaceLocked:               number;
  isLockedPrepPhase:          number;
  shortFormationLap:          number;
  dumpLeaderboards:           number;
  dumpEntryList:              number;
  randomizeTrackWhenEmpty:    number;
  allowAutoDQ:                number;
  formationLapType:           number;
  configVersion:              number;
}

export interface Splits {
  splits:           number;
  divers_per_split: number;
  driver_count:     number;
  participants:     Participant[];
}
