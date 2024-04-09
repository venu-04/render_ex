import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => {
    console.log("Connected to MongoDB");
 })
 .catch((error) => {
    console.log("Connection to MongoDB failed:", error);
 });

const userSchema = new mongoose.Schema({
 name: String,
 email: String,
});

const User = mongoose.model('User', userSchema);

app.get('/user', async (req, res) => {
 try {
    const users = await User.find({});
    res.status(200).json(users);
 } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
 }
});


app.post('/user', async (req, res) => {
    try {
      const userData = req.body;
      const newUser = new User(userData);
      await newUser.save();
      console.log('User saved:', newUser);
     
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Failed to save user' });
    }
});

const port = 4500;
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
