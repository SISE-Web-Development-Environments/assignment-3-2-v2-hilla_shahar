<template>
    <div>
        <div :title="recipe.title" class="recipe-title">
            {{ recipe.title }}
        </div>
        <div class="recipe-body">
            <img :src="recipe.image" height="50" width="50" class="recipe-image" />
        </div>
        <br>
        <!-- <b-col> -->
            <b-col>
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

                    <div v-if="$root.store.username">
                        <div v-if="recipe.loved">
                            You &#10084; it
                        </div>
                    </div>
            </b-col>
        <b-col>
            <p id="header">Ingredients:</p>
            <b-row id="col" v-for="ingr in ingredients" :key="ingr.id">
                <RecipeIngredientsPrepare class="RecipeIngredientsPrepare" :ingredient="ingr"/>
            </b-row>

            <p id="header">Steps:</p>
            <b-row id="col" v-for="step in steps" :key="step.id">
                <RecipeChecklistPrepare class="RecipeChecklistPrepare" :step="step"/>
            </b-row>

            <p id="header">Progress Bar:</p>

            <div>

                <b-progress :value="value" variant="success" show-progress striped :animated="animate"></b-progress>
                <b-progress-bar :value="value" >
                    Progress: <strong>{{ value.toFixed(2) }} / {{ steps.length }}</strong>
                </b-progress-bar>

                <p id="header">until when pleae work</p>
            </div>
        </b-col>
    </div>
</template>

<script>
    import RecipeChecklistPrepare from "../components/RecipeChecklistPrepare.vue";
    import RecipeIngredientsPrepare from "../components/RecipeIngredientsPrepare.vue";
    export default {
        name: "PreparePageView",
        components: {
            RecipeChecklistPrepare,
            RecipeIngredientsPrepare
        },
        data() {
            return {
                value: 25
            };
        },
        props: {
            recipe: {
                type: Object,
                required: true
            },
            steps:{
                type: Object,
                required: true
            },
            ingredients:{
                type: Object,
                required: true
            }
        },
        async created(){
            // console.log("this.recipe");
            // console.log(this.recipe);
            this.recipe=this.recipe[0];
            this.steps=this.recipe.steps;
            this.ingredients=this.recipe.extendedIngredients;
            // console.log(this.ingredients);
        },

    };
</script>

<style scoped>
    .recipe-preview {
        width: 180px;
        height: 280px;
        position: relative;
        margin: 10px 10px;
        background:rgba(255, 255, 255, 0.75);
    }

    .recipe-body .recipe-image {
        margin-left: auto;
        margin-right: auto;
        margin-top: auto;
        margin-bottom: auto;
        display: block;
        width: 400px;
        height: 280px;
    }

    .recipe-title {
        align-items: center;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        text-align: center;
        font-weight: bold;
        color:  #7BB257;
         font-size: 30px;
    }
    #header{
        text-align: left;
        font-size: 20px;
        color: #7BB257;
        font-weight: bold;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    #col{
        text-align: left;
        font-size: 15px;
    }
</style>
