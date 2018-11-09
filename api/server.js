const express = require("express");
const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");

const server = express();

server.use(express.json());

//endpoints for actions

server.get("/actions", (req, res) => {
  actions
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "the action info could not be received", err });
    });
});

server.get("/actions/:id", (req, res) => {
  const { id } = req.params;
  console.log("get with ID", req.params);
  actions
    .get(id)
    .then(action => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "the action with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The action info could not be received", err });
    });
});

server.post("/actions", (req, res) => {
  actions
    .insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "There was a error creating a new action" });
    });
});

server.put("/actions/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  actions
    .update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `number of actions updated: ${count}` });
      } else {
        res.status(500).json({ message: "error updating the action" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was a error creating a new action", err });
    });
});

server.delete("/actions/:id", (req, res) => {
  const { id } = req.params;
  actions
    .remove(id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting the action", err });
    });
});

module.exports = server;
