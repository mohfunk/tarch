enum State {
  FAIL = -1,
  PEND = 0,
  SUCC = 1
}

interface bus {
  state: State;
  step: number;
  max: number;
  id: number;
}
/**
 * @export
 * @class msg
 */
export default class msg {
  private bus: bus = { state: State.PEND, step: 0, max: 0, id: 0 };
  /**
   * current ID
   * @memberof msg
   */
  id = (): number => this.bus.id;
  /**
   * current state
   * @memberof msg
   */
  state = (): State => this.bus.state;
  /**
   * failed
   * @memberof msg
   */
  fail = () =>
    this.bus.state == State.PEND
      ? (this.bus.state = State.FAIL)
      : this.bus.state;
  /**
   * success
   * @memberof msg
   */
  succ = () =>
    this.bus.state == State.PEND
      ? (this.bus.state = State.SUCC)
      : this.bus.state;
  /**
   * Reset msg bus
   * @param {number} id - new id
   * @param {number} [mx=0] - maximum number of retires
   * @memberof msg
   */
  reset = (id: number, mx: number = 0) =>
    (this.bus = { state: State.PEND, step: 0, max: mx, id: id });
  /**
   * update retry count
   * @memberof msg
   */
  step = () => {
    this.bus.step++;
    this.bus.step > this.bus.max ? this.fail() : null;
  };
  /**
   * Retries
   * @memberof msg
   */
  count = () => this.bus.step;
  /**
   * Creates an instance of msg.
   * @param {number} id
   * @param {number} [mx=0]
   * @memberof msg
   */
  constructor(id: number, mx: number = 0) {
    this.bus.id = id;
    this.bus.max = mx;
  }
}
