<template>
    <div  class="container">
        <h1 id="title" class="title">Favorite Page</h1>
        <div v-if="have">
      <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview class="RecipePreview" :recipe="r"/>
      </b-col>
    </b-row>
    </div>
      <div v-if="!have">
            <b-row>
                <b-col >
                    <p>There is no favorites recipes yet</p>
                </b-col>
            </b-row>
        </div>
    </div>
</template>



<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "favoritePage",
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
      recipes: [],
      have: true,
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const response = await this.axios.get(
          "https://assignment3-2hilla-shahar.herokuapp.com/user/favoritesRecipes"
        );

        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);

        if(this.recipes.length===0){
          this.have=false;
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
</style>