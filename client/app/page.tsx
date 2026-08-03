import buildClient from "../api/build-client";
import { CurrentUserResponse } from "../types/user";

export default async function Home() {
  let currentUser = null;
  try {
    const client = await buildClient();
    const { data } = await client.get<CurrentUserResponse>(
      "/api/users/current-user",
    );
    currentUser = data.currentUser;
  } catch (err) {
    // Unauthenticated or error
    console.log("Error fetching current user:", err);
  }

  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
}
