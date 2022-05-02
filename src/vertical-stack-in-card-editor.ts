import { fireEvent, HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CARD_EDITOR_NAME } from './const';
import { VerticalStackInCardConfig } from './vertical-stack-in-card-config';

@customElement(CARD_EDITOR_NAME)
export class LockCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: VerticalStackInCardConfig;

  @state() private _helpers?: any;

  private _initialized = false;

  public setConfig(config: VerticalStackInCardConfig): void {
    this._config = config;

    this._loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  private async _loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private _valueChanged(ev: CustomEvent): void {
    fireEvent(this, 'config-changed', { config: ev.detail.value });
  }
}
