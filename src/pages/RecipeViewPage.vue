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
                            <div id="smallTitle" >Ready in {{ recipe.readyInMinutes }} minutes</div>
                            <div id="smallTitle">Likes: {{ recipe.aggregateLikes }} likes</div>
                            <div v-if="this.$root.store.username">
                                <div v-if="!favorite">
                                    <button v-bind="button" id="buttonFavorites" @click="addToFavorite('true')">&#9825;</button>
                                </div>
                                <div v-if="favorite">
                                    <button v-bind="button" id="buttonFavorites" @click="addToFavorite('false')">&#10084;</button>
                                </div>
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

                        <router-link id="routerLink" :to="{ name: 'prepareRecipe', params: { recipeId: recipe.id } }"  >
                                Click here to Prepare Recipe 
                            </router-link>
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
                recipe: null,
                favorite: false,
                button:{ 
                    text: "&#9825;"
                    }
            };
        },
        async created() {
            let response;
            try {
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
                    let _recipe = {
                        instructions: response.data[0].recipe[0].instructions,
                        loved: response.data[0].user_info[0].loved,
                        watched: response.data[0].user_info[0].watched,
                        extendedIngredients: response.data[0].recipe[0].extendedIngredients.extendedIngredients,
                        aggregateLikes: response.data[0].recipe[0].aggregateLikes,
                        readyInMinutes: response.data[0].recipe[0].readyInMinutes,
                        image: response.data[0].recipe[0].image,
                        title: response.data[0].recipe[0].title
                    };

                    this.recipe = _recipe;
                    

                    await this.axios.get("https://assignment3-2hilla-shahar.herokuapp.com/user/watchedRecipe/",{
                            params: { 
                                recipe_id: this.$route.params.recipeId 
                                }
                        });


                    //check if the recipe is already in favorites for this user
                    let responseFavorite= await this.axios.get(
                        "https://assignment3-2hilla-shahar.herokuapp.com/user/checkIfLoved/",
                        {
                            params: { recipe_id: this.$route.params.recipeId }
                        }
                    );
                    if(responseFavorite.data){
                        this.favorite=true;
                    }else{
                        this.favorite=false;
                    }

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
                        instructions:  response.data[0].instructions,
                        extendedIngredients: response.data[0].extendedIngredients.extendedIngredients,
                        aggregateLikes: response.data[0].aggregateLikes,
                        readyInMinutes: response.data[0].readyInMinutes,
                        image: response.data[0].image,
                        title: response.data[0].title
                    };
                    this.recipe = _recipe;
                }
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }


        },
        methods: {
            async addToFavorite(value){
                let responseFavorites;
                try{
                    responseFavorites = await this.axios.get("https://assignment3-2hilla-shahar.herokuapp.com/user/addToFavorites/",
                         {
                            params: {
                                recipe_id: this.$route.params.recipeId,
                                isLoved: value
                            }
                        }
                     );
                    this.value=!(this.value);
                    this.favorite=!(this.favorite);

                     res.send(200); 
                }catch(error){
                    console.log("error.response.status", error.response.status);
                    this.$router.replace("/NotFound");
                    return;
                }
                
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
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: bold;
        color:  #7BB257;
    }
    #head{
        align-items: center;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        text-align: center;
        font-weight: bold;
        color:  #7BB257;
    }
    .container{
        background:rgba(255, 255, 255, 0.75);
        color:  #7a512f;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: bold;
    }
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
    #buttonFavorites{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        background: #7BB257;
        border: #2c3e50;
        align-content: center;        
    }
    #routerLink{
        color: #F70102;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight: bold;
    }

</style>
