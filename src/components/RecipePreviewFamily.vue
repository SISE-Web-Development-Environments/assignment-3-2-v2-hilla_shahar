<template>
  <router-link
    :to="{ name: 'userRecipeFamily', params: { recipe_id: recipe.id } }"
    class="recipe-preview"
  >
    <div class="recipe-body">
      <img  :src="recipe.image" height="50px" width="50px" class="recipe-image" />
    </div>
    <div class="recipe-footer">
      <div :title="recipe.title" class="recipe-title">
        {{ recipe.title }}
      </div>
      <ul class="recipe-overview">
       
        <li>{{ recipe.timeToEat }} </li>
      </ul>
    </div>
  </router-link>
</template>

<script>
export default {
  // mounted() {
  //   this.axios.get(this.recipe.image).then((i) => {
  //     this.image_load = true;
  //     // console.log("hla");
  //     //  console.log(this.recipe.image);
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
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  background:rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 120px;
  position: relative;

}

.recipe-preview .recipe-body .recipe-image {
   background:rgba(255, 255, 255, 0.75);
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow:auto;
  color: #7a512f;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   text-align: center;
   font-weight: bold;
   font-size: 30px;
   display: block;
}

.recipe-preview .recipe-footer .recipe-title {
   background:rgba(255, 255, 255, 0.75);
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
   background:rgba(255, 255, 255, 0.75);
  padding: 5px 10px;
  width: 100%;
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
  display: table-cell;
  text-align: center;
  font-size: 15px;
    color: #7BB257;
   font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
   text-align: center;
}
</style>
