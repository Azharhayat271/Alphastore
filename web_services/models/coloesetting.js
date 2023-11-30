const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  headerColor: {
    type: String,
    required: true,
  },
  bodyColor: {
    type: String,
    required: true,
  },
});

const ColorModel = mongoose.model('Color', colorSchema);

module.exports = ColorModel;
