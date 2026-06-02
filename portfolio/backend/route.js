import express from 'express';
import { user, Portfolio } from './model.js';

const router = express.Router();

// SIMPLE ADMIN LOGIN
router.post('/admin', (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASS) {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false, message: 'Wrong password' });
});

// MIDDLEWARE TO PROTECT ADMIN ROUTES
function verifyAdmin(req, res, next) {
  const pass = req.headers['admin-pass'];
  if (pass === process.env.ADMIN_PASS) return next();

  return res.status(403).json({ message: 'Access denied' });
}

// CONTACT FORM SUBMISSION
router.post('/submit', async (req, res) => {
  try {
    const userpost = await user.create(req.body);
    res.json({ message: 'New user created', userpost });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// ADMIN-ONLY: GET ALL CONTACT RESPONSES
router.get('/responses', verifyAdmin, async (req, res) => {
  const userres = await user.find().lean();
  res.json(userres);
});

// GET PORTFOLIO (PUBLIC)
router.get("/portfolio", async (req, res) => {
  try {
    let data = await Portfolio.findOne().lean();

    if (!data) {
      data = {
        aboutMe: "",
        email: "",
        experiences: [],
        projects: [],
        skills: []
      };
    }

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err });
  }
});


// UPDATE PORTFOLIO (ADMIN-ONLY)
router.put('/portfolio', verifyAdmin, async (req, res) => {
  try {
    const updated = await Portfolio.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
