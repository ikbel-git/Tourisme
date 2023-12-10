var express = require('express');
var Produit = require('../model/produit');

async function addProdSocket(io, produit) {
  try {
    const newProduit = new Produit(produit);
    const savedProduit = await newProduit.save();

    // Emit an event with the product data and the associated small business ID
    io.emit('produitAdded', savedProduit);
    console.log('Product added to the database');
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function addProduit(req, res, next) {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(200).send('Produit added successfully');
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
}
async function show(req, res, next) {
  try {
      const data = await Produit.find();
      console.log(data);

      // Return the data to the caller
      return data;
  } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      throw err; // Make sure to propagate the error
  }
}
async function deleteProduit(produitId) {
  try {
    await Produit.findByIdAndDelete(produitId);
    console.log(`Deleted produit with ID: ${produitId}`);
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error so it can be caught and handled in the socket event
  }
}

/*
async function show(req, res, next) {
  try {
    const data = await Produit.find();
    console.log(data);

    //res.json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteProduit(req, res, next) {
  try {
    await Produit.findByIdAndDelete(req.params.id);
    res.json("deleted");
  } catch (err) {
    console.log(err);
  }
}*/

async function updateProduit(req, res, next) {
  try {
    await Produit.findByIdAndUpdate(req.params.id, req.body);
    res.json("updated");
  } catch (err) {
    console.log(err);
  }
}

async function showOne(req, res, next) {
  try {
    const data = await Produit.findById(req.params.id);
    res.json({ data });
  } catch (err) {
    console.log(err);
  }
}

async function showbyname(req, res, next) {
  try {
    const data = await Produit.findOne({ name: req.params.name });
    res.send({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  addProduit,
  show,
  deleteProduit,
  updateProduit,
  showbyname,
  showOne,
  addProdSocket
};
