import { LovelaceCardConfig } from 'custom-card-helpers';

export interface VerticalStackInCardConfig extends LovelaceCardConfig {
  title?: string;
  horizontal?: boolean;
  cards: LovelaceCardConfig[];
  styles?: object;
}
