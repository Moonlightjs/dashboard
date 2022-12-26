import HttpClient from "@/utils/HttpClient";
class UserService {
  prefix = "user";

  async getCurrentUser() {
    const res = await HttpClient.get(this.prefix+ "/me");
    return res.data;
  }
}

export default new UserService();
