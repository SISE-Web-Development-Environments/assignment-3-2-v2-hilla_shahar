<template>
    <div class="container">
        <h1 id="title" class="title">Prepare Page:</h1>
        <div v-if="!insertQuantity">
            <b-row>
                <b-col>Insert quantity:</b-col>
                <b-col><b-form-input v-model="quantity" placeholder="Quantity">
                </b-form-input></b-col>
                <b-col>
                    <button id="button" v-on:click="updateQuantity()"> Go </button>
                </b-col>
            </b-row>
        </div>
        <div v-if="insertQuantity">
            <RecipePrepareFamilyView class="recipePreview" :recipe="recipe" />
        </div>
    </div>
</template>

<script>
    import RecipePrepareFamilyView from "../componentsPersonal/RecipePrepareFamilyView.vue";

    export default {
        name: "PreparePage",
        components: {
            RecipePrepareFamilyView
        },
        data() {
            return {
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
        methods:{
            async updateQuantity(){
                try{

                    //INSTRUCTIONS
                    let responseInstruction=  await this.axios.get(
                        "https://assignment3-2hilla-shahar.herokuapp.com/user/userRecipeInstructions/",
                        {
                            params: {
                                recipe_id: this.$route.params.recipe.id,
                            }
                        }
                    );

                    //INGREDIANTS
                    let responseIngrediants=  await this.axios.get(
                        "https://assignment3-2hilla-shahar.herokuapp.com/user/userRecipeIngrediants/",
                        {
                            params: {
                                recipe_id: this.$route.params.recipe.id,
                                quantity: this.quantity
                            }
                        }
                    );

                    if(responseInstruction && responseIngrediants){
                        this.insertQuantity=true;

                        let dataIngrediants=[];
                        responseIngrediants.data.map((ingr)=>{
                            dataIngrediants.push(ingr);
                        });

                        let recipe=this.$route.params.recipe;

                        let data={
                            chef: recipe.chef,
                            image: recipe.image,
                            servings: recipe.servings,
                            id:recipe.id,
                            timeToEat: recipe.timeToEat,
                            instructions: responseInstruction.data[0].instruction,
                            ingrediants: dataIngrediants,
                            title: recipe.title
                        };

                        this.recipe=[];
                        this.recipe.push(data);
                        this.insertQuantity=true;
                    }

                }catch(error){
                    console.log("error.response.status", error.response.status);
                    // this.$router.replace("/NotFound");
                    return;
                }

            }
        },

    };
</script>

<style lang="scss" scoped>

    .container {
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