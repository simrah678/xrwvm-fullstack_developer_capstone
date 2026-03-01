const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

// IMPORTANT: The lab structure requires the "data/" prefix to find the JSON files
const reviews_data = JSON.parse(fs.readFileSync("data/reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("data/dealerships.json", 'utf8'));

mongoose.connect("mongodb://mongo_db:27017/",{'dbName':'dealershipsDB'});

const Reviews = require('./review');
const Dealerships = require('./dealership');

// Initialize database with data from JSON files
try {
  Reviews.deleteMany({}).then(()=>{
    Reviews.insertMany(reviews_data['reviews']);
  });
  Dealerships.deleteMany({}).then(()=>{
    Dealerships.insertMany(dealerships_data['dealerships']);
  });
} catch (error) {
  console.error('Error during Data Initialization:', error);
}

// Home route
app.get('/', async (req, res) => {
    res.send("Welcome to the Mongoose API");
});

// 1. Fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

// 2. Fetch reviews by a particular dealer ID
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({dealership: req.params.id});
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealer reviews' });
  }
});

// 3. Fetch all dealerships (Implemented)
app.get('/fetchDealers', async (req, res) => {
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealerships' });
  }
});

// 4. Fetch Dealers by a particular state (Implemented)
app.get('/fetchDealers/:state', async (req, res) => {
  try {
    const documents = await Dealerships.find({ state: req.params.state });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers by state' });
  }
});

// 5. Fetch dealer by a particular ID (Implemented)
app.get('/fetchDealer/:id', async (req, res) => {
  try {
    const document = await Dealerships.findOne({ id: req.params.id });
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealer by ID' });
  }
});

// 6. Insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    const documents = await Reviews.find().sort( { id: -1 } );
    let new_id = documents[0]['id'] + 1;

    const review = new Reviews({
        "id": new_id,
        "name": data['name'],
        "dealership": data['dealership'],
        "review": data['review'],
        "purchase": data['purchase'],
        "purchase_date": data['purchase_date'],
        "car_make": data['car_make'],
        "car_model": data['car_model'],
        "car_year": data['car_year'],
    });

    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
    try {
      // We use parseInt to make sure we are looking for a number, not a string
      const document = await Dealerships.findOne({ id: parseInt(req.params.id) });
      
      if (!document) {
          return res.status(404).json({ error: 'Dealer not found' });
      }
      
      res.json(document);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching dealer by ID' });
    }
  });