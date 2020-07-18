<template>
<div class="all">
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

                <div v-if="recipe.vegan">
                       <img src="https://img.icons8.com/metro/26/000000/vegan-symbol.png"  height="17px" width="17px"/>
                    </div>

                    <div v-if="recipe.vegetarian">
                      <img src="https://img.icons8.com/color/48/000000/vegetarian-mark.png" height="20px" width="20px"/>
                    </div>

                    <div v-if="recipe.glutenFree">
                      <img src="https://img.icons8.com/carbon-copy/100/000000/no-gluten.png" height="20px" width="20px"/>
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
.all {
 width: 200px;
        height: 320px;
        position: relative;
        margin: 10px 10px;
        background:rgba(255, 255, 255, 0.75);
        border-color:  #7BB257;
        border-width: 4px;
        border-style: solid ;
}

.recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 192px;
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
  font-family: 'Architects Daughter';
  text-align: center;
  font-weight: bold;
  font-size: 12pt;
}
#values{
   text-align: center;
  font-size: 15px;
    color: #7BB257;
   font-family: 'Architects Daughter';
}

</style>
