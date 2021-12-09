arrayValidation = (array, value) => {
    if(array == undefined || array == null) {
        throw `Error: Pass an input value for ${value} calculation`;
    } else if(array.length == 0) {
        throw "Error: Array value should not be empty";
    } else if(!(array instanceof Array && Array.isArray(array))) {
        throw "Error: Input value type should be only array";
    }
};

const mean = function mean(array) {
    arrayValidation(array, "mean");  

    let sum = 0;
    for(let i=0; i < array.length; ++i) {
        if(typeof(array[i]) !== 'number') {
           throw "Error: Array element should be number for mean calculation";
        }
        sum += array[i];
    }
    return Math.round(( (sum/array.length) + Number.EPSILON ) * 100) / 100;  
}

const medianSquared = function medianSquared(array) {   
    arrayValidation(array, "median squared");  

    let sum = 0;
    for(let i=0; i < array.length; ++i) {
        if(typeof(array[i]) !== 'number') {
           throw "Error: Array element should be number for median squared calculation";
        }
        sum += array[i];
    }

    return Math.round(( Math.pow(sum/array.length , 2) + Number.EPSILON ) * 100) / 100;
}

const maxElement = function maxElement(array) {
    arrayValidation(array, "maxElement");

    let maxNumber = 0, indexValue = 0, obj = {};
    for(let i=0; i < array.length; ++i) {
        if(typeof(array[i]) != 'number') {
            throw "Error: Array element should be number for mean calculation";
        }
        if( array[i] > maxNumber) {
            maxNumber = array[i];
            indexValue = i;
        } 
    }    
    obj[maxNumber] = indexValue;

    return obj;
}


const fill = function fill(end, value) {            
    if(end == undefined || end == null) {
        throw "Error: First argument fill element should be present";  
    } else if( !(end > 0) || typeof end != 'number') {
        throw "Error: First argument fill element should be only positive integer greater than zero (0)";
    } else if(typeof end != 'number') {
        throw "Error: First argument fill element should be only integer greater than zero (0)";
    }

    let arr = [];    
    
    for(let i=0; i < end; ++i) {
        if(arguments.length > 1) {
           arr.push(value);
        } else {
            arr.push(i);
        }        
    }
    return arr;
}

const countRepeating = function countRepeating(array) {

    if (array == undefined || array == null) {
        throw "Error: pass an input for countRepeating calculation";
    } else if ( !(array instanceof Array && Array.isArray(array)) ) {
        throw "Error: input type should be in array";
    }

    let count = {};
    for(let i=0; i < array.length; ++i) {
        if( typeof array[i] == "string" || typeof array[i] == "number") {
            if(count[array[i]] == undefined) {
                    count[array[i]] = 1;
            } else {
                    count[array[i]] = count[array[i]] + 1;
            }
        } else {
            throw "Error: array element should contain either string or number";
        }
    }

    for (const property in count) {
        if(count[property] == 1) {
            delete count[property];
        }
    }
    return count;
}

const isEqual = function isEqual(arrayOne, arrayTwo) {  

    if (arrayOne == undefined || arrayOne == null ) {
        throw "Error: First argument pass an input for array to perform equal operation";
    } else if (arrayTwo == undefined || arrayTwo == null) {
        throw "Error: Second argumentpass an input for array to perform equal operation";
    } else if ( !(arrayOne instanceof Array && Array.isArray(arrayOne)) ) {
        throw "Error: First argument input type, it should be in array";
    } else if ( !(arrayTwo instanceof Array && Array.isArray(arrayTwo)) ) {
        throw "Error: Second argument input type, it should be in array";
    }   

    if(arrayOne.length != arrayTwo.length)
      return false;

    arrayOne.sort();
    arrayTwo.sort();
    for(let i=0; i<arrayOne.length; ++i) {
        if( (arrayOne[i] instanceof Array && Array.isArray(arrayOne[i])) && (arrayTwo[i] instanceof Array && Array.isArray(arrayTwo[i])) ) {
            if(!isEqual(arrayOne[i].sort(), arrayTwo[i].sort())) {
                return false;
            }                
        } else if(arrayOne[i] !== arrayTwo[i]) {
            return false;   
        }                 
    }

    return true;
}

module.exports = {
    firstName: "Kandasamy",
    lastName: "Parthasarathy",
    studentId: "10473056",
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual  
};


