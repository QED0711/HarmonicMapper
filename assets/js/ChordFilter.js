
const setNums = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

// TO VECTOR
// ===============================================================================
function toVector(chord){
	let vector = [0,0,0,0,0,0];

	for(let i = 0; i < chord.length-1; i++){
		for(let j = i+1; j< chord.length; j++){
			let interval = Math.abs(parseInt(chord[i]) - parseInt(chord[j]))
			if(interval > 6){
				vector[Math.abs(interval - 12)-1] += 1;	
			} else {
				vector[interval-1] += 1
			}
			
		}
	}
	return vector
}
// ===============================================================================

// VECTOR CLASS 
// ===============================================================================

function toPitches(chord){
	let pitches = [];
	for(let i = 0; i < chord.length; i++){
		pitches.push(setNums[parseInt(chord[i])]);
	}
	return pitches
}

class VectorFilter {
	constructor(){
		this["0"] = {'type' : null, 'value' : 0};
		this["1"] = {'type' : null, 'value' : 0};
		this["2"] = {'type' : null, 'value' : 0};
		this["3"] = {'type' : null, 'value' : 0};
		this["4"] = {'type' : null, 'value' : 0};
		this["5"] = {'type' : null, 'value' : 0};
	}

	setVector(intervalNum, type, num){
		this[intervalNum] = {'type' : type, 'value' : num}
		
	}

	filter(chordVector){
		for(let i = 0; i < 6; i++){
			if(this[i].type){
				switch(this[i].type){
					case('lessThan'):
						if(!(chordVector[i] < this[i].value)){
							return false;
						}
						break;
					case('atLeast'):
						if(!(chordVector[i] >= this[i].value)){
							return false;
						}
						break;
					case('exactly'):
						if(!(chordVector[i] === this[i].value)){
							return false;
						}
				}	
			} 
		}
		return true;
	}
}

// ChordFilter CLASS
// =================================================================================

class ChordFilter {
	constructor(containsArr, notContainsArr, sizeArr, bass, soprano){
		this.setContainsFilter(containsArr)
		this.setNotContainsFilter(notContainsArr);
		this.setChordSize(...sizeArr);
		this.vectorFilter = new VectorFilter();
		this.bass = bass;
		this.soprano = soprano;
	}

	setContainsFilter(containsArr){
		if(typeof containsArr[0] === "number"){
			this.contains = containsArr.map(x => x);
		} else {
			this.contains = [];
		}		
	}

	setNotContainsFilter(notContainsArr){
		if(typeof notContainsArr[0] === "number"){
			this.notContains = notContainsArr.map(x => x);
		} else {
			this.notContains = [];
		}
	}

	setVectorFilter(intervalNum, type, value){
		this.vectorFilter.setVector(intervalNum, type, value);
	}

	containsFilter(chord){
		for(let pitch of this.contains){
			if(!chord.includes(pitch/*.toString()*/)){
				return false;
			}
		}
		return true;
	}

	notContainsFilter(chord){
		for(let pitch of this.notContains){
			if(chord.includes(pitch/*.toString()*/)){
				return false;
			}
		}
		return true;	
	}
	setChordSize(min, max){
		if(min < 2 || min > 11 || max < 2 || max > 11){
			console.error("Invalid Chord Size");
			return;
		}
		if(min > max){
			this.chordSize = [max, min];
		} else {
			this.chordSize = [min, max];
		}
	}

	chordSizeFilter(chord){
		return (this.chordSize[0] <= chord.length && this.chordSize[1] >= chord.length)
	}

	bassFilter(chord){
		if(this.bass){
			return chord[0] === this.bass;
		}
		return true;
	}

	sopranoFilter(chord){
		if(this.soprano){
			return chord[chord.length-1] === this.soprano
		}
		return true;
	}

	passFilters(chord){
		if(typeof this.contains[0] === 'number'){ // allows for the containsFilter to be empty
			if(!this.containsFilter(chord)){
				return false
			}
		}

		if(typeof this.notContains[0] === 'number'){ // allows for the notContainsFilter to be empty
			if(!this.notContainsFilter(chord)){
				return false
			}
		}
		return this.vectorFilter.filter(toVector(chord)) && this.chordSizeFilter(chord) && this.bassFilter(chord) && this.sopranoFilter(chord);
	}
}

// filters to add: Top note, bottom note