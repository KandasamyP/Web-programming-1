const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => { 
  try {
    const post = await axios.get("http://api.tvmaze.com/shows");
    res.json(post.data);
    return;
  } catch (e) {
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
});

router.get('/:id', async (req, res) => { 
  try {  
    if(req.params.id < 0) {
        res.status(400).json({name:"Bad Request", message: 'Positive whole number is expected for shows get ID filed'});
        return;
    } else if(isNaN(parseInt(req.params.id))) {
        res.status(400).json({name:"Bad Request", message: 'Only Positive whole number is expected for shows get ID filed'});
        return;
    }

    req.params.id = req.params.id.trim();  
    const postList = await await axios.get(`http://api.tvmaze.com/shows/${req.params.id}`);

    res.status(200).json(postList.data);
    return;
  } catch (e) {    
    res.status(404).json({ name:"Not Found", message: 'Shows not found' });
    return;
  }
});

module.exports = router;