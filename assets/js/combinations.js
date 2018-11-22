
function combinations(set, k) {
	var i, j, combs, head, tailcombs;
	
	if (k > set.length || k <= 0) {
		return [];
	}
	
	if (k == set.length) {
		return [set];
	}
	
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}
	
	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i + 1);
		tailcombs = combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push([...head, ...tailcombs[j]]);
		}
	}
	return combs;
}

function expandVector(vectorArr){
    let intervals = []
    for(let i = 0; i < vectorArr.length; i++){
        if(vectorArr[i]){
            intervals.push(...[i + 1, 11 - i]);
        }
    }
    return intervals;
}

console.log(combinations(expandVector([1,0,2,0,4,0]), 2))


// 1, 11
// 2, 10
// 3, 9
// 4, 8