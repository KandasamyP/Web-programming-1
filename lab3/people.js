const axios = require('axios');
async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json');
    if(!data) {
        throw "ERROR: API call is failed";
    }
    
    if(typeof data == "string") {
        return JSON.parse(data); // parse the data from JSON into a normal JS Object 
    } else {
        return data; // this will be the array of people objects
    }
    return data;
}

function getPersonAge(dateString) {
    let birthDate = new Date(dateString);
    let todayDate = new Date();
    let age = todayDate.getFullYear() - birthDate.getFullYear();
    let month = todayDate.getMonth() - birthDate.getMonth();
    if (month < 0 || (month == 0 && todayDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

async function getPersonById(id) {
    if (id == undefined || id == null) {
        throw "ERROR: Argument value should contain value in it";
    } else if (id < 0 || typeof id != 'number') {
        throw "ERROR: Argument value should be of positive integer";
    } 

    const peopleData = await getPeople();
    if(!peopleData) {
        throw "ERROR: API call is failed";
    }
    if (id >= peopleData.length) {
        throw "ERROR: Argument value should be within array boundary limit, please provide smaller value";
    }

    let personDataObject;
    peopleData.forEach(element => {
        if(element.id == id) {
            personDataObject = element;
        }
    });

    if(!personDataObject) {
        throw "ERROR: Id which is sent not matching any people, Please try with different ID";
    }

    return personDataObject;    
}

async function howManyPerState(stateAbbrv) {
    if (stateAbbrv == undefined || stateAbbrv == null) {
        throw "ERROR: Argument value should contain value in it";
    } else if (typeof stateAbbrv != 'string') {
        throw "ERROR: Argument value should be of positive integer";
    } 

    const peopleData = await getPeople();

    stateAbbrv = stateAbbrv.trim();
    let stateCount = 0;
    peopleData.forEach(element => {
        if(element.address.state.toLowerCase() == stateAbbrv.toLowerCase()) {
            ++stateCount;
        }
    });
    
    if(stateCount == 0) {
        throw `ERROR: There are no people living in ${stateAbbrv}`;
    }

    return stateCount;   
}

async function personByAge(index) {
    if (index == undefined || index == null) {
        throw "ERROR: Argument value should contain value in it";
    } else if (index < 0 || typeof index != 'number') {
        throw "ERROR: Argument value should be of positive integer";
    }

    const peopleData = await getPeople();
    if (index >= peopleData.length) {
        throw "ERROR: Argument value should be within array boundary limit, please provide smaller value";
    }
    
    let obj = { 
        first_name: '', 
        last_name: '', 
        date_of_birth: '', 
        age: 0
    };
  
    peopleData.sort(function(a,b) { 
        return new Date(a.date_of_birth).getTime() - new Date(b.date_of_birth).getTime(); 
    });

    if(!peopleData[index].first_name) {
        throw "ERROR: Id which is sent not matching any people, Please try with different ID";
    }

    obj.first_name = peopleData[index].first_name;
    obj.last_name = peopleData[index].last_name;
    obj.date_of_birth = peopleData[index].date_of_birth;
    obj.age = getPersonAge(peopleData[index].date_of_birth);

    return obj;
}

async function peopleMetrics() { 
    const peopleData = await getPeople();

    let peopleObj = {
        totalLetters: 0,
        totalVowels: 0,
        totalConsonants: 0,
        longestName: "",
        shortestName: "",
        mostRepeatingCity: 0,
        averageAge: 0
    };
    let totalAge = 0, countCity = {}, mostNoOfCity = 0, cityName;
    
    peopleData.forEach((element, index) => {
        element.first_name = element.first_name.trim();
        element.last_name = element.last_name.trim();
      
        let fullNameLength = (element.first_name || []).length + (element.last_name || []).length;
        let vowelsInName = (element.first_name.match(/[aeiou]/gi) || []).length + (element.last_name.match(/[aeiou]/gi) || []).length;
        let totalLettersInName = (element.first_name.match(/[a-z]/gi) || []).length + (element.last_name.match(/[a-z]/gi) || []).length;
        if(index == 0) {
            peopleObj.longestName = element.first_name + " " + element.last_name ;
            peopleObj.shortestName = element.first_name + " " + element.last_name ;
        }

        peopleObj.totalLetters += totalLettersInName;
        peopleObj.totalVowels += vowelsInName;
        peopleObj.totalConsonants += ((element.first_name.match(/[a-z]/gi) || []).length - (element.first_name.match(/[aeiou]/gi) || []).length) + ((element.last_name.match(/[a-z]/gi) || []).length - (element.last_name.match(/[aeiou]/gi) || []).length);
        peopleObj.longestName = fullNameLength >= (peopleObj.longestName || []).length ? (element.first_name + " " + element.last_name) : peopleObj.longestName;
        peopleObj.shortestName = fullNameLength >= (peopleObj.shortestName || []).length ? peopleObj.shortestName : (element.first_name + " " + element.last_name);
        totalAge += getPersonAge(element.date_of_birth);
        countCity[element.address.city] = (countCity[element.address.city] || 0) + 1;
    });

    peopleObj.averageAge = (totalAge/peopleData.length).toFixed();

    for(const property in countCity) {
        if(mostNoOfCity < countCity[property]) {
            cityName = property;
            mostNoOfCity = countCity[property];
        }
    }
    peopleObj.mostRepeatingCity = cityName;

    return peopleObj;
}

module.exports = {
    getPeople,
    getPersonById,
    howManyPerState,
    personByAge,
    peopleMetrics
}

