const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema ({
    attribute: {
        type: String,
        required: true,
        trim: true
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category