var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    mobileNo: {
        type: Number,
        maxlength: 12,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true

    }
});

module.exports = mongoose.model('User', userSchema);