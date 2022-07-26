class Text {
  constructor(text) {
    this.string = text;
  }

  toString() {
    return this.string;
  }
}

class Shout {
  constructor(text) {
    this.text = text;
  }
  toString() {
    //return this.text.toString().toUpperCase();
    return this.text.toString.apply(this.text).toUpperCase();
  }
}

console.log(new Text("Hello, I'm talking").toString());

console.log(new Shout(new Text("Hello, I'm shouting!")).toString());
