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

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:vertical-stack-in-card`
| cards | list | **Required** | List of cards
| title | string | **Optional** | Card title
| horizontal | boolean | **Optional** | Default: ``false``

## Installation

1. Install the `vertical-stack-in-card` card by copying `vertical-stack-in-card.js` to `<config directory>/www/vertical-stack-in-card.js`

Bash:
```bash
wget https://raw.githubusercontent.com/ofekashery/vertical-stack-in-card/master/vertical-stack-in-card.js
mv vertical-stack-in-card.js /config/www/
```

2. Link `vertical-stack-in-card` inside your `ui-lovelace.yaml` 

```yaml
resources:
  - url: /local/vertical-stack-in-card.js?v=0.3.2
    type: js
```

3. Add a custom card in your `ui-lovelace.yaml`

**Example**

```yaml
- type: custom:vertical-stack-in-card
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
