contract('Faucet', function(accounts) {

  it("should display faucet balance", function() {
    var faucet = Faucet.deployed();

    return faucet.getBalance.call()
    	.then(function(balance) {
      		console.log("Faucet balance:", balance)//assert.equal(balance.valueOf(), 1000000000000000000, "1000000000000000000 wasn't in the faucet");
    });
  });
});