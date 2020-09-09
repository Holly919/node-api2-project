const express = require('express');
const Posts = require('../data/db.js');
const router = express.Router();

//Create 
router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
        if(!req.body.title || !req.body.contents) {
            res.status(400).json({error: "Please provide title and contents for the post"})
        } else {
            res.status(201).json(post)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "There was an error while saving the post to the database."
        });
    });
});

router.post('/:id/comments', (req, res) => {
    const comment = req.body;

    if (!comment.text ) {
        res.status(400).json({ errorMessage: "Please provide text for the comment."
     })
    } else if (!comment) {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    } else {
        res.status(201).json(comment);
    }
})





// Read 
router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The posts information could not be retreived."
        });
    });
});

router.get('/:id', (req, res) => {
    console.log("log anything");
    Posts.findById(req.params.id)
    .then(post => {
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(500).json.apply({
                error: "The post information could not be retrieved"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        });
    });
});

router.get('/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
    .then(comments => {
        if(comments) {
            res.status(200).json(comments);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The comments information could not be retrieved."  
        });
    });
});





  // Delete
  router.delete('/:id', (req,res) => {
    Posts.remove(req.params.id)
    .then((posts) => {
        if (posts > 0) {
            res.status(200).json({ message: "This post has been deleted"})
        } else {
            res.status(404).json({message: "The post could not be found" });
        }
    })
    .catch((error)=>{
        res.status(500).json ({message: "Error removing the post",
        error: "The post could not be removed"})
    })
    })
 
  
  
//Update
router.put("/:id", (req, res) => {
    const update = req.body;

    Posts.findById(req.params.id)
      .then(() => {
        if (!update.title || !update.contents) {
          res
            .status(400)
            .json({
              errorMessage: "Please provide title and contents for the post.",
            });
        } else {
          Posts.update(req.params.id, update)
            .then(() => {
              res.status(200).json(update);
            })
            .catch((err) => {
              console.log(err);
              res
                .status(500)
                .json({ error: "The post information could not be modified." });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      });
  });




module.exports = router;
