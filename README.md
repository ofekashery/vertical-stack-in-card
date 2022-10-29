# Vertical Stack In Card

![Version](https://img.shields.io/github/v/release/ofekashery/vertical-stack-in-card)
![Downloads](https://img.shields.io/github/downloads/ofekashery/vertical-stack-in-card/total)
![Version](https://img.shields.io/github/v/release/ofekashery/vertical-stack-in-card)
![Stars](https://img.shields.io/github/stars/ofekashery/vertical-stack-in-card)
![Discord](https://img.shields.io/discord/330944238910963714)

Vertical Stack In Card allows you to group multiple cards in one card.

#### Please ⭐️ this repo if you find it useful

![Example](https://user-images.githubusercontent.com/16443111/80155963-779f3800-85cb-11ea-9565-c360eb9dffb1.png)

## Options

| Name       | Type    | Default      | Description                               |
| ---------- | ------- | ------------ | ----------------------------------------- |
| type       | string  | **Required** | `custom:vertical-stack-in-card`           |
| cards      | list    | **Required** | List of cards                             |
| title      | string  | **Optional** | Card title                                |
| horizontal | boolean | **Optional** | Default: `false`                          |
| styles     | object  | **Optional** | Adds custom CSS directives to child cards |

## Installation

### 1. Download the card

Install the `vertical-stack-in-card` card by copying `vertical-stack-in-card.js` to `<config directory>/www/vertical-stack-in-card.js`

Bash:

```bash
wget https://raw.githubusercontent.com/ofekashery/vertical-stack-in-card/master/vertical-stack-in-card.js
mv vertical-stack-in-card.js /config/www/
```

### 2. Link the card to your lovelace ui

#### The manual way:

Link `vertical-stack-in-card` inside your `ui-lovelace.yaml`

```yaml
resources:
  - url: /local/vertical-stack-in-card.js?v=0.4.4
    type: js
```

#### Through the GUI:

Alternatively, with Home Assistant 2021.3 or later, click this button: [![My Home Assistant](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources). 
That will bring up the GUI for Resources. Click the Plus to add a new resource. The `url` is the path to your downloaded file. Replace `<config directory>/www/` with `/local/`.  

![Add Resource](https://user-images.githubusercontent.com/557102/196027109-01b3ab95-ef61-4573-9ced-71233481eb07.png). 

Finish by clicking "Create" and refresh your browser

### 3. Use the card somehere.

Add a custom card in your `ui-lovelace.yaml`

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
