// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Battlesnark {
    address constant NULL_ADDRESS = 0x0000000000000000000000000000000000000000;
    uint constant n = 10; // size, n x n board
    uint constant numShips = 5; // number of ships on each player's board

    address p1Address; 
    address p2Address;

    string p1BoardID; // Hashes
    string p2BoardID;
    string p1LastProof; // zkSNARK proofs
    string p2LastProof;

    uint8 p1Damage; // Number of times p1 (p2) hit
    uint8 p2Damage;

    bool isP1Turn = true; // This will be true until player 2 sends a proof of hit or not hit
    bool gameOver = false;
    
    // Sometimes, we don't want players to proceed until they verify if they've been hit or not
    bool p1Locked = false;
    bool p2Locked = false;

    struct Coord {
        uint x;
        uint y;
    }

    Coord[] p1Attacks;
    Coord[] p2Attacks;

    function setPlayerOne(address _p1Address, string memory _boardID) public {
        p1Address = _p1Address;
        p1BoardID = _boardID;
        p1LastProof = _boardID;
        p1Locked = true;
    }

    function setPlayerTwo(address _p2Address, string memory _boardID) public {
        p2Address = _p2Address;
        p2BoardID = _boardID;
        p2LastProof = _boardID;
        p2Locked = false; // Stays false until Player 2's turn.
    }

    function playerOneAttack(uint x, uint y) public returns (string memory) {
        if (gameOver) return "Game over.";

        if (p1Locked) {
            return "It is not player 1's turn.";
        } else if (x < 0 || x > 9 || y < 0 || y > 9) {
            return "Coordinates out of range. Please try again.";
        }

        for (uint i = 0; i < p1Attacks.length; i++) {
            Coord memory c = p1Attacks[i];
            if (c.x == x && c.y == y) {     // This check ensures that damage = number of distinct coords hit
                return "You already fired at these coordinates. Try another set of coordinates.";
            }
        }
        
        p1Attacks.push(Coord(x, y));
        p1Locked = true;
        return "Missle launched... Please wait for player 2's response.";
    }

    function playerTwoAttack(uint x, uint y) public returns (string memory) {
        if (gameOver) return "Game over.";

        if (p2Locked) {
            return "It is not player 2's turn.";
        } else if (x < 0 || x > 9 || y < 0 || y > 9) {
            return "Coordinates out of range. Please try again.";
        }

        for (uint i = 0; i < p2Attacks.length; i++) {
            Coord memory c = p2Attacks[i];
            if (c.x == x && c.y == y) {     // This check ensures that damage = number of distinct coords hit
                return "You already fired at these coordinates. Try another set of coordinates.";
            }
        }

        p2Attacks.push(Coord(x, y));
        p2Locked = true;
        return "Missle launched... Please wait for player 1's response.";
    }

    function playerOneConfirmProof(bool wasHit) public returns (string memory) {
        if (gameOver) return "Game over.";

        // TODO: authentication

        if (wasHit) { 
            p1Damage++; 
            if (p1Damage == 5) {
                return "Game over. Player 2 wins.";
            }
        }

        isP1Turn = true;
        p1Locked = false;
        return "Verified. It is player 1's turn to attack.";
    }

    function playerTwoConfirmProof(bool wasHit) public returns (string memory) {
        if (gameOver) return "Game over.";
        
        // TODO: authentication

        if (wasHit) { 
            p2Damage++; 
            if (p2Damage == 5) {
                return "Game over. Player 1 wins.";
            }
        }

        isP1Turn = false;
        p2Locked = false;
        return "Verified. It is player 2's turn to attack.";
    }

    function getP1LastProof() public view returns (string memory) {
        return p1LastProof;
    }

    function getP2LastProof() public view returns (string memory) {
        return p2LastProof;
    }
}