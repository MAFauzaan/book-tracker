const contractName = 'dev-1636958826339-21082977543223';

function getConfig (env){
    switch (env) {
        case 'testnet':
            console.log('done')
            return {
                networkId: "testnet",
                contractName: contractName,
                nodeUrl: "https://rpc.testnet.near.org",
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
            }
    
        default:
            throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);    }
}

module.exports = getConfig;
