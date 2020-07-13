export type Exporter = (canvas: HTMLCanvasElement) => void;

export function exporter(canvas: HTMLCanvasElement) {
  const anchor = document.createElement("a")
  const dataURL = canvas.toDataURL("image/png");

  anchor.setAttribute("download", dataURL)
  anchor.setAttribute("href", dataURL)
  anchor.setAttribute("target", "_blank")

  document.body.append(anchor);

  anchor.click();
  anchor.remove();
}