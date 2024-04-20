/** @param {NS} ns */
let server;
let maxmoney;
let maxram;
let minsecurity;

let target;
let hackpercent = .2;
let gap = 200

export async function main(ns) {
	target = ns.args[0];
	server = ns.getHostname();
	maxmoney = ns.getServerMaxMoney(target);
	maxram = ns.getServerMaxRam(server);
	minsecurity = ns.getServerMinSecurityLevel(target);

	const ram = (maxram - ns.getServerUsedRam(server)) / (1.75 * 2) - (maxram * .05)
	while (ns.getServerMoneyAvailable(target) < maxmoney || ns.getServerSecurityLevel(target) > minsecurity) {
		if (!ns.isRunning('weaken.js')) {
			ns.run('weaken.js', ram, target);
			await ns.sleep(ns.getWeakenTime(target) - ns.getGrowTime(target) + gap)
		}
		if (!ns.isRunning('grow.js')) {
			ns.run('grow.js', ram, target);
			await ns.sleep(ns.getGrowTime(target))
		}
		await ns.sleep(2000);
	}
	
	var hackthreads = Math.floor(ns.hackAnalyzeThreads(target, maxmoney * hackpercent));
	var weakenthreads1 = Math.ceil(ns.hackAnalyzeSecurity(hackthreads, target) / 0.05);
	var growthreads = Math.ceil(ns.growthAnalyze(target, 1/(1-hackpercent)));
	var weakenthreads2 = Math.ceil(ns.growthAnalyzeSecurity(growthreads) / 0.05);

	while (true) {
		ns.run('batch.js', 1, hackthreads, weakenthreads1, weakenthreads2, growthreads, target, gap, Date.now());
		await ns.sleep(gap * 4);
	}
}


export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
}