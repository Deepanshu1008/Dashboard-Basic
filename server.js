const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mern_dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const Category = require('./models/Category');

// Get all categories
app.get('/api/categories', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

// Create a new category
app.post('/api/categories', async (req, res) => {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.json(newCategory);
});

// Add a widget to a category
app.post('/api/categories/:id/widgets', async (req, res) => {
    const category = await Category.findById(req.params.id);
    category.widgets.push(req.body);
    await category.save();
    res.json(category);
});

// Remove a widget from a category
app.delete('/api/categories/:id/widgets/:widgetId', async (req, res) => {
    const category = await Category.findById(req.params.id);
    category.widgets.id(req.params.widgetId).remove();
    await category.save();
    res.json(category);
});
