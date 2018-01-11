var mongoose = require('mongoose');


const Schema = mongoose.Schema;
const BreedSchema = new Schema({
  name: { type: String, 'default': '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completed: { type: Boolean, 'default': false },
  createdOn: { type: Date, 'default': new Date() },
  data:{
      userNameInput: String,
      userEmail: String,
      
  	  jackFirst: String,
      jackSecond: String,
      jackThird: String,
      jackFourth: String,

      odetteFirst: String,
      odetteSecond: String,
      odetteThird: String,
      odetteFourth: String,

      charlotteFirst: String,
      charlotteSecond: String,
      charlotteThird: String,
      charlotteFourth: String,

      tockFirst: String,
      tockSecond: String,
      tockThird: String,
      tockFourth: String,

  }
});

module.exports = mongoose.model('Breed', BreedSchema);