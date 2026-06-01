## Assignment - Node.js script

This project contains a small Node.js demo script created as part of the take-home assignment.

The original repository contains several core blockchain files as stubs. As discussed, the assignment scope was narrowed to a client/demo task where the script exercises the available REST API endpoints and demonstrates the complete wallet and transaction flow.

## Completed Task

The demo script successfully performs the following flow:

1. Fetch miner wallet address
2. Check initial miner balance
3. Mine a new block to earn the Coinbase reward
4. Submit a transaction to transfer coins to a recipient wallet
5. Mine another block to confirm the transaction
6. Check updated balances

## Demo Flow

```txt
Wallet -> Transaction -> Mine Block -> Balance Check
```

```txt
.
├── script.js
└── README.md
```

## Prerequisites

Make sure you have Node.js installed on your system.

You can check it using:

```bash
node -v
```

## How to Run

First, start the backend/API server.

The API server should be running on:

```txt
http://127.0.0.1:3001
```

Then run the demo script:

```bash
node script.js
```

## Expected Output


After running the script, you should see logs similar to this:

```bash
Step 1: Fetching Miner Wallet Address...
Miner Wallet Address: f4c56e625221e2fa

Step 2: Checking Initial Miner Balance...
Initial Balance: 420 Coins

Step 3: Mining a new block to earn Coinbase reward...
Mined Block Index: 9
Block Hash: 00efea33a5fdc53575e9455ec2295690efb4336111ba98e01e6ea8953598aa02
Updated Miner Balance: 470 Coins

Step 4: Submitting a transaction to transfer 15 Coins to recipient... -> Recipient Address: 040716616d246e6a715fbc77b949bc52
Transaction Created successfully! Transaction ID: 64b8483646d9f160e14695360070f52814cf994218ed5c93a4da7837d

Step 5: Verifying mempool state...
Number of pending transactions in mempool: 1

Step 6: Mining another block to confirm the transaction...
Mined Block Index: 10
Block Hash: 00xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

Step 7: Verifying Final Balances...
Final Miner Balance: 505 Coins
Final Recipient Balance: 15 Coins

Step 8: Fetching full Blockchain blocks...
Total Mined Blocks on Node: 10
Chain Length: 10
```
