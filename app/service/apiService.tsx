import { asyncStorageService } from "../userSignMethods/asyncStorageService";

const API_MAIN_URL = "http://192.168.43.3:5000";

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

    if (!token) {
      throw new Error("No token available");
    }

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log(
        "Fetching images with token:",
        token.substring(0, 10) + "..."
      );

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const textData = await response.text();
      console.log("Response size:", textData.length);

      let jsonData;
      try {
        jsonData = JSON.parse(textData);
        console.log("Parsed response data:", {
          message: jsonData.message,
          statusCode: jsonData.statusCode,
          objectLength: jsonData.object?.length || 0,
        });
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        console.log("First 100 chars of response:", textData.substring(0, 100));
        throw new Error("Invalid JSON response");
      }

      if (!jsonData.object || !Array.isArray(jsonData.object)) {
        console.error("Invalid response structure:", jsonData);
        throw new Error("Invalid response structure");
      }

      const validImages = jsonData.object.map((img, index) => {
        if (!img.encodedData || !img.width || !img.height) {
          console.warn(`Invalid image data at index ${index}:`, img);
        }
        return img;
      });

      return {
        status: response.status,
        data: {
          ...jsonData,
          object: validImages,
        },
      };
    } catch (error: any) {
      console.error("Error in getAllImages:", error);
      throw new Error(error.message || "Error fetching images");
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
      console.log("Saving image with dimensions:", { width, height });
      console.log("Base64 data length:", encodedData.length);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          encodedData: encodedData.replace(/^data:image\/\w+;base64,/, ""),
          width,
          height,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log("Save image response:", {
        status: response.status,
        message: jsonData.message,
      });

      return {
        status: response.status,
        data: jsonData,
      };
    } catch (error: any) {
      console.error("Error saving image:", error);
      throw new Error(error.message || "Error saving image");
    }
  },
};

export default ApiService;
