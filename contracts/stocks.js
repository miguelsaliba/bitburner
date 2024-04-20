/** @param {NS} ns */
export async function main(ns) {
	const server = ns.args[0]
	const file = ns.ls(server, '.cct')[0];

	let data = ns.codingcontract.getData(file, server);
	if (ns.codingcontract.getContractType(file, server) == "Algorithmic Stock Trader I") {
		data = [1, data];
	} else if (ns.codingcontract.getContractType(file, server) == "Algorithmic Stock Trader II") {
		data = [Math.floor(data.length/2), data];
	} else if (ns.codingcontract.getContractType(file, server) == "Algorithmic Stock Trader III") {
		data = [2, data];
	} else if (ns.codingcontract.getContractType(file, server) == "Algorithmic Stock Trader IV") {
		data = data; // Yes I know.
	} else {
		ns.exit();
	}


	ns.tprint(stockTrader(data))

	//ns.tprint(ns.codingcontract.attempt(stockTrader(data), file, server, { returnReward: true }));
}

export function stockTrader(arr, layer=1) {
	let max = 0;
    for (let i = 0; i < arr[1].length-1; i++){
        let currentTotal = -arr[1][i];
        for (let j = i+1; j < arr[1].length; j++) {
            let temp = currentTotal + arr[1][j];
			if (arr[0] > layer) temp += stockTrader([arr[0],arr[1].slice(j)], layer+1);
			if (temp > max) max = temp;
        }
    }
	return max
}

export function autocomplete(data, args) {
    return [...data.servers];
}