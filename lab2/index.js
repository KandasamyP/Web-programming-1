const { mean, medianSquared, maxElement, fill, countRepeating, isEqual } = require("./arrayUtils");
const { camelCase, replaceChar, mashUp } = require("./stringUtils");
const { makeArrays, isDeepEqual, computeObject } = require("./objUtils");

//  =================  Array Utils.js test cases  =========================

try {                                                // mean function test cases in arrayUtils.js
    // Should Pass
    const meanOne = mean([2, 0, 4]);
    console.log(meanOne , ': mean passed successfully');
} catch (e) {
    console.error( e , ': mean failed test case');
}

try {
    // Should Fail
    const meanTwo = mean([undefined,2,3]);
    console.error(meanTwo, ': mean did not error');
} catch (e) {
    console.log(e,': mean failed successfully');
}

try {                                                // medianSquared function test cases in arrayUtils.js
    // Should Pass
    const medianSquaredOne = medianSquared([1, 2, 0 , -2]);
    console.log(medianSquaredOne , ': medianSquared passed successfully');
} catch (e) {
    console.error( e , ': medianSquared failed test case');
}

try {
    // Should Fail
    const medianSquaredTwo = medianSquared(["1", 3, "apple"]);  
    console.error(medianSquaredTwo, ': medianSquared did not error');
} catch (e) {
    console.log(e, ': medianSquared failed successfully');
}

try {                                                // maxElement function test cases in arrayUtils.js
    // Should Pass
    const maxElementOne = maxElement([1, 0, 2, 4]);
    console.log(maxElementOne , ': maxElement passed successfully');
} catch (e) {
    console.error( e , ': maxElement failed test case');
}

try {
    // Should Fail
    const maxElementTwo = maxElement(undefined, null); 
    console.error(maxElementTwo, ': maxElement did not error');
} catch (e) {
    console.log(e, ': maxElement failed successfully');
}


try {                                                    // fill function test cases in arrayUtils.js
    // Should Pass
    const fillPass = fill(6, undefined, "asd");
    console.log(fillPass , ': fill passed successfully');
} catch (e) {
    console.error(e, ': fill failed test case');
}
try {
    // Should Fail
    const fillFail = fill({}, {});
    console.error(fillFail, ': fill did not error');
} catch (e) {
    console.log(e , ': fill failed successfully');
}


try {                                                    // countRepeating function test cases in arrayUtils.js
    // Should Pass
    const countRepeatingPass = countRepeating([7, '7', 13, "Hello","Hello", "hello"]);
    console.log(countRepeatingPass , ': countRepeating passed successfully');
} catch (e) {
    console.error(e, ': countRepeating failed test case');
}
try {
    // Should Fail
    const countRepeatingFail = countRepeating([[] , "und"]);
    console.error(countRepeatingFail, ': countRepeating did not error');
} catch (e) {
    console.log(e , ': countRepeating failed successfully');
}


try {                                                    // isEqual function test cases in arrayUtils.js
    // Should Pass
    const isEqualPass =  isEqual([[9,2,3],[4,6,5],], [[2,9,3],[5,4,6],]);
    console.log(isEqualPass , ': isEqual passed successfully');
} catch (e) {
    console.error(e, ': isEqual failed test case');
}
try {
    // Should Fail
    const isEqualFail = isEqual( [4, 5, 6], {}); 
    console.error(isEqualFail, ': isEqual did not error');
} catch (e) {
    console.log(e , ': isEqual failed successfully');
}

//     ====================  String Utils.js test cases ========================

try {                                                    // camelCase function test cases in stringUtils.js
    // Should Pass
    const camelCasePass = camelCase("    undefined     null"); 

    console.log(camelCasePass , ': camelCase passed successfully');
} catch (e) {
    console.error(e, ': camelCase failed test case');
}
try {
    // Should Fail
    const camelCaseFail = camelCase(["Hello", "World"]);
    console.error(camelCaseFail, ': camelCase did not error');
} catch (e) {
    console.log(e , ': camelCase failed successfully');
}

try {                                                    // replaceChar function test cases in stringUtils.js
    // Should Pass
    const replaceCharPass = replaceChar("babbbbble");

    console.log(replaceCharPass , ': replaceChar passed successfully');
} catch (e) {
    console.error(e, ': replaceChar failed test case');
}
try {
    // Should Fail
    const replaceCharFail =  replaceChar(""); 

    console.error(replaceCharFail, ': replaceChar did not error');
} catch (e) {
    console.log(e , ': replaceChar failed successfully');
}

try {                                                    // mashUp function test cases in stringUtils.js
    // Should Pass
    const mashUpPass = mashUp ("h{}","e{}"); 
    
    console.log(mashUpPass , ': mashUp passed successfully');
} catch (e) {
    console.error(e, ': mashUp failed test case');
}
try {
    // Should Fail
    const mashUpFail =  mashUp ("h{}"," c  ") 
    console.error(mashUpFail, ': mashUp did not error');
} catch (e) {
    console.log(e , ': mashUp failed successfully');
}

//   ======================  Object Utils.js test cases =====================

try {                                                    // makeArrays function test cases in objUtils.js
    // Should Pass
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    const makeArraysPass = makeArrays([third, first, second]);
    
    console.log(makeArraysPass , ': makeArrays passed successfully');
} catch (e) {
    console.error(e, ': makeArrays failed test case');
}
try {
    // Should Fail
    const makeArraysFail =  makeArrays ([{"h": "h","e": "h"}, null]); 
    console.error(makeArraysFail, ': makeArrays did not error');
} catch (e) {
    console.log(e , ': makeArrays failed successfully');
}

try {                                                    // isDeepEqual function test cases in objUtils.js
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

    const isDeepEqualPass = isDeepEqual({}, {});
    
    console.log(isDeepEqualPass , ': isDeepEqual passed successfully');
} catch (e) {
    console.error(e, ': isDeepEqual failed test case');
}
try {
    // Should Fail
    const isDeepEqualFail =  isDeepEqual ({"h": "h","e": "h"} , "undefined"); 
    console.error(isDeepEqualFail, ': isDeepEqual did not error');
} catch (e) {
    console.log(e , ': isDeepEqual failed successfully');
}

try {                                                    // computeObject function test cases in objUtils.js
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

    const computeObjectPass = computeObject({ a: 3, b: 7, c: 5 }, n => n * 2); 
    
    console.log(computeObjectPass , ': computeObject passed successfully');
 } catch (e) {
    console.error(e, ': computeObject failed test case');
 }
 try {
    // Should Fail
    const computeObjectFail =  computeObject({"h": '3',"e": 4}, Function); 
    console.error(computeObjectFail, ': computeObject did not error');
 } catch (e) {
    console.log(e , ': computeObject failed successfully');
 }