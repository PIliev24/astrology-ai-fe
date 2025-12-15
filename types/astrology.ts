
export interface BirthChartCreateRequest {
  name: string;
  birth_datetime: string; // Format: "dd-mmm-yyyy hh:mm" (e.g., "15-Jun-1990 14:30")
  city: string;
  country: string;
}

export interface AstrologicalPoint {
  name: string;
  sign: string;
  emoji: string;
  house: string | null;
  speed: number | null;
  abs_pos: number;
  element: string;
  quality: string;
  position: number;
  sign_num: number;
  point_type: string;
  retrograde: boolean | null;
  declination: number | null;
}

export interface House {
  name: string;
  sign: string;
  emoji: string;
  house: null;
  speed: null;
  abs_pos: number;
  element: string;
  quality: string;
  position: number;
  sign_num: number;
  point_type: string;
  retrograde: null;
  declination: null;
}

export interface Aspect {
  p1: number;
  p2: number;
  diff: number;
  orbit: number;
  aspect: string;
  p1_name: string;
  p2_name: string;
  p1_owner: string;
  p1_speed: number;
  p2_owner: string;
  p2_speed: number;
  p1_abs_pos: number;
  p2_abs_pos: number;
  aspect_degrees: number;
  aspect_movement: string;
}

export interface BirthChartResponse {
  id: string;
  name: string;
  birth_data: {
    name: string;
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    city: string;
    country: string;
    longitude: number;
    latitude: number;
    timezone: string;
  };
  chart_data: {
    chart?: string; // SVG string
    status?: string;
    chart_data?: {
      aspects?: Aspect[];
      subject?: {
        active_points?: string[];
        houses_names_list?: string[];
        first_house?: House;
        second_house?: House;
        third_house?: House;
        fourth_house?: House;
        fifth_house?: House;
        sixth_house?: House;
        seventh_house?: House;
        eighth_house?: House;
        ninth_house?: House;
        tenth_house?: House;
        eleventh_house?: House;
        twelfth_house?: House;
        sun?: AstrologicalPoint;
        moon?: AstrologicalPoint;
        mercury?: AstrologicalPoint;
        venus?: AstrologicalPoint;
        mars?: AstrologicalPoint;
        jupiter?: AstrologicalPoint;
        saturn?: AstrologicalPoint;
        uranus?: AstrologicalPoint;
        neptune?: AstrologicalPoint;
        pluto?: AstrologicalPoint;
        chiron?: AstrologicalPoint;
        mean_lilith?: AstrologicalPoint;
        true_north_lunar_node?: AstrologicalPoint;
        true_south_lunar_node?: AstrologicalPoint;
        ascendant?: AstrologicalPoint;
        medium_coeli?: AstrologicalPoint;
        descendant?: AstrologicalPoint;
        imum_coeli?: AstrologicalPoint;
        lunar_phase?: {
          moon_emoji?: string;
          moon_phase?: number;
          moon_phase_name?: string;
          degrees_between_s_m?: number;
        };
        [key: string]: AstrologicalPoint | House | string | number | null | {
          moon_emoji?: string;
          moon_phase?: number;
          moon_phase_name?: string;
          degrees_between_s_m?: number;
        } | string[] | undefined;
      };
      active_points?: string[];
      active_aspects?: Array<{ orb: number; name: string }>;
      element_distribution?: {
        air?: number;
        fire?: number;
        earth?: number;
        water?: number;
        air_percentage?: number;
        fire_percentage?: number;
        earth_percentage?: number;
        water_percentage?: number;
      };
      quality_distribution?: {
        fixed?: number;
        mutable?: number;
        cardinal?: number;
        fixed_percentage?: number;
        mutable_percentage?: number;
        cardinal_percentage?: number;
      };
    };
    chart_wheel?: string; // SVG string (legacy)
    chart_grid?: string; // SVG string (legacy)
    [key: string]: unknown; // Other chart data
  };
  created_at: string;
}

export interface ChatMessageRequest {
  type: "message";
  content: string;
  conversation_id?: string | null;
  chart_references?: string[];
}

export interface ToolCallMetadata {
  tool_name: string;
  tool_input?: Record<string, unknown>;
  tool_output?: string;
  success: boolean;
}

export interface ChatMessageResponse {
  type: "message" | "error" | "conversation_created";
  role: "user" | "assistant";
  content: string;
  conversation_id?: string;
  tool_calls?: ToolCallMetadata[];
  chart_references?: string[];
}

export interface ConnectionResponse {
  type: "connected";
  message: string;
  user_id: string;
}

export interface ErrorResponse {
  type: "error";
  error: string;
  code?: string;
}

