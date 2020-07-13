import './index.scss';
import { EventBus } from "./src/events/EventBus";
import { exporter } from "./src/export/Exporter";
import { PixelEditor } from "./src/PixelEditor";

const app = new PixelEditor({
  eventBus: new EventBus(),
  initialCellNumber: 16,
  exporter,
})

app.start()