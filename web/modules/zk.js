const crypto = window.crypto;
const zk_protocol = snarkjs.groth16;

function generateSalt() {
    // Really, k should be a random field element. But a 32-bit salt is sufficient.
    return crypto.getRandomValues(new Uint32Array(1))[0];
}
async function proveValidBoard(board) {
    const salt = generateSalt();
    const input = { board, salt };
    
    const { proof, publicSignals } = await zk_protocol.fullProve(input, 'assets/boardID.wasm', 'assets/boardID.zkey');

    return { salt, boardID: publicSignals[0], boardIDProof: proof };
}

async function verifyValidBoard(boardID, proof) {
    const vkey = await fetch("assets/boardID_verification.json").then( function(res) {
        return res.json();
    });

    const res = await zk_protocol.verify(vkey, [boardID], proof); // True or false
    return res
}





async function proveHitShip(board, salt, boardID, attack_i, attack_j) {
    const input = { board, salt, boardID, attack_i, attack_j };

    const { proof, publicSignals } = await zk_protocol.fullProve(input, 'assets/hitShip.wasm', 'assets/hitShip.zkey');
    return { hitShip: publicSignals[0], hitShipProof: proof } // publicSignals[0] is '1'==true or '0'==false
}

async function verifyHitShip(boardID, attack_i, attack_j, hitShip, proof) {
    const vkey = await fetch("assets/hitShip_verification.json").then( function(res) {
        return res.json();
    });

    const res = await zk_protocol.verify(vkey, [hitShip, boardID, attack_i, attack_j], proof); // True or false
    return res
}

export { proveValidBoard, proveHitShip, verifyValidBoard, verifyHitShip };