const LinkedList = require("./list");

test("toStr", () => {
  const list = new LinkedList("can", "you", "feel", "my", "heart");

  expect(list.toStr()).toBe("can <-> you <-> feel <-> my <-> heart");
});

test("append", () => {
  const list = new LinkedList();

  list.append("wish");
  list.append("you");
  list.append("were", "here");

  expect(list.toStr()).toBe("wish <-> you <-> were <-> here");
});

test("length", () => {
  const list = new LinkedList();

  expect(list.length()).toBe(0);

  list.append("sugar", "honey", "ice", "&", "tea");

  expect(list.length()).toBe(5);
});

test("insert", () => {
  const list = new LinkedList("you", "gotta", "when", "i'm");

  list.insert("why", 0);
  list.insert("kick", 3);
  list.insert("me", 4);
  list.insert("down", 7);

  expect(list.toStr()).toBe(
    "why <-> you <-> gotta <-> kick <-> me <-> when <-> i'm <-> down"
  );
  expect(() => list.insert("this is odd", -2)).toThrow();
  expect(() => list.insert("this is odd", 10)).toThrow();
});

test("delete", () => {
  const list = new LinkedList("i", "don't", "know", "what", "to", "say");

  list.delete(0);
  list.delete(2);
  list.delete(1);

  expect(list.delete(1)).toBe("to");

  expect(list.toStr()).toBe("don't <-> say");

  list.delete(1);
  expect(list.toStr()).toBe("don't");

  list.delete(0);
  expect(list.toStr()).toBe("");

  expect(() => list.delete(-1)).toThrow();
  expect(() => list.delete(10)).toThrow();
});

test("deleteAll", () => {
  const list = new LinkedList("1", "x", "1");

  list.deleteAll("1x1");

  expect(list.toStr()).toBe("1 <-> x <-> 1");

  list.deleteAll("1");

  expect(list.toStr()).toBe("x");
});

test("get", () => {
  const list = new LinkedList("follow", "you");

  expect(list.get(1)).toBe("you");
  expect(() => list.get(-1)).toThrow();
  expect(() => list.get(10)).toThrow();
});

test("clone", () => {
  const list = new LinkedList("in", "the");
  const cloned = list.clone();
  cloned.append("dark");

  expect(list.toStr()).toBe("in <-> the");
  expect(cloned.toStr()).toBe("in <-> the <-> dark");
});

test("reverse", () => {
  const list = new LinkedList("bad", "habits");

  list.reverse();

  expect(list.toStr()).toBe("habits <-> bad");
});

test("findFirst", () => {
  const list = new LinkedList("d", "o", "o", "m", "e", "d");

  expect(list.findFirst("o")).toBe(1);
  expect(list.findFirst("l")).toBe(-1);
});

test("findLast", () => {
  const list = new LinkedList("a", "v", "a", "l", "a", "n", "c", "h", "e");

  expect(list.findLast("a")).toBe(4);
  expect(list.findFirst("d")).toBe(-1);
});

test("clear", () => {
  const list = new LinkedList("wonderful", "life");

  list.clear();

  expect(list.toStr()).toBe("");
});

test("extend", () => {
  const list = new LinkedList("i", "love");
  const second = new LinkedList("bring", "me", "the", "horizon");

  list.extend(second);
  second.append("very", "much");

  expect(list.toStr()).toBe("i <-> love <-> bring <-> me <-> the <-> horizon");
});
