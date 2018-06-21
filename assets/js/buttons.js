
let CURRENTCHORD // made as a global variable so it can be set in multiple functions
let PASSEDCHORDS;
let CHORDINDEX;
let OCTAVEOFFSET;
let PITCHOFFSET;
let DISPLAYTYPE;
let TRANSPOSITION;

let VECTORFILTERS = [
    [0, null, 0],
    [1, null, 0],
    [2, null, 0],
    [3, null, 0],
    [4, null, 0],
    [5, null, 0],
]

const intVectors = {
    "m2" : 0,
    "M2" : 1,
    "m3" : 2,
    "M3" : 3,
    "P4" : 4,
    "tritone" : 5,
}

const pitchNames = {
    "C" : 0, 
    "C#" : 1,
    "Db" : 1,
    "D" : 2,
    "D#" : 3,
    "Eb" : 3,
    "E" : 4,
    "F" : 5,
    "F#" : 6,
    "Gb" : 6,
    "G" : 7,
    "G#" : 8, 
    "Ab" : 8,
    "A" : 9,
    "A#" : 10,
    "Bb" : 10,
    "B" : 11, 
}

const getOctaveOffset = () => {
    OCTAVEOFFSET = parseInt($("#octave").val()) + 1;
}

const getPitchOffset = () => {
    PITCHOFFSET = parseInt($("#pitch").val());
}

const getDisplayType = () => {
    let displayRadios = $(".display-radio");
    for(radio of displayRadios){
        if(radio.checked){
            DISPLAYTYPE = radio.id;
            return;
        }
    }
}

const getTransposition = () => {
    TRANSPOSITION = $("#transposition")[0].checked
}

const getVectorValues = () => {
    let vectorValues = $(".vectorValue");
    return {
        "0" : parseInt(vectorValues[0].value),
        "1" : parseInt(vectorValues[1].value),
        "2" : parseInt(vectorValues[2].value),
        "3" : parseInt(vectorValues[3].value),
        "4" : parseInt(vectorValues[4].value),
        "5" : parseInt(vectorValues[5].value),
    }
}

const getVectorSelects = () => {
    let vectorSelects = $(".vectorSelect");
    let vectorValues = getVectorValues();
    for(select of vectorSelects){
        let interval = parseInt(select.id.split("-")[1]);
        let filterType = select.value === "inactive" ? null : select.value;
        let value = vectorValues[interval];
        VECTORFILTERS[interval] = [interval, filterType, value];
    }
}

const getBass = () => {
    let userBass = $("#bass")[0].value;
    if(userBass){
        console.log(userBass.split(" "));
    }
    
    console.log(userBass); 
}

const getChords = async () => {
    renderNotes([]);
    $("#validChordsInfo")[0].innerText = "Finding Chords..."
    let scheme = $("#intervalScheme").val().split(" ").map(x => parseInt(x));
    let minLength = parseInt($("#minLength").val());
    let maxLength = parseInt($("#maxLength").val());
    let chordLength = [minLength, maxLength];
    // let chordLength = $("#chord-length").val().split(" ").map(x => parseInt(x));
    let contains = $("#contains").val().split(" ").map(x => pitchNames[x]);
    let notContains = $("#notContains").val().split(" ").map(x => pitchNames[x]);
    let bass = pitchNames[$("#bass")[0].value];
    let soprano = pitchNames[$("#soprano")[0].value]
    
    
    getOctaveOffset();
    getPitchOffset();
    getDisplayType();
    getTransposition();
    getVectorSelects();

    PASSEDCHORDS = await process(scheme, chordLength, contains, notContains, bass, soprano);

    console.log(`Your Search Returned: ${PASSEDCHORDS.length} Chords`)
    if(PASSEDCHORDS.length > 0){
        CHORDINDEX = 0;
        CURRENTCHORD = new CurrentChord(PASSEDCHORDS[CHORDINDEX]);
        CURRENTCHORD.offset(OCTAVEOFFSET, PITCHOFFSET)
        
        switch(DISPLAYTYPE){
            case("type-expanded"):
            renderNotes(CURRENTCHORD.expanded);
            break;
            case("type-simplified"):
            renderNotes(CURRENTCHORD.compressed);
            break;
            case("type-scale"):
            renderNotes(CURRENTCHORD.scale);
            break;
        }

    } else {
        console.log("There are no chords that match your search")
    }
    setVectorInfo();
    setNotesInfo();
    setLengthInfo();
    setIndexInfo();
    setValidChordsInfo();
    setQuickIndex();
}

const nextChord = () => {
    getOctaveOffset();
    getDisplayType();

    if(PASSEDCHORDS.length > CHORDINDEX + 1){
        CURRENTCHORD = new CurrentChord(PASSEDCHORDS[++CHORDINDEX])
        CURRENTCHORD.offset(OCTAVEOFFSET, PITCHOFFSET)
        switch(DISPLAYTYPE){
            case("type-expanded"):
            renderNotes(CURRENTCHORD.expanded);
            break;
            case("type-simplified"):
            renderNotes(CURRENTCHORD.compressed);
            break;
            case("type-scale"):
            renderNotes(CURRENTCHORD.scale);
            break;
        }
    } else {
        console.log("end of PASSEDCHORDS")
    }
    setVectorInfo();
    setNotesInfo();
    setLengthInfo();
    setIndexInfo();
    setValidChordsInfo();
    setQuickIndex();
}

const previousChord = () => {
    getOctaveOffset();
    getDisplayType();
    if(CHORDINDEX - 1 >= 0){
        CURRENTCHORD = new CurrentChord(PASSEDCHORDS[--CHORDINDEX])
        CURRENTCHORD.offset(OCTAVEOFFSET, PITCHOFFSET)

        switch(DISPLAYTYPE){
            case("type-expanded"):
            renderNotes(CURRENTCHORD.expanded);
            break;
            case("type-simplified"):
            renderNotes(CURRENTCHORD.compressed);
            break;
            case("type-scale"):
            renderNotes(CURRENTCHORD.scale);
            break;
        }
    } else {
        console.log("end of PASSEDCHORDS")
    }
    setVectorInfo();
    setNotesInfo();
    setLengthInfo();
    setIndexInfo();
    setValidChordsInfo();
    setQuickIndex();
}

const displayRadio = () => {
    let radios = $(".display-radio");
    // console.log(radios)
    for(let i = 0; i < radios.length; i++){
        radios[i].onclick = () => {
            getDisplayType();
            switch(DISPLAYTYPE){
                case("type-expanded"):
                renderNotes(CURRENTCHORD.expanded);
                break;
                case("type-simplified"):
                renderNotes(CURRENTCHORD.compressed);
                break;
                case("type-scale"):
                renderNotes(CURRENTCHORD.scale);
                break;
            }
        }
    }
} 

const setVectorInfo = () => {
    let vector = CURRENTCHORD.vector;
    $("#vectorInfo")[0].innerText = `< ${CURRENTCHORD.vector} >`
}

const setNotesInfo = () => {
    $("#notesInfo")[0].innerText = `${CURRENTCHORD.names.join(" ")}`
};

const setLengthInfo = () => {
    $("#lengthInfo")[0].innerText = `${CURRENTCHORD.chord.length}`
};

const setIndexInfo = () => {
    $("#indexInfo")[0].innerText = `${CHORDINDEX}`
}

const setValidChordsInfo = () => {
    $("#validChordsInfo")[0].innerText = `0 - ${PASSEDCHORDS.length-1}`
}

const octaveOffset = () => {
    getOctaveOffset();

    CURRENTCHORD = new CurrentChord(PASSEDCHORDS[CHORDINDEX])
    CURRENTCHORD.offset(OCTAVEOFFSET, PITCHOFFSET);

    switch(DISPLAYTYPE){
        case("type-expanded"):
        renderNotes(CURRENTCHORD.expanded);
        break;
        case("type-simplified"):
        renderNotes(CURRENTCHORD.compressed);
        break;
        case("type-scale"):
        renderNotes(CURRENTCHORD.scale);
        break;
     }
}

const pitchOffset = () => {
    getPitchOffset();

    CURRENTCHORD = new CurrentChord(PASSEDCHORDS[CHORDINDEX])
    CURRENTCHORD.offset(OCTAVEOFFSET, PITCHOFFSET);

    switch(DISPLAYTYPE){
        case("type-expanded"):
        renderNotes(CURRENTCHORD.expanded);
        break;
        case("type-simplified"):
        renderNotes(CURRENTCHORD.compressed);
        break;
        case("type-scale"):
        renderNotes(CURRENTCHORD.scale);
        break;
     }
}

$("#submit").click(getChords)
$("#next").click(nextChord)
$("#previous").click(previousChord);

$("#octave").click(octaveOffset);
$("#octave").keyup(octaveOffset);

$("#pitch").click(pitchOffset);
$("#pitch").keyup(pitchOffset);


const jumpToindex = () => {
    getOctaveOffset();
    getDisplayType();
    if(CHORDINDEX >= 0 && CHORDINDEX < PASSEDCHORDS.length){
        CURRENTCHORD = new CurrentChord(PASSEDCHORDS[CHORDINDEX])
        CURRENTCHORD.offset(OCTAVEOFFSET, PITCHOFFSET)

        switch(DISPLAYTYPE){
            case("type-expanded"):
            renderNotes(CURRENTCHORD.expanded);
            break;
            case("type-simplified"):
            renderNotes(CURRENTCHORD.compressed);
            break;
            case("type-scale"):
            renderNotes(CURRENTCHORD.scale);
            break;
        }
    } else {
        console.log("Index Outside Range")
    }
    setVectorInfo();
    setNotesInfo();
    setLengthInfo();
    setIndexInfo();
}

const setQuickIndex = () => {
    $(".quickIndexNumber input")[0].value = CHORDINDEX;
}

$("#quickIndexNumber")[0].onkeyup = () => {
    CHORDINDEX = parseInt($("#quickIndexNumber")[0].value);
    jumpToindex();
};


displayRadio();

