const lab1 = require("./lab1");

console.log(lab1.questionOne([0, -1, 4, 2, 3])); 
// should return and output {'0': false, '-1': false, '4': false, '2': true, '3': true}

console.log(lab1.questionOne([0, 1, 5, 5])); 
//returns and outputs: {'5':true, '5': true, '1': false, '0': false} 

console.log(lab1.questionOne([0])); 
// returns and outputs: {'0': false} 

console.log(lab1.questionOne([-2])); 
//returns and outputs: {'-2': false}

console.log(lab1.questionOne([2, 7, 17, 1013])); 
// returns and outputs: {'2': true, '7': true, '17': true, '1013': true}

console.log(lab1.questionOne([])); 
// returns and outputs: {}

console.log(lab1.questionOne()); 
// returns and outputs: {}


console.log(lab1.questionTwo([0,2,3])); 
// should return and output 609.34 

console.log(lab1.questionTwo([1,2,3])); 
// should return and output 733.36 

console.log(lab1.questionTwo([5, 3, 10])); 
//returns and outputs: 207855.73

console.log(lab1.questionTwo([-5, -3, -10])); 
//returns and outputs: 207855.73

console.log(lab1.questionTwo([5, 10, 9])); 
// returns and outputs: 609071.18

console.log(lab1.questionTwo([2, -7, 9])); 
//  returns and outputs: 207855.73

console.log(lab1.questionTwo([])); 
//returns and outputs: 0


console.log(lab1.questionThree("/\"\" `~/.")); 
// should return and output {consonants: 24, vowels: 11, numbers: 0, spaces: 1, punctuation: 3, specialCharacters: 4}

console.log(lab1.questionThree("The q.")); 
// returns and outputs: {consonants: 3, vowels: 1, numbers: 0, spaces: 1, punctuation: 1, specialCharacters: 0}

console.log(lab1.questionThree("How 111 ... now brown cow!!!"));
// returns and outputs: {consonants: 10, vowels: 4, numbers: 3, spaces: 5, punctuation: 6, specialCharacters: 0}


console.log(lab1.questionThree("One day,'s respect."));
//  returns and outputs: {consonants: 9, vowels: 5, numbers: 0, spaces: 2, punctuation: 3, specialCharacters: 0}

console.log(lab1.questionThree("CS 546 is going to be fun & I'm looking forward to working with you all this semester!!" )); 
// returns and outputs: {consonants: 40, vowels: 23, numbers: 3, spaces: 17, punctuation: 3, specialCharacters: 1}

console.log(lab1.questionThree("")); 
// returns and outputs: {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}

console.log(lab1.questionThree()); 
// returns and outputs: {consonants: 0, vowels: 0, numbers:0, spaces: 0, punctuation: 0, specialCharacters: 0}


console.log(lab1.questionFour(25000, 3.11, 5)); 
// Loan Amount: 25,000 , interest rate: 3.11% (0.0311), term: 5 years (5*12 = 60 monthly payments)
//returns and outputs: 450.44

console.log(lab1.questionFour(30000, 0, 6)); 
//returns and outputs: NaN

console.log(lab1.questionFour(19500, 7, 0)); 
//returns and outputs: 0

console.log(lab1.questionFour(0, 2, 6)); 
//returns and outputs: 0

console.log(lab1.questionFour(0, 0, 0)); 
//returns and outputs: 0

console.log(lab1.questionFour(30000, 5, 6)); 
//returns and outputs: 483.15

console.log(lab1.questionFour(19500, 7, 3)); 
//returns and outputs: 602.1

console.log(lab1.questionFour(55000, 2, 6)); 
//returns and outputs: 811.27

console.log(lab1.questionFour(33000, 4.5, 2)); 
//returns and outputs: 1440.38