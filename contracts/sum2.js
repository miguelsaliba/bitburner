/** @param {NS} ns */
export async function main(ns) {
	let server = ns.args[0];
	let file = ns.ls(server, '.cct')[0];


	if (ns.codingcontract.getContractType(file, server) != "Total Ways to Sum II") {
		ns.exit();
	}

	var [value, arr] = ns.codingcontract.getData(file, server);

	ns.tprint(value + ' ' + arr);
	ns.tprint(await sum(ns, value, arr, 0))

	//ns.tprint(ns.codingcontract.attempt(sum(value, arr, 0), file, server, { returnReward: true }));
}

export async function sum(ns, value, arr, total) {
	await ns.sleep(20);
	if (total > value) return 0;
	if (total == value) return 1;

	var count = 0;
	for (var i = 0; i < arr.length; i++) {
		count += await sum(ns, value, arr, total + arr[i]);
	}
	return count;
}