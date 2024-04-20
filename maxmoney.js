/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	ns.tail();
	const servers = ns.read("serverlist.txt").split(/\r?\n/);
	const player = ns.getPlayer();
	var maxserver = 'home';
	var maxmoney = 0;
	const time = 30000;

	if (!ns.fileExists("Formulas.exe", "home")){
		for (let i = 0; i < servers.length; i++) {
			if (ns.hasRootAccess(servers[i])){
				let money = ns.getServerMaxMoney(servers[i])
				if (money > maxmoney && ns.getHackTime(servers[i]) < time){
					maxserver = servers[i];
					maxmoney = money;
				}
				if (money > 0 && ns.getHackTime(servers[i]) < time) {
					ns.print(servers[i] + '  $'+ money.toLocaleString() + "  " + ns.tFormat(ns.getHackTime(servers[i])));
					ns.print(ns.getServer(servers[i]).serverGrowth);
				}
			}
		}
		ns.print('Max money per sec is '+ maxserver + ' at $' + maxmoney.toLocaleString())
	}
	else {
		for (const server of servers) {
			const current = ns.getServer(server);
			if (current.hasAdminRights && current.moneyMax > 0 && current.requiredHackingSkill <= ns.getHackingLevel()) {
				current.hackDifficulty = current.minDifficulty;
				current.moneyAvailable = current.moneyMax;
				if (ns.formulas.hacking.hackTime(current, player) > time) continue;
				let money = current.moneyMax * ns.formulas.hacking.hackPercent(current, player) * ns.formulas.hacking.hackChance(current, player) / ns.formulas.hacking.hackTime(current, player);
				ns.print(server + '  $'+ money.toLocaleString() + "  " + ns.tFormat(ns.formulas.hacking.hackTime(current, ns.getPlayer())));
				ns.print(current.serverGrowth);
				if (money > maxmoney) {
					maxserver = server;
					maxmoney = money;
				}
			}
		}
		ns.print('Max money per sec is '+ maxserver + ' at $' + maxmoney.toLocaleString())
	}
}