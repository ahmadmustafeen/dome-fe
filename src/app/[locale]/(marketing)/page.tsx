import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const token = await cookies()

  if (!token.get("token")) {
    redirect("/en/sign-in");
  }

  redirect("/en/dashboard");
}