![Contribute](http://bpaas.morpheuslabs.io/dashboard/assets/branding/Automation_BPaas_Ws.png)

## Sample Truffle + Webpack Demo App

![MetaCoin Example](https://github.com/ConsenSys/truffle-webpack-demo/blob/master/docs/images/metacoin.jpg?raw=true)

This is a simple Dapp boilerplate utilising Truffle and Webpack. Fire up the app, then try changing the value of the default balance in `contracts/MetaCoin.sol` from `10000` to `50000`and see the contract be recompiled, hot reloaded and the value updated.

### Coding Style
This repo uses JS Standard.

### Running
The Dev Machine and RPC are running as part of the stack into our cloud environment.
The Web3 RPC location will be picked up from the `truffle.js` file.

### Automation Steps
The process will:
 - clone this repo and checkout the branch
 - activate the Dev machine and the RPC machine
 - initialise the IDE and create the project truffle-webpack-demo
