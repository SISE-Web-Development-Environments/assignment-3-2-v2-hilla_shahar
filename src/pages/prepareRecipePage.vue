<template>
    <div class="container">
        <h1 id="title" class="title">Prepare Page:</h1>
        <div v-if="!insertQuantity">
            <b-row>
                <b-col>Insert quantity:</b-col>
                <b-col><b-form-input v-model="quantity" placeholder="Quantity">
                </b-form-input></b-col>
                <b-col>
                    <button id="button" v-on:click="updateQuantity"> Go</button>
                </b-col>
            </b-row>
        </div>
        <div v-if="insertQuantity">
            <RecipePrepareView class="recipePreview" :recipe="recipe" />
        </div>
    </div>
</template>

<script>
    import RecipePrepareView from "../components/RecipePrepareView.vue";
    export default {
        name: "PreparePage",
        components: {
            RecipePrepareView
        },
        data() {
            return {
                recipeDetails: null,
                quantity: 1,
                insertQuantity: false,
            };
        },
        props: {
            recipe: {
                type: Object,
                required: true
            }
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
                                recipe_id: this.$route.params.recipe.id
                            }
                        }
                    );
                    let _recipe = {
                        loved: response.data[0].user_info[0].loved,
                        watched: response.data[0].user_info[0].watched,
                        aggregateLikes: response.data[0].recipe[0].aggregateLikes,
                        readyInMinutes: response.data[0].recipe[0].readyInMinutes,
                        image: response.data[0].recipe[0].image,
                        title: response.data[0].recipe[0].title,
                        vegan: response.data[0].recipe[0].vegan,
                        vegetarian:response.data[0].recipe[0].vegetarian,
                        glutenFree:response.data[0].recipe[0].glutenFree,
                        servings:response.data[0].recipe[0].servings,
                    };
                    this.recipeDetails = _recipe;
                    console.log(this.recipeDetails);
                }
            } catch (error) {
                console.log("error.response.status", error.response.status);
                // this.$router.replace("/NotFound");
                return;
            }
        },
        methods:{
            async updateQuantity(){
                try{
                    //after we have all details about recipe we get the analyzed instructions
                    ///recipeInstructions
                    let responseInstruction=  await this.axios.get(
                        "https://assignment3-2hilla-shahar.herokuapp.com/user/recipeInstructions/",
                        {
                            params: {
                                recipe_id: this.$route.params.recipe.id,
                                quantity: this.quantity
                            }
                        }
                    );
                    console.log(responseInstruction.data[1][0].steps.steps);
                    if(responseInstruction){
                        this.insertQuantity=true;
                        let recipe=this.recipeDetails;
                        let data={
                            steps: responseInstruction.data[1][0].steps.steps,
                            extendedIngredients: responseInstruction.data[0][0].extendedIngredients.extendedIngredients,
                            loved: recipe.loved,
                            watched: recipe.watched,
                            aggregateLikes: recipe.aggregateLikes,
                            readyInMinutes: recipe.readyInMinutes,
                            image: recipe.image,
                            title: recipe.title,
                            vegan: recipe.vegan,
                            vegetarian:recipe.vegetarian,
                            glutenFree:recipe.glutenFree,
                            servings: recipe.servings,
                        };
                        // console.log(data);
                        this.recipe=[];
                        this.recipe.push(data);
                        console.log(this.recipe);
                    }
                }catch(error){
                    console.log("error.response.status", error.response.status);
                    // this.$router.replace("/NotFound");
                    return;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        width: 1700px;
        background:rgba(255, 255, 255, 0.75);
        min-height: 400px;
        font-family: 'Architects Daughter';
        text-align: center;
        color:  #7a512f;
        font-weight: bold;
    }
    #title{
        align-items: center;
        font-family: 'Architects Daughter';
        text-align: center;
        font-weight: bold;
        color:  #7BB257;
    }
    #button{
        font-family: 'Architects Daughter';
        background: #7BB257;
        border: #2c3e50;
        align-content: center;
    }
</style>