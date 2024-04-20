/** @param {NS} ns */
export async function main(ns) {
	const server = ns.args[0];
	const file = ns.ls(server, '.cct')[0];

	if (ns.codingcontract.getContractType(file, server) != "HammingCodes: Encoded Binary to Integer") {
		ns.exit();
	}

	var str = ns.codingcontract.getData(file, server)

	ns.tprint(checkBinary(ns, str))

	// ns.tprint(ns.codingcontract.attempt(checkBinary(str), file, server, { returnReward: true }));
}

export function checkBinary(ns, str) {
	var xortotal = 0;
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == '1') xortotal ^= i;
	}
	ns.tprint(xortotal);
	ns.tprint(str);
	ns.tprint(str.slice(0, xortotal) + (str.charAt(xortotal) == '1' ? '0' : '1') +str.slice(xortotal+1));
	return str.slice(0, xortotal) + (str.charAt(xortotal) == '1' ? '0' : '1') +str.slice(xortotal+1);
}