/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HomeAssistant,
  LovelaceCard,
  LovelaceCardConfig,
  LovelaceCardEditor,
  createThing,
} from 'custom-card-helpers';
import { css, CSSResultGroup, html, LitElement, PropertyValueMap, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CARD_EDITOR_NAME, CARD_NAME } from './const';
import { VerticalStackInCardConfig } from './vertical-stack-in-card-config';
import { localize } from './localize/localize';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HELPERS = (window as any).loadCardHelpers ? (window as any).loadCardHelpers() : undefined;

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
    return { cards: [] };
  }

  @property() protected _card?: LovelaceCard;

  @state() private _config?: VerticalStackInCardConfig;

  private _hass?: HomeAssistant;

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (this._card) {
      this._card.hass = hass;
    }
  }

  private _helpers?: any;

  async getCardSize(): Promise<number> {
    if (!this._card) {
      return 0;
    }
    return await this._computeCardSize(this._card);
  }

  private _computeCardSize(card: LovelaceCard): number | Promise<number> {
    if (typeof card.getCardSize === 'function') {
      return card.getCardSize();
    }
    if (customElements.get(card.localName)) {
      return 1;
    }
    return customElements.whenDefined(card.localName).then(() => this._computeCardSize(card));
  }

  async setConfig(config: VerticalStackInCardConfig): Promise<void> {
    if (!config || !config.cards || !Array.isArray(config.cards)) {
      throw new Error(localize('common.invalid_configuration'));
    }

    this._config = {
      horizontal: false,
      ...config,
    };

    this._createStack()
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.updated(_changedProperties);
    if (!this._card) return;
    this._waitForUpdate(this._card);
    window.setTimeout(() => {
      this._waitForUpdate(this._card);
    }, 500);
  }

  private async _createStack() {
    let _mode = 'vertical'
    if (this._config!.horizontal == true) _mode = 'horizontal';
    this._card = await this._createCardElement({
      type: `${_mode}-stack`,
      cards: this._config!.cards,
    });
  }

  private _waitForUpdate(card: LovelaceCard | undefined): void {
    if (((card as unknown) as LitElement).updateComplete) {
      (((card as unknown) as LitElement).updateComplete.then(() => this._cleanCardStyle(card)));
    } else {
      this._cleanCardStyle(card);
    }
    this._cleanCardStyle(card);
  }

  private async _createCardElement(cardConfig: LovelaceCardConfig) {
    let element: LovelaceCard;
    if (HELPERS) {
      element = (await HELPERS).createCardElement(cardConfig);
    } else {
      element = createThing(cardConfig);
    }
    if (this._hass) {
      element.hass = this._hass;
    }
    if (element) {
      element.addEventListener(
        'll-rebuild',
        (ev) => {
          ev.stopPropagation();
          this._rebuildCard(element, cardConfig);
        },
        { once: true },
      );
    }
    return element;
  }

  private _cleanCardStyle(element: LovelaceCard | undefined) {
    if (!element) return;
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

  private async _rebuildCard(element: LovelaceCard, config: LovelaceCardConfig): Promise<LovelaceCard> {
    const newCard = await this._createCardElement(config);
    element.replaceWith(newCard);
    this._card = newCard;
    window.setTimeout(() => {
      this._waitForUpdate(this._card);
    }, 500);
    return newCard;
  }


  protected render(): TemplateResult {
    if (!this._config || !this._hass || !this._card) {
      return html``;
    }

    return html`<ha-card header=${this._config.title ?? null}>
      <div>${this._card}</div>
    </ha-card>`;
  }

  static get styles(): CSSResultGroup {
    return [
      css`
        ha-card {
          overflow: hidden;
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
