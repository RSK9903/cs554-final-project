const connection = require("../config/mongoConnection");
const data = require("../data");
const recipeData = data.recipes;
const userData = data.users;
const reviewData = data.reviews;
const userList = require("../data/users.json");
const recipeList = require("../data/recipes.json");
const reviewList = require("../data/reviews.json");

const main = async () => {
    const d = await connection();

    d.dropDatabase();

    const db = await connection();
    console.log("Seeding users...")
    for(let i = 0; i < userList.length; i++){
        let user = userList[i];
        await userData.createUser(user._id, user.email, user.displayName, user.birthday);
    }
    console.log("Seeding recipes...")
    for(let i = 0; i < recipeList.length; i++){
        let recipe = recipeList[i];
        await recipeData.addRecipe(recipe.title, recipe.author, recipe.datePosted, recipe.completionTime, recipe.ingredients, recipe.steps, recipe.recipe_yield);
    }

    const allRecipes = await recipeData.getAllRecipes();
    console.log("Seeding reviews...")
    for(let i = 0; i<reviewList.length; i++){
        let review = reviewList[i];
        let index = Math.floor(Math.random()*allRecipes.length);
        let recipeReviews = await reviewData.getReviewsRecipe(allRecipes[index]._id);
        let alreadyReviewed = recipeReviews.some((r)=>r.author_id==review.author_id);
        while(review.author_id==allRecipes[index].author || alreadyReviewed){
            index = Math.floor(Math.random()*allRecipes.length);
            recipeReviews = await reviewData.getReviewsRecipe(allRecipes[index]._id);
            alreadyReviewed = recipeReviews.some((r)=>r.author_id==review.author_id);
        }
        let recipeId = allRecipes[index]._id;
        await reviewData.addReview(review.comment, review.rating, review.postDate, recipeId, review.author_id);
    }

    console.log("Done seeding database");

    db.serverConfig.close();

};

main().catch(error => {
    console.log(error);
});
