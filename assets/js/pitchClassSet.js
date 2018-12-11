
const Vector = require('./analyze').Vector
const analyze = require('./analyze').analyze

class PitchClassSet{
    
    constructor(pitchClasses){
        this.pcs = pitchClasses

        this.size = this.pcs.length;
    }

    vector(){
        let vector = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
        for(let i = 0; i < this.pcs.length; i++){
            for(let j = i + 1; j < this.pcs.length; j++){
                let ic = Math.abs(this.pcs[i] - this.pcs[j]);
                ic <= 6 ? vector[ic] += 1 : vector[12 - ic] += 1
            }
        }
        return vector;
    }

    vectorArray(){
        let vector = this.vector();
        let vectorArr = [];
        for(let key in vector){
            vectorArr.push(vector[key]);
        }
        return vectorArr;
    }

    vectorString(brackets = "<>"){
        return brackets[0] + this.vectorArray().join(", ") + brackets[1];
    }

    findLPCIS(setLimit = 6){
        let vector = new Vector(this.vectorArray());
        return analyze(vector, setLimit);
    }


}

let pcs = new PitchClassSet([0, 7, 11, 2, 9, 8, 4])

console.log(pcs.findLPCIS());

