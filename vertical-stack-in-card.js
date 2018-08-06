class VerticalStackInCard extends HTMLElement {
    constructor() {
        super();
        // Make use of shadowRoot to avoid conflicts when reusing
        this.attachShadow({ mode: 'open' });
    }
    setConfig(config) {
        if (!config || !config.cards || !Array.isArray(config.cards)) {
            throw new Error('Card config incorrect');
        }

        this.style.boxShadow = "0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.15)";
        this.style.borderRadius = "2px";
        this.style.background = "var(--paper-card-background-color)";

        const root = this.shadowRoot;
        while (root.lastChild) {
            root.removeChild(root.lastChild);
        }

        this._refCards = [];
        if (config.title) {
            const title = document.createElement("div");
            title.className = "header";
            title.style = "font-family: var(--paper-font-headline_-_font-family); -webkit-font-smoothing: var(--paper-font-headline_-_-webkit-font-smoothing); font-size: var(--paper-font-headline_-_font-size); font-weight: var(--paper-font-headline_-_font-weight); letter-spacing: var(--paper-font-headline_-_letter-spacing); line-height: var(--paper-font-headline_-_line-height);text-rendering: var(--paper-font-common-expensive-kerning_-_text-rendering);opacity: var(--dark-primary-opacity);padding: 24px 16px 0px 16px";
            title.innerHTML = '<div class="name">' + config.title + '</div>';
            root.appendChild(title);
        }
        let element;
        config.cards.forEach(item => {
            if (item.type.startsWith("custom:")){
                element = document.createElement(`${item.type.substr("custom:".length)}`);
            } else {
                element = document.createElement(`hui-${item.type}-card`);
            }
            element.setConfig(item);
            root.appendChild(element);
            this._refCards.push(element);
        });
    }

    set hass(hass) {
        if (this._refCards) {
            this._refCards.forEach((card) => {
                card.hass = hass;
            });
        }
    }

    connectedCallback() {
        this._refCards.forEach((element) => {
            if (element.shadowRoot) {
                if (!element.shadowRoot.querySelector('ha-card')) {
                    let searchEles = element.shadowRoot.getElementById("root");
                    if (!searchEles) {
                        searchEles = element.shadowRoot.getElementById("card");
                    }
                    searchEles = searchEles.childNodes;
                    for(let i = 0; i < searchEles.length; i++) {
                        searchEles[i].style.margin = "0px";
                        searchEles[i].shadowRoot.querySelector('ha-card').style.boxShadow = 'none';
                    }
                } else {
                    element.shadowRoot.querySelector('ha-card').style.boxShadow = 'none';
                }
            }
        });
    }

    getCardSize() {
        let totalSize = 0;
        this._refCards.forEach((element) => {
            totalSize += typeof element.getCardSize === 'function' ? element.getCardSize() : 1;
        });
        return totalSize;
    }
}

customElements.define('vertical-stack-in-card', VerticalStackInCard);
