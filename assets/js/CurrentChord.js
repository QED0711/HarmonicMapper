class CurrentChord {
    constructor(chordArr){
        this.chord = chordArr;
        this.expanded = this.expandChord()
        this.compressed = this.compressChord();
        this.scale = this.chord.map(x => x).sort((a,b) => a-b);
        this.vector = toVector(chordArr)/* .join('') */;
        this.names = this.toNames();
    }

    expandChord(){
        let expanded = this.chord.map(x => x);
        
        for(let i = 1; i < expanded.length; i++){
            let curNote = expanded[i-1];
            while(expanded[i] < curNote){
                expanded[i] += 12
            }
        }
        return expanded
    }

    compressChord(){
        let compressed = this.chord.map(x => x);
        for(let i = 1; i < compressed.length; i++){
            while(compressed[i] > compressed[0]+12){
                compressed[i] -= 12;
            }
        }
        return compressed
    }
    
    toNames(){
        let pitchNames = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B']
        let names = [];
        this.chord.forEach(note =>{
            names.push(pitchNames[parseInt(note)]);
        })
        return names;
    }
    
    offset(octave, pitch){
        this.chord = this.chord.map(x => x+(octave*12)+pitch)
        this.scale = this.scale.map(x => x + (octave*12)+pitch)
        this.expanded = this.expanded.map(x => x+(octave*12)+pitch);
        this.compressed = this.compressed.map(x => x+(octave*12)+pitch); 
    }
}