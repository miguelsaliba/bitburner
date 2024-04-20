/** @param {NS} ns */
export async function main(ns) {
	let server = ns.args[0];
	let file = ns.ls(server, '.cct')[0];


	if (ns.codingcontract.getContractType(file, server) != "Array Jumping Game II") {
		ns.exit();
	}

	const arr = ns.codingcontract.getData(file, server)

	ns.tprint(checkJump(arr))

	ns.tprint(ns.codingcontract.attempt(checkJump(arr), file, server, { returnReward: true }));
}

export function checkJump(arr, index = 0, n = 0) {
	if (index == arr.length-1) return n;
	if (arr[index] == 0) return 0;
	var min = 0;
	for (var i = arr[index]; i > 0; i--) {
		if (index+i >= arr.length) continue;
		let val = checkJump(arr, index+i, n+1);
		if ((min == 0 || val < min) && val != 0) {
			min = val;
		}
	}
	return min;
}