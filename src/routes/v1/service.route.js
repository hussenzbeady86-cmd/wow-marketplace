const express = require('express');
const auth = require('../../middlewares/auth');
const serviceController = require('../../controllers/service.controller');

const router = express.Router();

// Routes for WoW Marketplace Services
router
  .route('/')
  .post(auth('manageServices'), serviceController.createService) // Only authorized sellers can post
  .get(serviceController.getServices); // Anyone (buyers) can view the services

module.exports = router;