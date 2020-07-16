<template>
    <div class="container">
        <div v-if="recipe">
            <div class="recipe-header mt-3 mb-4">
                <h1>{{ recipe.title }}</h1>
                <img :src="recipe.image" class="center" />
            </div>
            <div class="recipe-body">
                <div class="wrapper">
                    <div class="wrapped">
                        <div class="mb-3">
                            <div>&#9201; {{ recipe.readyInMinutes }} minutes</div>
                            <div>Num Of Servings: {{ recipe.servings }}</div>
                        </div>
                        Ingredients:
                        <ul>
                            <li v-for="r in recipe.extendedIngredients" :key="'_' + r.name">
                                 {{r.amount}} {{r.unit}} {{ r.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="wrapped">
                        Instructions:
                        <ol id="text">
                            {{ recipe.instructions}}
                        </ol>
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
                recipe: null,
            };
        },
        async created() {
            let response;

            try {
                response = await this.axios.get(
                    "https://assignment3-2hilla-shahar.herokuapp.com/user/showPersonalRecipes/",
                    {
                        params: { recipe_id: this.$route.params.recipe_id
                        }
                    }
                );

                let info=response.data[0];
                let arrayInfo = [];
                let ingrediants=info.ingrediants;

                ingrediants.map((ingr)=>{
                    let data ={
                        name: ingr.ingradient,
                        unit: ingr.unitType,
                        amount: ingr.quantity,
                    }
                    arrayInfo.push(data);

                });

                let _recipe={
                    instructions: info.instructions,
                    extendedIngredients:arrayInfo,
                    aggregateLikes: info.aggregateLikes,
                    readyInMinutes: info.readyInMinutes,
                    image: info.image,
                    title: info.title,
                    servings: info.servings,
                };

                this.recipe = _recipe;
                if (response.status !== 200) this.$router.replace("/NotFound");
            } catch (error) {
                console.log("error.response.status", error.response.status);
                this.$router.replace("/NotFound");
                return;
            }



        }
    };
</script>

<style scoped>
    .wrapper {
        display: flex;
    }
    .wrapped {
        width: 50%;
    }
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
    .container{
        background:rgba(255, 255, 255, 0.75);
    }
    h1{
        color: #7BB257;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        text-align: center;
        font-weight: bold;
    }
    .wrapper{
        color: #7BB257;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        text-align: left;
        font-weight: bold;
    }
    li{
        color: #7a512f;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        text-align: left;
        font-weight: 100;
    }
    #text{
        color: #7a512f;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        text-align: left;
        font-weight: 100;
    }
</style>
