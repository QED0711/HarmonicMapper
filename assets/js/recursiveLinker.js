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
        length: intervalArr.length + 1,
        pcs: pitchChain(intervalArr, set)
    }
}



function container(set){
    let structure = [];
    for(let i = 0; i < set.length; i++){
        structure.push([i]);
    }
    let collection = []
    function recursiveLinker(set, chord){
        chord = chord || chordInfo([0], set);
        if(!chord.pcs || chord.length === 11){
            return false;
        }
        // console.log(chord)
        for(let i = 0; i < set.length; i++){
            tempStructure = [...chord.structure, i]
            chord = chordInfo(tempStructure, set)
            collection.push(chord)
            recursiveLinker(set, chord)
        }
    }
    structure.forEach(chord => {
        chord = chordInfo(chord, set);


        recursiveLinker(set, chord);
    })
    console.log(collection.length)
}

container([3, 4])