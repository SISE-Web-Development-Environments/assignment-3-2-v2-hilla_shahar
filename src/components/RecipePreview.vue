<template>
    <div>
        <div class="recipe-preview" v-if="$root.store.username && recipe.watched">
            <router-link
                    :to="{ name: 'showRecipe', params: { recipeId: recipe.id } }"
            >
                <div class="recipe-body">
                    <img :src="recipe.image" class="recipe-image" />
                </div>
            </router-link>
            <div class="recipe-footer">
                <div :title="recipe.title" class="recipe-title">
                    {{ recipe.title }}
                </div>
                <div id="values" class="recipe-overview">
                    <div v-if="!favorite">
                        <button v-bind="button" id="buttonFavorites" @click="addToFavorite('true')"> <img src="https://img.icons8.com/material-outlined/24/000000/filled-like.png" height="20px" width="20px"/></button>
                    </div>
                    <div v-if="favorite">
                        <button v-bind="button" id="buttonFavorites" @click="addToFavorite('false')"><img src="https://img.icons8.com/material-rounded/24/000000/filled-like.png" height="20px" width="20px"/></button>
                    </div>
                    {{ recipe.readyInMinutes }} &#9201;
                    {{ recipe.aggregateLikes }} &#10084; <br>
                    <div v-if="recipe.vegan">
                        <img src="https://img.icons8.com/metro/26/000000/vegan-symbol.png"  height="17px" width="17px"/>
                    </div>

                    <div v-if="recipe.vegetarian">
                        <img src="https://img.icons8.com/color/48/000000/vegetarian-mark.png" height="20px" width="20px"/>
                    </div>

                    <div v-if="recipe.glutenFree">
                        <img src="https://img.icons8.com/carbon-copy/100/000000/no-gluten.png" height="20px" width="20px"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="recipe-preview-guest" v-else>
            <router-link
                    :to="{ name: 'showRecipe', params: { recipeId: recipe.id } }"
            >
                <div class="recipe-body">
                    <img :src="recipe.image" class="recipe-image" />
                </div>
            </router-link>
            <div class="recipe-footer">
                <div :title="recipe.title" class="recipe-title">
                    {{ recipe.title }}
                </div>
                <div id="values" class="recipe-overview">
                    <div v-if="$root.store.username">
                        <div v-if="!favorite">
                            <button v-bind="button" id="buttonFavorites" @click="addToFavorite('true')">
                                <img src="https://img.icons8.com/material-outlined/24/000000/filled-like.png" height="20px" width="20px"/>
                            </button>
                        </div>
                        <div v-if="favorite">
                            <button v-bind="button" id="buttonFavorites" @click="addToFavorite('false')"><img src="https://img.icons8.com/material-rounded/24/000000/filled-like.png" height="20px" width="20px"/></button>
                        </div>
                    </div>
                    {{ recipe.readyInMinutes }} &#9201;
                    {{ recipe.aggregateLikes }} &#10084; <br>
                    <div v-if="recipe.vegan">
                        <img src="https://img.icons8.com/metro/26/000000/vegan-symbol.png"  height="17px" width="17px"/>
                    </div>

                    <div v-if="recipe.vegetarian">
                        <img src="https://img.icons8.com/color/48/000000/vegetarian-mark.png" height="20px" width="20px"/>
                    </div>

                    <div v-if="recipe.glutenFree">
                        <img src="https://img.icons8.com/carbon-copy/100/000000/no-gluten.png" height="20px" width="20px"/>
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
                favorite: false,
                button:{
                    text: "&#9825;"
                }
            };
        },
        props: {
            recipe: {
                type: Object,
                required: true
            }
        },
        async created(){
            try{
                let responseFavorite= await this.axios.get(
                    "https://assignment3-2hilla-shahar.herokuapp.com/user/checkIfLoved/",
                    {
                        params: { recipe_id: this.recipe.id }
                    }
                );
                // console.log(responseFavorite);

                if(responseFavorite.data){
                    this.favorite=true;
                }else{
                    this.favorite=false;
                }
            }catch(error){
                console.log(error);
            }

        },
        methods: {
            async addToFavorite(value){
                let responseFavorites;
                try{
                    responseFavorites = await this.axios.get("https://assignment3-2hilla-shahar.herokuapp.com/user/addToFavorites/",
                        {
                            params: {
                                recipe_id:this.recipe.id,
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
    img:hover {
        box-shadow: 0 0 3px 1px rgba(28, 250, 39, 0.5);
    }
    .recipe-preview {
        width: 200px;
        height: 320px;
        position: relative;
        margin: 10px 10px;
        background:rgba(255, 255, 255, 0.75);
        border-color: #aa3992;
        border-width: 4px;
        border-style: solid ;
    }

    .recipe-preview-guest {
        width: 180px;
        height: 320px;
        position: relative;
        margin: 10px 10px;
        background:rgba(255, 255, 255, 0.75);
        border-color: #7BB257;
        border-width: 4px;
        border-style: solid ;
    }
    .recipe-body .recipe-image {
        margin-left: auto;
        margin-right: auto;
        margin-top: auto;
        margin-bottom: auto;
        display: block;
        width: 172px;
    }
    .recipe-footer {

        height: 60%;
        overflow:auto;
        width: 172px;
        display: inline-block;
        word-break: break-all;


    }
    .recipe-title {
        padding: 10px 10px;
        width: 172px;
        word-wrap: break-word;
        color: #7a512f;
        font-family: 'Architects Daughter';
        text-align: center;
        font-weight: bold;
        font-size: 12pt;
    }

    #values{
        text-align: center;
        font-size: 15px;
        color: #7BB257;
        font-family: 'Architects Daughter';
    }
    #buttonFavorites{
        font-family: 'Architects Daughter';
        background: #7BB257;
        border: #2c3e50;
        align-content: center;
    }
</style>