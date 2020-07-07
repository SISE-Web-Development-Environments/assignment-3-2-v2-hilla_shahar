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
          //"https://test-for-3-2.herokuapp.com/recipes/random"
          "https://assignment3-2hilla-shahar.herokuapp.com/user/lastWatched"
          , {withCredentials: true }
        );

        console.log(response);
        const recipes = response.data;
      
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
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
