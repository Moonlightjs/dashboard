import { asyncRouterMap, constantRouterMap } from "@/config/router.config";
import { cloneDeep } from "lodash";
import { RouteRecordRaw } from "vue-router";

/**
 * Filter whether the account has a certain permission and remove the menu from the loading list
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission(permissions: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.permission) {
    console.log("hasPermission", permissions);
    if (permissions === undefined) {
      return false;
    }
    let flag = false;
    for (let i = 0, len = permissions.length; i < len; i++) {
      flag = (route.meta.permission as string[]).includes(permissions[i]);
      if (flag) {
        return true;
      }
    }
    return false;
  }
  return true;
}

/**
 * When a single account has multiple roles, use this method to filter menus where roles do not exist
 *
 * @param roles
 * @param route
 * @returns {*}
 */

function hasRole(role: string, route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    return (route.meta.roles as string[]).includes(role);
  } else {
    return true;
  }
}

function filterAsyncRouter(routerMap: RouteRecordRaw[], permissions: string[]) {
  const accessedRouters = routerMap.filter((route: RouteRecordRaw) => {
    if (hasPermission(permissions, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, permissions);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

// const permission = {
//   state: {
//     routers: constantRouterMap,
//     addRouters: [],
//   },
//   mutations: {
//     SET_ROUTERS: (state, routers) => {
//       state.addRouters = routers;
//       state.routers = constantRouterMap.concat(routers);
//     },
//   },
//   actions: {
//     GenerateRoutes({ commit }, data) {
//       return new Promise<void>((resolve) => {
//         const { role } = data;
//         const routerMap = cloneDeep(asyncRouterMap);
//         const accessedRouters = filterAsyncRouter(routerMap, role);
//         commit("SET_ROUTERS", accessedRouters);
//         resolve();
//       });
//     },
//   },
// };

// export default permission;
