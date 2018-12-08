function unique(arr){
    return arr.length === new Set(arr).size;
}

function pitchChain(arr, set){
    intervalArr = arr.map(x => {
        return set[x]
    })
    chord = [0];
    for(let i = 0; i < intervalArr.length; i++){
        let pitch = intervalArr[i] + chord[chord.length-1]
        pitch = pitch < 12 ? pitch : pitch - 12;
        chord.push(pitch)
    }
    return unique(chord) ? chord : false;
}

function chordInfo(intervalArr, set){
    console.log
    return {
        structure: intervalArr,
        size: intervalArr.length + 1,
        pcs: pitchChain(intervalArr, set)
    }
}

function collectionGenerator(set){
    let structure = [];
    for(let i = 0; i < set.length; i++){
        structure.push(chordInfo([i], set));
    }
    
    // create array to hold all the generated chords
    let collection = [];
    
    // recursive function to check valid chord structures
    function intervalStacker(set, chord){ 
        // console.log(chord)
        if(!chord.pcs || chord.size > 12){
            return false;
        }
        collection.push(chord)
        for(let i = 0; i < set.length; i++){
            newChord = chordInfo(Object.assign({}, chord, {structure: [...chord.structure, i]}).structure, set )
            if(newChord.pcs){
                intervalStacker(set, newChord)
            }
        }
    }
    
    structure.forEach(chord => {
        intervalStacker(set, chord);
    })
    return collection
}

// console.log(chordInfo([1,0], [4,8]))

// console.time("generator time")
// console.log(collectionGenerator([3,4]).sort((a,b) => {
//     return a.size - b.size
// }))
// console.timeEnd("generator time")

class HarmonicCollection{
    constructor(...set){
        this.set = set;
        this.collection = collectionGenerator(set)
    }

    findByStructure(structureArr){
        return this.collection.filter(chord => {
            console.log("CHORD: ", chord)
            for(let i = 0; i < chord.structure.lengt; i++){
                if(chord.structure[i] !== structureArr[i]){
                    return false
                }
                return true;
            }
        })
    }
}

let binary = new HarmonicCollection(2,4)
console.log(binary.findByStructure())