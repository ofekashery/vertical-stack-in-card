import { LovelaceCardConfig } from 'custom-card-helpers';

export interface VerticalStackInCardConfig extends LovelaceCardConfig {
  title?: string;
  cards: LovelaceCardConfig[];
  styles?: object;
}
