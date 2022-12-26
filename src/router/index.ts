import { generator } from "@/router/generator-routers";
import { asyncRouterMap } from "@/router/router";
import { createRouter, createWebHistory } from "vue-router";
import CookieControl from '../utils/CookieControl';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: generator(asyncRouterMap),
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

// router.beforeEach(async (to, from, next) => {
//   const refreshToken = CookieControl.get("refreshToken");
//   const accessToken = CookieControl.get("accessToken");
//   const currentUser = null;

//   if (accessToken && !currentUser) {
//     await store.dispatch("user/fetchProfile", {}).then((res) => {
//       currentUser = store.getters["user/currentUser"];
//       store.commit("auth/SET_IS_LOGINED");

//       if (to.matched.some((m) => m.meta.requireAuth)) {
//         if (to.name !== "login" && !currentUser) {
//           next({ name: "login" });
//         } else {
//           if (
//             to.matched.some(
//               (m) =>
//                 Array.isArray(m.meta.role) &&
//                 m.meta.role.includes(currentUser.role.code)
//             )
//           ) {
//             next();
//           } else {
//             next({ name: "Forbidden" });
//           }
//           next();
//         }
//         next();
//       }
//     });
//   }

//   return next();
// });

export default router;
