console.log(`%cvertical-stack-in-card\n%cVersion: ${'0.4.4'}`, 'color: #1976d2; font-weight: bold;', '');

const HELPERS = window.loadCardHelpers ? window.loadCardHelpers() : undefined;

class VerticalStackInCard extends HTMLElement {
  constructor() {
    super();
  }

  setConfig(config) {
    this._cardSize = {};
    this._cardSize.promise = new Promise((resolve) => (this._cardSize.resolve = resolve));

    if (!config || !config.cards || !Array.isArray(config.cards)) {
      throw new Error('Card config incorrect');
    }
    this._config = config;
    this._refCards = [];
    this.renderCard();
  }

  async renderCard() {
    const config = this._config;
    if (window.loadCardHelpers) {
      this.helpers = await window.loadCardHelpers();
    }
    const promises = config.cards.map((config) => this.createCardElement(config));
    this._refCards = await Promise.all(promises);

    // Style cards
    this._refCards.forEach((card) => {
      if (card.updateComplete) {
        card.updateComplete.then(() => this.styleCard(card));
      } else {
        this.styleCard(card);
      }
    });

    // Create the card
    const card = document.createElement('ha-card');
    const cardContent = document.createElement('div');
    card.header = config.title;
    card.style.overflow = 'hidden';
    this._refCards.forEach((card) => cardContent.appendChild(card));
    if (config.horizontal) {
      cardContent.style.display = 'flex';
      cardContent.childNodes.forEach((card) => {
        card.style.flex = '1 1 0';
        card.style.minWidth = 0;
      });
    }
    card.appendChild(cardContent);
    
    const shadowRoot = this.shadowRoot || this.attachShadow({mode: 'open'});
    while (shadowRoot.hasChildNodes()) {
      shadowRoot.removeChild(shadowRoot.lastChild);
    }
    shadowRoot.appendChild(card);

    // Calculate card size
    this._cardSize.resolve();
  }

  async createCardElement(cardConfig) {
    const createError = (error, origConfig) => {
      return createThing('hui-error-card', {
        type: 'error',
        error,
        origConfig
      });
    };

    const createThing = (tag, config) => {
      if (this.helpers) {
        if (config.type === 'divider') {
          return this.helpers.createRowElement(config);
        } else {
          return this.helpers.createCardElement(config);
        }
      }

      const element = document.createElement(tag);
      try {
        element.setConfig(config);
      } catch (err) {
        console.error(tag, err);
        return createError(err.message, config);
      }
      return element;
    };

    let tag = cardConfig.type;
    if (tag.startsWith('divider')) {
      tag = `hui-divider-row`;
    } else if (tag.startsWith('custom:')) {
      tag = tag.substr('custom:'.length);
    } else {
      tag = `hui-${tag}-card`;
    }

    const element = createThing(tag, cardConfig);
    element.hass = this._hass;
    element.addEventListener(
      'll-rebuild',
      (ev) => {
        ev.stopPropagation();
        this.createCardElement(cardConfig).then(() => {
          this.renderCard();
        });
      },
      { once: true }
    );
    return element;
  }

  set hass(hass) {
    this._hass = hass;
    if (this._refCards) {
      this._refCards.forEach((card) => {
        card.hass = hass;
      });
    }
  }

  styleCard(element) {
    const config = this._config;
    if (element.shadowRoot) {
      if (element.shadowRoot.querySelector('ha-card')) {
        let ele = element.shadowRoot.querySelector('ha-card');
        ele.style.boxShadow = 'none';
        ele.style.borderRadius = '0';
        ele.style.border = "none";
        if ('styles' in config) {
          Object.entries(config.styles).forEach(([key, value]) => ele.style.setProperty(key, value));
        }
      } else {
        let searchEles = element.shadowRoot.getElementById('root');
        if (!searchEles) {
          searchEles = element.shadowRoot.getElementById('card');
        }
        if (!searchEles) return;
        searchEles = searchEles.childNodes;
        for (let i = 0; i < searchEles.length; i++) {
          if (searchEles[i].style) {
            searchEles[i].style.margin = '0px';
          }
          this.styleCard(searchEles[i]);
        }
      }
    } else {
      if (typeof element.querySelector === 'function' && element.querySelector('ha-card')) {
        let ele = element.querySelector('ha-card');
        ele.style.boxShadow = 'none';
        ele.style.borderRadius = '0';
        ele.style.border = "none";
        if ('styles' in config) {
          Object.entries(config.styles).forEach(([key, value]) => ele.style.setProperty(key, value));
        }
      }
      let searchEles = element.childNodes;
      for (let i = 0; i < searchEles.length; i++) {
        if (searchEles[i] && searchEles[i].style) {
          searchEles[i].style.margin = '0px';
        }
        this.styleCard(searchEles[i]);
      }
    }
  }

  _computeCardSize(card) {
    if (typeof card.getCardSize === 'function') {
      return card.getCardSize();
    }
    return customElements
      .whenDefined(card.localName)
      .then(() => this._computeCardSize(card))
      .catch(() => 1);
  }

  async getCardSize() {
    await this._cardSize.promise;
    const sizes = await Promise.all(this._refCards.map(this._computeCardSize));
    return sizes.reduce((a, b) => a + b, 0);
  }

  static async getConfigElement() {
    // Ensure hui-card-element-editor and hui-card-picker are loaded.
    // They happen to be used by the vertical-stack card editor but there must be a better way?
    let cls = customElements.get('hui-vertical-stack-card');
    if (!cls) {
      (await HELPERS).createCardElement({ type: 'vertical-stack', cards: [] });
      await customElements.whenDefined('hui-vertical-stack-card');
      cls = customElements.get('hui-vertical-stack-card');
    }
    return cls.getConfigElement();
  }

  static getStubConfig() {
    return {
      cards: [],
    };
  }
}

customElements.define('vertical-stack-in-card', VerticalStackInCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'vertical-stack-in-card',
  name: 'Vertical Stack In Card',
  description: 'Group multiple cards into a single sleek card.',
  preview: false,
  documentationURL: 'https://github.com/ofekashery/vertical-stack-in-card'
});
