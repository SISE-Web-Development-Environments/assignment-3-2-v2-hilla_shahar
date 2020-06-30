<template>
    <div  class="container">
        <h1 id="title" class="title">Private Page</h1>
      <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreviewPersonal class="RecipePreviewPersonal" :recipe="r" />
      </b-col>
    </b-row>
    </div>
</template>

<script>
import RecipePreviewPersonal from "../components/RecipePreviewPersonal.vue";
export default {
  name: "PrivatePage",
  components: {
    RecipePreviewPersonal
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
        const response = await this.axios.get(
          //"https://test-for-3-2.herokuapp.com/recipes/random"
          "https://assignment3-2hilla-shahar.herokuapp.com/user/personalRecipes"
        
        );

        console.log(response);
        const recipes = response.data;
      
        console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);

        if(this.recipes.length===0){
          this.recipes.push("You don't have favorites yet.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
    background:rgba(255, 255, 255, 0.75);
  min-height: 400px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
  color:  #7a512f;
  font-weight: bold;
}
#title{
    align-items: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: center;
     font-weight: bold;
      color:  #7BB257;
}
</style>