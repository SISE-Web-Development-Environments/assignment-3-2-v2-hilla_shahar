<template>
    <div>
        <div>
            <input type="checkbox" id="jack" value="Jack" v-model="allIngrediants">
            <label for="jack"> {{ingredient.amount}} {{ingredient.unit}} {{ingredient.name}}</label>
        </div>
    </div>
</template>

<script>
    export default {
        // data() {
        //     return {
        //         // ingerdients: "",
        //     };
        // },
        props: {
            ingredient: {
                type: Object,
                required: true
            }
        },
        // async created(){
        //     console.log(this);
        //     console.log(this.ingredient);

        //     // if(allIngrediants){
        //     //      text-decoration: line-through;
        //     // }
        // }
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
    input[type=checkbox]:checked:after {
        background: #7BB257 !important;
        color: black !important;
        text-decoration: line-through;
    }
</style>
