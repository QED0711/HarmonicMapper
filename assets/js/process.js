
const validChords = (chordsArr, filterObj) => {
    let validChords = [];
    for(chord of chordsArr){
        if(filterObj.passFilters(chord)){
            validChords.push(chord);
        }
    }
    return validChords
}

const process = async (scheme, size, containsArr, notContainsArr, bassNote, sopranoNote) => {
    console.log("in process");
    console.log(scheme, size, containsArr, notContainsArr, bassNote, sopranoNote)
    let intScheme = new IntervalScheme(scheme);
    intScheme.__intervalStructure = await getJSON(intScheme.structureType);
    let chords = intScheme.mappedScheme();
    
    if(TRANSPOSITION){
        let length = chords.length;
        for(let i = 0; i < length; i++){
            for(let trans = 1; trans <= 11; trans++){
                let transposedChord = chords[i].map((x) => {
                    let transposedPitch = x + trans;
                    if(transposedPitch < 12){
                        return transposedPitch;
                    } else {
                        while(transposedPitch > 12){
                            transposedPitch -= 12
                        }
                        return transposedPitch;
                    }
                });
                chords.push(transposedChord);
                // console.log(transposedChord);
            }
        }
    }

    let filter = new ChordFilter(containsArr, notContainsArr, size, bassNote, sopranoNote);

    for(vectorSetting of VECTORFILTERS){
        filter.setVectorFilter(...vectorSetting);
    }

    console.log(filter.vectorFilter)

    return validChords(chords, filter).sort((a,b) => a.length - b.length);   
}