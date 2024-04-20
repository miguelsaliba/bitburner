/** @param {NS} ns */
export async function main(ns) {
	const server = ns.args[0];
	const file = ns.ls(server, '.cct')[0];

	if (ns.codingcontract.getContractType(file, server) != "HammingCodes: Integer to encoded Binary") {
		ns.exit();
	}

	var data = ns.codingcontract.getData(file, server)

	ns.tprint(encode(data))

	// ns.tprint(ns.codingcontract.attempt(checkBinary(str), file, server, { returnReward: true }));
}

export function encode(data) {
    const bin = data.toString(2);
}

/*
HammingCodes: Integer to encoded Binary
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following decimal Value:
4080
Convert it into a binary string and encode it as a 'Hamming-Code'. eg:
Value 8 will result into binary '1000', which will be encoded with the pattern 'pppdpddd', where p is a paritybit and d a databit,
or '10101' (Value 21) will result into (pppdpdddpd) '1001101011'.

NOTE: You need an parity Bit on Index 0 as an 'overall'-paritybit.
NOTE 2: You should watch the HammingCode-video from 3Blue1Brown, which explains the 'rule' of encoding, including the first Index parity-bit mentioned on the first note.

Now the only one rule for this encoding:
It's not allowed to add additional leading '0's to the binary value
That means, the binary value has to be encoded as it is
*/