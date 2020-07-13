import { EventBus } from "../../events/EventBus";
import './RangeSlider.scss'

export class RangeSlider {
  static EVENTS = {
    SLIDER_STOPPED: "SLIDER:STOPPED"
  }

  private readonly rangeSliderContainer: HTMLElement;
  private readonly parentContainer: HTMLElement;
  private readonly eventBus: EventBus;
  private readonly thumb: HTMLSpanElement;

  private top: number;
  private mouseDown: boolean;
  private container: HTMLElement;
  private color: string;
  private leftTriangle: HTMLSpanElement;
  private rightTriangle: HTMLSpanElement;

  constructor(container: HTMLElement, { parentContainer, eventBus }: { parentContainer: HTMLElement, eventBus: EventBus }) {
    this.parentContainer = parentContainer;
    this.eventBus = eventBus;
    this.container = container;
    this.rangeSliderContainer = document.createElement('div');
    this.thumb = document.createElement('span');
    this.leftTriangle = document.createElement('span')
    this.rightTriangle = document.createElement('span')
    this.top = 0;
    this.mouseDown = false;
    this.color = '';
  }

  render() {
    this.thumb.append(
      this.leftTriangle,
      this.rightTriangle
    )

    this.rangeSliderContainer.append(
      this.thumb
    )

    this.container.prepend(
      this.rangeSliderContainer
    )

    this.leftTriangle.classList.add("thumb-before");
    this.rightTriangle.classList.add("thumb-after");
    this.thumb.classList.add("range-slider__thumb");
    this.rangeSliderContainer.classList.add("range-slider")

    this.initializeEvents();
  }

  updateColor(color: string) {
    this.color = color;

    this.leftTriangle.style.borderLeftColor = this.color
    this.rightTriangle.style.borderRightColor = this.color
  }

  private initializeEvents() {
    this.rangeSliderContainer.addEventListener("mousedown", (e) => {
      this.mouseDown = true;
      this.update(e)

      return false
    })

    this.rangeSliderContainer.addEventListener("mousemove", (e) => {
      if (this.mouseDown) {
        this.update(e)
      }
    })

    this.rangeSliderContainer.addEventListener("mouseup", (e) => {
      this.mouseDown = false;

      this.eventBus.trigger(RangeSlider.EVENTS.SLIDER_STOPPED, { value: this.top })
    })
  }

  private update(e: MouseEvent) {
    const halfHeight = (this.thumb.offsetHeight / 2);
    const upperLimit = this.parentContainer.offsetTop - halfHeight;
    const lowerLimit = upperLimit + this.rangeSliderContainer.offsetHeight - halfHeight;
    const clickIsInRange = e.pageY >= upperLimit && e.pageY <= lowerLimit

    if (clickIsInRange) {
      this.top = e.pageY - upperLimit - halfHeight;
      this.thumb.style.top = `${ this.top }px`
    }
  }
}