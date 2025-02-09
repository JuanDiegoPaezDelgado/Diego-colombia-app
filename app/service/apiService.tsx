import { asyncStorageService } from "../userSignMethods/asyncStorageService";

const API_MAIN_URL = "http://192.168.1.135:5000";

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
      console.log("Login Response Status:", response.status);
      console.log("Full Login Response Data:", data);

      if (data && data.object && data.object.token) {
        const tokenString = data.object.token;
        await asyncStorageService.save(
          asyncStorageService.KEYS.userToken,
          tokenString
        );
        console.log("Token string saved to AsyncStorage:", tokenString);
      } else {
        console.error("Token not found in login response data!");
      }

      return {
        status: response.status,
        data: data,
      };
    } catch (error) {
      console.error("Error llamando a la api", error);
      throw new Error("error con la api o la red");
    }
  },

  async getAllImages() {
    const apiUrl = `${API_MAIN_URL}/images/get-all`;
    const token = await asyncStorageService.get(
      asyncStorageService.KEYS.userToken
    );
    console.log("Token recuperado de AsyncStorage para getAllImages:", token);

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await asyncStorageService.get(
          asyncStorageService.KEYS.userToken
        )}`,
      };

      console.log(
        "Headers object being sent in getAllImages request:",
        headers
      );

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();
      console.log(
        "API getAllImages response - data AFTER response.json():",
        data
      );

      console.log("API getAllImages response:", response);
      console.log("API getAllImages response.data:", data);
      console.log("API getAllImages response.data.object:", data.object);

      if (!response.ok) {
        console.error(
          "Error al obtener imágenes - response NOT OK:",
          response.status,
          data
        );
        throw new Error(
          data.message || "Error al obtener las imágenes del servidor."
        );
      }

      console.log("API getAllImages response - SUCCESS:", response);
      return {
        status: response.status,
        data: data,
      };
    } catch (error: any) {
      console.error(
        "Error de la api al obtener imagenes - CATCH BLOCK:",
        error
      );
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
      throw new Error("Error de red o al procesar la respuesta de la api.");
    }
  },

  async saveImage(encodedData: string, width: number, height: number) {
    const apiUrl = `${API_MAIN_URL}/images/save`;
    const token = await asyncStorageService.get(
      asyncStorageService.KEYS.userToken
    );

    if (!token) {
      throw new Error("No hay token de usuario. Usuario no autenticado.");
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ encodedData, width, height }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Error al guardar imagen:", response.status, data);
        throw new Error(
          data.message || "Error al guardar la imagen en el servidor."
        );
      }

      return {
        status: response.status,
        data: data.object,
      };
    } catch (error) {
      console.error("Error llamando a la api para guardar imagen", error);
      throw new Error(
        "Error de red o al procesar la respuesta de la API al guardar imagen."
      );
    }
  },
};

export default ApiService;
