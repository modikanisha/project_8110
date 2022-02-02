const Order = require("./assignment1Order");

const OrderState = Object.freeze({
  WELCOMING: Symbol("welcoming"),
  SIZE: Symbol("size"),
  TYPES: Symbol("types"),
  FRIES: Symbol("fries"),
  DRINKS: Symbol("drinks"),
});

module.exports = class ShwarmaOrder extends Order {
  constructor() {
    super();
    this.stateCur = OrderState.WELCOMING;
    this.sSize = "";
    this.sTypes = "";
    this.sFries = "";
    this.sDrinks = "";
    this.sItem = "Burger";
  }
  estimatedvalue() {
    var value = 0;
    var tax = 1.3;
    if (this.sItem) {
      if (this.sSize && this.sSize.toLowerCase() == "large") {
        value = 3;
      } else {
        value = 2;
      }
      value = value + 4;
    }
    if (this.sFries) {
      value = value + 4;
    }
    if (this.sDrinks) {
      value = value + 4;
    }
    value = value * tax;
    return value;
  }
  handleInput(sInput) {
    let aReturn = [];
    switch (this.stateCur) {
      case OrderState.WELCOMING:
        this.stateCur = OrderState.SIZE;
        aReturn.push("Welcome to Kanisha's Italiano.");
        aReturn.push("What size of Burger would you like?");
        break;
      case OrderState.SIZE:
        this.stateCur = OrderState.TYPES;
        this.sSize = sInput;
        aReturn.push("What type of bun would you like - White ot Whole Wheat?");
        break;
      case OrderState.TYPES:
        this.stateCur = OrderState.FRIES;
        this.sTypes = sInput;
        aReturn.push(
          "Would you like to have our special Cheese periperi fries with that?"
        );
        break;
      case OrderState.FRIES:
        this.stateCur = OrderState.DRINKS;
        this.sFries = sInput;
        if (sInput.toLowerCase() != "no") {
          this.sFries = sInput;
        }
        aReturn.push("Would you like lemon juice with that?");
        break;
      case OrderState.DRINKS:
        this.isDone(true);
        if (sInput.toLowerCase() != "no") {
          this.sDrinks = sInput;
        }
        aReturn.push("Thank you for your purchase. Your order is");
        aReturn.push(`${this.sSize} ${this.sItem} on ${this.sTypes} bun`);
        if (this.sFries) {
          aReturn.push(`with ${this.sFries} cheese periperi`);
        }
        if (this.sDrinks) {
          aReturn.push(`with ${this.sDrinks} lemon drink`);
        }
        let d = new Date();
        d.setMinutes(d.getMinutes() + 20);
        aReturn.push(`Total Amount is $ ${this.estimatedvalue().toFixed(3)}`);
        aReturn.push(`Your order will be ready at ${d.toTimeString()}`);
        break;
    }
    return aReturn;
  }
};
