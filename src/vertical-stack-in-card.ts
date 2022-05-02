import {
  computeCardSize,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
} from 'custom-card-helpers';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CARD_EDITOR_NAME, CARD_NAME } from './const';
import { VerticalStackInCardConfig } from './vertical-stack-in-card-config';
import { classMap } from 'lit/directives/class-map.js';

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

  @property() protected _cards?: LovelaceCard[];

  @state() private _config?: VerticalStackInCardConfig;

  private _helper?: any;

  async getCardSize(): Promise<number> {
    if (!this._cards) {
      return 0;
    }

    const promises: Array<Promise<number> | number> = [];

    for (const element of this._cards) {
      promises.push(computeCardSize(element));
    }

    const results = await Promise.all(promises);

    return results.reduce((partial_sum, a) => partial_sum + a, 0);
  }

  async setConfig(config: VerticalStackInCardConfig): Promise<void> {
    if (!config || !config.cards || !Array.isArray(config.cards)) {
      throw new Error('Invalid configuration');
    }

    this._config = {
      ...config,
    };

    this._helper = (window as any).loadCardHelpers ? await (window as any).loadCardHelpers() : undefined;

    this._cards = await Promise.all(config.cards.map((config) => this._createCardElement(config)));

    // Style cards
    this._cards.forEach((card) => {
      if ((card as any).updateComplete) {
        (card as any).updateComplete.then(() => this._cleanCardStyle(card));
      } else {
        this._cleanCardStyle(card);
      }
    });
  }

  private async _createCardElement(cardConfig: LovelaceCardConfig) {
    const element = this._helper.createCardElement(cardConfig) as LovelaceCard;
    if (this.hass) {
      element.hass = this.hass;
    }

    element.addEventListener(
      'll-rebuild',
      (ev) => {
        ev.stopPropagation();
        this._rebuildCard(element, cardConfig);
      },
      { once: true },
    );
    return element;
  }

  private _cleanCardStyle(element: LovelaceCard) {
    const config = this._config;
    if (element.shadowRoot) {
      if (element.shadowRoot.querySelector('ha-card')) {
        const ele = element.shadowRoot.querySelector('ha-card') as HTMLElement;
        ele.style.boxShadow = 'none';
        ele.style.borderRadius = '0';
        if (config?.styles) {
          Object.entries(config.styles).forEach(([key, value]) => ele.style.setProperty(key, value));
        }
      } else {
        let searchEles = element.shadowRoot.getElementById('root') as any;
        if (!searchEles) {
          searchEles = element.shadowRoot.getElementById('card') as any;
        }
        if (!searchEles) return;
        searchEles = searchEles.childNodes as NodeListOf<any>;
        for (let i = 0; i < searchEles.length; i++) {
          if (searchEles[i].style) {
            searchEles[i].style.margin = '0px';
          }
          this._cleanCardStyle(searchEles[i]);
        }
      }
    } else {
      if (typeof element.querySelector === 'function' && element.querySelector('ha-card')) {
        const ele = element.querySelector('ha-card') as any;
        ele.style.boxShadow = 'none';
        ele.style.borderRadius = '0';
        if (config?.styles) {
          Object.entries(config.styles).forEach(([key, value]) => ele.style.setProperty(key, value));
        }
      }
      const searchEles = element.childNodes as NodeListOf<any>;
      for (let i = 0; i < searchEles.length; i++) {
        if (searchEles[i] && searchEles[i].style) {
          searchEles[i].style.margin = '0px';
        }
        this._cleanCardStyle(searchEles[i]);
      }
    }
  }

  private async _rebuildCard(cardElToReplace: LovelaceCard, config: LovelaceCardConfig): Promise<void> {
    const newCardEl = await this._createCardElement(config);
    if (cardElToReplace.parentElement) {
      cardElToReplace.parentElement.replaceChild(newCardEl, cardElToReplace);
    }
    this._cards = this._cards!.map((curCardEl) => (curCardEl === cardElToReplace ? newCardEl : curCardEl));
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass || !this._cards) {
      return html``;
    }

    const title = this._config.title || '';

    return html`<ha-card>
      ${title ? html`<div class="card-header">${title}</div>` : null}
      <div
        class=${classMap({
          container: true,
          vertical: true,
        })}
      >
        ${this._cards}
      </div>
    </ha-card>`;
  }

  static get styles(): CSSResultGroup {
    return [
      css`
        .container {
          display: flex;
          justify-content: flex-start;
        }

        .horizontal {
          height: 100%;
          flex-direction: row;
          align-items: center;
        }
        .horizontal > * {
          flex: 1 1 0;
          margin: var(--horizontal-stack-card-margin, var(--stack-card-margin, 0 4px));
          min-width: 0;
        }
        .horizontal > *:first-child {
          margin-left: 0;
        }
        .horizontal > *:last-child {
          margin-right: 0;
        }
        .vertical {
          flex-direction: column;
          height: 100%;
          gap: 5px;
        }
        .vertical > * {
          margin: var(--vertical-stack-card-margin, var(--stack-card-margin, 4px 0));
        }
        .vertical > *:first-child {
          margin-top: 0;
        }
        .vertical > *:last-child {
          margin-bottom: 0;
        }
      `,
    ];
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
