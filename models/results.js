var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ResultSchema = new Schema({
		text: String,
	    anger: Number,
	    disgust: Number,
	    fear: Number,
 	    joy: Number,
        sadness: Number,
        postTime: [String],
        comment: String
    })

module.exports = mongoose.model('Result', ResultSchema)