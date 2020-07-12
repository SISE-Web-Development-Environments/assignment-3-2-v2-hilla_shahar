<template>
<div class="recipe-preview">
  <router-link
    :to="{ name: 'showRecipe', params: { recipeId: recipe.id } }"
  >
    <div class="recipe-body">
      <img :src="recipe.image" class="recipe-image" />
    </div>
  </router-link>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <div id="values" class="recipe-overview">
        {{ recipe.readyInMinutes }} &#9201;<br>
        {{ recipe.aggregateLikes }} &#10084; <br>
          <div v-if="recipe.vegan">
                vegan<br>
          </div>
         
       <div v-if="recipe.vegetarian">
              vegetarian<br>
          </div>
    
           <div v-if="recipe.glutenFree">
               gluten free<br>
          </div>
          <div v-if="$root.store.username">
            <div v-if="recipe.watched">
              &#128065;
            </div>
            <div v-if="recipe.loved">
              you &#10084; it
            </div>
          </div>
  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  width: 180px;
  height: 280px;
  position: relative;
  margin: 10px 10px;
  background:rgba(255, 255, 255, 0.75);
  border-color: #7BB257;
  border-width: 2px;
  border-style: solid ;
}

.recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 175px;
}
 .recipe-footer {
 
  height: 60%;
  overflow:auto;
  width: 180px;
  display: inline-block;
  word-break: break-all;
  

}
.recipe-title {
  padding: 10px 10px;
  width: 180px;
  word-wrap: break-word;
  color: #7a512f;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
  font-weight: bold;
  font-size: 12pt;
}

#values{
   text-align: center;
  font-size: 15px;
    color: #7BB257;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>