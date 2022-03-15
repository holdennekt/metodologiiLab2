"use strict";

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  constructor(...initials) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.append(...initials);
  }

  length() {
    return this.size;
  }

  append(...values) {
    values.forEach((value) => {
      const newNode = new Node(value);

      if (this.size === 0) {
        this.head = newNode;
      } else {
        let node = this.tail;
        newNode.prev = node;
        node.next = newNode;
      }

      this.tail = newNode;
      this.size++;
    });
  }

  insert(value, index) {
    if (index > this.size || index < 0) {
      throw new Error(`valid indexes: 0-${this.size}, provided: ${index}`);
    }

    const newNode = new Node(value);

    if (index === 0) {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    } else if (index === this.size) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    } else {
      let node = this.head;
      for (let i = 0; i < index; i++) node = node.next;
      newNode.prev = node.prev;
      newNode.next = node;
      node.prev.next = newNode;
      node.prev = newNode;
    }

    this.size++;
  }

  delete(index) {
    const lastIndex = this.size - 1;
    if (index > lastIndex || index < 0) {
      throw new Error(`valid indexes: 0-${lastIndex}, provided: ${index}`);
    }

    const value = this.get(index);

    if (lastIndex === 0) {
      this.head = null;
      this.tail = null;
    } else if (index === 0) {
      this.head.next.prev = null;
      this.head = this.head.next;
    } else if (index === lastIndex) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else {
      let node = this.head;
      for (let i = 0; i < index; i++) node = node.next;
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    this.size--;
    return value;
  }

  deleteAll(value) {
    let node = this.tail;
    for (let i = this.size - 1; i >= 0; i--) {
      if (node.value === value) this.delete(i);
      node = node.prev;
    }
  }

  get(index) {
    const lastIndex = this.size - 1;
    if (index > lastIndex || index < 0) {
      throw new Error(`valid indexes: 0-${lastIndex}, provided: ${index}`);
    }
    let node = this.head;
    for (let i = 0; i < index; i++) node = node.next;
    return node.value;
  }

  #cloneObj(obj) {
    const clone = {};
    for (const i in obj) {
      if (typeof obj[i] === "object") {
        clone[i] = this.#cloneObj(obj[i]);
      } else clone[i] = obj[i];
    }
    return clone;
  }

  clone() {
    const cloned = new LinkedList();
    let node = this.head;
    while (node) {
      if (typeof node.value === "object") {
        cloned.append(this.#cloneObj(node.value));
      } else cloned.append(node.value);
      node = node.next;
    }
    return cloned;
  }

  reverse() {
    const reversed = new LinkedList();
    let node = this.tail;
    while (node) {
      reversed.append(node.value);
      node = node.prev;
    }
    this.head = reversed.head;
    this.tail = reversed.tail;
  }

  findFirst(value) {
    let node = this.head;
    for (let i = 0; i < this.size; i++) {
      if (node.value === value) return i;
      node = node.next;
    }
    return -1;
  }

  findLast(value) {
    let node = this.tail;
    for (let i = this.size - 1; i >= 0; i--) {
      if (node.value === value) return i;
      node = node.prev;
    }
    return -1;
  }

  clear() {
    const len = this.size;
    for (let i = 0; i < len; i++) this.delete(0);
  }

  extend(list) {
    const clone = list.clone();
    let node = clone.head;
    while (node) {
      this.append(node.value);
      node = node.next;
    }
  }

  toStr() {
    let node = this.head;
    let str = "";
    for (let i = 0; i < this.size; i++) {
      if (i === this.size - 1) str += node.value;
      else {
        str += node.value + " <-> ";
        node = node.next;
      }
    }
    return str;
  }
}

module.exports = LinkedList;
