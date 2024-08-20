const mongoose = require('mongoose');

const WidgetSchema = new mongoose.Schema({
    name: String,
    text: String,
});

const CategorySchema = new mongoose.Schema({
    name: String,
    widgets: [WidgetSchema],
});

module.exports = mongoose.model('Category', CategorySchema);
