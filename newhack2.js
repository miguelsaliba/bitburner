/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	ns.tail()

	const target = ns.args[0];
	const server = ns.getHostname();
	const maxmoney = ns.getServerMaxMoney(target);
	const maxram = ns.getServerMaxRam(server);
	const minsecurity = ns.getServerMinSecurityLevel(target);
	let hackpercent = .5;
	let gap = 200

	// kills all instances of HGW scripts
	ns.scriptKill("weaken.js", server);
	ns.scriptKill("grow.js", server);
	ns.scriptKill("hack.js", server);

	const ram = (maxram - ns.getServerUsedRam(server)) / (1.75) - (maxram * .05)

	// weakens the server to min security
	while (ns.getServerSecurityLevel(target) > minsecurity) {
		ns.run('weaken.js', ram, target);
		await ns.sleep(ns.getWeakenTime(target) + gap)
	}

	// grows  the server to max then weakens back to min
	while (ns.getServerMoneyAvailable(target) < maxmoney) {
		if (!ns.isRunning('weaken.js')) {
			ns.run('weaken.js', Math.ceil(ram * (1/13.5)), target);
			await ns.sleep(ns.getWeakenTime(target) - ns.getGrowTime(target) - gap)
		}
		if (!ns.isRunning('grow.js')) {
			ns.run('grow.js', Math.floor(ram * (12.5/13.5)), target);
			await ns.sleep(ns.getGrowTime(target) + gap)
		}
		await ns.sleep(2000);
	}


	// weird way of checking what to set hackpercent to, it then increases the gap if hackpercent gets too low
	// i should probably change this so that it uses math and not a loop but i am too stupid 
	do {
		var hackthreads = Math.floor(ns.hackAnalyzeThreads(target, maxmoney * hackpercent));
		var weakenthreads1 = Math.ceil(hackthreads * 0.002 / 0.05);
		var growthreads = Math.ceil(ns.growthAnalyze(target, 1/(1-hackpercent)));
		var weakenthreads2 = Math.ceil(growthreads * 0.004 / 0.05);

		var ramused = ((hackthreads * 1.75 * ns.getHackTime(target)) + ((weakenthreads1 + weakenthreads2) * 1.7 * ns.getWeakenTime(target)) +
		(growthreads * 1.7 * ns.getGrowTime(target))) / (gap * 4);
		
		ns.print(ramused);
		hackpercent -= 0.005;
		if (hackpercent <= 0){
			hackpercent = 0.5;
			gap += 100;
		}
	} while (ramused > maxram*.95);

	ns.print(hackthreads);
	ns.print(weakenthreads1);
	ns.print(growthreads);
	ns.print(weakenthreads2);

	// end times of the first batch
	var weaken1endtime = Date.now() + ns.getWeakenTime(target);
	var weaken2endtime = weaken1endtime + gap*2;
	var growendtime = weaken1endtime + gap;
	var hackendtime = weaken1endtime - gap;

	// main batch loop
	// checks if each action will finish at or slightly after its end time then runs it and increments the end time to the next batch
	while (true) {
		if (weaken1endtime-ns.getWeakenTime(target) <= Date.now()) {
			ns.run('weaken.js', weakenthreads1, target, Date.now());
			weaken1endtime += gap*4;
		}
		if (weaken2endtime-ns.getWeakenTime(target) <= Date.now()) {
			ns.run('weaken.js', weakenthreads2, target, Date.now());
			weaken2endtime += gap*4;
		}
		if (growendtime-ns.getGrowTime(target) <= Date.now()) {
			ns.run('grow.js', growthreads, target, Date.now());
			growendtime += gap*4;
		}
		if (hackendtime-ns.getHackTime(target) <= Date.now()) {
			ns.run('hack.js', hackthreads, target, Date.now());
			hackendtime += gap*4;
		}
		await ns.sleep(10)
	}

}

export function autocomplete(data, args) {
    return [...data.servers];
}