var express = require('express');
var SmallBusiness= require('../model/smallBusiness');

async function addsmallBSocket(io, smallBusiness) {
  try {
    const newSmallBusiness = new SmallBusiness(smallBusiness);
    const savedSmallBusiness = await newSmallBusiness.save();

    // Emit an event with the product data and the associated small business ID
    io.emit('smallBusinessAdded', savedSmallBusiness);
    console.log('SmallBusiness added to the database');
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function createSmallBusiness(req, res, next) {
  try {
 
     const smallBusiness = new SmallBusiness(req.body);
     await smallBusiness.save(); // Wait for the save operation to complete
     res.status(200).send('SmallBusiness added successfully');
  } catch (err) {
     console.log(err);
     res.status(500).send('Internal Server Error'); 
  }
 }

 async function showSmallBusinesses() {
  try {
      const data = await Business.find().populate('produits');
      // Return the data to the caller
      return data;
  } catch (err) {
      console.error(err);
      throw err; // Make sure to propagate the error
  }
}


 /*
async function show(req, res, next) {
  try {
    const data = await SmallBusiness.find();
    res.json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
}*/
async function deleteSmallBusiness (req, res, next) {
  try{
    await SmallBusiness.findByIdAndDelete(req.params.id, req.body);
     res.json("deleted");
  }catch(err){  
    console.log(err);
  }
};

async function updateSmallBusiness(req, res, next) {
  try{
    const data= await SmallBusiness.findByIdAndUpdate(req.params.id, req.body);
     res.json("updated");
  }catch(err){
    console.log(err);
  }
};
async function showOne (req, res, next) {
  try{
    const data= await SmallBusiness.findById(req.params.id);
     res.json({data});
  }catch(err){
    console.log(err);
  }
};

//get selon critére specifique
async function showbyname(req, res, next) {
  try {
  //  console.log(req.params.name)
    const data = await SmallBusiness.findOne(req.params );
    res.send({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = { createSmallBusiness, showSmallBusinesses,deleteSmallBusiness,updateSmallBusiness,showbyname,showOne,addsmallBSocket };
