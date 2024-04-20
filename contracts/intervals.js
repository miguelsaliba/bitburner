/** @param {NS} ns */
export async function main(ns) {
	let server = ns.args[0]
	let file = ns.ls(server, '.cct')[0];


	if (ns.codingcontract.getContractType(file, server) != "Merge Overlapping Intervals") {
		ns.exit();
	}

	let arr = ns.codingcontract.getData(file, server)

	ns.tprint(mergeIntervals(arr))

	//ns.tprint(ns.codingcontract.attempt(mergeIntervals(arr), file, server, { returnReward: true }));
}

export function mergeIntervals(arr) {
	var newarr = [];
	for (var i = 0; i < arr.length; i++) {
		var buffer = arr[i];
		for (var j = 0; j < newarr.length; j++) {
			if (buffer[0] <= newarr[j][1] && newarr[j][0] <= buffer[1]) {
				buffer[0] = Math.min(newarr[j][0], buffer[0]);
				buffer[1] = Math.max(newarr[j][1], buffer[1]);
				newarr.splice(j,1);
				j--;
			}
		}
		newarr.push(buffer);
	}
	return newarr.sort(function(a, b) {
		return a[1] - b[1];
	});

}

export function autocomplete(data, args) {
    return [...data.servers]; // This script autocompletes the list of servers.
}