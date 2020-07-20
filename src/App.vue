<template>
    <div id="app">
        <div id="menu">
            <b-navbar id="nav" >
                <b-navbar-brand :to="{ name: 'main' }">Main</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>

                    <b-navbar-nav>
                        <b-nav-item :to="{ name: 'search'}">Search</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav>
                        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
                    </b-navbar-nav>

                    <template v-if="!$root.store.username"> Hello Guest
                        <b-navbar-nav>
                            <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
                        </b-navbar-nav>
                        <b-navbar-nav>
                            <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
                        </b-navbar-nav>
                    </template>
                    <template v-else>
                        <b-navbar-nav class="ml-auto">
                            <template id="userName" center> {{ $root.store.username }}&nbsp;</template><br>
                            <b-button id="logOut" size="sm" @click="Logout">Logout</b-button>
                            <b-nav-item-dropdown text="Personal" right>
                                <b-dropdown-item :to="{ name: 'favorites' }">Favorites &#10084;</b-dropdown-item>
                                <b-dropdown-item :to="{ name: 'private' }">Private<img src="https://img.icons8.com/dotty/80/000000/employee-card.png" height="20px" width="20px"/></b-dropdown-item>
                                <b-dropdown-item :to="{ name: 'family' }">La Familia<img src="https://img.icons8.com/carbon-copy/100/000000/family.png" height="20px" width="20px"/></b-dropdown-item>
                            </b-nav-item-dropdown>

                        </b-navbar-nav>
                    </template>
                </b-collapse>
            </b-navbar>
        </div>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: "App",
        methods: {
            async Logout() {
                this.$root.store.logout();
                let response;
                try {
                    response = await this.axios.get(
                        "https://assignment3-2hilla-shahar.herokuapp.com/Logout");
                    console.log(response);
                    
                    sessionStorage.clear();
                    if (response.status !== 200) this.$router.replace("/NotFound");
                } catch (error) {
                    console.log("error.response.status", error.response.status);
                    this.$router.replace("/NotFound");
                    return;
                }
                this.$root.toast("Logout", "User logged out successfully", "success");
                this.$router.push("/").catch(() => {
                    this.$forceUpdate();
                });
            }
        }
    };
</script>

<style lang="scss">
     @import "@/scss/form-style.scss";
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #ffffff;
        font-size: 20px;
        font-weight: bold;
        font-family: 'Architects Daughter';
        // font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        background-image: url("../Resources/back.jpg");
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 100vh;
    }
    h1{
       font-family: 'Architects Daughter';
        text-align: left;
        font-weight: bold;
    }
    #nav a {
        font-weight: bold;
        color: #2c3e50;
        font-size:15px;
    }
    #nav a.router-link-exact-active {
        color: #F70102;
        font-size:15px;
    }
    #menu{
        // background:  #d8a631;
        background:  #d8a631;
        font-size:15px;
    }
    #userName{
        font-size:30px;
    }
    #logOut{
        background: #7BB257;
        border: #2c3e50;
    }
//     .dropdown-menu {
//     background-color: black;
// }
// .dropdown-menu > li > a {
//         color: white;
// }
.dropdown-menu > li > a:hover {
    background-color:#7BB257;
    background-image: none;
}
</style>