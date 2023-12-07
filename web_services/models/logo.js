const mongoose = require('mongoose');

const logoSchema = new mongoose.Schema({
  logoUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Logo = mongoose.model('Logo', logoSchema);

module.exports = Logo;
