# Vertical Stack In Card

![Version](https://img.shields.io/github/v/release/ofekashery/vertical-stack-in-card)
![Downloads](https://img.shields.io/github/downloads/ofekashery/vertical-stack-in-card/total)
![Stars](https://img.shields.io/github/stars/ofekashery/vertical-stack-in-card)
![HACS](https://img.shields.io/badge/HACS-Default-41BDF5.svg)

**Vertical Stack In Card** is a custom Lovelace card for Home Assistant, allowing you to group multiple cards into a single sleek card. It offers a clean, organized way to display multiple cards in your Home Assistant dashboard.

![Showcase Card](https://user-images.githubusercontent.com/16443111/220773923-c28009d6-edfc-4ffd-9290-3e0c6e1acf73.png)

## Configuration Options

| Name         | Type    | Default | Description                                       |
| ------------ | ------- | ------- | ------------------------------------------------- |
| `type`       | string  | N/A     | Must be `custom:vertical-stack-in-card`.          |
| `cards`      | list    | N/A     | List of cards to include.                         |
| `title`      | string  | None    | Optional. Title displayed at the top of the card. |
| `horizontal` | boolean | false   | Optional. Whatever stack cards horizontally.      |
| `styles`     | object  | None    | Optional. Add custom CSS for advanced styling.    |

## Installation

### Via HACS (Home Assistant Community Store)

1. Open HACS in Home Assistant.
2. Search for "Vertical Stack In Card."
3. Install and follow the setup instructions.

### Manual Installation

Download the [`vertical-stack-in-card.js`](https://raw.githubusercontent.com/ofekashery/vertical-stack-in-card/master/vertical-stack-in-card.js) into your `<config directory>/www` directory.

```bash
wget https://raw.githubusercontent.com/ofekashery/vertical-stack-in-card/master/vertical-stack-in-card.js
mv vertical-stack-in-card.js /config/www/
```

#### Add resource reference

If you configure Lovelace via YAML, add a reference to `vertical-stack-in-card.js` inside your `configuration.yaml`:

```yaml
resources:
  - url: /local/vertical-stack-in-card.js?v=1.0.0
    type: js
```

Alternatively, if you prefer the graphical editor, use the menu to add the resource.

1. Make sure, **advanced mode** is enabled in your user profile (click on your user name to get there).

2. Navigate to the **Configuration** -> **Lovelace Dashboards** -> **Resources**.

3. Click on **Add resource**, and fill out the form as follows:

   - **Url:** `/local/vertical-stack-in-card.js?v=1.0.0`
   - **Resource type:** `JavaScript Module`

4. Finish by clicking **Create** and refresh your browser.

## Usage

Add the card to your Lovelace UI configuration:

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
      - switch.livingroom_ac
      - light.ambient_lights
```

## Acknowledgements

Thanks to [@ciotlosm](https://github.com/ciotlosm) and [@thomasloven](https://github.com/thomasloven) for their inspiration and contributions in building the foundation of this project.
