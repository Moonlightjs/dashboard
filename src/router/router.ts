import { UserLayout, MainLayout } from "@/layouts";
import { Component } from "vue";

export interface RouterMap {
  key?: string;
  path: string;
  name: string;
  redirect?: string;
  meta?: {
    title?: string;
    show?: boolean;
    hideChildren?: boolean;
    hiddenHeaderContent?: boolean;
    target?: any;
    icon?: string;
    requireAuth?: boolean;
    keepAlive?: boolean;
    permissions?: string[];
    roles?: string[];
  };
  component?: Component | string;
  children?: RouterMap[];
  hidden?: boolean;
}

const RouteView = {
  name: "RouteView",
  render: (h: (arg0: string) => any) => h("router-view"),
};

export const asyncRouterMap: RouterMap[] = [
  {
    name: "auth",
    path: "/auth",
    component: "UserLayout",
    redirect: "/auth/login",
    hidden: true,
    children: [
      {
        path: "/auth/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/pages/auth/Login.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "index",
    component: "MainLayout",
    meta: { title: "menu.home", requireAuth: true },
    redirect: "/dashboard",
    children: [
      // dashboard
      {
        path: "/dashboard",
        name: "Dashboard",
        meta: {
          title: "menu.dashboard",
          keepAlive: true,
          icon: "mdi-account-alert-outline",
          permissions: ["dashboard"],
        },
      },
      // content-manager
      {
        path: "/content-manager",
        name: "ContentManager",
        component: "ContentManager",
        meta: {
          title: "menu.content-manager",
          keepAlive: true,
          icon: "mdi-alpha-c-circle",
          permissions: ["content-manager"],
        },
      },
      // content-type-builder
      {
        path: "/content-type-builder",
        name: "ContentTypeBuilder",
        component: "ContentTypeBuilder",
        meta: {
          title: "menu.content-type-builder",
          keepAlive: true,
          icon: "mdi-account-credit-card",
          permissions: ["content-type-builder"],
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "Notfound",
    component: "Notfound",
    redirect: "/404",
    hidden: true,
  },
];
