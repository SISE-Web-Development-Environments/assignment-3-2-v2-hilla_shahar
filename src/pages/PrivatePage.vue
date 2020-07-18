<template>
    <div  class="container">
        {{title}}
        <h1 id="title" class="title">Private Page</h1>
        <div v-if="have">
            <b-row>
                <b-col v-for="r in recipes" :key="r.id">

                    <RecipePreviewPersonal class="RecipePreviewPersonal" :recipe="r" />
                </b-col>
            </b-row>

        </div>
        <div v-if="!have">
            <b-row>
                <b-col>
                    <p>There is no private recipes for {{ $root.store.username }}</p>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import RecipePreviewPersonal from "../componentsPersonal/RecipePreviewPersonal.vue";
    export default {
        name: "PrivatePage",
        components: {
            RecipePreviewPersonal
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
                have: true,
            };
        },
        mounted() {
            this.updateRecipes();
        },
        methods: {
            async updateRecipes() {
                try {
                    const response = await this.axios.get(
                        "https://assignment3-2hilla-shahar.herokuapp.com/user/personalRecipes"
                    );

                    const recipes = response.data;
                    this.recipes = [];
                    this.recipes.push(...recipes);

                    //update message to user if there is no personal recipes
                    if(this.recipes.length==0){
                        this.have=false;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
    .container {
        background:rgba(255, 255, 255, 0.75);
        min-height: 400px;
        font-family: 'Architects Daughter';
        text-align: center;
        color:  #7a512f;
        font-weight: bold;
    }
    #title{
        align-items: center;
        font-family: 'Architects Daughter';
        text-align: center;
        font-weight: bold;
        color:  #7BB257;
    }

</style>d