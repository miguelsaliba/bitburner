/** @param {NS} ns */
let gap = 200

export async function main(ns) {
	let target = ns.args[4];
	var hackthreads = ns.args[0];
	var weakenthreads1 = ns.args[1];
	var weakenthreads2 = ns.args[2];
	var growthreads = ns.args[3];
	gap = ns.args[5]

	if (weakenthreads1 >= 1) ns.run('weaken.js', weakenthreads1, target, ns.args[6]); // calc threads after hack

	await ns.sleep(gap * 2);

	if (weakenthreads2 >= 1) ns.run('weaken.js', weakenthreads2, target, ns.args[6] * 10); // calc threads after grow
	
	await ns.sleep(ns.getWeakenTime(target) - gap - ns.getGrowTime(target));

	if (growthreads >= 1) ns.run('grow.js', growthreads, target, ns.args[6]);

	await ns.sleep(ns.getGrowTime(target) - gap * 2 - ns.getHackTime(target));

	if (hackthreads >= 1) ns.run('hack.js', hackthreads, target, ns.args[6]);
}