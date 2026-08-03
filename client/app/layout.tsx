import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header";
import buildClient from "../api/build-client";
import { CurrentUserResponse } from "../types/user";

export const metadata: Metadata = {
  title: "GitTix",
  description: "Ticketing app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let currentUser = null;
  try {
    const client = await buildClient();
    const { data } = await client.get<CurrentUserResponse>(
      "/api/users/current-user",
    );
    console.log(data);
    currentUser = data.currentUser;
  } catch (err) {
    // Client error / unauthenticated
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div>
          <Header currentUser={currentUser} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
