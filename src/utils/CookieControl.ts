import { get } from "http";
import Vue, { inject } from "vue";
import { VueCookies } from "vue-cookies";

export class CookieControl {
  private $cookies!: VueCookies;
  private static instance: CookieControl;
  private constructor() {}

  init() {
    this.$cookies = inject<VueCookies>("$cookies")!;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CookieControl();
    }
    return this.instance;
  }

  public get(key: string, defaultValue?: any) {
    const data = this.$cookies.get(key);
    return data || defaultValue || null;
  }

  public set(key: string, val: any, expires?: string | number | Date) {
    return this.$cookies.set(key, val, expires);
  }

  public remove(key: string) {
    return this.$cookies.remove(key);
  }
}

export default CookieControl.getInstance();
