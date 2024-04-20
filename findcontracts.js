/** @param {NS} ns */
export async function main(ns) {
	const servers = ns.read("serverlist.txt").split(/\r?\n/);

	for (const server of servers) {
		let files = ns.ls(server, ".cct");
		for (const file of files) {
			ns.tprint(server +' ('+ ns.codingcontract.getContractType(file, server) + '): ' + file)
		}
	}
}