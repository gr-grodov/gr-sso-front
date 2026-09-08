export type OAuth2SessionResponse = OAuth2Session[]

export interface OAuth2Session {
  sid: string;
  authorizationId: string;
  userId: number;
  clientId: string;
  clientName: string;
  isCurrentDevice: boolean;
  deviceIpAddress: string;
  deviceLocationCountry: string;
  deviceLocationCity: string;
  deviceUserAgent: string;
  deviceType: DeviceType;
  deviceInfo: {
    device: DeviceClass;
    operationSystem: string;
    agent: string;
    agentNameVersion: string;
  };
  lastUsedAt: string;
  diffNowAndLastEnter: number;
}

export type DeviceType = 'DESKTOP' | 'MOBILE' | 'TV' | 'DEVICE' | 'BOT' | 'UNKNOWN';

export type DeviceClass =
  | 'DESKTOP'
  | 'ANONYMIZED'
  | 'MOBILE'
  | 'TABLET'
  | 'PHONE'
  | 'WATCH'
  | 'AUGMENTED_REALITY'
  | 'VIRTUAL_REALITY'
  | 'E_READER'
  | 'SET_TOP_BOX'
  | 'TV'
  | 'GAME_CONSOLE'
  | 'HANDHELD_GAME_CONSOLE'
  | 'HOME_APPLIANCE'
  | 'VOICE'
  | 'SMART_DISPLAY'
  | 'CAR'
  | 'CLOUD'
  | 'ROBOT'
  | 'ROBOT_MOBILE'
  | 'ROBOT_IMITATOR'
  | 'HACKER'
  | 'UNKNOWN'
  | 'UNCLASSIFIED';