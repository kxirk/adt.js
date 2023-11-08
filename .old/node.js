const Node = class {
  /** @type {*} */
  #data;
  /** @type {Node} */
  #next;

  /**
   * @param {*} data
   * @param {Node} [next]
   */
  constructor (data, next = null) {
    this.data = data;
    this.next = next;
  }


  /** @type {*} */
  get data () { return this.#data; }
  set data (data) { this.#data = data; }

  /** @type {Node} */
  get next () { return this.#next; }
  set next (node) { this.#next = node; }
};


export default Node;
