"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const JWT_SECRET = process.env.JWT_SECRET || "pubestpubest";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(""); // New state for role
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token provided");
        router.push("/");
      } else {
        const response = await axios.post("/api/jwtverify", {
          token,
        });
        const data = response.data;
        setEmail(data.email);
        setUsername(data.username);
        setRole(data.role); // Set the role from response data
      }
    };
    verifyToken();
  }, []);

  const handleLogout = () => {
    // Perform logout logic here
    localStorage.removeItem("token"); // Replace "token" with the key you want to remove
    alert("You have been logged out");
    router.push("/");
  };

  return (
    <div className="bg-gray-600 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>

        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <p className="text-lg">{username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <p className="text-lg">{email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <p className="text-lg">{role}</p> {/* Display the role */}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
          <Link href="/" className="text-indigo-500 hover:underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
