# Vertical Stack In Card
Vertical Stack In Card allows you to group multiple cards in one card.

#### Please ⭐️ this repo if you find it useful

![example](https://user-images.githubusercontent.com/16443111/42928369-c7386c84-8b3f-11e8-8a5c-583ddac3f24d.png)

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:vertical-stack-in-card`
| cards | list | **Required** | List of cards
| title | string | **Optional** | Card title

## Installation

1. Install the `vertical-stack-in-card` card by copying `vertical-stack-in-card.js` to `<config directory>/www/vertical-stack-in-card.js`

Bash:
```bash
wget https://raw.githubusercontent.com/custom-cards/vertical-stack-in-card/master/vertical-stack-in-card.js
mv vertical-stack-in-card.js /config/www/
```

2. Link `vertical-stack-in-card` inside your `ui-lovelace.yaml` 

```yaml
resources:
  - url: /local/vertical-stack-in-card.js?v=0.1.3
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
