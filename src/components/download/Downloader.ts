import { EventBus } from "../../events/EventBus";
import './Downloader.scss'

export class Downloader {

  static EVENTS = {
    DOWNLOAD: "DOWNLOAD"
  }

  private readonly eventBus: EventBus;
  private readonly externalContainer: HTMLElement;
  private readonly downloadButton: HTMLSpanElement;
  private readonly downloadButtonContainer: HTMLDivElement;

  constructor(element: HTMLElement, { eventBus }: { eventBus: EventBus }) {
    this.eventBus = eventBus;
    this.externalContainer = element
    this.downloadButtonContainer = document.createElement("div");
    this.downloadButton = document.createElement("span");
  }

  render() {
    this.externalContainer.innerHTML = "";

    this.downloadButtonContainer.append(
      this.downloadButton
    )

    this.externalContainer.append(
      this.downloadButtonContainer
    )

    this.initContainer();
    this.initDownloader();
    this.initializeEvents();
  }

  private initializeEvents() {
    this.downloadButton.addEventListener("click", () => {
      this.onClick();
    })
  }

  private onClick() {
    this.eventBus.trigger(Downloader.EVENTS.DOWNLOAD, {});
  }

  private initDownloader() {
    this.downloadButton.classList.add("download-btn")
    this.downloadButton.innerText = "Download"
  }

  private initContainer() {
    this.downloadButtonContainer.classList.add("download-btn-container")
  }
}