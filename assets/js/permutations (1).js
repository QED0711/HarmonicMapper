class Permutation{
    getPermuts(array, start, output){
        if (start >= array.length) {
            var arr = array.slice(0); //clone the array		
            output.push(arr);
        } else {
            var i;
            
            for (i = start; i < array.length; ++i) {
                this.swap(array, start, i);	
                this.getPermuts(array, start + 1, output);	
                this.swap(array, start, i);	
            }
        }
    }

    getAllPossiblePermuts(array, output){
        this.getPermuts(array, 0, output);
    }

    swap(array, from, to){
        var tmp = array[from];
        array[from] = array[to];
        array[to] = tmp;
    }

}

function permutationGenerator(array){
    let output = [];
    p = new Permutation;
    p.getAllPossiblePermuts(array, output);
    return output
}

// permutationGenerator([1,2,3,4,5,6,7,8])

export default permutationGenerator;