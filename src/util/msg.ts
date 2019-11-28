export enum State {
  FAIL = -1,
  PEND = 0,
  SUCC = 1
}

export interface bus {
  state: State;
  step: number;
  max: number;
  id: number;
}

export default class msg {
  private bus: bus = { state: State.PEND, step: 0, max: 0, id: 0 };

  id = (): number => this.bus.id;
  state = (): State => this.bus.state;
  fail = () =>
    this.bus.state == State.PEND
      ? (this.bus.state = State.FAIL)
      : this.bus.state;
  succ = () =>
    this.bus.state == State.PEND
      ? (this.bus.state = State.SUCC)
      : this.bus.state;
  reset = (id: number, mx: number = 0) =>
    (this.bus = { state: State.PEND, step: 0, max: mx, id: id });
  step = () => {
    this.bus.step++;
    this.bus.step > this.bus.max ? this.fail() : null;
  };

  constructor(id: number, mx: number = 0) {
    this.bus.id = id;
    this.bus.max = mx;
  }
}
