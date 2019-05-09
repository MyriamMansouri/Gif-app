//model for new gif

const mongoose = require('mongoose');

const gifSchema = new mongoose.Schema( {

    //TODOS unique doesn't work

    url: {
        type: String,
        unique: true,
        required: true
    } 
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // }
    }, {
    timestamps:true
});

const Gif = mongoose.model('Gif', gifSchema);

module.exports = Gif;