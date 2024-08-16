"use client";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import React, { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const schema = z.object({
  username: z.string().min(5),

  password: z.string().min(5),
});
export default function Home() {
  const [username, setUsername] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      schema.parse({
        username: username,
        password: password,
      });
      const isLogin = await axios.get("/api/login", {
        params: {
          email: username,
          password,
        },
      });
      alert(isLogin.data ? "You are logging in" : "Wrong username or password");
      router.push("/");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors
          .map((err) => `${err.path.join(".")}: ${err.message}`)
          .join("\n");
        alert(errorMessages);
      } else alert(error);
    }
  };
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameValid(schema.shape.username.safeParse(e.target.value).success);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordValid(schema.shape.password.safeParse(e.target.value).success);
  };
  return (
    <div className="bg-gray-600 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                usernameValid
                  ? "focus:ring-indigo-500"
                  : "focus:ring-red-500 border-red-500"
              }`}
              required
            ></input>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  passwordValid
                    ? "focus:ring-indigo-500"
                    : "focus:ring-red-500 border-red-500"
                }`}
                required
              ></input>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Login
              </button>
              <Link
                href={"/register"}
                className="text-indigo-500 hover:underline"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
