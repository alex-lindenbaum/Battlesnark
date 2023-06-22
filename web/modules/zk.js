// Code mostly due to snark.js documentation: https://github.com/iden3/snarkjs

// async function calculateProof() {

//     const { proof, publicSignals } =
//       await snarkjs.groth16.fullProve( { a: 3, b: 11}, "circuit.wasm", "circuit_final.zkey");

//     proofComponent.innerHTML = JSON.stringify(proof, null, 1);


//     const vkey = await fetch("verification_key.json").then( function(res) {
//         return res.json();
//     });

//     const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);

//     resultComponent.innerHTML = res;
// }

const prover = snarkjs.groth16;

async function proveValidBoard() {

}

async function verifyValidBoard() {

}

async function proveHitShip() {

}

async function verifyHitShip() {
    
}