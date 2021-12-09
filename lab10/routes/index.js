const express = require("express");
const bcrypt = require('bcryptjs');
const users = require("./users");

const constructorMethod = (app) => {

  app.use(async (req, res, next) => {
    let message = "(Non-Authenticated User)";    
    if(req.session.user)
      message = "(Authenticated User)";

    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} ${message}`);
    next();
  });

  app.get('/', (req, res) => {
    if(!req.session.user) {
      res.render("pages/login", {title: "Login"});
      return;
    } else {
      res.redirect("/private");
    }
  });

  app.use('/private', function (req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(403).render('pages/not-logged-in', {title: "Not Authentication"});
        return;
    }
  });

  app.get('/private', (req, res) => {
    res.render('pages/private', {title: "Landing Page", user: req.session.user});
    return;
  });

  // app.use('/login', (req, res, next) => {
  //   if (req.session.user) {
  //     return res.redirect('/private');
  //   } else {
  //     //here I',m just manually setting the req.method to post since it's usually coming from a form
  //     req.method = 'POST';
  //     next();
  //   }
  // });

  app.post('/login', (req, res) => {
    if(req.session.user)
      res.redirect('/private');

    if(req.body) {
      const username = req.body.username;
      const password = req.body.password;
      let userLoggedIn = false;

      if (username === undefined || password === undefined || username.trim().length == 0 || password.trim().length == 0) {
        res.status(401).render('pages/login', {title: "Not Authentication", error: "Please enter username and Password"});
        return;
      }
      
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user.username === username && bcrypt.compareSync(password, user.hashedPassword)) {
            req.session.user = user;
            userLoggedIn = true;
            res.redirect("/private");
        }
      }

      if(!userLoggedIn) {
        res.status(401).render('pages/login', {title: "Not Authentication", error: "Invalid username and/or Password"});
        return;
      }
    }
      
  });

  app.get('/logout', (req, res) => {
    if(!req.session.user) {
      res.status(403).render('pages/not-logged-in', {title: "Not Authentication"});
      return;
    }
      
    req.session.destroy();
    res.render('pages/logout', {title: "Logout"});
    return;
  });

  app.use('*', (req, res) => {
    res.sendStatus(404).json();
    return;
  });
  
  
};

module.exports = constructorMethod;