# Vertical Stack In Card

![Version](https://img.shields.io/github/v/release/ofekashery/vertical-stack-in-card?style=flat-square)
![Downloads](https://img.shields.io/github/downloads/ofekashery/vertical-stack-in-card/total?style=flat-square)
![Stars](https://img.shields.io/github/stars/ofekashery/vertical-stack-in-card?style=flat-square)

Vertical Stack In Card lets you you to group multiple cards into a single sleek card in the Home Assistant UI.

![Example Card](https://user-images.githubusercontent.com/16443111/220773923-c28009d6-edfc-4ffd-9290-3e0c6e1acf73.png)

## Options

| Name       | Type    | Default      | Description                               |
| ---------- | ------- | ------------ | ----------------------------------------- |
| type       | string  | **Required** | `custom:vertical-stack-in-card`           |
| cards      | list    | **Required** | List of cards                             |
| title      | string  | **Optional** | Card title                                |
| horizontal | boolean | **Optional** | Default: `false`                          |
| styles     | object  | **Optional** | Adds custom CSS directives to child cards |

## Installation

*VSIC is available in [HACS](https://github.com/hacs/integration) (Home Assistant Community Store).*

### 1. Download the card

Install the VSIC by copying [`vertical-stack-in-card.js`](https://raw.githubusercontent.com/ofekashery/vertical-stack-in-card/master/vertical-stack-in-card.js) to `<config directory>/www/vertical-stack-in-card.js`, or via bash:
```bash
wget https://raw.githubusercontent.com/ofekashery/vertical-stack-in-card/master/vertical-stack-in-card.js
mv vertical-stack-in-card.js /config/www/
```

### 2. Link the card to your Lovelace UI

#### The manual way:

Link `vertical-stack-in-card` inside your `ui-lovelace.yaml`

```yaml
resources:
  - url: /local/vertical-stack-in-card.js?v=0.4.4
    type: js
```

#### Through the GUI:

Alternatively, with Home Assistant 2021.3 or later, [click here](https://my.home-assistant.io/redirect/lovelace_resources). Using My Home Assistant, that will bring up the GUI for Resources. Click the Plus to add a new resource. The `url` is the path to your downloaded file. Replace `<config directory>/www/` with `/local/`.  

![Add Resource](https://user-images.githubusercontent.com/557102/196027109-01b3ab95-ef61-4573-9ced-71233481eb07.png)

Finish by clicking "Create" and refresh your browser.

### 3. Use the card somehere.

Add a custom card in your `ui-lovelace.yaml`.

**Example**

```yaml
type: 'custom:vertical-stack-in-card'
title: My Card
cards:
  - type: glance
    entities:
      - sensor.temperature_sensor
      - sensor.humidity_sensor
      - sensor.motion_sensor
  - type: entities
    entities:
      - switch.livingroom_tv
      - entity: script.livingroom_receiver
        name: Receiver
      - switch.livingroom_ac
```

## Credits

- [ofekashery](https://github.com/ofekashery)
- [ciotlosm](https://github.com/ciotlosm)
- [thomasloven](https://github.com/thomasloven)
