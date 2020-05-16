const express = require("express");
const router = express.Router();
const path = require("path")
const multer = require("multer");
const fs = require("fs");
const gm = require("gm");

const acceptableFileExtensions = [".jpeg", ".jpg", ".png", ".gif"];

// Use this function to upload files to the /back_end/img/ directory
// This will create the directory on server start if it does not yet exist
const upload = multer({dest: "./img/"});

// POST /images/:id
// When called from the front end, take the user's inputted file, check the file type,
// and if it is an image, run it through graphicsmagick to compress it and rename it,
// then save it with the associated recipe's ID as the filename.
// Modified from: https://stackoverflow.com/a/15773267
router.post("/:id", upload.any(), async (req, res) => {
    if (!req.files[0]) {
        console.log("ERROR: No image file");
        res.status(400).json({ error: "No image in reqest" });
    }
    if (!req.params.id) {
        console.log("ERROR: No Recipe ID");
        res.status(400).json({ error: "Must include an id" });
    }
    let originalFile = req.files[0];
    const tempPath = originalFile.path; 
    const recipeId = req.params.id;
    const fileExtension = path.extname(originalFile.originalname).toLowerCase();
    const targetPath = path.join(__dirname, `./../img/${recipeId}`);

    if (acceptableFileExtensions.includes(fileExtension) ) {
        // Use gm to pass the photo to graphicsmagick, resize, and write
        gm(tempPath)
            // TODO: Possibly a method that doesn't force one size/aspect ratio?
            .resize(360, 360, "!")
            .write(targetPath, function (err) {
                if (err) {
                    console.error(err);
                    res.status(500).json({error: "Could not upload file"});
                } 
                fs.unlink(tempPath, err => {
                    if (err) {
                        console.error("Warning: Uncompressed file could not be deleted");
                    }
                })
                res.status(200).json({success: `${targetPath}`});
            });
    } else {
        fs.unlink(tempPath, err => {
            if (err) {
                console.error(err);
                res.status(500).json({error: "Could not upload file"});
            }
            res.status(403).json({error: "Not a supported filetype"});
        });
    }
});

module.exports = router;