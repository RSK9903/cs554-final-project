const express = require("express");
const router = express.Router();
const reviewData = require("../data/reviews");

router.get("/", async (req, res) => {
    try {
      const reviewList = await reviewData.getAllReviews();
      res.json(reviewList);
    } catch (e) {
      res.status(500).json({ error: "Could not get reviews" });
      console.log(e);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const review = await reviewData.getReviewById(req.params.id);
        res.json(review);
    } catch (e) {
        res.status(200).json({ error: "Review not found" });
        console.log(e);
    }
});

router.get("/:id/recipes", async (req, res) => {
    try {
        const reviewList = await reviewData.getReviewsRecipe(req.params.id);
        res.json(reviewList);
    }
    catch (e) {
        res.status(200).json({ error: "Could not get reviews" });
        console.log(e);
    }
});

router.get("/:id/users", async (req, res) => {
    try {
        const reviewList = await reviewData.getReviewsUser(req.params.id);
        res.json(reviewList);
    }
    catch (e) {
        res.status(200).json({ error: "Could not get reviews" });
        console.log(e);
    }
});

router.get("/rating/:recipeId/", async (req, res) => {
    try {
        const rating = await reviewData.getRatingForRecipe(req.params.recipeId);
        res.json(rating);
    }
    catch (e) {
        res.status(200).json({ error: "Could not get rating" });
        console.log(e);
    }
});

router.post("/", async (req, res) => {
    const reviewInfo = req.body;
    try {
        const { comment, rating, postDate, author_id, recipe_id } = reviewInfo;
        const newReview = reviewData.addReview(comment, rating, postDate, recipe_id, author_id);
        res.json(newReview);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.put("/:id", async (req, res) => {
    const updateReview = req.body;
    try {
        await reviewData.getReviewById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: e });
        return;
    }
    try {
        const newReview = await reviewData.patchReview(req.params.id, updateReview);
        res.json(newReview);
    } catch(e) {
        console.log(e)
        res.status(500).json({ error: e });
    }
});


module.exports = router;