<template>
    <div  class="container">
        <h1 id="title" class="title">Favorite Page</h1>
    
    </div>
</template>


<script>
export default {
  data() {
    return {
      recipe: null,
    };
  },
  async created() {
    try {
      let response;
      // response = this.$route.params.response;
      console.log(this);
         //console.log(this.recipe_id);
      console.log(this.$route);

      try {
          response = await this.axios.get(
          "https://assignment3-2hilla-shahar.herokuapp.com/user/favoritesRecipes"

        );

        console.log(response);
        if (response.status !== 200) this.$router.replace("/NotFound");
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }

      let info=response.data[0];
      
  
      let allIngrediants=info.extendedIngredients.extendedIngredients;
    
      let arrayInfo = [];
      let newInstructions=info.instructions.replace(/<\/?[^>]+(>|$)/g, "").split(".");
     
     //remove if there is blank word after last instruction
     let last=newInstructions[newInstructions.length-1];
     if(!last || last==="" || last===" "){
      newInstructions.splice(newInstructions.indexOf(last), 1);
     }
     
        let _recipe={

       instructions: newInstructions,
        extendedIngredients:
      allIngrediants.map((ingr)=>{
      let data ={
        name: ingr.name,
        unit: ingr.unit,
        amount: ingr.amount,
       }
       arrayInfo.push(data);
      
     }),
     extendedIngredients:arrayInfo,
        aggregateLikes: info.aggregateLikes,
        readyInMinutes: info.readyInMinutes,
        image: info.image,
        title: info.title
      };
      //  console.log(_recipe);

      this.recipe = _recipe;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
    background:rgba(255, 255, 255, 0.75);
  min-height: 400px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
  color:  #7a512f;
  font-weight: bold;
}
#title{
    align-items: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: center;
     font-weight: bold;
      color:  #7BB257;
}
</style>