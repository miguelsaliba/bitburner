/** @param {NS} ns */
var solution = [];
var min = Number.MAX_SAFE_INTEGER;
var len;

export async function main(ns) {
	let server = ns.args[0];
	let file = ns.ls(server, '.cct')[0];

	if (ns.codingcontract.getContractType(file, server) != "Sanitize Parentheses in Expression") {
		ns.exit();
	}

	let str = ns.codingcontract.getData(file, server);
	if (await isValid(str)) {
		ns.tprint([str]);
		ns.exit();
	}
	len = str.length;
	await checkstr(ns, str, 1);
	ns.tprint(solution);
	//ns.tprint(ns.codingcontract.attempt(solution, file, server, { returnReward: true }));
}

export async function isValid(str) {
	var stack = 0
	
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == '(') {
			stack++;
		} else if (str.charAt(i) == ')') {
			stack--;
		}
		if (stack < 0) {
			return false;
		}
	}
	if (stack != 0) return false;

	return true;
}

export async function checkstr(ns, str, n) {
	await ns.sleep(5);
	for (var i = 0; i < str.length; i++) {
		if (str.charAt(i) == '(' || str.charAt(i) == ')') {
			var spliced = str.slice(0, i) + str.slice(i+1);
			if (await isValid(spliced) && n <= min) {
				if (n<min){
					min = n;
					solution = [spliced];
				} else if (!solution.includes(spliced)) {
					solution.push(spliced);	
				}
			}
			if (n+1 < len && n+1<=min) {
				await checkstr(ns, spliced, n+1);
			}
		}
	}
	return;
}