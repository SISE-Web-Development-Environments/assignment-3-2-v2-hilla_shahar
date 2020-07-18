<template>
    <div class="container">
        <div v-if="recipe">
            <div class="recipe-header mt-3 mb-4">
                <h1 id="head">{{ recipe.title }}</h1>
                <img :src="recipe.image" class="center" />
            </div>
            <div class="recipe-body">
                <div class="wrapper">
                    <div class="wrapped">
                        <div class="mb-3">
                            <div id="smallTitle" >&#9201; {{ recipe.readyInMinutes }} minutes</div>
                            <div id="smallTitle">&#10084; {{ recipe.aggregateLikes }} </div>
                            <div id="smallTitle">
                                <img src="https://img.icons8.com/dotty/80/000000/tableware.png" height="30px" width="30px"/>
                                {{ recipe.servings }}</div>

                            <div id="smallTitle" v-if="recipe.vegan">
                                <img src="https://img.icons8.com/metro/26/000000/vegan-symbol.png"  height="17px" width="17px"/> Vegan
                            </div>

                            <div id="smallTitle" v-if="recipe.vegetarian">
                                <img src="https://img.icons8.com/color/48/000000/vegetarian-mark.png" height="20px" width="20px"/> Vegetarian
                            </div>

                            <div id="smallTitle" v-if="recipe.glutenFree">
                                <img src="https://img.icons8.com/carbon-copy/100/000000/no-gluten.png" height="20px" width="20px"/> GF
                            </div>

                        </div>
                        <div id="smallTitle" >Ingredients:</div>
                        <ul>
                            <li v-for="(r, index) in recipe.extendedIngredients" :key="index + '_' + r.name">
                                {{ r.amount }} {{ r.unit }} {{ r.name }}
                            </li>
                        </ul>
                    </div>
                    <div class="wrapped">
                        <div id="smallTitle" >Instructions:</div>
                        <ol>
                            {{ recipe.instructions }}
                        </ol>

                        <div v-if="this.$root.store.username">
                            <router-link id="routerLink" :to="{ name: 'prepareRecipe', params: { recipe: recipe } }"  >
                                Click here to Prepare Recipe
                            </router-link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                recipe: null
            };
        },
        async created() {
            let response;
            try {
                console.log(this.$root.store.username);
                console.log(this.$route.params.recipeId);
                //username exists
                if (this.$root.store.username) {
                    response = await this.axios.get(
                        "https://assignment3-2hilla-shahar.herokuapp.com/user/showRecipe/",
                        {
                            params: {
                                recipe_id: this.$route.params.recipeId
                            }
                        }
                    );

                    console.log(response);
                    let _recipe = {
                        id: response.data[0].recipe[0].id,
                        instructions: response.data[0].recipe[0].instructions,
                        loved: response.data[0].user_info[0].loved,
                        watched: response.data[0].user_info[0].watched,
                        extendedIngredients: response.data[0].recipe[0].extendedIngredients.extendedIngredients,
                        aggregateLikes: response.data[0].recipe[0].aggregateLikes,
                        readyInMinutes: response.data[0].recipe[0].readyInMinutes,
                        image: response.data[0].recipe[0].image,
                        title: response.data[0].recipe[0].title,
                        servings: response.data[0].recipe[0].servings,
                        vegan: response.data[0].recipe[0].vegan,
                        vegetarian:response.data[0].recipe[0].vegetarian,
                        glutenFree:response.data[0].recipe[0].glutenFree,
                    };

                    this.recipe = _recipe;
                    console.log(this.recipe);
                    console.log(this.recipe.servings);
                    //add to watch list
                    await this.axios.get("https://assignment3-2hilla-shahar.herokuapp.com/user/watchedRecipe/",{
                        params: {
                            recipe_id: this.$route.params.recipeId
                        }
                    });

                }
                else { //guest
                    response = await this.axios.get(
                        "https://assignment3-2hilla-shahar.herokuapp.com/recipe/showRecipe/",
                        {
                            params: { recipe_id: this.$route.params.recipeId }
                        }
                    );

                    if (response.status !== 200) this.$router.replace("/NotFound");

                    let _recipe = {
                        id: response.data[0].id,
                        instructions:  response.data[0].instructions,
                        extendedIngredients: response.data[0].extendedIngredients.extendedIngredients,
                        aggregateLikes: response.data[0].aggregateLikes,
                        readyInMinutes: response.data[0].readyInMinutes,
                        image: response.data[0].image,
                        title: response.data[0].title,
                        servings: response.data[0].servings,
                        vegan: response.data[0].vegan,
                        vegetarian:response.data[0].vegetarian,
                        glutenFree:response.data[0].glutenFree,
                    };
                    this.recipe = _recipe;
                }
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }


        },
    };
</script>

<style scoped>
    .wrapper {
        display: flex;
    }
    .wrapped {
        width: 50%;
    }
    #smallTitle{
        align-items: center;
        font-family: 'Architects Daughter';
        font-weight: bold;
        color:  #7BB257;
    }
    #head{
        align-items: center;
        font-family: 'Architects Daughter';
        text-align: center;
        font-weight: bold;
        color:  #7BB257;
    }
    .container{
        background:rgba(255, 255, 255, 0.75);
        color:  #7a512f;
        font-family: 'Architects Daughter';
        font-weight: bold;
    }
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
    #routerLink{
        color: #F70102;
        font-family: 'Architects Daughter';
        font-weight: bold;
    }

</style>
