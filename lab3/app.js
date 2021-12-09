const people = require("./people");
const work = require("./work");

async function main(){
    try{
        const peopledata = await people.getPersonById(43);

        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

     try{
        const peopledata = await people.getPersonById();

        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await people.howManyPerState("CO"); 
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }


    try{
        const peopledata = await people.howManyPerState(); 
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }


    try{
        const peopledata = await people.personByAge(999); 
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await people.personByAge(-1); 
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{
        const peopledata = await people.peopleMetrics(); 

        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    
    // ======================   Work.js test cases ========================//
    try{
        const peopledata = await work.listEmployees(); 

        console.log (peopledata);
    }catch(e){
        console.log (e);
    }


    try{
        const peopledata = await work.fourOneOne('240-144-7553'); 
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

     try{
        const peopledata = await work.fourOneOne('240&-144-7553'); 
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{        
        const peopledata = await work.whereDoTheyWork('299-63-8866'); 
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }

    try{        
        const peopledata = await work.whereDoTheyWork("264-67-0084"); 
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

//call main
main();