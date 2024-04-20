/** @param {NS} ns */
export async function main(ns) {
	const server = ns.args[0]
	ns.disableLog("ALL");
	ns.tail();

	while (true) {
		ns.clearLog()
		let money = ns.getServerMoneyAvailable(server)
		let maxmoney = ns.getServerMaxMoney(server)

		ns.print("Current / Max money: " + money.toLocaleString() + '/' + maxmoney.toLocaleString() + ' (' + ((100 * money) / maxmoney).toLocaleString() + '%)')


		let security = ns.getServerSecurityLevel(server)
		let minsecurity = ns.getServerMinSecurityLevel(server)

		ns.print("Current / Min security: " + security.toLocaleString() + '/' + minsecurity.toLocaleString())

		ns.print("Time to hack: " + ns.tFormat(ns.getHackTime(server)))
		ns.print("Time to grow: " + ns.tFormat(ns.getGrowTime(server)))
		ns.print("Time to weaken: " + ns.tFormat(ns.getWeakenTime(server)))

		ns.print("Chance to hack server: " + (ns.hackAnalyzeChance(server) * 100).toLocaleString() + '%')

		ns.print("Server hacking level: " + ns.getServerRequiredHackingLevel(server))
		await ns.sleep(1000);
	}
}

export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
}