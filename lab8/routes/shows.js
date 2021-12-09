const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => { 
  try {
    if(req.params.id < 0) {
        res.status(400).render('error/genericError', {title:"Bad Request", error: 'Positive whole number is expected for shows get ID filed'});
        return;
    } else if(isNaN(parseInt(req.params.id))) {
        res.status(400).render('error/genericError', {title:"Bad Request", error: 'Only Positive whole number is expected for shows get ID filed'});
        return;
    }

    req.params.id = req.params.id.trim();  
    const showsList = await await axios.get(`http://api.tvmaze.com/shows/${req.params.id}`);

    if (showsList.data.summary && typeof showsList.data.summary == 'string')
      showsList.data.summary =  showsList.data.summary.replace(/<[^>]*>/g, ' ');

    res.render('pages/listShows', { title: showsList.data.name, showsListById: showsList.data });
    return;
  } catch (e) {    
    res.status(404).render('error/genericError', {title:"Not Found", error: `No shows found for Shows ID: ${req.params.id}`});
    return;
  }
});

module.exports = router;