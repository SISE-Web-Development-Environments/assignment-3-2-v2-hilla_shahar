<template>
  <div class="container">
    <div v-if="recipe">
      <div class="recipe-header mt-3 mb-4">
        <h1>{{ recipe.title }}</h1>
        <img :src="recipe.image" class="center" />
      </div>
      <div class="recipe-body">
        <div class="wrapper">
          <div class="wrapped">
            <div class="mb-3">
              <div>Ready in {{ recipe.readyInMinutes }} minutes</div>
              <!-- <div>Likes: {{ recipe.aggregateLikes }} likes</div> -->
              <div>Num Of Servings: {{ recipe.servings }}</div>
            </div>
            Ingredients:
            <ul>
              <li v-for="r in recipe.extendedIngredients" :key="'_' + r.name"
              >
                {{ r.name}}:  {{r.amount}} {{r.unit}}
              </li>
            </ul>
          </div>
          <div class="wrapped">
            Instructions:
            <ol id="text">
              <!-- <li v-for="s in recipe.instructions" :key="s.number"> -->
              {{ recipe.instructions}}
              <!-- </li> -->
            </ol>
          </div>
        </div>
      </div>
      <!-- <pre>
      {{ $route.params }}
      {{ recipe }}
    </pre
      > -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      
      console.log( this.$route.params.recipe_id );
    
      try {
          response = await this.axios.get(
          "https://assignment3-2hilla-shahar.herokuapp.com/user/showPersonalRecipes/recipeId/:recipe_id",
          {
            params: { recipe_id: this.$route.params.recipe_id
            }
          }
        );

        console.log(response);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let info=response.data[0];
      
      console.log(info);
      let arrayInfo = [];
    //  let newInstructions=info.instructions.replace(/<\/?[^>]+(>|$)/g, "").split(".");
   //   console.log(newInstructions);
     //remove if there is blank word after last instruction
   //  let last=newInstructions[newInstructions.length-1];
    //  if(!last || last==="" || last===" "){
    //   newInstructions.splice(newInstructions.indexOf(last), 1);
    //  }
     
      let ingrediants=info.ingrediants;
      console.log(ingrediants);

      ingrediants.map((ingr)=>{
      let data ={
        name: ingr.ingradient,
        unit: ingr.unitType,
        amount: ingr.quantity,
       }
       arrayInfo.push(data);
      
     });

    console.log(arrayInfo);


        let _recipe={
        instructions: info.instructions,
     extendedIngredients:arrayInfo,
        aggregateLikes: info.aggregateLikes,
        readyInMinutes: info.readyInMinutes,
        image: info.image,
        title: info.title,
        servings: info.servings,
      };
      //  console.log(_recipe);

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.container{
  background:rgba(255, 255, 255, 0.75);
}
h1{
  color: #7BB257;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
  font-weight: bold;
}
.wrapper{
  color: #7BB257;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   text-align: left;
    font-weight: bold;
}
li{
    color: #7a512f;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   text-align: left;
   font-weight: 100;
}
#text{
   color: #7a512f;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   text-align: left;
   font-weight: 100;
}
</style>
