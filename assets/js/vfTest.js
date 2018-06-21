const VF = Vex.Flow;



// set global arrays for bass and treble notes. This is so that both toPitchNames() & renderNotes have access to these
let bassNotes = [];
let trebleNotes = [];

function renderNotes(chord){
    // clear the bassNotes and trebleNotes arrays for a new input
    bassNotes = [];
    trebleNotes = [];
    
    // delete and then re-add the id="notation" div to the dom 
    if(document.getElementById("notation")){
        document.getElementById("notation").remove();
    }
    let container = document.getElementById("notation-container")
    let newNode = document.createElement('div')
    newNode.setAttribute('id', 'notation')
    container.appendChild(newNode);
    let notation = document.getElementById("notation");
    
    // VF Staff Setup
    // create and configure the rendering context
    let renderer = new VF.Renderer(notation, VF.Renderer.Backends.SVG);
    renderer.resize(600, 300); // width, height
    let context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    // Create your staff system. Add clefs and left brace
    let topStaff = new VF.Stave(0,0, 500); // x, y, width
    let bottomStaff = new VF.Stave(0, 75, 500)
    topStaff.addClef("treble")
    bottomStaff.addClef("bass")
    let brace = new Vex.Flow.StaveConnector(topStaff, bottomStaff).setType(1);
    // Connect staves to rendering context and draw
    topStaff.setContext(context).draw();
    bottomStaff.setContext(context).draw();
    brace.setContext(context).draw();
    
    // setup for note rending in VF
    let numOfPitches = chord.length
    toNoteObj(chord); // side-effect converts chord array to chord-name array
    // set bass and treble voices from the bassNotes and trebleNotes arrays, and add those to the created staff 
    let bassVoice = new VF.Voice({num_beats: numOfPitches,  beat_value: 1});
    bassVoice.addTickables(bassNotes);
    let trebleVoice = new VF.Voice({num_beats: numOfPitches,  beat_value: 1});
    trebleVoice.addTickables(trebleNotes);
    // join the two voices together
    let formatter = new VF.Formatter().joinVoices([bassVoice, trebleVoice]).format([bassVoice, trebleVoice], 400);
    // draw the voices on the staff
    trebleVoice.draw(context,topStaff);
    bassVoice.draw(context, bottomStaff);
}


// converts a midi number to a string with pitch name and octave designation (60 = C4)
function toPitchName(note){
    const names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']   
    let octave = -1; //offset to -1 so that middle C is C/4
     while(!names[note]){
         note -= 12;
         octave += 1
     }
     return names[note] + "/" + octave;
 }
 
 function toNoteObj(chord){
     // Fill treble and bass arrays with GhostNotes to the length of the input chord
     chord.forEach((note)=>{
         trebleNotes.push(new VF.GhostNote({duration: "w"}));
         bassNotes.push(new VF.GhostNote({duration: "w"}));
     })
     
     // For each note of the chord, assign it to bass or treble staff. Add a # if necessary.
     // finally, push the new object to the bassNotes or trebleNotes array.
     for(let i = 0; i < chord.length; i++){
         if(chord[i] < 60){ // to bass staff
             let note = toPitchName(chord[i]);
             if(note.match("#")){
                 bassNotes[i] = new VF.StaveNote({clef: "bass", keys: [note], duration: "w"}).addAccidental(0, new VF.Accidental("#"))
             } else {
                 bassNotes[i] = new VF.StaveNote({clef: "bass", keys: [note], duration: "w"})
             }
         } else { // to treble staff
             let note = toPitchName(chord[i]);
             if(note.match("#")){
                 trebleNotes[i] = new VF.StaveNote({clef: "treble", keys: [note], duration: "w"}).addAccidental(0, new VF.Accidental("#"))
             } else {
                 trebleNotes[i] = new VF.StaveNote({clef: "treble", keys: [note], duration: "w"})
             }
         }
     } 
 }


 renderNotes([]) // put it all together


 // const toNoteObj = require('./toNoteObj');

// // Create an SVG renderer and attach it to the DIV element named "boo".
// var div = document.getElementById("notation")
// var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// // Configure the rendering context.
// renderer.resize(600, 300); // width, height
// var context = renderer.getContext();
// context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// // Create a stave of width 400 at position 10, 40 on the canvas.
// var topStaff = new VF.Stave(0,0, 500); // x, y, width
// var bottomStaff = new VF.Stave(0, 75, 500)
// // Add a clef and time signature.
// topStaff.addClef("treble")
// bottomStaff.addClef("bass")
// var brace = new Vex.Flow.StaveConnector(topStaff, bottomStaff).setType(1);

// // Connect it to the rendering context and draw!
// topStaff.setContext(context).draw();
// bottomStaff.setContext(context).draw();
// brace.setContext(context).draw();



// var bassNotes = [
//     // A quarter-note C.
//     new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w" }),
//     new VF.StaveNote({clef: "bass", keys: ["b/3"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["eb/2"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["e/2"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["f#/2"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w"}),
//     // new VF.StaveNote({clef: "bass", keys: ["c/3"], duration: "w"}),
//     new VF.GhostNote({duration: "w"}),
  
//     // A quarter-note D.
//     // new VF.StaveNote({clef: "bass", keys: ["d/4"], duration: "h" }),
  
//     // A quarter-note rest. Note that the key (b/4) specifies the vertical
//     // position of the rest.
//     // new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
  
//     // A C-Major chord.
//     // new VF.StaveNote({clef: "bass", keys: ["c/4", "e/4", "g/4"], duration: "q" })
//   ];

  // let trebleNotes = [
  //   new VF.GhostNote({duration: "w"}),
  //   new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   // new VF.GhostNote({duration: "w"}),
  //   new VF.StaveNote({clef: "treble", keys: ["C/4"], duration: "w"}).addAccidental(0, new VF.Accidental("#")),
  // ]
  
  // Create a voice in 4/4 and add above bassNotes
  // var bassVoice = new VF.Voice({num_beats: numOfPitches,  beat_value: 1});
  // bassVoice.addTickables(bassNotes);
  // let trebleVoice = new VF.Voice({num_beats: numOfPitches,  beat_value: 1});
  // trebleVoice.addTickables(trebleNotes);
  
  // Format and justify the notes to 400 pixels.
  // var formatter = new VF.Formatter().joinVoices([bassVoice, trebleVoice]).format([bassVoice, trebleVoice], 400);
  
  // Render voice
  // trebleVoice.draw(context,topStaff);
  // bassVoice.draw(context, bottomStaff);