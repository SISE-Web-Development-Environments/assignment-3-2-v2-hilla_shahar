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
    path: "/showRecipe",
    name: "showRecipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/showPersonalRecipes",
    name: "userRecipe",
    component: () => import("./pages/PrivateRecipeViewPage"),
  },
  {
    path: "/showFamilyRecipes",
    name: "userRecipeFamily",
    component: () => import("./pages/FamilyRecipeViewPage"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/favorites",
    name: "favorites",
    component: () => import("./pages/FavoritePage"),
  },
  {
    path: "/private",
    name: "private",
    component: () => import("./pages/PrivatePage"),
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyPage"),
  },
  {
    path: "/prepareRecipe",
    name: "prepareRecipe",
    component: () => import("./pages/prepareRecipePage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
