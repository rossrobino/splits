export function abbrDist(word) {
	if (word === "yards") return "yd";
	if (word === "miles") return "mi";
	if (word === "meters") return "m";
	if (word === "kilometers") return "km";
	return word;
}