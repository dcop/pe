export type Callback = (payload?: any) => void

export class EventBus {
  private readonly events: {[key: string]: Callback[]}

  constructor() {
    this.events = {}
  }

  trigger<T>(eventName: string, payload: T): void {
    if (!this.events[eventName]) return;

    this.events[eventName].forEach(callback => callback(payload))
  }

  on(eventName: string, callback: Callback): void {
    this.events[eventName] = (this.events[eventName] || [])

    this.events[eventName].push(callback);
  }
}