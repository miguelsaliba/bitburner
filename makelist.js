/** @param {NS} ns */
export async function main(ns) {
	var sl = 'serverlist.txt';
	ns.clear(sl);
	var row = '\r\n';

	var servers = ["home"]
	await ns.write(sl, "home", 'a');

	for (var i = 0; i < servers.length; i++) {
		var newscan = ns.scan(servers[i]);
		for (var j = 0; j < newscan.length; j++) {
			let server = newscan[j];
			if (servers.indexOf(server) == -1) {
				if (server != '') {
					servers.push(server);
					await ns.write(sl, row + server, 'a');
				}
			}

		}
	}
}