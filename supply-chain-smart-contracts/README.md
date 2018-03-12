
[![Contribute](http://bpaas.morpheuslabs.io/dashboard/assets/branding/Automation_BPaas_Ws.png)](http://bpaas.morpheuslabs.io/f?id=factorya617ioxtyp0hf4y2)

# Supply-chain-smart-contracts

## Automation Steps provided
The process will:
 - initialize a new workspace for blockchain development
 - a dedicated ready-to-go stack (development machine and runtimes) will be allocated
 - a clone of this repository will be created inside your workspace and checkout the branch "supply-chain"
 - activate the Dev machine, the testRPC machine and the Geth node.
 - initialize the IDE and create the project for the supply-chain-smart-contracts sample

## Workspace Stack Information and Dependencies
All Stack info and dependencies are provided for you in a ready-to-go stack as follows.

### Truffle Framework
As part of the stack, the DEV machine come with node.js and truffle already installed. The Web3 RPC location will be picked up from the truffle.js file.

### For test a dedicated TestRPC (Ganache-CLI) is already provided
The RPC server come already preconfigured in the network. It is reachable over the network with the resource name "testrpc". The Dev Machine and RPC are running as part of the stack into our cloud environment. The Web3 RPC location will be picked up from the truffle.js file (like in the following example).

```
module.exports = {
  networks: {
    development: {
      host: "tesrpc",
      port: 8545,
      network_id: "*" // Match any network id
    }
  },
  rpc: {
    gas : 4712388
  }
};
```
### Geth Node (MORPHEUSNODE)
The Geth node server come already preconfigured in the stack and is reachable over the network with the resource name "morpheusnode1".

## Test in Testnet mode

Setup your Rinkeby Testnet by following this [article](https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc)
NOte: ensure that you start geth by enabling `rpc` and `web3`:

```
geth ... --rpc --rpcport=8545 --rpcaddr=0.0.0.0 --rpcapi="personal,admin,eth,net,web3"
```

you can check the accessability of your `geth rpc` endpoint within your private network using the following `curl` command:
```
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}' http://morpheusnode1:8545
```

Before we can deploy the contract, geth needs to be fully synched with he the blockchain. We can check the progress through the console:

```
/ # geth attach

> eth.syncing
{
  currentBlock: 484548,
  highestBlock: 1140339,
  knownStates: 338331,
  pulledStates: 148121,
  startingBlock: 440322
}

>eth.blockNumber
0
```
Once we're finished with syncing `eth.blockNumber` returns a the number of the latest block. While syncing, it returns `0`

unlock your account:
```
personal.unlockAccount(web3.eth.coinbase, "password", 15000)
```
in your `truffle.js` add a property for your network:

```
  networks: {
    testnet: {
      host: "10.0.0.4",
      port: 8545,
      network_id: "4"
    }
  }
```

deploy the contract from your jumperBox:

```
truffle migrate --reset --network testnet
```

## Deploy the contract to the network

Set the hostname in `truffle.js" to your deployed geth rpc instance - e.g. 10.0.0.4

Just compile and deploy the contracts

```
truffle compile
truffle migrate --reset
```
Once the block containing the contract has been added to the chain, we can test it:
```
truffle test
```

## Use the deploy.js script
Make sure you have Node.js version 7.6.0 and above.
Run the following command to deploy the script to any RPC endpoint:

```
node deploy.js <CONTRACT_NAME> <RPC_ENDPOINT> <COINBASE_PASSWORD>
```

Example:

```
node deploy ProofOfProduceQuality http://40.68.224.232:8545 MyPassword
```

In case of an error, the process will be terminated with an error exit code and the last output line will be a json containing an `error` member with the details of the error:

```json
{"error":"the error details"}
```

In case of a successful execution, the process will be terminated with a success exit code (0) and the last output line will be a json containing the account address (the coinbase) and the deployed contract instance address:

```json
{"accountAddress":"0x6290feb5d6155bb8ca4551bae08564afb636a974","contractAddress":"0x44D89F52f93D1bF9A0F47330B5726B0d82cD8176"}
```
