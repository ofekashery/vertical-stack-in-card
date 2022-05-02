import { LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';

export interface VerticalStackInCardConfig extends LovelaceCardConfig {
  title?: string;
  style?: object;
  cards: LovelaceCard[];
}
