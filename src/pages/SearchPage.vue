<template>
    <div class="container">
        <b-form @submit.prevent="searchRecipe" class="form">
            <h1 id="title" class="title">Search &#128270; </h1>
            <br>
            <b-form-input v-model="searchQuery" placeholder="Search">
            </b-form-input>

            <br><br>

            <b-row>
                <b-col id="col">Cuisine:</b-col>
                <b-col id="col">Diet:</b-col>
                <b-col id="col">Intolerances:</b-col>
            </b-row>
            <b-row>
                <b-col><select v-model="cuisine">
                    <option>African</option>
                    <option>American</option>
                    <option>British</option>
                    <option>Cajun</option>
                    <option>Caribbean</option>
                    <option>Chinese</option>
                    <option>Eastern European</option>
                    <option>European</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Greek</option>
                    <option>Indian</option>
                    <option>Irish</option>
                    <option>Italian</option>
                    <option>Japanese</option>
                    <option>Jewish</option>
                    <option>Korean</option>
                    <option>Latin American</option>
                    <option>Mediterranean</option>
                    <option>Mexican</option>
                    <option>Middle Eastern</option>
                    <option>Nordic</option>
                    <option>Southern</option>
                    <option>Spanish</option>
                    <option>Thai</option>
                    <option>Vietnamese</option>
                </select></b-col>

                <b-col><select v-model="diet">
                    <option>Gluten Free</option>
                    <option>Ketogenic</option>
                    <option>Vegetarian</option>
                    <option>Lacto-Vegetarian</option>
                    <option>Ovo-Vegetarian</option>
                    <option>Vegan</option>
                    <option>Pescetarian</option>
                    <option>Paleo</option>
                    <option>Primal</option>
                    <option>Whole30</option>
                </select></b-col>
                <b-col><select v-model="intolerance">
                    <option>Dairy</option>
                    <option>Egg</option>
                    <option>Gluten</option>
                    <option>Grain</option>
                    <option>Peanut</option>
                    <option>Seafood</option>
                    <option>Sesame</option>
                    <option>Shellfish</option>
                    <option>Soy</option>
                    <option>Sulfite</option>
                    <option>Tree Nut</option>
                    <option>Wheat</option>
                </select></b-col>
            </b-row>
            <b-row> </b-row><br>
            <b-row >

                <b-col colspan="3" align-self="center">
                    <p align="center">Choose num of results:</p>
                </b-col>
            </b-row>

            <b-row>
                <b-col><input type="radio" id="five" name="resultsNum" value=5 v-model="numResults">
                    <label for="five">5</label><br> <input type="radio" id="ten" name="resultsNum" value=10 v-model="numResults">
                    <label for="ten">10</label><br><input type="radio" id="fifth" name="resultsNum" value=15 v-model="numResults">
                    <label for="fifth">15</label><br></b-col>
            </b-row>

            <b-row>
                <b-col >
                    <b-button id="searchButton" type="submit" size="lg" v-on:click="pushedSearch=true">Search</b-button>
                </b-col>
            </b-row>

            <br><br>

            <template v-if="pushedSearch">
                <div v-if="have">
                    <b-row>
                        <b-row v-for="(r,index) in recipes" :key="index">
                            <b-col v-for="x in r" :key="x.id">
                                <RecipePreview class="recipePreview" :recipe="x" />
                            </b-col>
                        </b-row>
                    </b-row>

                    <b-row >
                        <b-col colspan="3" align-self="center">
                            <p align="center">Sorting results by:</p>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col><input type="radio" id="none" name="searchOrder" value="none" v-model="searchOrder" @change="searchRecipe()">
                            <label for="none">none</label><br>
                            <input type="radio" id="time" name="searchOrder" value="time" v-model="searchOrder" @change="searchRecipe()">
                            <label for="time">Time preperation</label><br>
                            <input type="radio" id="popular" name="searchOrder" value="popular" v-model="searchOrder" @change="searchRecipe()">
                            <label for="popular">Popularity</label><br></b-col>
                    </b-row>
                    Time in minutes:  &#9201; |
                    Likes: &#10084; |
                    Vegan :<img src="https://img.icons8.com/metro/26/000000/vegan-symbol.png"  height="17px" width="17px"/> |
                    Vegetarian: <img src="https://img.icons8.com/color/48/000000/vegetarian-mark.png" height="20px" width="20px"/> |
                    Gluten Free:  <img src="https://img.icons8.com/carbon-copy/100/000000/no-gluten.png" height="20px" width="20px"/>
                    <br>
                </div>
                <div v-if="!have">
                    <b-alert class="mt-2" v-if="!have" variant="warning" dismissible show>
                        There was no recipes for your search
                    </b-alert>
                </div>
            </template>
        </b-form>
    </div>
</template>


<script>
    import RecipePreview from "../components/RecipePreview.vue";
    export default {
        name: "SearchPage",
        components: {
            RecipePreview
        },
        data() {
            return {
                recipes: [],
                pushedSearch: false,
                numResults: 5,
                cuisine: "",
                diet: "",
                intolerance: "",
                searchQuery: "",
                searchOrder: "none",
                have: false,
                searchAlready: false,
                resultsLastSearch: [],
                showSessionSearch: false,
            };
        },
        methods: {
            async searchRecipe() {
                this.have=true;
                let recipesId = []; //recipeID list
                let recipes=[];
                let allRecipesInfo = []; //get recipes array from apispooncular to be recognize after try catch block
                try {
                    if(!this.searchAlready){
                        this.recipes=[];
                        const response = await this.axios.get(
                            "https://assignment3-2hilla-shahar.herokuapp.com/recipe/search",
                            {
                                params: {
                                    query: this.searchQuery,
                                    cuisine: this.cuisine,
                                    diet: this.diet,
                                    intolerances: this.intolerance,
                                    number: this.numResults,
                                    instructionsRequired: true,
                                }
                            }
                        );
                        //no results in query
                        if(response.length===0){
                            this.have=false;
                        }
                        recipes = response.data;
                        this.searchAlready=true;
                    }else{
                        let allRecipesData=[];
                        let arr= this.recipes;
                        this.recipes=[];
                        //tmp arr that moving on every recipe
                        arr.map((rec)=>{
                            allRecipesData.push(rec[0]);
                        });
                        recipes=allRecipesData;
                    }
                    if(this.searchOrder==="time"){
                        recipes.sort((a, b) => (a.readyInMinutes > b.readyInMinutes) ? 1 : -1);
                    }
                    if(this.searchOrder==="popular"){
                        recipes.sort((a, b) => (a.aggregateLikes > b.aggregateLikes) ? 1 : -1);
                    }
                    //pushing all recipes data into array
                    allRecipesInfo.push(...recipes);
                    //pushing all Ids into array
                    recipes.map((recipe) => {
                        recipesId.push(recipe.id);
                    });
                } catch (error) {
                    console.log(error);
                }
                let allDetailsRecipes = [];
                //if there is username
                if(this.$root.store.username){
                    //there is no save search
                    // if(!this.alreadySaveToStorage){
                    for (let i = 0; i < recipesId.length; i++) {
                        let idR = recipesId[i];
                        try {
                            const user_response = await this.axios.get(
                                "https://assignment3-2hilla-shahar.herokuapp.com/user/showRecipe",
                                {
                                    params: {
                                        recipe_id: idR
                                    }
                                }
                            );
                            /********** pick relevance data  ***********/
                                //user data-loved, watched
                            let userData = user_response.data[0].user_info[0];
                            //all other information from apispooncular
                            let info = user_response.data[0].recipe[0];
                            // console.log(user_response.data[0]);
                            let _recipe = {
                                id: idR,
                                aggregateLikes: info.aggregateLikes,
                                readyInMinutes: info.readyInMinutes,
                                image: info.image,
                                title: info.title,
                                watched: userData.watched,
                                loved: userData.loved,
                                vegan: info.vegan,
                                vegetarian: info.vegetarian,
                                glutenFree: info.glutenFree,
                            };
                            // this.isUserConnection=true;
                            allDetailsRecipes.push(_recipe);
                            //insert into arary of 5
                            let arr = [];
                            let len = Math.ceil(allDetailsRecipes.length/5);
                            for(let i = 0; i < len; i++) {
                                for(let j = 0; allDetailsRecipes.length > 0 && j < 5; j++) {
                                    let info=allDetailsRecipes.pop();
                                    arr.push(info);
                                }
                                this.recipes.push(arr);
                                arr = [];
                            }
                        } catch (error) {
                            console.log(error);
                        }
                        console.log(this.recipes);
                        if(this.recipes.length==0){
                            this.have=false;
                        }
                        //save to storage
                        sessionStorage.setItem(this.$root.store.username, JSON.stringify(this.recipes));
                    }//for
                }else{
                    let arr = [];
                    let len = Math.ceil(allRecipesInfo.length/5);
                    for(let i = 0; i < len; i++) {
                        for(let j = 0; allRecipesInfo.length > 0 && j < 5; j++) {
                            let info=allRecipesInfo.pop();
                            let data={
                                id: info.id,
                                title: info.title,
                                image: info.image,
                                vegan: info.vegan,
                                vegetarian:info.vegetarian,
                                glutenFree:info.glutenFree,
                                aggregateLikes: info.aggregateLikes,
                                readyInMinutes: info.readyInMinutes,
                            };
                            arr.push(data);
                        }
                        this.recipes.push(arr);
                        // console.log(arr);
                        arr = [];
                    }
                }
                // console.log(this.recipes);
                if(this.recipes.length==0){
                    this.have=false;
                }
            },
        },
        async created(){
            if(this.$root.store.username){
                if(!this.showSessionSearch){
                    this.showSessionSearch=true;
                    this.resultsLastSearch=JSON.parse(sessionStorage.getItem(this.$root.store.username));
                    if(this.resultsLastSearch){
                        this.recipes=this.resultsLastSearch;
                        this.pushedSearch=true;
                        this.have=true;
                    }
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .container {
        width: 1200px;
        min-height: 400px;
        background:rgba(255, 255, 255, 0.75);
        color:  #7a512f;
        font-family: 'Architects Daughter';
        text-align: center;
        font-weight: bold;
    }
    #searchButton{
        background: #7BB257;
        border: #7BB257;
    }
    #ccol{
        color: #7a512f;
        font-family: 'Architects Daughter';
        text-align: center;
    }
    #title{
        align-items: center;
        font-family: 'Architects Daughter';
        text-align: center;
        font-weight: bold;
        color:  #7BB257;
    }
    option[selected] { background: #f00; }
</style>