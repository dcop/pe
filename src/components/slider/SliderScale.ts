import { EventBus } from "../../events/EventBus";
import './SliderScale.scss'
import { RangeSlider } from "./RangeSlider";

export class SliderScale {
  static EVENTS = {
    COLOR_UPDATED: "SLIDER:COLOR:UPDATED",
  }

  private readonly externalContainer: HTMLElement;
  private readonly rgbScale: HTMLCanvasElement;
  private readonly sliderScaleContainer: HTMLDivElement;
  private readonly eventBus: EventBus;
  private readonly rangeSlider: RangeSlider;

  private value: string;

  constructor(element: HTMLElement, { eventBus }: { eventBus: EventBus }) {
    this.externalContainer = element;
    this.rgbScale = document.createElement('canvas');
    this.sliderScaleContainer = document.createElement('div');
    this.rangeSlider = new RangeSlider(this.sliderScaleContainer, { eventBus, parentContainer: this.externalContainer })
    this.value = ''
    this.eventBus = eventBus;
  }

  render() {
    this.externalContainer.innerHTML = "";

    this.sliderScaleContainer.append(
      this.rgbScale,
    )

    this.externalContainer.append(
      this.sliderScaleContainer,
    )

    this.rangeSlider.render()

    this.initContainer();
    this.initRgbScale();
    this.initializeEvents();
  }

  private initRgbScale() {
    this.rgbScale.height = 500;
    this.rgbScale.width = 35;

    this.createGradient()
  }

  private initializeEvents() {
    this.eventBus.on(RangeSlider.EVENTS.SLIDER_STOPPED, ({ value }) => {
      this.onClick(value);
    })
  }

  private onClick(topValue: number) {
    const ctx = this.ctx();
    const x = this.rgbScale.width / 2;
    const y = topValue;
    const { data } = ctx.getImageData(x, y, 1, 1);
    const [ r, g, b, a ] = data;
    const color = `rgba(${ r },${ g },${ b },${ a })`;

    this.rangeSlider.updateColor(color);
    this.eventBus.trigger(SliderScale.EVENTS.COLOR_UPDATED, { color: color, data })
  }

  private createGradient() {
    const ctx = this.ctx();
    const gradient = ctx.createLinearGradient(this.rgbScale.width, 0, this.rgbScale.width, this.rgbScale.height);

    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'magenta');
    gradient.addColorStop(2 / 6, 'blue');
    gradient.addColorStop(3 / 6, 'cyan');
    gradient.addColorStop(4 / 6, 'lime');
    gradient.addColorStop(5 / 6, 'yellow');
    gradient.addColorStop(1, 'red');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.rgbScale.width, this.rgbScale.height)
  }

  private initContainer() {
    this.sliderScaleContainer.classList.add("slider-scale-container")
  }

  private ctx(): CanvasRenderingContext2D {
    return this.rgbScale.getContext('2d') as CanvasRenderingContext2D;
  }
}