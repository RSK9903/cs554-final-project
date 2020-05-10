const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const uuid = require("uuid");
const recipes = require("./recipes");
const users = require("./users");

module.exports = {
    async getAllReviews() {
        const reviewCollection = await reviews();
        const allReviews = await reviewCollection.find({}).toArray();
        return allReviews;
    },

    async getReviewById(id) {
        if (!id) {
            throw "You must provide a recipe id to search for";
        }
        const reviewCollection = await reviews();
        const review = await reviewCollection.findOne({ _id: id });
        if (review === null) {
            throw "Review not found";
        }
        return review; 
    },

    async addReview(comment, rating, recipe_id, author_id) {
        if (!comment || !rating || !recipe_id || !author_id) {
            throw "Critical information to add review missing"
        }

        if (typeof comment !== "string") {
            throw "Comment must be of type string"
        }

        if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
            throw "Rating must be of type int and must lie between 0 and 5"
        }

        try {
            recipes.getRecipeById(recipe_id);
            users.getUserById(author_id);
        }
        catch (e) {
            console.error("Recipe with that id not found.")
        }

        
        const reviewCollection = await reviews();
        let newReview = {
            _id: uuid.v4(),
            comment: comment,
            rating: rating,
            recipe_id: recipe_id,
            author_id: author_id
        };

        const insertReview = await reviewCollection.insertOne(newReview);
        if (insertReview.insertedCount === 0) {
            throw "Could not add review"
        }
        const newId = insertReview.insertedId;
        return await this.getReviewById(newId);
    },

    async deleteReview(id) {
        if (!id) {
            throw "You must provide a review id to search for";
        }
        const reviewCollection = await reviews();
        const deleteReview = await reviewCollection.deleteOne({ _id: id });
        if (deleteReview.deletedCount === 0) {
            throw "Could not delete review";
        }

        return "Deleted review successfully";
    },

    async patchReview(id, updatedReviewData) {
        const reviewCollection = await reviews();
        const oldReview = await this.getReviewById(id);
        const newReview = {
            _id: id,
            comment: oldReview.comment,
            rating: oldReview.rating,
            author_id: oldReview.author_id,
            recipe_id: oldReview.recipe_id
        };

        if (updatedReviewData.comment) {
            if (typeof updatedReviewData.comment != "string") {
                throw "Comment should be a string"
            }
            newReview.comment = updatedReviewData.comment;
        }

        if (updatedReviewData.rating) {
            if (!Number.isInteger(updatedReviewData.rating)) {
                throw "Rating should be an integer"
            }
            if (updatedReviewData.rating < 0 || updatedReviewData.rating > 5) {
                throw "Rating must be between 0 and 5"
            }
            newReview.rating = updatedReviewData.rating;
        }

        if (updatedReviewData.author_id || updatedReviewData.recipe_id) {
            throw "Can't update recipe or author ids"
        }

        const updateCom = { $set: newReview };
        query = { _id: id };
        const updatedInfo = await reviewCollection.updateOne(query, updateCom);
        if (updatedInfo.modifiedCount === 0) {
            throw "Could not update review successfully"
        }

        return await this.getReviewById(id);
    }
}