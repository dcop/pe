import { EventBus } from "../../events/EventBus";
import './Grid.scss'

export class Grid {
  private readonly grid: HTMLCanvasElement;
  private readonly container: HTMLElement;
  private readonly eventBus: EventBus;
  private readonly gridLinesColor: string | CanvasGradient | CanvasPattern;
  private readonly backgroundColor: string | CanvasGradient | CanvasPattern;

  private squareWidth: number;
  private squareColor: string;

  constructor(element: HTMLElement, { numberOfCell, eventBus }: { numberOfCell: number; eventBus: EventBus }) {
    this.squareColor = 'black'
    this.gridLinesColor = 'lightgray'
    this.backgroundColor = 'white'
    this.grid = document.createElement('canvas');
    this.container = element;
    this.eventBus = eventBus;

    this.grid.width = this.grid.height = 500;
    this.squareWidth = this.grid.width / numberOfCell
  }

  render() {
    this.container.innerHTML = "";

    this.container.append(
      this.grid
    );

    this.initGrid();
    this.initializeEvents();
  }

  export() {
    return this.grid;
  }

  updateColor(color: string) {
    this.squareColor = color;
  }

  updateNumberOfCell(n: number) {
    this.squareWidth = this.grid.width / n;

    this.initGrid()
  }

  private initGrid() {
    this.resetGrid()
    this.drawGrid();
  }

  private initializeEvents() {
    this.grid.addEventListener('click', (e) => this.fillSquare(e));
  }

  private ctx(): CanvasRenderingContext2D {
    return this.grid.getContext('2d') as CanvasRenderingContext2D;
  }

  private drawGrid() {
    const ctx = this.ctx();

    ctx.beginPath();
    ctx.strokeStyle = this.gridLinesColor;

    this.drawVerticalGridLines();
    this.drawHorizontalGridLines();

    ctx.stroke();
  }

  private drawHorizontalGridLines() {
    const ctx = this.ctx();
    let y = 0;

    while (y <= this.grid.height) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.grid.width, y);
      y += this.squareWidth;
    }
  }

  private drawVerticalGridLines() {
    const ctx = this.ctx();
    let x = 0;

    while (x <= this.grid.width) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.grid.height);
      x += this.squareWidth;
    }
  }

  private mousePosition(event: MouseEvent) {
    const rect = this.grid.getBoundingClientRect();

    return {
      x: (Math.round((event.clientX - rect.left - (this.squareWidth / 2)) / this.squareWidth) * this.squareWidth),
      y: (Math.round((event.clientY - rect.top - (this.squareWidth / 2)) / this.squareWidth) * this.squareWidth)
    };
  }

  private resetGrid() {
    const ctx = this.ctx();

    ctx.clearRect(0, 0, this.grid.width, this.grid.height)
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(0, 0, this.grid.width, this.grid.height);
  }

  private fillSquare(event: MouseEvent) {
    const mousePosition = this.mousePosition(event);
    const ctx = this.ctx()

    ctx.fillStyle = this.squareColor;
    ctx.fillRect(mousePosition.x, mousePosition.y, this.squareWidth, this.squareWidth);
  }
}