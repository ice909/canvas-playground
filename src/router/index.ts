import { createWebHashHistory, createRouter } from "vue-router";
import Index from "@/Index.vue";
import ImageClip from "@/ideas/imageClip/Idea.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Index,
  },
  {
    path: "/imageClip",
    name: "ImageClip",
    component: ImageClip,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
