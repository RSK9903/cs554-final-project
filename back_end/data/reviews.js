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

    async addReview(comment, rating, postDate, recipe_id, author_id) {
        if (!comment || !rating || !recipe_id || !author_id || !postDate) {
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

        const allReviews = await this.getReviewsRecipe();
        const len = Object.keys(allReviews).length;

        for (var i = 0; i < len; i++) {
            let uid = allReviews[i].author_id;
            if (uid === author_id) {
                throw "You can't add another review to this recipe.";
            }
        }

        
        const reviewCollection = await reviews();
        let newReview = {
            _id: uuid.v4(),
            comment: comment,
            rating: rating,
            postDate: postDate,
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
            postDate: oldReview.postDate,
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
    },

    async getReviewsRecipe(recipeId) {
        const allReviews = await this.getAllReviews();
        let retReviews = [];

        const len = Object.keys(allReviews).length;

        for (var i = 0; i < len; i++) {
            let rid = allReviews[i].recipe_id;
            if (rid === recipeId) {
                retReviews.push(allReviews[i]);
            }
        }

        return retReviews;
    },

    async getReviewsUser(userId) {
        const allReviews = await this.getAllReviews();
        let retReviews = [];

        const len = Object.keys(allReviews).length;

        for (var i = 0; i < len; i++) {
            let uid = allReviews[i].author_id;
            if (uid === userId) {
                retReviews.push(allReviews[i]);
            }
        }

        return retReviews;
    },

    async getRatingForRecipe(recipeId){
        const recipeReviews = await this.getReviewsRecipe(recipeId);
        if(recipeReviews.length==0){
            return -1;
        } else {
            let sum = 0;
            for (let i = 0; i <recipeReviews.length; i++) {
                let review = recipeReviews[i];
                sum += review.rating;
            }
            let totalRating = sum / recipeReviews.length;
            return totalRating.toFixed(1);
        }
          
    }

}