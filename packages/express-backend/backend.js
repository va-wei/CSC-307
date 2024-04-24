import express from "express";
import cors from "cors";

import userService from "./services/user-service.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World!");
})

// add user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const userId = userService.generateRandomId();

  userToAdd.id = userId; 
  userService
    .addUser(userToAdd)
    .then((result) => {
      res.status(201).send(result); 
    })
    .catch((error) => {
      res.status(500).send(error.name);
    });
});

// get user by id
app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];

  userService.findUserById(id).then((result) => {
    if (result) {
      res.send(result);
    } else {
      res.status(404).send(`Not Found: ${id}`);
    }
  })
  .catch((error) => {
    res.status(500).send(error.name);
  });
});

// get users by name or job or both
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred in the server.")
    });
});

// remove a user, given their id
app.delete("/users/:id", async (req, res) => {
  const id = req.params.id.toString();

  userService.deleteUserById(id)
    .then((result) => {
      if (result) {
        res.status(204).send() // successful delete
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    })
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

