var Breed = require ('../models/breedSelect');

const breedCtrl = {

  // Initial server render
  // Gets all the tasks created by the current user from the DB
  // and sends them to the template
  get(req, res) {
    Breed.find(
      {completed: false},
      //{ createdBy: req.user._id },
      null,
      { sort: 'createdOn' }, // ascending
      (err, breeds) => {
        if (err) {
          logger.error(err);
          //return res.render('breeds/index', { err });
        }
        console.log('breeds', { breeds });
        res.json(breeds);
      }
    );
  },

  // Creates a new task, receives an object with the title property
  // Takes the user id from the req object
  create(req, res) {
    var uid=req.user._id;
    console.log('fist id log: '+ uid)
    console.log(req.body)

    Breed.remove({ 'createdBy': uid}, err => {//removes all entries for current user(keeps only the most current saved)
      if (err) {
        logger.error(err);
        return res.send(500);
      }
    });
    const newBreeds = new Breed({
      name: req.body.title,
      createdBy: req.user._id,
      createdOn: new Date(),
      data:{
          userNameInput: req.body.data.userNameInput,
          userEmail: req.body.data.userEmail,

          jackFirst: req.body.data.jackFirst,
          jackSecond: req.body.data.jackSecond,
          jackThird: req.body.data.jackThird,
          jackFourth: req.body.data.jackFourth,

          odetteFirst: req.body.data.odetteFirst,
          odetteSecond: req.body.data.odetteSecond,
          odetteThird: req.body.data.odetteThird,
          odetteFourth: req.body.data.odetteFourth,

          charlotteFirst: req.body.data.charlotteFirst,
          charlotteSecond: req.body.data.charlotteSecond,
          charlotteThird: req.body.data.charlotteThird,
          charlotteFourth: req.body.data.charlotteFourth,
        
          tockFirst: req.body.data.tockFirst,
          tockSecond: req.body.data.tockSecond,
          tockThird: req.body.data.tockThird,
          tockFourth: req.body.data.tockFourth,
      
      },
    });

    newBreeds.save(err => {
      if (err) {
        logger.error(err);
        console.log( res.status(500));
      }
      // Sends back ID of the new task
      console.log(newBreeds._id);
    });
  },

  // Updates the task - whether by its name
  // or the completion parameter (true/false)
  update(req, res) {
    // Checks for the completed property
    // Uses the undefined type as the property could be false
    if (req.body.completed !== undefined) {
      Breed.findOneAndUpdate(
        { _id: req.params.id },
        { completed: req.body.completed },
        { 'new': true },
        (err, breed) => {
          if (err) {
            logger.error(err);
            return res.status(500);
          }
          res.send({
            id: breed._id,
            completed: breed.completed
          });
        }
      );
    // If the completed property doesn't exist, update the task
    // with the specified name
    } else {
      Breed.findOneAndUpdate(
        { _id: req.params.id },
        { name: req.body.title },
        { 'new': true },
        (err, breed) => {
          if (err) {
            logger.error(err);
            return res.status(500);
          }
          res.send({
            id: breed._id,
            title: breed.name
          });
        }
      );
    }
  },

  // Removes task/s specified as the request parameter
  remove(req, res) {
    const params = req.params.id;
    const query = [];

    // Checks whether the id parameter contains any ampersands
    // which would mean we're trying to remove multiple tasks
    if (req.params.id.search(/&/) !== -1) {
      // Splits the query into an array
      const arr = req.params.id.split('&');
      arr.forEach(v => {
        query.push(v);
      });
    // Otherwise the parameter must contain a single task ID
    } else {
      query.push(params);
    }

    Breed.remove({ '_id': { '$in': query }}, err => {
      if (err) {
        logger.error(err);
        return res.send(500);
      }
      res.send({ query });
    });
  }
};

module.exports = breedCtrl;