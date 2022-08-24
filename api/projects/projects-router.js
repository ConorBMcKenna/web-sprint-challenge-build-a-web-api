// Write your "projects" router here!
const {
  get,
  insert,
  update,
  remove,
  getProjectActions,
} = require("./projects-model");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  get()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
    get(req.params.id)
      .then((response) => {
        if(response){
            res.status(200).json(response);
        } else {
            throw new Error("No Project Found with that ID")
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  });

  router.post("/", (req, res)=> {
    insert(req.body)
    .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log("POST PROJECT ERROR");
        const status = !req.body.name || !req.body.description ? 400 : 500
        res.status(status).json(err);
      });
  })

  router.put("/:id", (req, res)=>{
    update(req.params.id, req.body)
    .then((response) => {
       
        if(response){
            if  (!req.body.name || !req.body.description ) {
                throw new Error ("Name, Descpription, Completed are REQ")
            }
            res.status(200).json(response);
        } else {
            throw new Error("No Project Found with that ID")
        }
        
      })
      .catch((err) => {
        console.log(err);
        const status = !req.body.name || !req.body.description ? 400 : 500
        res.status(404).json({message: err.message});
      });
  })
    
  router.delete("/:id", (req, res) => {
    remove(req.params.id)
    .then((response) => {
        if(response){
            res.status(204).json({});
        } else {
            throw new Error("No Project Found with that ID")
        }
        
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({message: err.message});
      });
  })
  router.get('/:id/actions', (req, res)=>{
    getProjectActions(req.params.id)
    .then((response) => {
        if(response){
            res.status(200).json(response);
        } else {
            throw new Error("No Project Found with that ID")
        }
        
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({message: err.message});
      });
  })

module.exports = router;