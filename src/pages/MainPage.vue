<template>
  <div class="container">
    <h1 class="title">Shahar & Hilla Recipe site</h1>
   
    <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />
    
    <p v-if="!$root.store.username">
      <router-link to="/Login" tag="button">You need to Login to vue this</router-link>
      {{ !$root.store.username }}
      
      <RecipePreviewList
        title="Last Viewed Recipes"
        :class="{
          RandomRecipes: true,
          blur: !$root.store.username,
          center: true,
          display: inline
        }"
        disabled
      ></RecipePreviewList>
    </p>
    <p v-else-if="$root.store.username">
      <RecipeLastWatched title="Last Viewed Recipes" class="LastViewedRecipes center"/>
    </p>
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
export default {
  components: {
    RecipePreviewList,
    RecipeLastWatched
  }
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
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
h1{
    color: #ffffff;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   text-align: center;
   font-weight: bold;
}
</style>
