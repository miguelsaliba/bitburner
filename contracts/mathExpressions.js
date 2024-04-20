/** @param {NS} ns */
let arr;

export async function main(ns) {
	let server = ns.args[0];
	let file = ns.ls(server, '.cct')[0];

	if (ns.codingcontract.getContractType(file, server) != "Find All Valid Math Expressions") {
		ns.exit();
	}

	arr = ns.codingcontract.getData(file, server)

	ns.tprint(move(0,0))

	ns.tprint(ns.codingcontract.attempt(move(0,0), file, server, { returnReward: true }));
}

export async function checkExpression(exp, ans) {
	
}