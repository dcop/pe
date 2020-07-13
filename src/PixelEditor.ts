import { Downloader } from "./components/download/Downloader";
import { CellsNumberChooser } from "./components/grid/CellsNumberChooser";
import { Grid } from "./components/grid/Grid";
import { ColorIndicator } from "./components/indicator/ColorIndicator";
import { RangeSlider } from "./components/slider/RangeSlider";
import { SliderScale } from "./components/slider/SliderScale";
import { EventBus } from "./events/EventBus";
import { Exporter } from "./export/Exporter";

interface PixelEditorConstructorParams {
  initialCellNumber: number
  eventBus: EventBus
  exporter: Exporter
}

export class PixelEditor {
  private readonly cellsNumberChooser: CellsNumberChooser;
  private readonly sliderScale: SliderScale;
  private readonly colorIndicator: ColorIndicator;
  private readonly initialCellNumber: number;
  private readonly eventBus: EventBus;
  private readonly exporter: Exporter;
  private readonly downloadButton: Downloader;
  private readonly grid: Grid;

  constructor(params: PixelEditorConstructorParams) {
    this.initialCellNumber = params.initialCellNumber;
    this.eventBus = params.eventBus;
    this.exporter = params.exporter;
    this.cellsNumberChooser = new CellsNumberChooser(
      this.elementById('cell-x-cell'), {
        value: this.initialCellNumber,
        eventBus: this.eventBus
      });
    this.grid = new Grid(
      this.elementById("grid"),
      { numberOfCell: this.initialCellNumber, eventBus: this.eventBus }
    )
    this.sliderScale = new SliderScale(this.elementById("slider"), { eventBus: this.eventBus })
    this.colorIndicator = new ColorIndicator(this.elementById("hex-color"), { eventBus: this.eventBus })
    this.downloadButton = new Downloader(this.elementById('download'), { eventBus: this.eventBus });
  }

  start() {
    this.sliderScale.render()
    this.cellsNumberChooser.render()
    this.grid.render()
    this.colorIndicator.render()
    this.downloadButton.render()

    this.initializeEvents();
  }

  private initializeEvents() {
    this.eventBus.on(CellsNumberChooser.EVENTS.CELLS_UPDATED, ({ value }) => {
      this.grid.updateNumberOfCell(value);
    });

    this.eventBus.on(SliderScale.EVENTS.COLOR_UPDATED, ({ color, data }) => {
      this.grid.updateColor(color);
      this.colorIndicator.updateIndicator(data)
    });

    this.eventBus.on(Downloader.EVENTS.DOWNLOAD, () => {
      this.exporter(this.grid.export());
    })

    this.eventBus.trigger(RangeSlider.EVENTS.SLIDER_STOPPED, { value: 0 });
  }

  private elementById(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement
  }

}