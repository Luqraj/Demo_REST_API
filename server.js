import express from "express";
const app = express();
const port = process.env.PORT || 5000;
import { users } from "./data.js";
app.use(express.urlencoded({ extended: false }));


// GET REQUEST OF USERS (ALL USERS)
app.get("/api/users", (req, res) => {
    res.json(users);
});

// GET REQUEST OF USERS (PER ID)

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({msg: `No user exists with the entered id: ${id}`})
    }
    res.status(200).json(user);
})

// POST REQUEST/CREATING A NEW USER

app.post("/api/users", (req, res) => {
    const id = users.length + 1;
   
    users.push({
      id: id,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
    });
    res.status(200).json(users);
  });


//   PUT REQUEST/UPDATING A USER ADDRESS

app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ msg: `No user exists with the entered id: ${id}` });
  }

  user.address = req.body.address;
  res.status(200).json(users);
});

// DELETE REQUEST/DELETING A USER INFO

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ msg: `No user exists with the entered id: ${id}` });
  }

  users = users.filter((user) => user.id !== id);

  res.status(200).json(users);
});


app.listen(port, () => console.log(`Server running on port ${port}`));