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
            </div>
             <div id="smallTitle" >Ingredients:</div>
            <ul>
              <li
                v-for="(r, index) in recipe.extendedIngredients"
                :key="index + '_' + r.name"
              >
               {{ r.amount }} {{ r.unit }} {{ r.name }}
              </li>
            </ul>
          </div>
          <div class="wrapped">
             <div id="smallTitle" >Instructions:</div>
            <ol>
              <!-- <li v-for="s in recipe.instructions" :key="s.number">
                {{ s.step }}
              </li> -->
              {{ recipe.instructions }} 
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
      recipe: null
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;

      try {
          //console.log("Hilla");
          console.log(this);
          console.log(this.$route);
          console.log(this.$route.params.recipeId);
          if (this.$root.store.username) {
            console.log("hello" , this.$root.store.username);
            response = await this.axios.get(
              "https://assignment3-2hilla-shahar.herokuapp.com/user/showRecipe/",
              {
                params: {
                  recipe_id: this.$route.params.recipeId
                }
              }
            );
            console.log(response);
            console.log(response.data[0].recipe[0]);
            console.log(response.data[0].recipe[0].extendedIngredients.extendedIngredients);
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
          console.log(this.recipe);

          }
          else {
            console.log("hello guest");
            response = await this.axios.get(
              "https://assignment3-2hilla-shahar.herokuapp.com/recipe/showRecipe/",
              {
                params: { recipe_id: this.$route.params.recipeId }
              }
            );
          
          

        console.log(response);

        if (response.status !== 200) this.$router.replace("/NotFound");
        // let {
      //   // analyzedInstructions,
      //   instructions,
      //   extendedIngredients.extendedIngredients,
      //   aggregateLikes,
      //   readyInMinutes,
      //   image,
      //   title
      // } = response.data[0];

        console.log(response.data[0]);
        console.log(response.data[0].extendedIngredients.extendedIngredients);



      // let _instructions = analyzedInstructions
      //   .map((fstep) => {
      //     fstep.steps[0].step = fstep.name + fstep.steps[0].step;
      //     return fstep.steps;
      //   })
      //   .reduce((a, b) => [...a, ...b], []);

      let _recipe = {
        instructions:  response.data[0].instructions,
        // _instructions,
        // analyzedInstructions,
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
/* .recipe-header{

} */
</style>
