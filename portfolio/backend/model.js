import mongoose from "mongoose";

const usersch = new mongoose.Schema({
  username: String,
  email: String,
  subject: String,
  fullmsg: String,
});
export const user = mongoose.model("User", usersch);

const portfolioSchema = new mongoose.Schema({
  aboutMe: String,
  email: String,
  experiences: [
    {
      role: String,
      company: String,
      duration: String,
      description: String,
    },
  ],
  skills: [
    {
      name: String,
      logo: String,
      desc: String,
    },
  ],
  projects: [
    {
      title: String,
      link: String,
      description: String,
    },
  ],
});

export const Portfolio = mongoose.model("Portfolio", portfolioSchema);
