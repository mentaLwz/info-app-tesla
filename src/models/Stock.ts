import mongoose from 'mongoose';

// Define the schema for daily stock data
const DailyStockDataSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  open: {
    type: Number,
    required: true
  },
  high: {
    type: Number,
    required: true
  },
  low: {
    type: Number,
    required: true
  },
  close: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  dividends: {
    type: Number,
    required: true
  },
  stock_splits: {
    type: Number,
    required: true
  }
}, { _id: false });

// Define the main schema for Tesla stock data
const TeslaStockSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  data: {
    type: Map,
    of: DailyStockDataSchema
  }
}, { collection: 'tesla_stock' }); // Specify the collection name

// Create and export the model
const TeslaStock = mongoose.models.TeslaStock || mongoose.model('TeslaStock', TeslaStockSchema);

export default TeslaStock;