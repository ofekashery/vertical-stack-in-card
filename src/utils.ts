import { LovelaceCardConfig } from 'custom-card-helpers';

export interface ConfigChangedEvent {
  config: LovelaceCardConfig;
  error?: string;
  guiModeAvailable?: boolean;
}

export interface GUIModeChangedEvent {
  guiMode: boolean;
  guiModeAvailable: boolean;
}
