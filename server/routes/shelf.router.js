const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "item"`
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows)
  })
  .catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  const itemToAdd = req.body
  const queryText = `INSERT INTO "item"
  ("description", "image_url", "user_id")
  VALUES ($1, $2, $3) `
  let queryValues = [req.body.description, req.body.image_url, req.user.id]
  pool.query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(201)
    }).catch((error) => {
      console.log(error)
      res.sendStatus(500)
    })
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/delete/:id', (req, res) => {
  // endpoint functionality
  const queryText = `DELETE FROM "item" WHERE id=$1`
  let queryValues = [req.params.id]
  pool.query(queryText, queryValues)
  .then((result) => {
    res.sendStatus(201)
  }).catch((error) => {
    console.log('error', error)
    res.sendStatus(500)
  })
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
