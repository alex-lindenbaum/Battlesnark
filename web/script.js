import { contract } from './modules/contractInterface.js';
import { proveValidBoard, proveHitShip, verifyValidBoard, verifyHitShip } from './modules/zk.js';

const board = [[1,0,0], [1,0,0], [0, 0, 1]];
const { salt, boardID, boardIDProof } = await proveValidBoard(board);
console.log('FIRST PROOF');
console.log(salt, boardID, boardIDProof);

console.log('VERIFIED?');
const res = await verifyValidBoard(boardID, boardIDProof);
console.log(res);

const attack_i = 2; const attack_j = 2; // Hit
const { hitShip, hitShipProof } = await proveHitShip(board, salt, boardID, attack_i, attack_j);
console.log('SECOND PROOF');
console.log(hitShip, hitShipProof);

console.log('SECOND VERIFICATION?');
const res2 = await verifyHitShip(boardID, attack_i, attack_j, hitShip, hitShipProof);
console.log(res2);