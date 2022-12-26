import HttpClient from "@/utils/HttpClient";
class AuthService {
  prefix = "auth";

  async login(payload: { username: string; password: string }) {
    const res = await HttpClient.post(this.prefix + "login", payload);
    return res.data;
  }

  async getCurrentUser() {
    const res = await HttpClient.get(this.prefix + "login");
    return res.data;
  }
}

export default new AuthService();
