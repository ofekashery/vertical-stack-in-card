import { HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';
import { html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CARD_EDITOR_NAME, CARD_NAME } from './const';
import { VerticalStackInCardConfig } from './vertical-stack-in-card-config';

/* eslint no-console: 0 */
console.log(`%cvertical-stack-in-card\n%cVersion: ${'0.4.2'}`, 'color: #1976d2; font-weight: bold;', '');

@customElement(CARD_NAME)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class VerticalStackInCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    await import('./vertical-stack-in-card-editor');
    return document.createElement(CARD_EDITOR_NAME) as LovelaceCardEditor;
  }

  public static getStubConfig(): Record<string, unknown> {
    return {};
  }

  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: VerticalStackInCardConfig;

  getCardSize(): number | Promise<number> {
    return 1;
  }
  setConfig(config: VerticalStackInCardConfig): void {
    this._config = {
      ...config,
    };
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    return html``;
  }
}

// Configure the preview in the Lovelace card picker
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards = (window as any).customCards || [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards.push({
  type: CARD_NAME,
  name: 'Vertical Stack In Card',
  preview: true,
  description: 'Vertical Stack In Card allows you to group multiple cards in one card.',
});
