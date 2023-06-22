// From ethers.js documentation: https://docs.ethers.org/v5/getting-started/#getting-started--contracts
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ABI = [
    {
      "inputs": [],
      "name": "getP1LastProof",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getP2LastProof",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "y",
          "type": "uint256"
        }
      ],
      "name": "playerOneAttack",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "wasHit",
          "type": "bool"
        }
      ],
      "name": "playerOneConfirmProof",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "y",
          "type": "uint256"
        }
      ],
      "name": "playerTwoAttack",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "wasHit",
          "type": "bool"
        }
      ],
      "name": "playerTwoConfirmProof",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_p1Address",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_boardID",
          "type": "string"
        }
      ],
      "name": "setPlayerOne",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_p2Address",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "_boardID",
          "type": "string"
        }
      ],
      "name": "setPlayerTwo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

// TODO: remove provider, signer?
export { provider, signer, contract };