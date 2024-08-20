import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get('/api/categories');
    setCategories(response.data);
  };

  const addCategory = async () => {
    const response = await axios.post('/api/categories', { name: newCategoryName, widgets: [] });
    setCategories([...categories, response.data]);
    setNewCategoryName('');
  };

  const addWidget = async (categoryId, widgetName, widgetText) => {
    const response = await axios.post(`/api/categories/${categoryId}/widgets`, { name: widgetName, text: widgetText });
    setCategories(categories.map(cat => cat._id === categoryId ? response.data : cat));
  };

  const removeWidget = async (categoryId, widgetId) => {
    const response = await axios.delete(`/api/categories/${categoryId}/widgets/${widgetId}`);
    setCategories(categories.map(cat => cat._id === categoryId ? response.data : cat));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="mb-6">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Category
        </button>
      </div>

      {categories.map(category => (
        <div key={category._id} className="mb-8 p-4 bg-white rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
          <button
            onClick={() => addWidget(category._id, 'New Widget', 'Widget Text')}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mb-4"
          >
            + Add Widget
          </button>
          <div className="space-y-4">
            {category.widgets.map(widget => (
              <div key={widget._id} className="border border-gray-200 rounded p-3 shadow-sm">
                <h3 className="text-xl font-medium">{widget.name}</h3>
                <p className="text-gray-600">{widget.text}</p>
                <button
                  onClick={() => removeWidget(category._id, widget._id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove Widget
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
