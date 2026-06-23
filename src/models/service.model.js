const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Gold', 'Boosting', 'Raids', 'Accounts', 'Coaching'],
    },
    price: {
      type: Number,
      required: true,
    },
    region: {
      type: String,
      required: true,
      enum: ['EU', 'US'],
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'deleted'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;