if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

//Copied from MetaCoin
var accounts;
var account;

// Your deployed address changes every time you deploy.
var faucetAddress = "0xcc4c1f1632219686613d4ac291e0cecf5c4cdef0"; // <-- Put your own
faucetInstance = web3.eth.contract(faucetCompiled.Faucet.info.abiDefinition).at(faucetAddress);

// Query eth for balance
console.log("Contract balance: " + web3.eth.getBalance(faucetAddress));

// Query the contract directly
console.log("Faucet balance: " + faucetInstance.getBalance.call());

//Query eth for addresses
console.log("Coinbase: " + web3.eth.coinbase);
// var targetAccount = web3.eth.accounts[1];
// console.log("sendTo address: " + targetAccount);

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  //NOT THENNABLE?? 2/22/2017
  faucetInstance.getBalance.call().then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};
function topUp() {
    var txn = web3.eth.sendTransaction({ 
        from: web3.eth.coinbase, 
        to: faucetAddress,
        value: web3.toWei(1, "ether") 
    });
    console.log("topUp txn: " + txn);
}
function sendWei() {
    var targetAccount = document.getElementById("targetAccount").value;

    var txn = faucetInstance.sendWei(
        targetAccount,
        {from: web3.eth.coinbase});
    console.log("sendWei txn: " + txn);
}
//Copied from MetaCoin
window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }
    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    accounts = accs;
    account = accounts[0];
    refreshBalance();
  });
}