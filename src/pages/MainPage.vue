<template>
    <div class="container">
        <br>
        <h1 class="title">Shahar & Hilla Recipes site</h1>
        <br>
        <b-row>
            <b-col>
                <RecipePreviewList id="wid" title="Explore these Recipes" class="RandomRecipes center" />
            </b-col>
            <b-col v-if="!$root.store.username">
                <LoginPage id="wid" title="LoginPages" class="LoginPages"/>
            </b-col>
            <b-col  v-else-if="$root.store.username">
                <RecipeLastWatched id="wid" title="Last Watched Recipes" class="LastViewedRecipes center"/>
            </b-col>
        </b-row>
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
        font-family: 'Architects Daughter';
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
        align-content: center;
        align-items: center;
    }
    h1{
        color: #ffffff;
        font-family: 'Architects Daughter';
        text-align: center;
        font-weight: bold;
        font-size: 70px;
        // text-shadow: 2px 2px 5px #d8a631;
        text-shadow: 1px 1px 2px #d8a631, 0 0 25px #d8a631, 0 0 5px #d8a631;
    }
    #logIn{
        font-family: 'Architects Daughter';
        background: #7BB257;
        border: #2c3e50;
    }


</style>
