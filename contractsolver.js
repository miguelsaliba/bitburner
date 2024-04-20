// import { move } from "contracts/grid";
// import { move as move2 } from "contracts/grid2";
import { mergeIntervals } from "contracts/intervals";
import { checkJump } from "contracts/jump";
import { stockTrader } from "contracts/stocks";
// import { spiralize } from "contracts/spiralize";


/** @param {NS} ns */
export async function main(ns) {
	ns.clearLog();
	ns.disableLog("ALL");
	ns.tail()
	let servers = ns.read("serverlist.txt").split(/\r?\n/);
	let outputed = [];
	while (true) {
		for (const server of servers) {
			let files = ns.ls(server, ".cct");
			for (const file of files) {
				if (outputed.indexOf(file) != -1) continue;
				let data = ns.codingcontract.getData(file, server);
				var solution = "";
				switch (ns.codingcontract.getContractType(file, server)) {
					case "Find Largest Prime Factor":
						solution = primeFactor(data);
						break;
					// case "Subarray with Maximum Sum":
					// 	solution = "";
					// 	break;
					// case "Total Ways to Sum":
					// 	solution = "";
					// 	break;
					// case "Total Ways to Sum II":
					// 	solution = "";
					// 	break;
					case "Spiralize Matrix":
						solution = spiralize(data);
						break;
					case "Array Jumping Game":
						solution = checkJump(data) != 0;
						break;
					case "Array Jumping Game II":
						solution = checkJump(data);
						break;
					// case "Merge Overlapping Intervals":
					// 	solution = "";
					// 	break;
					// case "Generate IP Addresses":
					// 	solution = "";
					// 	break;
					case "Merge Overlapping Intervals":
						solution = mergeIntervals(data);
						break;
					case "Algorithmic Stock Trader I":
						solution = stockTrader([1, data]);
						break;
					// case "Algorithmic Stock Trader II":
					// 	solution = stockTrader([Math.floor(data.length/2), data]);
					// 	break;
					case "Algorithmic Stock Trader III":
						solution = stockTrader([2, data]);
						break;
					// case "Algorithmic Stock Trader IV":
					// 	solution = stockTrader(data);
					// 	break;
					// case "Minimum Path Sum in a Triangle":
					// 	solution = "";
					// 	break;
					case "Unique Paths in a Grid I":
						solution = move(data);
						break;
					// case "Unique Paths in a Grid II":
					// 	solution = move2(data);
					// 	break;
					// case "Shortest Path in a Grid":
					// 	solution = "";
					// 	break;
					// case "Sanitize Parentheses in Expression":
					// 	solution = "";
					// 	break;
					// case "Find All Valid Math Expressions":
					// 	solution = "";
					// 	break;
					case "HammingCodes: Integer to Encoded Binary":
						solution = "";
						break;
					case "Compression I: RLE Compression":
						solution = RLEencode(data);
						break;
					case "Compression II: LZ Decompression":
						solution = LZDecode(data);
						break;
					default:
						ns.print("INFO Contract type '" + ns.codingcontract.getContractType(file, server) + "' is not compatible. (" + server + ": " + file + ")")
						outputed.push(file);
						break;
				}
				if (solution !== ""){
					let response = ns.codingcontract.attempt(solution, file, server, { returnReward: true })
					if (response != "") {
						ns.tprint(file + response);
						ns.print(file + response);
					} else {
						ns.tprint("ERROR Failed: " + ns.codingcontract.getContractType(file, server) + " (" + server + ": " + file + ")")
						ns.print("ERROR Failed: " + ns.codingcontract.getContractType(file, server) + " (" + server + ": " + file + ")");
						outputed.push(file);
					}
				}
			}
		}
		await ns.sleep(10000);
	}
}

// Find Largest Prime Factor
function primeFactor(n) {
	for (let i = 1; i <= n; ++i) {
		if (n % i == 0 && isPrime(n/i)) return n/i;
	}
}
function isPrime(n) {
	for (let i = 2; i <= Math.sqrt(n); ++i) {
		if (n % i == 0) return false;
	}
	return true;
}

// Spiralize Matrix
function spiralize(arr) {
	let copy = arr;
	let ans = [];
	let dir = 0;

	while (!copy.every( function (a) { return !a.length })) {
		switch (dir) {
			case 0:
				ans.push(...copy.shift());
				break;
			case 1:
				ans.push(...copy.map(x => x.pop()));
				break;
			case 2:
				ans.push(...copy.pop().reverse());
				break;
			case 3:
				ans.push(...copy.map(x => x.shift()).reverse());
				break;
		}
	    dir = (dir + 1) % 4;
	}
	return ans;
}

// Unique Paths in a Grid I
function move(arr, x = 0, y = 0){
	var count = 0;
	if (x+1==arr[0] && y+1==arr[1]){
		return 1;
	}
	if (x+1<arr[0]){
		count += move(arr, x+1, y);
	}
	if (y+1<arr[1]){
		count += move(arr, x, y+1);
	}
	return count;
}

// Unique Paths in a Grid II
function move2(arr, x=0, y=0){
	var count = 0;
	if (x+1==arr.length && y+1==arr[0].length){
		return 1;
	}
	if (x+1<arr.length && arr[x+1][y] != 1){
		count += move(arr, x+1, y);
	}
	if (y+1<arr[0].length && arr[x][y+1] != 1){
		count += move(arr, x, y+1);
	}
	return count;
}

// Compression I: RLE Compression
function RLEencode(data) {
	let ans = "";
	for (let i = 0; i < data.length; ++i) {
		let count = 1;
		while (data.charAt(i) == data.charAt(i+1)) {
			if (count == 9) {
				ans += count.toString() + data.charAt(i);
				count = 0;
			}
			++count;
			++i;
		}
		ans += count.toString() + data.charAt(i);
	}
	return ans;
}

// Compression II: LZ Decompression
function LZDecode(data) {
    let ans = "";
	let type = 1;
    for (let i = 0; i < data.length; ++i) {
        if (data.charAt(i) == "0") {
            type = type == 1 ? 2 : 1;
			continue;
		}

		let L = parseInt(data.charAt(i));

		if (type == 1) {
		    ans += data.substring(i+1, i + L+1);
			i+=L;
			type = 2;
		} else if (type == 2) {
		    let X = parseInt(data.charAt(i+1));
		    for (let j = 0; j < L; ++j) {
				ans += ans.charAt(ans.length-X);
			}
			++i;
			type = 1
		}
    }
    return ans
}