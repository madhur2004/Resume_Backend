const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  email: String,
  gitHub: String,
  linkedIn: String,
  phone: String,
  profile: String,
  strengths: String,
  internships: String,
  projects: String,
  certificates: String,
  languages: String,
  education: String,
  experience: String,
  skills: [String],
  template: String,
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);
