import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUsersByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};


const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) { // if the user DNE
    res.status(404).send("Resource not found.");
  } else { 
    const index = users["users_list"].indexOf(result); // get index of user
    users["users_list"].splice(index, 1); // remove from array
    res.send(`User with id ${id} has been deleted`);
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  // filter by both name and job if given
  if (name != undefined && job != undefined) {
    const filteredUsers = findUsersByNameAndJob(name, job);
    res.send({ users_list: filteredUsers });
  } else if (name != undefined) { // name only
    const filteredUsers = findUserByName(name);
    res.send({ users_list: filteredUsers });
  } else {
    res.send(users); // all users if no filter given
  }
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

