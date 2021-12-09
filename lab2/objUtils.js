isObject = (item) => {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
}

const makeArrays = function makeArrays(arrOfObj) {
    if (!(Array.isArray(arrOfObj) && arrOfObj instanceof Array)) {
        throw "Error: Input value must be as array type";
    } else if ( arrOfObj.length < 2 ) {
        throw "Error: Atleast 2 elements inside array should be present";
    }
    let arr = [];
    for(let i=0; i< arrOfObj.length; ++i) {
        if( !isObject(arrOfObj[i])) {
            throw "Error: Input value should be in array of object types";
        } else if( (Object.keys(arrOfObj[i]) || []).length == 0 ) {
            throw "Error: Object inside array should not be empty, array of object should not be empty!";
        } 

        for(let j=0; j < Object.entries(arrOfObj[i] || []).length; ++j) {
            arr.push(Object.entries(arrOfObj[i])[j]);
        };
    }
    return arr;
}

const isDeepEqual = function isDeepEqual(obj1, obj2) {  

    if(!obj1 ) {
        throw "Error: Input argument should be provided to execute., Argument: first one is wrong";
    } else if (!obj2) {
        throw "Error: Input argument should be provided to execute., Argument: second one is wrong";
    } else if ( !(isObject(obj1)) ) {
        throw "Error: First Argument input value should be in Objects type.";
    } else if ( !(isObject(obj2)) ) {
        throw "Error: Second Argument input value should be in Objects type.";
    }

    if(Object.keys(obj1).length != Object.keys(obj2).length)
        return false;
      
    for (const property in obj1) {
        if (isObject(obj1[property]) && isObject(obj2[property])) {
            if (!isDeepEqual(obj1[property], obj2[property])) {
                return false;
            }
        } else if(obj1[property] != obj2[property]) {
            return false;
        }
    }

    return true;
}


const computeObject = function computeObject(object, func) {        
    if (object == null || object == undefined ) {
        throw "Error: First input argument is needed to compute object";
    } else if (func == null || func == undefined) {
        throw "Error: Second input argument is needed to compute object";
    } else if (!isObject(object)) {
        throw "Error: First input argument's value should of Object type.";
    } else if ((Object.keys(object) || []).length < 1) {
        throw "Error: First argument, Object input value should have atleast one key/value pair";
    } else if (typeof func != 'function') {
        throw "Error: Second input argument's value should of Function type"
    }

    for (const property in object) {
        if (typeof object[property] != 'number') {
            throw "Error: First arugment's Object key value should be number";
        }
        object[property] = func(object[property]);
    }

    return object;
}


module.exports = {
    firstName: "Kandasamy",
    lastName: "Parthasarathy",
    studentId: "10473056",
    makeArrays,
    isDeepEqual,
    computeObject  
};