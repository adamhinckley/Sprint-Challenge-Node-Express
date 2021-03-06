const express = require("express");
const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors({ origin: "http://localhost:3000" }));

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

//endpoints for projects

server.get("/projects", (req, res) => {
  projects
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "the project info could not be received", err });
    });
});

server.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  projects
    .get(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "the action with the specified ID does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The action info could not be received", err });
    });
});

server.post("/projects", (req, res) => {
  projects
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "There was a error creating a new action" });
    });
});

server.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  projects
    .update(id, changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: `number of projects updated: ${count}` });
      } else {
        res.status(500).json({ message: "error updating the project" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "There was a error updating the project", err });
    });
});

server.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  actions
    .remove(id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: "error deleting the project", err });
    });
});

server.get("/projects/actions/:id", (req, res) => {
  const { id } = req.params;
  projects
    .getProjectActions(id)
    .then(actions => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "the project actions with the specified ID do not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "The project actions info could not be received", err });
    });
});

module.exports = server;
