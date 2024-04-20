/** @param {NS} ns */
export async function main(ns) {
	const server = ns.args[0];
	const file = ns.ls(server, '.cct')[0];


	if (ns.codingcontract.getContractType(file, server) != "Unique Paths in a Grid I") {
		ns.exit();
	}

	const arr = ns.codingcontract.getData(file, server)

	ns.tprint(move(arr))

	// ns.tprint(ns.codingcontract.attempt(move(arr), file, server, { returnReward: true }));
}

		
export function move(arr, x = 0, y = 0) {
	var count = 0;
	if (x+1==arr[0] && y+1==arr[1]){
		return 1;
	}
	if (x+1<arr[0]){
		count += move(arr, x+1, y);
	}
	if (y+1<arr[1]){
		count += move(arr, x, y+1);
	}
	return count;
}