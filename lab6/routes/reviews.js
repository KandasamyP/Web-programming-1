const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;
let { ObjectId } = require('mongodb');

function isValidDate(date) {
  var temp = date.split('/');
  if(temp.length > 2) {
      if(temp[2].length != 4) {
         return false;
      }
      var d = new Date(temp[2] + '/' + temp[0] + '/' + temp[1]);
      return (d && (d.getMonth() + 1) == temp[0] && d.getDate() == Number(temp[1]) && d.getFullYear() == Number(temp[2]));
  } else {
      return false;
  }
}

router.get('/:id', async (req, res) => {
  try {
    if(req.params.id === undefined || req.params.id === null) {
      throw new Error("Id value is needed");
    } else if(typeof req.params.id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(req.params.id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 
    ObjectId(req.params.id);
  } catch (e) {
    res.status(400).json({ error: e.message});
    return;
  }

  try {
    const reviewsList = await reviewsData.getAll(req.params.id);
    res.json(reviewsList);
    return;
  } catch (e) {
    res.status(404).json({ error: e.message });
    return;
  }
});

router.get('/review/:id', async (req, res) => {
  try {
    if(req.params.id === undefined || req.params.id === null) {
      throw new Error("Id value is needed");
    } else if(typeof req.params.id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(req.params.id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 
    ObjectId(req.params.id);
  } catch (e) {
    res.status(400).json({ error: e.message});
    return;
  }

  try {
    const reviewsList = await reviewsData.get(req.params.id);
    res.json(reviewsList);
    return;
  } catch (e) {
    res.status(404).json({ error: e.message });
    return;
  }
});

router.post('/:id', async (req, res) => {
  const reviewsPostData = req.body;
  try {
    if(req.params.id === undefined || req.params.id === null) {
      throw new Error("Id value is needed");
    } else if(typeof req.params.id !== 'string') {
        throw new Error("Id value should of string type");
    } else if(req.params.id.trim().length == 0) {
        throw new Error("Id value should not be empty");
    } 
    ObjectId(req.params.id);

    if(Object.keys(reviewsPostData).length != 5) {
      throw new Error("Only Title, Reviewer, Rating, dateOfReview, Review is expected in request");
    }

    if (!reviewsPostData.title) {
      throw new Error('You must provide reviews title');
    } else if(typeof reviewsPostData.title !== "string") {
      throw new Error("Title argument value should be of string type");
    } else if(reviewsPostData.title.trim().length == 0 ) {
        throw new Error("Title argument value should not contain empty string");
    } 

    if (!reviewsPostData.reviewer) {
      throw new Error('You must provide review reviewer');
    } else if(typeof reviewsPostData.reviewer !== "string") {
      throw new Error("Reviewer argument value should be of string type");
    } else if( reviewsPostData.reviewer.trim().length == 0 ) {
        throw new Error("Reviewer argument value should not contain empty string");
    } 

    if (!reviewsPostData.review) {
      throw new Error('You must provide reviews review');
    } else if(typeof reviewsPostData.review !== "string") {
      throw new Error("Review argument value should be of string type");
    } else if( reviewsPostData.title.trim().review == 0 ) {
        throw new Error("Review argument value should not contain empty string");
    } 

    if (!reviewsPostData.dateOfReview) {
      throw new Error('You must provide reviews dateOfReview' );
    } else if(typeof reviewsPostData.dateOfReview !== "string") {
      throw new Error("dateOfReview argument value should be of string type");
    } else if( reviewsPostData.dateOfReview.trim().length == 0 ) {
        throw new Error("dateOfReview argument value should not contain empty string");
    } else if(!isValidDate(reviewsPostData.dateOfReview)) {
        throw new Error("dateOfReview argument should be in format of MM/DD/YYYY format");
    }

    if(typeof reviewsPostData.rating != "number") {
      throw new Error("Rating argument should have number type as value");
    } else if(!(Math.floor(reviewsPostData.rating) === reviewsPostData.rating)) {
        throw new Error("Rating argument value should be whole number from 1 - 5");
    } else if (reviewsPostData.rating < 1 || reviewsPostData.rating > 5) {
        throw new Error("Rating argument value should have range of value from 1 - 5");
    } 
  } catch (e) {
      res.status(400).json({ error: e.message });
      return;
  }

  try {
    const { title, reviewer, rating, dateOfReview, review } = reviewsPostData;
    const newPost = await reviewsData.create(req.params.id, title, reviewer, rating, dateOfReview, review);
    res.json(newPost);
    return;
  } catch (e) {
    res.status(404).json({ error: e.message });
    return;
  }
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply ID to delete record in DB' });
    return;
  }

  try {
    const deletedData = await reviewsData.remove(req.params.id);
    res.status(200).json(deletedData);
    return;
  } catch (e) {
    res.status(404).json({ error: e.message });
    return;
  }
});


module.exports = router;