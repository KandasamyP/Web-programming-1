const axios = require('axios');
const people = require('./people');


async function getWork() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json');
    //const parsedData = JSON.parse(data) // parse the data from JSON into a normal JS Object
    if(!data) {
        throw "ERROR: API call is failed";
    }
    
    if(typeof data == "string") {
        return JSON.parse(data) // parse the data from JSON into a normal JS Object 
    } else {
         return data // this will be the array of people objects
    }
    return data;
}

async function listEmployees() {    
    const workData = await getWork();
    const peopleData = await people.getPeople();
    let employees = [], listEmployees = [];
    workData.forEach(workElement => {
        employees = [];
        workElement.employees.forEach(index => {
            peopleData.forEach(element => {
                if(element.id == index) {
                    employees.push({first_name: element.first_name, last_name: element.last_name});
                }
            });
        });

        listEmployees.push({company_name: workElement.company_name , employees: employees});
    });
    return listEmployees;
}


async function fourOneOne(phoneNumber) {
    if (phoneNumber == undefined || phoneNumber == null) {
        throw "ERROR: Argument value should contain value in it";
    } else if (typeof phoneNumber != 'string') {
        throw "ERROR: Argument value should be of string input";
    } 

    phoneNumber = phoneNumber.trim();
    let checkValidPhNo = phoneNumber.split('-');
    if(checkValidPhNo.length != 3) {
        throw "ERROR: Phone number is not in proper ###-###-#### format";
    } else if(checkValidPhNo.length == 3) {
        if(checkValidPhNo[0].length != 3 || checkValidPhNo[1].length != 3 || checkValidPhNo[2].length != 4) {
            throw "ERROR: Phone number is not in proper ###-###-#### format";
        }        
    }

    const workData = await getWork();
    let obj = {};
    workData.forEach(element => {
        if((element.company_phone || "").trim() == phoneNumber) {
            obj = {company_name: element.company_name, company_address: element.company_address};
        }
    });

    if(Object.keys(obj).length == 0) {
        throw "ERROR: Company cannot be found for the given phone number, Please provide alternate phone number.";
    }

    return obj;
}

async function whereDoTheyWork(ssn) { 
    if (ssn == undefined || ssn == null) {
        throw "ERROR: Argument value should contain value in it";
    } else if (typeof ssn != 'string') {
        throw "ERROR: Argument value should be of positive integer";
    } 

    ssn = ssn.trim();
    let checkValidSsnNo = ssn.split('-');
    if(checkValidSsnNo.length != 3) {
        throw "ERROR: SSN number is not in proper ###-##-#### format";
    } else if(checkValidSsnNo.length == 3) {
        if(checkValidSsnNo[0].length != 3 || checkValidSsnNo[1].length != 2 || checkValidSsnNo[2].length != 4) {
            throw "ERROR: SSN number is not in proper ###-##-#### format";
        }        
    }

    const workData = await getWork();
    const peopleData = await people.getPeople();
    let pplElement = {}, wrkElement = {};

    peopleData.forEach(peopleElement => {
        if((peopleElement.ssn || "").trim() == ssn) {          
            pplElement = peopleElement;
            workData.map(workElement => {
                if(workElement.employees.indexOf(peopleElement.id) > -1) {
                    wrkElement = workElement;
                }
            });
        }
    });

    if(Object.keys(pplElement).length == 0 || Object.keys(wrkElement).length == 0) {
        throw "ERROR: Work details cannot be found for the given SSN number, Please provide alternate SSN number.";
    }

    return `${pplElement.first_name} ${pplElement.last_name} works at ${wrkElement.company_name}.`
}

module.exports = {
    listEmployees,
    fourOneOne,
    whereDoTheyWork
}