/** @param {NS} ns */
export async function main(ns) {
	let servers = ns.read("serverlist.txt").split(/\r?\n/);

	for (var i = 0; i < servers.length; i++) {
		let ports = 0;
		if (ns.fileExists("BruteSSH.exe", "home")) {ports++; ns.brutessh(servers[i]);}
		if (ns.fileExists("FTPCrack.exe", "home")) {ports++; ns.ftpcrack(servers[i]);}
		if (ns.fileExists("HTTPWorm.exe", "home")) {ports++; ns.httpworm(servers[i]);}
		if (ns.fileExists("SQLInject.exe", "home")) {ports++; ns.sqlinject(servers[i]);}
		if (ns.fileExists("relaySMTP.exe", "home")) {ports++; ns.relaysmtp(servers[i]);}
		if (ports >= ns.getServerNumPortsRequired(servers[i])) ns.nuke(servers[i]);
	}
}