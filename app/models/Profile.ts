
import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  linkedinJson: {
    type: Object,
    required: false
  },
  orcidJson: {
    type: Object,
    required: false
  },
  name: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
