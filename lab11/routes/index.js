const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

const constructorMethod = (app) => {

  app.get('/', async (req, res) => {
    try {
        const showsList = await axios.get(`http://api.tvmaze.com/shows`);
        res.render("pages/landing", {title: "Shows List", showsList: showsList}); 
        return;
    } catch (e) {    
        console.log("ERROR:" , e);
        res.status(404).render('error/genericError', {title:"Not Found", error: `No shows found for Shows ID: ${req.params.id}`});
        return;
    }       
  });

//   app.post('/searchTerm', async (req, res) => {
//     try {
//         let textInput = document.getElementById('search_term');
//         if (textInput.value) {
//             const searchList = await axios.get(`http://api.tvmaze.com/search/shows?q=${textInput.value}`);
//             res.render("pages/searchTerm", {title: "Shows List", searchList: searchList}); 
//             return;
//         } else {

//         }
//     } catch (e) {    
//         console.log("ERROR:" , e);
//         res.status(404).render('error/genericError', {title:"Not Found", error: `No shows found for Shows ID: ${req.params.id}`});
//         return;
//     }  

//   });

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;