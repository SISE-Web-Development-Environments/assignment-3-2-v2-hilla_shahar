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
        {{ recipe.readyInMinutes }} minutes<br>
        {{ recipe.aggregateLikes }} likes <br>
          <div v-if="recipe.vegan">
                vegan<br>
          </div>
         
       <div v-if="recipe.vegetarian">
              vegetarian<br>
          </div>
    
           <div v-if="recipe.glutenFree">
               gluten free<br>
          </div>
            <!-- <div v-if="!recipe.user">
               loved: {{recipe.loved}}<br>
                watched: {{recipe.watched}}<br>
          </div> -->
  
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //   });
  // },
  data() {
    return {
      // image_load: false
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true
    }

    // id: {
    //   type: Number,
    //   required: true
    // },
    // title: {
    //   type: String,
    //   required: true
    // },
    // readyInMinutes: {
    //   type: Number,
    //   required: true
    // },
    // image: {
    //   type: String,
    //   required: true
    // },
    // aggregateLikes: {
    //   type: Number,
    //   required: false,
    //   default() {
    //     return undefined;
    //   }
    // }
  }
};
</script>

<style scoped>

.recipe-preview {
  /* display: inline-block; */

  width: 180px;
   /* word-break: break-all; */
  height: 280px;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  background:rgba(255, 255, 255, 0.75);
  width: 180px;
   /* word-break: break-all; */
  height: 120px;
  /* position: relative; */
}
.recipe-preview .recipe-body .recipe-image {
   background:rgba(255, 255, 255, 0.75);
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 180px;
  /* word-break: break-all; */
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}
.recipe-preview .recipe-footer {
  background:rgba(255, 255, 255, 0.75);
 
  height: 60%;
  overflow:auto;
  /* font-size: 40px; */
  width: 180px;
  display: inline-block;
  word-break: break-all;
 
}
.recipe-preview .recipe-footer .recipe-title {
  /* background:rgba(255, 255, 255, 0.75); */
  padding: 10px 10px;
  width: 180px;
  overflow: hidden;
  /* TODO: text in new line ???? how??? */
  /* text-overflow: ellipsis; */
  /* overflow:initial; */
  /* word-break: break-all; */
  /* overflow: auto; */
  color: #7a512f;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
  font-weight: bold;
  font-size: 12pt;
  
  text-align: left;
  white-space: nowrap;

}
.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
   width: 180px;
   word-break: break-all;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}
.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
   word-break: break-all;
  display: table-cell;
}
#values{
   text-align: center;
  font-size: 15px;
    color: #7BB257;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>