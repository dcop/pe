import { EventBus } from "../../events/EventBus";

import "./ColorIndicator.scss"

export class ColorIndicator {
  private readonly externalContainer: HTMLElement;
  private readonly indicator: HTMLSpanElement;
  private readonly eventBus: EventBus;
  private readonly colorIndicatorContainer: HTMLDivElement;
  private readonly text: HTMLSpanElement;

  private color: string;

  constructor(element: HTMLElement, { eventBus }: { eventBus: EventBus }) {
    this.eventBus = eventBus;
    this.externalContainer = element;
    this.colorIndicatorContainer = document.createElement('div')
    this.indicator = document.createElement('span');
    this.text = document.createElement('span');
    this.color = ""
  }

  render() {
    this.externalContainer.innerHTML = "";

    this.indicator.append(
      this.text
    )

    this.colorIndicatorContainer.append(
      this.indicator
    )

    this.externalContainer.append(
      this.colorIndicatorContainer
    )

    this.initContainer();
    this.initIndicator();
  }

  updateIndicator(color: Uint8ClampedArray) {
    this.color = this.rgbaToHex(color);
    this.text.innerText = this.color;
    this.indicator.style.backgroundColor = this.color;
  }

  private initIndicator() {
    this.text.classList.add("color-indicator__text")
    this.indicator.classList.add("color-indicator");
    this.updateIndicator(new Uint8ClampedArray([ 0, 0, 0 ]))
  }

  private initContainer() {
    this.colorIndicatorContainer.classList.add("color-indicator-container")
  }

  private rgbaToHex(color: Uint8ClampedArray): string {
    const [ r, g, b ] = color;
    const toHex = (c: number) => {
      const hex = c.toString(16);

      return hex.length == 1 ? "0" + hex : hex;
    };

    return ("#" + toHex(r) + toHex(g) + toHex(b)).toUpperCase();
  }
}