/** @param {NS} ns */
export async function main(ns) {
	while(ns.getPurchasedServers().length == ns.getPurchasedServerLimit()) {
		if  (ns.getPurchasedServerCost(ns.getPurchasedServerMaxRam()) <= ns.getServerMoneyAvailable("home")) {
			var server = ns.purchaseServer("xpfarm", ns.getPurchasedServerMaxRam());
			await ns.scp("weakenn00dles.js", server);
			ns.exec("weakenn00dles.js", server, 590000);
		} else {
			await ns.sleep(10000);
		}
	}
}