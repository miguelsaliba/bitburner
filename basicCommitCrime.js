/** @param {NS} ns */
export async function main(ns) {
	while (true) { 
		if (!ns.singularity.isBusy()) {
			await ns.sleep(ns.singularity.commitCrime("Homicide"));
		} else {
			await ns.sleep(1000);
		}
	}
}