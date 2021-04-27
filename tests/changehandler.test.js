let { ChangeHandler } = require("../src/changehandler");

describe("Tests for ChangeHandler", function() {
  test("amountDue is set based on an argument", function(){
    const changeHandler = new ChangeHandler(10);
    expect(changeHandler.amountDue).toEqual(10) 
  })

  test("cashTendered is set to zero", function(){
    const changeHandler = new ChangeHandler();
    expect(changeHandler.cashTendered).toEqual(0)
  })
  
  test("inserting a quarter adds 25", function(){
    const changeHandler = new ChangeHandler();
    //this is like the battle game
    //arrange=change handler
    //act insert coin
    //assert change handler equals 0 +25
    changeHandler.insertCoin('quarter');
    expect(changeHandler.cashTendered).toEqual(25)
  })

  test("inserting a dime adds 10", function(){
    const changeHandler = new ChangeHandler();
    changeHandler.insertCoin('dime');
    expect(changeHandler.cashTendered).toEqual(10);
  })

  test("inserting a nickel adds 5", function(){
    const changeHandler = new ChangeHandler();
    changeHandler.insertCoin('nickel');
    expect(changeHandler.cashTendered).toEqual(5)
  })

  test("inserting a penny adds 1", function(){
    const changeHandler = new ChangeHandler();
    changeHandler.insertCoin('penny');
    expect(changeHandler.cashTendered).toEqual(1)
    changeHandler.insertCoin('penny');
    expect(changeHandler.cashTendered).toEqual(2)
  })

  test("inserting multiple coins adds cumulatively", function(){
    const changeHandler = new ChangeHandler();
    changeHandler.insertCoin('penny');
    changeHandler.insertCoin('nickel');
    changeHandler.insertCoin('dime');
    changeHandler.insertCoin('quarter');
    expect(changeHandler.cashTendered).toEqual(41)
  })

  test("Returns true if cashTendered more than amountDue", function(){
    const changeHandler = new ChangeHandler(45);
    changeHandler.cashTendered= 100;
    expect(changeHandler.cashTendered>changeHandler.amountDue).toBe(true);
  })

  test("Returns false if cashTendered less than amountDue", function(){
    const changeHandler = new ChangeHandler(36);
    changeHandler.cashTendered= 25;
    expect(changeHandler.cashTendered>changeHandler.amountDue).toBe(false);
  })

  test("Returns true if cashTendered equal to amountDue", function(){
    const changeHandler = new ChangeHandler(100);
    changeHandler.cashTendered= 100;
    expect(changeHandler.cashTendered===changeHandler.amountDue).toBe(true);
  })

   test("32 change produces: quarters: 1, dimes: 0, nickels: 1, pennies: 2.", function(){
     const changeHandler = new ChangeHandler(90);
     changeHandler.cashTendered=122;
     expect(changeHandler.giveChange(32)).toEqual({quarters: 1, dimes: 0, nickels: 1, pennies: 2})
   })
 
  test("10 change produces: quarters: 0, dimes: 1, nickels: 0, pennies: 0.", function(){
     const changeHandler = new ChangeHandler(90);
     changeHandler.cashTendered=100;
     expect(changeHandler.giveChange(10)).toEqual({quarters: 0, dimes: 1, nickels: 0, pennies: 0})
   })

  test("27 change produces: quarters: 1, dimes: 0, nickels: 0, pennies: 2.", function(){
    const changeHandler = new ChangeHandler(90);
    changeHandler.cashTendered=117;
    expect(changeHandler.giveChange(27)).toEqual({quarters: 1, dimes: 0, nickels: 0, pennies: 2})
  })

  test("68 change produces: quarters: 2, dimes: 1, nickels: 1, pennies: 3.", function(){
    const changeHandler = new ChangeHandler(90);
    changeHandler.cashTendered=158;
    expect(changeHandler.giveChange(68)).toEqual({quarters: 2, dimes: 1, nickels: 1, pennies: 3})
  })
  
});
