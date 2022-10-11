// Ege Özcan
// https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value

export function sortArrayObjs(property) {
	let sortOrder = 1;
	if (property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a, b) {
		let result =
			a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
		return result * sortOrder;
	};
}
