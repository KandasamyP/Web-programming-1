stringValidation = (string) => {              
    if(string == undefined || string == null) {
        throw "Error: String input value should exit";
    } else if(typeof string != 'string') {
        throw "Error: Input should contain only string as value";
    } else if(string.length < 1) {
        throw "Error: String input value should not be empty";
    } else if(string.length == (string.match(/ /g) || []).length) {
        throw "Error: String input value should not contain only spaces in it";
    }
}

const camelCase = function camelCase(string) {    
    stringValidation(string);
    string = string.trim();

    let arr = [];
    let camelString = "";
    let appendString = "";
    
    arr = string.split(' ');
    for(let i=0; i<arr.length; ++i) {
        if (arr[i].length > 0) {
            appendString = arr[i].substr(0,1).toUpperCase() + arr[i].substr(1);
            camelString += appendString;
        }
    }
    return camelString.substr(0,1).toLowerCase() + camelString.substr(1);
}

const replaceChar = function(string) {
    stringValidation(string);
    string = string.trim();
    let count = 0, replacedString = string.substr(1);
   
    count = 1;
    for(let i=1; i<string.length; ++i) {
        if( string.charAt(i).toUpperCase() == string.charAt(0).toUpperCase() ) {
            if(count % 2 == 0) {
               replacedString = replacedString.replace(string.charAt(i), '$');
            } else {
               replacedString = replacedString.replace(string.charAt(i), '*');
            }
            ++count;
        }           
    }

    return string.substr(0,1) + replacedString;
}

const mashUp = function mashUp(string1, string2) {    
    stringValidation(string1, true);
    stringValidation(string2, true);
    string1 = string1.trim();
    string2 = string2.trim();

    if(string1.length < 2) {
        throw "Error: First String input value should have atleast 2 characters in it";
    }  
    if(string2.length < 2) {
        throw "Error: Second String input value should have atleast 2 characters in it";
    }      
        
    return string2.substr(0,2) + string1.substr(2) + " " + string1.substr(0,2) + string2.substr(2);
}


module.exports = {
    firstName: "Kandasamy",
    lastName: "Parthasarathy",
    studentId: "10473056",
    camelCase,
    replaceChar,
    mashUp  
};

