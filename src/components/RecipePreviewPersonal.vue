<template>
<div>
  <router-link
    :to="{ name: 'userRecipe', params: { recipe_id: recipe.id } }"
    class="recipe-preview">
    <div class="recipe-body">
      <img  :src="recipe.image" height="50px" width="50px" class="recipe-image" />
    </div>
    </router-link>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <div id="values" class="recipe-overview">
       {{ recipe.readyInMinutes }}  &#9201;
        {{ recipe.aggregateLikes }} &#10084;
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
}

.recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 200px;
  height: 180px;
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
