"use client";

import axios from "axios";
import { toast } from "react-hot-toast";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://aihub-594y.onrender.com/api";

async function authRequest(
  endpoint,
  { method = "POST", data = null, includeAuth = false } = {},
) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (includeAuth && typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      headers,
      data,
      timeout: 30000,
    });

    if (response.data?.message) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Something went wrong";

    toast.error(message);
    throw new Error(message);
  }
}

export async function loginUser(payload) {
  return authRequest("/users/login", {
    method: "POST",
    data: payload,
  });
}

export async function signupUser(payload) {
  return authRequest("/users/signup", {
    method: "POST",
    data: payload,
  });
}

export { authRequest };
