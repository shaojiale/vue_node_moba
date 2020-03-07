import Vue from "vue";
import VueRouter from "vue-router";
import Main from "./views/Main.vue";
import Home from "./views/Home.vue";
import Article from "./views/Article.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      { path: "/", name: Home, component: Home },
      { path: "/article/:id", name: Article, component: Article, props: true }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
