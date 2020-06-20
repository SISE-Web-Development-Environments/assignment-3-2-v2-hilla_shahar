import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/Register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    // path: "/recipe/:recipeId",
    // name: "recipe",
    // component: () => import("./pages/RecipeViewPage"),
    path: "/recipe/showRecipe/recipeId/:recipe_id",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () => import("./pages/aboutPage"),
  // },
];

export default routes;
