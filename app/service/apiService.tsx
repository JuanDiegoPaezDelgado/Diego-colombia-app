import { asyncStorageService } from "../userSignMethods/asyncStorageService";

const API_MAIN_URL = "http://172.16.100.243:5000";

const ApiService = {
  async register(fullname: string, email: string, password: string) {
    const apiUrl = `${API_MAIN_URL}/auth/register`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, pswd: password }),
      });

      const data = await response.json();

      return {
        status: response.status,
        data: data,
      };
    } catch (error) {
      console.error("Error llamando a la api", error);
      throw new Error("error con la api o la red");
    }
  },

  async login(email: string, password: string) {
    const apiUrl = `${API_MAIN_URL}/auth/login`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, pswd: password }),
      });

      const data = await response.json();
      await asyncStorageService.save(asyncStorageService.KEYS.userToken, data);

      return {
        status: response.status,
        data: data,
      };
    } catch (error) {
      console.error("Error llamando a la api", error);
      throw new Error("error con la api o la red");
    }
  },
};

export default ApiService;
