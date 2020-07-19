<template>
    <div  class="container">
        <h1 id="title" class="title">About Page</h1>
        <br><br>
        <p><b>Shahar Ben Shaya<br>
            Hilla Petefreund</b>
            <br>
            <br>
            <br>
            This is project at course "Web Development Enviroment"<br>
            We used for the client <img src="https://img.icons8.com/color/48/000000/vue-js.png" height="20px" width="20px"/>
            and for the server <img src="https://img.icons8.com/color/48/000000/nodejs.png" height="35px" width="35px"/>
            <br>
            We used spooncular recipe and food API for the recipes,<br>
            We also added our private and family recipes for our users which is visible only in our users<br>
            We saved data about users and our recipes at AZURE DB<br>
            <br>
        <p id="green">Recipe with green border- you are a guest or you are login but haven't watch it yet.</p>
        <p id="purple">Recipe with purple border- you are login and you watched it.</p><br>
        User can prepare recipe (guest can not) with steps.<br><br>
        Details on every recipe:
        <div class="diets">
            <p>Time in minutes:  &#9201; |
                Likes: &#10084; |
                Vegan :<img src="https://img.icons8.com/metro/26/000000/vegan-symbol.png"  height="17px" width="17px"/> |
                Vegetarian: <img src="https://img.icons8.com/color/48/000000/vegetarian-mark.png" height="20px" width="20px"/> |
                Gluten Free:  <img src="https://img.icons8.com/carbon-copy/100/000000/no-gluten.png" height="20px" width="20px"/></p>
        </div>
        <br>
         Our previous projects at this course:
        <br>
        <a href="https://sise-web-development-environments.github.io/208243220_307885236/">Pacman Game</a>
        <br>
        <a href="https://sise-web-development-environments.github.io/208243220/">Shahar's private site</a><br>
        <a href="https://sise-web-development-environments.github.io/307885236/">Hilla's private site</a><br>
        <br>
        <br>
        We Hope you enjoy this site &#128516;<br><br>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        background:rgba(255, 255, 255, 0.75);
        min-height: 400px;
        font-family: 'Architects Daughter';
        text-align: center;
        color:  #7a512f;
    }
    #title{
        align-items: center;
        font-family: 'Architects Daughter';
        text-align: center;
        font-weight: bold;
        color:  #7BB257;
    }
    .diets{
        text-indent: 50px;
    }
    #green{
        color:  #7BB257;
    }
    #purple{
        color: #aa3992;
    }
</style>