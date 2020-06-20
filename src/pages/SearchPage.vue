<template>
  <div class="container">
     <b-form @submit.prevent="searchRecipe" class="form">
    <h1 class="title">Search Page</h1>
    <br>
    <b-form-input v-model="searchQuery" placeholder="Search">
  </b-form-input>
  <br><br>Cuisine: 
<select v-model="cuisine">
    <option>African</option>
    <option>American</option>
    <option>British</option>
    <option>Cajun</option>
    <option>Caribbean</option>
    <option>Chinese</option>
    <option>Eastern European</option>
    <option>European</option>
    <option>French</option>
    <option>German</option>
    <option>Greek</option>
    <option>Indian</option>
    <option>Irish</option>
    <option>Italian</option>
    <option>Japanese</option>
    <option>Jewish</option>
    <option>Korean</option>
    <option>Latin American</option>
    <option>Mediterranean</option>
    <option>Mexican</option>
    <option>Middle Eastern</option>
    <option>Nordic</option>
    <option>Southern</option>
    <option>Spanish</option>
    <option>Thai</option>
    <option>Vietnamese</option>                                                           <option>Japanese</option>
</select>
<br>
Diet: 
<select v-model="diet">
    <option>Gluten Free</option>
    <option>Ketogenic</option>
    <option>Vegetarian</option>
    <option>Lacto-Vegetarian</option>
    <option>Ovo-Vegetarian</option>
    <option>Vegan</option>
    <option>Pescetarian</option>
    <option>Paleo</option>
    <option>Primal</option>
    <option>Whole30</option>                                                      <option>Japanese</option>
</select>
<br>
Intolerances:
<select v-model="intolerance">
    <option>Dairy</option>
    <option>Egg</option>
    <option>Gluten</option>
    <option>Grain</option>
    <option>Peanut</option>
    <option>Seafood</option>
    <option>Sesame</option>
    <option>Shellfish</option>
    <option>Soy</option>
    <option>Sulfite</option>
    <option>Tree Nut</option>
    <option>Wheat</option>                                                          <option>Japanese</option>
</select>
<br><br>
<p>Please choose num of results:</p>
  <input type="radio" id="five" name="resultsNum" value=5 v-model="numResults">
  <label for="five">5</label><br>
  <input type="radio" id="ten" name="resultsNum" value=10 v-model="numResults">
  <label for="ten">10</label><br>
  <input type="radio" id="fifth" name="resultsNum" value=15 v-model="numResults">
  <label for="fifth">15</label>
<br>

 <b-button id="searchButton" type="submit" size="sm" @click="pushedSearch=!pushedSearch">Search</b-button>
  <template v-if="!pushedSearch">
    
    <b-row>
      <b-col v-for="(r,index) in recipes" :key="index+'_'+r.id">
        <template v-if="index%3==0">
          <br>
        </template>
        <RecipePreview class="recipePreview" :recipe="r" />
      </b-col>
    </b-row>

  <!-- <RecipePreview title="Search results" class="RecipePreview center"/> -->
  </template>
   </b-form>
  </div>
</template>


<script>
import RecipePreview from "../components/RecipePreview.vue";
export default {
  name: "SearchPage",
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
      pushedSearch: false,
      numResults: "",
      cuisine: "",
      diet: "",
      intolerance: "",
      searchQuery: "",
    };
  },
  mounted() {
    this.searchRecipe();
  },
  methods: {
    async searchRecipe() {
      try {
       // this.pushedSearch = true;
        console.log(this.numResults);

        const response = await this.axios.get(
          //"https://test-for-3-2.herokuapp.com/recipes/random"
          "https://assignment3-2hilla-shahar.herokuapp.com/recipe/search",
           {
            params: { 
              query: this.searchQuery,
              cuisine: this.cuisine,
              diet: this.diet,
              intolerances: this.intolerance,
              number: this.numResults,
              instructionsRequired: true,
               }
          }
        
        );

        console.log(response);
        const recipes = response.data;
        // console.log(recipes);
        this.recipes = [];
        this.recipes.push(...recipes);
        console.log(this.recipes);
        this.pushedSearch=false;
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
