export type LoginResponse = {
  success: boolean;
  token?: string;
  username?: string;
  message?: string;
};

export const loginApi = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  // Simulating API request
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Demo credentials
  if (username === "admin" && password === "admin123") {
    return {
      success: true,
      token: "demo-inventory-token",
      username: "admin",
    };
  }

  return {
    success: false,
    message: "Invalid username or password",
  };
};