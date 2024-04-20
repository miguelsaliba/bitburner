/** @param {NS} ns */
export async function main(ns) {
	const server = ns.args[0];
	const file = ns.ls(server, '.cct')[0];


	if (ns.codingcontract.getContractType(file, server) != "Spiralize Matrix") {
		ns.exit();
	}

	const data = ns.codingcontract.getData(file, server)

	ns.tprint(spiralize(data))

	// ns.tprint(ns.codingcontract.attempt(spiralize(data), file, server, { returnReward: true }));
}

/* 
[19,29, 8,41,16,38]
[49,42,22,49, 8,19]
*/
export function spiralize(data) {
    let out = [];
    let x = 0;
    let y = 0;
    if (data.length == 1) return data[0];
    if (data[0].length == 1) {
        for (const line of data) {
            out.push(line);
        }
        return out;
    }
    for (let i = 0; i < Math.ceil(Math.min(data.length,data[0].length) / 2); i++) {
        for ( ; x < data[0].length-i; x++) {
            out.push(data[y][x])
        }
        x-=1;
        y+=1;
        for ( ; y < data.length-i; y++) {
            out.push(data[y][x])
        }
        y-=1;
        x-=1;
        for ( ; x >= i; x--) {
            out.push(data[y][x])
        }
        x+=1;
        y-=1;
        for ( ; y >= i+1; y--) {
            out.push(data[y][x])
        }
        y+=1;
        x+=1;
    }
    return out;
}