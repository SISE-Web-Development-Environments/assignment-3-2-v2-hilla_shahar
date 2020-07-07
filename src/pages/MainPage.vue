<template>
  <div class="container">
    <h1 class="title">Shahar & Hilla Recipes site</h1>
  <b-row>
   <b-col  >
    <RecipePreviewList id="wid" title="Random Recipes" class="RandomRecipes center" />
     </b-col>
     <!-- <b-col>
       .
     </b-col> -->
      <b-col  >
    <p v-if="!$root.store.username">
      <br><br>
      <!-- <router-link id="logIn" to="/Login" tag="button">You need to Login to vue this</router-link> -->
      <LoginPage id="wid" title="LoginPages" class="LoginPages"/>
    </p>
    <p v-else-if="$root.store.username">
      
      <RecipeLastWatched id="wid" title="Last Viewed Recipes" class="LastViewedRecipes center"/>
    </p>
     </b-col>
      </b-row>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import RecipeLastWatched from "../components/RecipeLastWatched";
import LoginPage from "./LoginPage";
export default {
  components: {
    RecipePreviewList,
    RecipeLastWatched,
    LoginPage
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin: 10px 0 10px;
  
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
#wid{
  width: 550px;
  padding: 10px;
}
h1{
    color: #ffffff;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   text-align: center;
   font-weight: bold;
}
#logIn{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background: #7BB257;
  border: #2c3e50;
}
</style>
