
[![Contribute](http://bpaas.morpheuslabs.io/dashboard/assets/branding/Automation_BPaas_Ws.png)](http://bpaas.morpheuslabs.io/f?id=factorya617ioxtyp0hf4y2)

# Supply-chain-smart-contracts

## Dependencies
All Dependencies are already provided within the stack
### truffle
The DEV machine come with node.js and truffle already preconfigured. The Web3 RPC location will be picked up from the truffle.js file.

### Test using testrpc
The RPC server come already preconfigured.

### Geth
The Geth node server come already preconfigured in the stack.


##Running
The Dev Machine and RPC are running as part of the stack into our cloud environment. The Web3 RPC location will be picked up from the truffle.js file.

## Automation Steps
The process will:
 - clone this repo and checkout the branch
 - activate the Dev machine and the RPC machine
 - initialise the IDE and create the project supply-chain-smart-contracts

## Test in Testnet mode
Ensure that the VM is accessible from a private network only. To ssh into it, a jumperBox vm can be used (a vm that acts which provides public ssh but is part of the VPN).

Setup your Rinkeby Testnet by following this [article](https://gist.github.com/cryptogoth/10a98e8078cfd69f7ca892ddbdcf26bc)
NOte: ensure that you start geth by enabling `rpc` and `web3`:

```
geth ... --rpc --rpcport=8545 --rpcaddr=0.0.0.0 --rpcapi="personal,admin,eth,net,web3"
```

you can check the accessability of your `geth rpc` endpoint within your private network using the following `curl` command:
```
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":1}' http://10.0.0.4:8545
```

Before we can deploy the contract, geth needs to be fully synched with he the blockchain. We can check the progress through the console:

```
> eth.syncing
{
  currentBlock: 484548,
  highestBlock: 1140339,
  knownStates: 338331,
  pulledStates: 148121,
  startingBlock: 440322
}
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
