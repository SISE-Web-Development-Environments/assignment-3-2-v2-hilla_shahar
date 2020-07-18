<template>
    <div class="container">
        <h1 id="text">Something went wrong, please try again!</h1>
        <router-link id="link" to="/" exact>Go Home</router-link>
    </div>
</template>

<style scoped>
    .container {
        min-height: 400px;
        background:rgba(255, 255, 255, 0.75);
    }
    #text{
        color: #7BB257;
        text-align: center;
        font-weight: bold;
        font-family: 'Architects Daughter';
    }
    #link{
        color: #7a512f;
        text-align: center;
        font-weight: bold;
        font-family: 'Architects Daughter';
    }
</style>