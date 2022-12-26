import * as loginService from "@/api/login";

import { UserLayout, MainLayout } from "@/layouts";
import { RouterMap } from "@/router/router";
import { RouteRecordRaw } from "vue-router";
import { Component } from "vue";
import userService from "@/service/user.service";

// front-end routing table (based on dynamic)
const constantRouterComponents: Record<any, Component> = {
  // Basic page layout must be imported
  UserLayout: UserLayout,
  MainLayout: MainLayout,
  NotFound: () =>
    import(/* webpackChunkName: "error" */ "@/pages/NotFound.vue"),

  // Page components you need to import dynamically
  Dashboard: () => import("@/pages/dashboard/Dashboard.vue"),
  ContentManager: () => import("@/pages/dashboard/ContentManager.vue"),
  ContentTypeBuilder: () => import("@/pages/dashboard/ContentTypeBuilder.vue"),

  Login: () => import("@/pages/auth/Login.vue"),
};

// The front end did not find the page route (fixed without changing)
const notFoundRouter: RouteRecordRaw = {
  name: "NotFound",
  path: "/:catchAll(.*)",
  redirect: "/404",
};

// root level menu
const rootRouter: RouterMap = {
  key: "",
  name: "index",
  path: "",
  component: "MainLayout",
  redirect: "/",
  meta: {
    title: "Dashboard",
  },
  children: [],
};

/**
 * dynamically generated menu
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    userService
      .getCurrentUser()
      .then((res) => {
        console.log("generatorDynamicRouter response:", res);
        const { data } = res;
        const menuNav: RouterMap[] = [];
        const childrenNav: RouterMap[] = [];
        //      backend data, root-level tree array, root-level PID
        listToTree(data, childrenNav, 0);
        rootRouter.children = childrenNav;
        menuNav.push(rootRouter);
        console.log("menuNav", menuNav);
        const routers = generator(menuNav);
        routers.push(notFoundRouter);
        console.log("routers", routers);
        resolve(routers);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * Format tree structure data to generate vue-router hierarchical routing table
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (
  routerMap: RouterMap[],
  parent?: RouterMap
): RouteRecordRaw[] => {
  return routerMap.map((item) => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } =
      item.meta || {};
    const currentRouter: any = {
      // If the path is set in the route, it will be used as the default path, otherwise the route address will be dynamically spliced to generate such as /dashboard/workplace
      path: item.path || `${(parent && parent.path) || ""}/${item.key}`,
      // Route name, it is recommended to be unique
      name: item.name || item.key || "",
      // The route corresponds to the component of the page: Scheme 1
      // component: constantRouterComponents[item.component || item.key],
      // The route corresponds to the component of the page: scheme 2 (dynamic loading)
      // @ts-ignore
      // component: constantRouterComponents[item.component || item.key] || (() => import(`@/pages/${item.component}`)),
      component: typeof item.component === 'string'? constantRouterComponents[item.component] : item.component || constantRouterComponents[item.name],

      // meta: page title, menu icon, page authority (for command authority, can be removed)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name,
      },
    };
    // Whether to set a hidden menu
    if (show === false) {
      currentRouter.hidden = true;
    }
    // Whether to hide the submenu
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true;
    }
    // In order to prevent irregular return results from the backend, two backslashes may be spliced out in the processing
    if (!currentRouter.path.startsWith("http")) {
      currentRouter.path = currentRouter.path.replace("//", "/");
    }
    // redirect
    item.redirect && (currentRouter.redirect = item.redirect);
    // Whether there is a submenu, and recursive processing
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter);
    }
    return currentRouter;
  });
};

/**
 * Array to tree structure
 * @param list source array
 * @param tree Tree
 * @param parentId Father ID
 */
const listToTree = (list: any[], tree: any[], parentId: string | number) => {
  list.forEach((item) => {
    // Determine whether it is a parent menu
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: [],
      };
      // Iterate the list to find all submenus that match the current menu
      listToTree(list, child.children, item.id);
      // Delete the attribute that does not have a children value
      if (child.children.length <= 0) {
        delete child.children;
      }
      // add to the tree
      tree.push(child);
    }
  });
};
