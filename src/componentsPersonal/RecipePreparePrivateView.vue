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
                &#9201; {{ recipe.readyInMinutes }}    
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

            </b-col>
        <b-col>
            <br>
            <p id="header">Ingredients:</p>
            <b-row id="col" v-for="ingr in ingredients" :key="ingr.id">
                <RecipeIngredientsPreparePrivate class="RecipeIngredientsPreparePrivate" :ingredient="ingr"/>
            </b-row>
            <br>
            <p id="header">Steps:</p>
        
            <b-row id="col" v-for="step in steps" :key="step.id">
                <div v-if="step.length>3">
                    <div v-if="!parseInt(step.charAt(step.length-1))">
                        <RecipeChecklistPreparePrivate class="RecipeChecklistPreparePrivate" :step="step"/>
                    </div>
                        <div v-if="parseInt(step.charAt(step.length-1))">
                        <RecipeChecklistPreparePrivate class="RecipeChecklistPreparePrivate" :step="step.substring(0,step.length-2)"/>
                    </div>
                </div>
            </b-row>
            <br>
            <p id="header">Progress Prepare Recipe Bar:</p>

            <div>

                <b-progress :value="value" variant="success" show-progress striped :animated="animate"></b-progress>
                <b-progress-bar :value="value" >
                    Progress: <strong>{{ value.toFixed(2) }} / {{ steps.length }}</strong>
                </b-progress-bar>

            </div>
            <br>
            <br>
        </b-col>
    </div>
</template>

<script>
    import RecipeChecklistPreparePrivate from "../componentsPersonal/RecipeChecklistPreparePrivate.vue";
    import RecipeIngredientsPreparePrivate from "../componentsPersonal/RecipeIngredientsPreparePrivate.vue";
    export default {
        name: "PreparePageView",
        components: {
            RecipeChecklistPreparePrivate,
            RecipeIngredientsPreparePrivate
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
            
            this.recipe=this.recipe[0];
            this.steps=this.recipe.instructions;


            let arrayInfo = [];
      let newInstructions= this.steps.replace(/<\/?[^>]+(>|$)/g, "").split(".");
     
     //remove if there is blank word after last instruction
     let last=newInstructions[newInstructions.length-1];
     if(!last || last==="" || last===" " || last=="1"){
      newInstructions.splice(newInstructions.indexOf(last), 1);
      
     }

    //  this.steps=newInstructions;

    let selectedInstructions=[];
      newInstructions.map((newIns)=>{
          if(newIns.length>3){
          selectedInstructions.push(newIns);
          }
     });

     this.steps=selectedInstructions;
    this.ingredients=this.recipe.ingrediants;
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
