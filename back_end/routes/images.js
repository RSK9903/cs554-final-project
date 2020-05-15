const express = require("express");
const router = express.Router();
const path = require("path")
const multer = require("multer");
const fs = require("fs");
const gm = require("gm");

const acceptableFileExtensions = [".jpeg", ".jpg", ".png", ".gif"];

// Use this function to upload files to the /public/img/ directory
const upload = multer({dest: "../img/"});

// When called from the front end, take the user's inputted file, check the file type,
// and if it is an image, run it through graphicsmagick to compress it and rename it,
// then save it with the associated recipe's ID as the filename.
// Modified from: https://stackoverflow.com/a/15773267
router.post("/:id", upload.single("image"), async (req, res) => {
    console.log(req);
    let originalFile = req.file;
    const tempPath = originalFile.path;
    const recipeId = req.params.id;
    const fileExtension = path.extname(originalFile.originalname).toLowerCase();
    const targetPath = path.join(__dirname, `./img/${recipeId}${fileExtension}`);

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