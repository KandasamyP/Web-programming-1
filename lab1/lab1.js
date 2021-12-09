const questionOne = function questionOne(arr) {
    let obj = {};

    if (!arr || arr.length == 0)
        return obj;
    
    for (let arrayIndex = 0; arrayIndex < arr.length; ++arrayIndex) { 
       if (arr[arrayIndex] < 2) {
            obj[arr[arrayIndex]] = false;
            continue;
       } else {
            obj[arr[arrayIndex]] = true;         
       }

        for (let i = 2; i < arr[arrayIndex]; ++i) {             // to validate prime no will start from index 2
            if ((arr[arrayIndex] % i) === 0) {
                obj[arr[arrayIndex]] = false;
                break;
            }
        }
    }

    return obj;     
};


const questionTwo = function questionTwo(arr) {
    let sumOfSquare = 0;

    if (!arr || arr.length == 0)
        return sumOfSquare;
    
    for (let arrayIndex = 0; arrayIndex < arr.length; ++arrayIndex) { 
        sumOfSquare += Math.pow( arr[arrayIndex] , 2);
    }
    
    return Math.round(( Math.sqrt( Math.pow(sumOfSquare , 5) ) + Number.EPSILON ) * 100) / 100;
};


const questionThree = function questionThree(str) {
    let obj = {'consonants': 0,  'vowels': 0,  'numbers': 0, 'spaces': 0,  'punctuation': 0, 'specialCharacters': 0};

    if (!str || str.length == 0)
        return obj;

    obj.vowels = ( str.match(/[aeiou]/gi) || [] ).length;
    obj.consonants = ( str.match(/[a-z]/gi) || [] ).length - obj.vowels;
    obj.numbers = ( str.match(/[0-9]/g) || [] ).length;
    obj.spaces = ( str.match(/ /g) || [] ).length;
    obj.punctuation = ( str.match(/([\,\.\?\!\;\:\(\)\{\}\[\]\"\'\-])/g) || [] ).length;
    obj.specialCharacters = ( str.match(/([\#\$\%\&\^\~\|\/\@\&\*\`\\\_\+\<\>])/g) || [] ).length;

    return obj;
};


const questionFour = function questionFour(num1, num2, num3) {
    if (num3 == 0)                             // preventing infinity output
      return 0;
    let principal = num1;
    let interestRate = num2 / (100 * 12);
    let term = num3 * 12;
    let numerator = (interestRate * ( Math.pow( 1 + interestRate, term ) ));
    let denominator = ((Math.pow( 1 + interestRate, term )) - 1);

    return Math.round(( principal * ( numerator / denominator )) * 100) / 100;
};
  

module.exports = {
    firstName: "Kandasamy",
    lastName: "Parthasarathy",
    studentId: "10473056",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};

