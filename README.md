# Vertical Stack In Card
Vertical Stack In Card allows you to group multiple cards in one card.

![example](https://user-images.githubusercontent.com/16443111/42928369-c7386c84-8b3f-11e8-8a5c-583ddac3f24d.png)

**Options**

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:vertical-stack-in-card`
| cards | list | **Required** | List of cards
| title | string | **Optional** | Card title

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
