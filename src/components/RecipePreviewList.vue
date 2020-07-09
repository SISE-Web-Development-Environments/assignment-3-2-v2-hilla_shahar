<template>
    <b-container id="contain">
        <h3>
            {{ title }}:
            <slot></slot>
        </h3>
        <b-row>
            <b-col id="col" v-for="r in recipes" :key="r.id">
                <RecipePreview class="recipePreview" :recipe="r"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import RecipePreview from "./RecipePreview.vue";

    export default {
        name: "RecipePreviewList",
        components: {
            RecipePreview
        },
        props: {
            title: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                recipes: []
            };
        },
        mounted() {
            this.updateRecipes();
        },
        methods: {
            async updateRecipes() {
                let recipesId = []; //recipeID list
                let allRecipesInfo=[]; //get recipes array from apispooncular to be recognize after try catch block
                try {
                    const response = await this.axios.get(
                        //"https://test-for-3-2.herokuapp.com/recipes/random"
                        "https://assignment3-2hilla-shahar.herokuapp.com/recipe/random"
                    );

                    const recipes = response.data;

                    //pushing all recipes data into array
                    allRecipesInfo.push(...recipes);
                    //pushing all Ids into array 
                    recipes.map((recipe) => {
                        recipesId.push(recipe.id);
                    });

                } catch (error) {
                    console.log(error);
                }

                let allDetailsRecipes = [];
                //moving on list or recipesID
                for (let i = 0; i < recipesId.length; i++) {
                    let id = recipesId[i];
                    try {
                        console.log("hello user");
                        const user_response = await this.axios.get(
                            "https://assignment3-2hilla-shahar.herokuapp.com/user/showRecipe",
                            {
                                params: {
                                    recipe_id: id
                                }
                            }
                        );
                        console.log("in recipe preview list for login user");

                        //user data-loved, watched
                        let userData = user_response.data[0].user_info[0];
                        //all other information from apispooncular
                        let info = user_response.data[0].recipe[0];
                        console.log(info);
                        let _recipe = {
                            id: info.id,
                            aggregateLikes: info.aggregateLikes,
                            readyInMinutes: info.readyInMinutes,
                            image: info.image,
                            title: info.title,
                            watched: userData.watched,
                            loved: userData.loved,
                            vegan: info.vegan,
                            vegetarian:info.vegetarian,
                            glutenFree:info.glutenFree,
                            // user: true
                        };

                        allDetailsRecipes.push(_recipe);
                    } catch (error) {
                        console.log("catch error");
                      //moving on array of all recipes data, looking for the recipe with same id to get it details
                        for(let k=0;k<allRecipesInfo.length;k++){
                          if(allRecipesInfo[k].id==id){
                            let _recipe = {
                            id: allRecipesInfo[k].id,
                            aggregateLikes: allRecipesInfo[k].aggregateLikes,
                            readyInMinutes: allRecipesInfo[k].readyInMinutes,
                            image: allRecipesInfo[k].image,
                            title: allRecipesInfo[k].title,
                            vegan: allRecipesInfo[k].vegan,
                            vegetarian:allRecipesInfo[k].vegetarian,
                            glutenFree:allRecipesInfo[k].glutenFree,
                            // user: false
                        };
                        allDetailsRecipes.push(_recipe);
                          }
                        }
                    }
                }//for

                console.log(allDetailsRecipes);
                //pushing into array with 3 chunks
                let data = [];
                for (let i = 0; i < 3; i++) {
                    data.push(allDetailsRecipes.pop());
                }

                this.recipes = [];
                // this.recipes.push(...recipes);
                this.recipes.push(...data);
                console.log(this.recipes);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        min-height: 300px;
        width: 600px;
    }
  
</style>