<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipeLastWatched",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      recipes: []
    };
  },
  mounted() {
    this.updateRecipes();
    
  },
  methods: {
    async updateRecipes() {
      try {
        console.log(this.$cookies);
        const response = await this.axios.get(
          "https://assignment3-2hilla-shahar.herokuapp.com/user/lastWatched/"
        );

        const recipes = response.data;

        const allDetailsRecipes=[];
        recipes.map(async(recipe)=>{
            const user_response = await this.axios.get(
                            "https://assignment3-2hilla-shahar.herokuapp.com/user/showRecipe",
                            {
                                params: {
                                    recipe_id: recipe.id
                                }
                            }
                        );

                        //get data about watched and loved
                        let userData = user_response.data[0].user_info[0];
                        let _recipe = {
                            id: recipe.id,
                            aggregateLikes: recipe.aggregateLikes,
                            readyInMinutes: recipe.readyInMinutes,
                            image: recipe.image,
                            title: recipe.title,
                            watched: userData.watched,
                            loved: userData.loved,
                            vegan: recipe.vegan,
                            vegetarian:recipe.vegetarian,
                            glutenFree:recipe.glutenFree,
                        };

                        allDetailsRecipes.push(_recipe); 

                        console.log(allDetailsRecipes);

                        this.recipes = [];
                        this.recipes.push(...allDetailsRecipes);
                        console.log(this.recipes);
        });

      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
