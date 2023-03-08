import { ABI } from './abi'
const contract = "0xE2a66563b155E2758fa9C0fE52cd63922383259B"

const connex = new Connex({
  node: 'https://vethor-node-test.vechaindev.com',
  network: 'test'
})


var userlogin = false
var loginbtn = document.querySelector('#login-btn')

loginbtn.onclick = async () => {
  const message = {
    purpose: "identification",
    payload: {
      type: "text",
      content: "Sign this a certificate to prove your identity",
    },
  }
  const certResponse = await connex.vendor.sign("cert", message).request()
  console.log(certResponse)
  if (certResponse) {
    userlogin = true
    const useraddress = certResponse.annex.signer
    document.querySelector('#login-body').className = 'hidden'
    document.querySelector('#dapp-body').classList.remove('hidden')
    document.querySelector('#user-address').innerHTML = useraddress
  } else {
    alert("Wallet not found")
  }

}

var storebtn = document.querySelector('#store-btn')

storebtn.onclick = async () => {

  if (userlogin) {

    const number = document.querySelector('#store-input').value
    const abiStore = ABI.find(({ name }) => name === "store");

    if (number.length > 0) {

      const clause = connex.thor
        .account(contract)
        .method(abiStore)
        .asClause(number);

      const result = await connex.vendor
        .sign("tx", [clause])
        .comment('calling the store function')
        .request();

      alert("transaction done!", result.txid)

    } else {
      alert("please add number to the input")
    }

  } else {
    alert("Please sign in first!")
  }

}

var readbtn = document.querySelector('#read-btn')

readbtn.onclick = async () => {

  const contractnumber = document.querySelector('#contract-number')
  const abiRetrieve = ABI.find(({ name }) => name === "read");

  contractnumber.innerHTML = "loading"

  const result = await connex.thor
    .account(contract)
    .method(abiRetrieve)
    .call();

    if(result){
      contractnumber.innerHTML = result.decoded[0]
    } else {
      contractnumber.innerHTML = "failed to fetch"
    }

}

