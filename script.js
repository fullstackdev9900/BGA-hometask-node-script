


const API_URL = 'http://localhost:3001'
const RECIEPIENT_ADDRESS = '040716616d246e6a715fbc77b949bc52'
const ENDPOINTS = {
    wallet: {
        path: '/wallet', method: "GET"
    },
    balance: {
        path: (address) => `/balance?address=${address}`, method: "GET"
    },
    mine: {
        path: '/mine', method: 'POST'
    },
    transactions: {
        path: '/transactions', method: 'POST', body: {
            recipient: RECIEPIENT_ADDRESS,
            amount: 15,
        }
    },
    mempool: {
        path: '/mempool', method: "GET"
    },

    blocks: {
        path: '/blocks', method: "GET"
    }

}


async function request(method, path, body = null) {
    const url = `${API_URL}${path}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const res = await fetch(url, options);

    const text = await res.text();

    let responseBody;
    try {
        responseBody = text ? JSON.parse(text) : {};
    } catch (err) {
        responseBody = text;
    }

    return {
        status: res.status,
        body: responseBody,
    };
}



async function runDemo() {
    try {
        console.log('Step 1: Fetching Miner Wallet Address...');
        const walletRes = await request(ENDPOINTS.wallet.method, ENDPOINTS.wallet.path);
        const minerAddress = walletRes.body.address;
        console.log(`Miner Wallet Address: ${minerAddress}`);

        console.log('Step 2: Checking Initial Miner Balance...');
        const balanceRes = await request(ENDPOINTS.balance.method, ENDPOINTS.balance.path(minerAddress));
        console.log(`Initial Balance: ${balanceRes.body.balance} Coins`);

        console.log('Step 3: Mining a new block to earn Coinbase reward...');
        const mineRes = await request(ENDPOINTS.mine.method, ENDPOINTS.mine.path);
        console.log(`Mined Block Index: ${mineRes.body.index}`);
        console.log(`Block Hash: ${mineRes.body.hash}`);


        const postMineBalanceRes = await request(ENDPOINTS.balance.method, ENDPOINTS.balance.path(minerAddress));
        console.log(`Updated Miner Balance: ${postMineBalanceRes.body.balance} Coins`);


        const transferAmount = 15;
        console.log(`Step 4: Submitting a transaction to transfer ${transferAmount} Coins to recipient... -> Recipient Address: ${RECIEPIENT_ADDRESS}`);
        const txRes = await request(ENDPOINTS.transactions.method, ENDPOINTS.transactions.path, ENDPOINTS.transactions.body);
        console.log(`Transaction Created successfully! Transaction ID: ${txRes.body.id}`);

        console.log('Step 5: Verifying mempool state...');
        const mempoolRes = await request(ENDPOINTS.mempool.method, ENDPOINTS.mempool.path);
        console.log(`Number of pending transactions in mempool: ${mempoolRes.body.length}`);


        console.log('Step 6: Mining another block to confirm the transaction...');
        const mineConfirmRes = await request(ENDPOINTS.mine.method, ENDPOINTS.mine.path);
        console.log(`Mined Block Index: ${mineConfirmRes.body.index}`);
        console.log(`Block Hash: ${mineConfirmRes.body.hash}`);

        console.log('Step 7: Verifying Final Balances...');
        const finalMinerRes = await request(ENDPOINTS.balance.method, ENDPOINTS.balance.path(minerAddress));
        const finalRecipientRes = await request(ENDPOINTS.balance.method, ENDPOINTS.balance.path(RECIEPIENT_ADDRESS));
        console.log(`Final Miner Balance: ${finalMinerRes.body.balance} Coins`);
        console.log(`Final Recipient Balance: ${finalRecipientRes.body.balance} Coins`);


        console.log('Step 8: Fetching full Blockchain blocks...');
        const blocksRes = await request(ENDPOINTS.blocks.method, ENDPOINTS.blocks.path);
        console.log(`Total Mined Blocks on Node:${blocksRes.body.length}`);
        console.log(`Chain Length: ${blocksRes.body.length}`)


    } catch (error) {
        console.log('failed the demo task ', error.message)
    }
}


runDemo()

