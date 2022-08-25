// Write your "actions" router here!
const { get, insert, update, remove } = require("./actions-model");
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  get()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get("/:id", (req, res, next) => {
  get(req.params.id)
    .then((response) => {
      if (response) {
        res.status(200).json(response);
      } else {
        throw new Error("No Action Found with that given ID");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});
router.post("/", (req, res, next) => {
  insert(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log("POST PROJECT ERROR");
      const status = !req.body.name || !req.body.description ? 400 : 500;
      res.status(status).json(err);
    });
});
router.put("/:id", (req, res, next) => {
    if (!req.body.notes || !req.body.description || !req.params.id) {
        res.statusCode = 400 
        next()
      }
  update(req.params.id, req.body)
    .then((response) => {
      if (response) {
    
        res.status(200).json(response);
      } else {
        throw new Error("No Action Found with that ID");
      }
    })
    .catch((err) => {
      console.log(err);
      const status = !req.body.notes || !req.body.description || !req.params.id  ? 400 : 500;
      res.status(status).json({ message: err.message });
    });
});

router.delete("/:id", (req, res, next) => {
  remove(req.params.id)
    .then((response) => {
      if (response) {
        res.status(204).json({});
      } else {
        throw new Error("No Action Found with that ID");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: err.message });
    });
});

module.exports = router;