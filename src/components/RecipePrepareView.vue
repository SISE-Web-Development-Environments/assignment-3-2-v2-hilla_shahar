<template>
    <div class="container">
        <div :title="recipe.title" class="recipe-title">
            {{ recipe.title }}
        </div>
        <div class="recipe-body">
            <img :src="recipe.image" height="50" width="50" class="recipe-image" />
        </div>
        <br>
        <!-- <b-col> -->
        <b-col>
            &#9201; {{ recipe.readyInMinutes }}
            &#10084; {{ recipe.aggregateLikes }}
            <img src="https://img.icons8.com/dotty/80/000000/tableware.png" height="30px" width="30px"/> {{recipe.servings}}
            <br>
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
            <br>
            <p id="header">Ingredients:</p>
            <b-row id="col" v-for="ingr in ingredients" :key="ingr.id">
                <RecipeIngredientsPrepare class="RecipeIngredientsPrepare" :ingredient="ingr"/>
            </b-row>
            <br>
            <p id="header">Steps:</p>
            <b-row id="col" v-for="step in steps" :key="step.id">
                <RecipeChecklistPrepare class="RecipeChecklistPrepare" :step="step"  @progressChangeUp="value++" @progressChangeDown="value--"/>
            </b-row>
            <br>
            <p id="header">Progress Bar:</p>

            <div>

                <b-progress :value="value" :max="steps.length" aria-valuemin="0" aria-valuemax="steps.length" variant="success" show-progress striped :animated="animate"></b-progress>
                <b-progress-bar :value="value" aria-valuemin="0" aria-valuemax="steps.length"  >
                    Progress: <strong> {{ value }}/{{ steps.length }} </strong>
                </b-progress-bar>

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
                value: 0
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
            console.log(this.recipe);
            this.steps=this.recipe.steps;
            this.ingredients=this.recipe.extendedIngredients;
            // console.log(this.ingredients);
        },

    };
</script>

<style scoped>
    .container{
        font-size: 20px;
    }
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
        font-family: 'Architects Daughter';
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
        font-family: 'Architects Daughter';
    }
    #col{
        text-align: left;
        font-size: 15px;
    }
</style>
