<template>
    <div  class="container">
        <h1 id="title" class="title">Prepare Page:</h1>
      
    </div>
</template>

<script>
    export default {
        data() {
            return {
                recipe: null,
            };
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