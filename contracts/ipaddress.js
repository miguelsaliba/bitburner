/** @param {NS} ns */
export async function main(ns) {
	const server = ns.args[0];
	const file = ns.ls(server, '.cct')[0];


	if (ns.codingcontract.getContractType(file, server) != "Generate IP Addresses") {
		ns.exit();
	}

	const data = ns.codingcontract.getData(file, server)

	ns.tprint(ipaddress(data))

	// ns.tprint(ns.codingcontract.attempt(ipaddress(data), file, server, { returnReward: true }));
}

export function ipaddress(data) {
    function isValid(arr) {
        if (arr.length != 4) return false;
        for (let i = 0; i<arr.length; i++){
            if (arr[i].charAt(0) == 0 && arr[i] != 0) return false;
            if (arr[i] > 255) return false;
        }
    }

    for (let i = 0; i<=3**4; i++) {
        
    }
}