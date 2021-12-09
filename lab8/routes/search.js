const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let searchData = req.body;
        let errors = [];
      
        if (!searchData.searchTerm) {
            errors.push('No search term is provided');
        } else if (searchData.searchTerm.trim().length == 0) {
            errors.push('Search term cannot be empty');
        } 

        if (errors.length > 0) {
            res.status(400).render('layouts/index', {
              errors: errors,
              hasErrors: true,
              title: "Show Finder"
            });

            return;
        }

        const searchList = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchData.searchTerm}`);

        if(searchList.data.length == 0) {
            res.status(404).render('layouts/index', {
                hasNoResponseError: true,
                searchTerm: searchData.searchTerm,
                title: "Show Finder"
            }); 
            return;
        }

        if (searchList.data.length > 20) {
            searchList.data = searchList.data.slice(0, 20);
        }

        res.render('pages/search', { title: "Shows Found" , hasErrors: false, searchTerm: searchData.searchTerm , searchList: searchList.data });
        return;
    } catch (e) {   
        res.status(404).render('layouts/index', {
            hasNoResponseError: true,
            searchTerm: searchData.searchTerm,
            title: "Show Finder"
        }); 
        return;
    }    
});

module.exports = router;