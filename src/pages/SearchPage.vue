<template>
  <div class="container">
     <b-form @submit.prevent="searchRecipe" class="form">
    <h1 id="title" class="title">Search &#128270; </h1>
    <br>
    <b-form-input v-model="searchQuery" placeholder="Search">
  </b-form-input>

<br><br>
  <b-table>
      <b-row>
          <b-col id="col">Cuisine:</b-col>
          <b-col id="col">Diet:</b-col>
          <b-col id="col">Intolerances:</b-col>
      </b-row>
      <b-row>
         <b-col><select v-model="cuisine">
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
</select></b-col>
      
            <b-col><select v-model="diet">
    <option>Gluten Free</option>
    <option>Ketogenic</option>
    <option>Vegetarian</option>
    <option>Lacto-Vegetarian</option>
    <option>Ovo-Vegetarian</option>
    <option>Vegan</option>
    <option>Pescetarian</option>
    <option>Paleo</option>
    <option>Primal</option>
    <option>Whole30</option>
</select></b-col>
 <b-col><select v-model="intolerance">
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
    <option>Wheat</option>
</select></b-col>
      </b-row>
 <b-row> </b-row><br>
<b-row >
 
  <b-col colspan="3" align-self="center">
<p align="center">Choose num of results:</p>
  </b-col>
</b-row>

<b-row>
  <!-- <b-col><br></b-col> -->
  <b-col><input type="radio" id="five" name="resultsNum" value=5 v-model="numResults">
  <label for="five">5</label><br> <input type="radio" id="ten" name="resultsNum" value=10 v-model="numResults">
  <label for="ten">10</label><br><input type="radio" id="fifth" name="resultsNum" value=15 v-model="numResults">
  <label for="fifth">15</label><br></b-col>
</b-row>

 <b-row> </b-row><br>
<b-row >
  <b-col colspan="3" align-self="center">
<p align="center">Sorting results by:</p>
  </b-col>
</b-row>

<b-row>
  <!-- <b-col><br></b-col> -->
  <b-col><input type="radio" id="none" name="searchOrder" value="none" v-model="searchOrder">
  <label for="none">none</label><br> 
  <input type="radio" id="time" name="searchOrder" value="time" v-model="searchOrder">
  <label for="time">Time preperation</label><br>
  <input type="radio" id="popular" name="searchOrder" value="popular" v-model="searchOrder">
  <label for="popular">Popularity</label><br></b-col>
</b-row>



<b-row>
  
  <b-col >
    <b-button id="searchButton" type="submit" size="lg" @click="pushedSearch=!pushedSearch">Search</b-button>
  </b-col>
</b-row>
  </b-table>
  <br><br>

  <template v-if="!pushedSearch">
    <b-row>
      <b-row v-for="(r,index) in recipes" :key="index">
        <b-col v-for="x in r" :key="x.id">
        <!-- <template v-if="index%3==0">
          {{index}}
        </template> -->
        <RecipePreview class="recipePreview" :recipe="x" />
      </b-col>
      </b-row>
      </b-row>
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
      numResults: 5,
      cuisine: "",
      diet: "",
      intolerance: "",
      searchQuery: "",
      searchOrder: "none",
    };
  },
  mounted() {
    this.searchRecipe();
  },
  methods: {
    async searchRecipe() {
      try {
       // this.pushedSearch = true;
        console.log(this.searchOrder);

        const response = await this.axios.get(
          //"https://test-for-3-2.herokuapp.com/recipes/random"
          "https://assignment3-2hilla-shahar.herokuapp.com/recipe/search/query"
          //  {
          //   params: { 
          //     query: this.searchQuery,
          //     cuisine: this.cuisine,
          //     diet: this.diet,
          //     intolerances: this.intolerance,
          //     number: this.numResults,
          //     instructionsRequired: true,
          //      }
          // }
        
        );

        console.log(response);
        const recipes = response.data;

        // console.log(recipes);


        this.recipes = [];
        let arr = [];
        let len = Math.ceil(recipes.length/5);

        for(let i = 0; i < len; i++) {
          for(let j = 0; recipes.length > 0 && j < 5; j++) {
            arr.push(recipes.pop());
          }
          this.recipes.push(arr);
          arr = [];
        }


        //this.recipes.push(...recipes);
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
  background:rgba(255, 255, 255, 0.75);
   color:  #7a512f;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   text-align: center;
    font-weight: bold;
}
#searchButton{
  background: #7BB257;
  border: #7BB257;
}
#ccol{
    color: #7a512f;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   text-align: center;
}
#title{
    align-items: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: center;
     font-weight: bold;
      color:  #7BB257;
}
</style>
