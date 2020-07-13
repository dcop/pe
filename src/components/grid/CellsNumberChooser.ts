import { EventBus } from "../../events/EventBus";

import "./CellsNumberChooser.scss"

export class CellsNumberChooser {
  static EVENTS = {
    CELLS_UPDATED: "CELLS:UPDATED",
  };

  private readonly eventBus: EventBus;
  private readonly rightInput: HTMLInputElement;
  private readonly leftInput: HTMLInputElement;
  private readonly externalContainer: HTMLElement;
  private readonly container: HTMLDivElement;
  private readonly separator: HTMLSpanElement;

  private value: number;

  constructor(element: HTMLElement, { value, eventBus }: { value: number, eventBus: EventBus }) {
    this.eventBus = eventBus;
    this.externalContainer = element;
    this.value = value;
    this.rightInput = document.createElement('input');
    this.leftInput = document.createElement('input');
    this.container = document.createElement("div");
    this.separator = document.createElement('span')

    this.initInputs();
  }

  render() {
    this.externalContainer.innerHTML = "";

    this.container.append(
      this.leftInput,
      this.separator,
      this.rightInput
    )

    this.externalContainer.append(
      this.container
    );

    this.initContainer();
    this.initializeEvents();
  }

  private initInputs() {
    const forInput = (input: HTMLInputElement) => {
      input.setAttribute("type", "number")
      input.classList.add("cell-number-chooser__cell-number")
      input.value = String(this.value)
    }

    this.separator.innerText = 'x'
    this.separator.classList.add("cell-number-chooser__separator")

    forInput(this.leftInput);
    forInput(this.rightInput)
  }

  private initializeEvents() {
    this.leftInput.addEventListener('change', (e) => this.onChange(e))
    this.rightInput.addEventListener('change', (e) => this.onChange(e))
  }

  private onChange(e: Event) {
    const value = (e.target as HTMLInputElement).value;

    this.value = Number(value);
    this.leftInput.value = value;
    this.rightInput.value = value;

    this.eventBus.trigger(CellsNumberChooser.EVENTS.CELLS_UPDATED, { value: this.value })
  }

  private initContainer() {
    this.container.classList.add("cell-number-chooser")
  }
}