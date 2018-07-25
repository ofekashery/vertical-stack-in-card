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
        this.style.paddingBottom = "16px";
        this.style.background = "#fff";

        const root = this.shadowRoot;
        while (root.lastChild) {
            root.removeChild(root.lastChild);
        }

        const cardConfig = Object.assign({}, config);
        this._refCards = []
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
        this._config = cardConfig;
    }

    set hass(hass) {
        const config = this._config;
        const root = this.shadowRoot;
        let index = 0;
        config.cards.forEach(item => {

            root.childNodes[index].hass = hass;

            if (root.childNodes[index].shadowRoot) {
                if (!root.childNodes[index].shadowRoot.querySelector('ha-card')) {
                    var searchEles = root.childNodes[index].shadowRoot.getElementById("root").childNodes;
                    for(var i = 0; i < searchEles.length; i++) {
                        searchEles[i].style.margin = "0px";
                        searchEles[i].shadowRoot.querySelector('ha-card').style.boxShadow = 'none';
                        searchEles[i].shadowRoot.querySelector('ha-card').style.paddingBottom = '0px';
                        if (item.type != "vertical-stack") {
                            searchEles[i].shadowRoot.querySelector('ha-card').style.paddingTop = '0px';
                        }
                    }
                } else {
                    root.childNodes[index].shadowRoot.querySelector('ha-card').style.boxShadow = 'none';
                    root.childNodes[index].shadowRoot.querySelector('ha-card').style.paddingBottom = '0px';
                    if(index > 0) {
                        root.childNodes[index].shadowRoot.querySelector('ha-card').style.paddingTop = '0px';
                    }
                }
            }
            index++;
        })
    }

    getCardSize() {
        return 1;
    }
}
customElements.define('vertical-stack-in-card', VerticalStackInCard);
