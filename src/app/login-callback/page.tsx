"use client";

import { useEffect } from "react";
import { loginCallbackAction } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginCallbackPage() {
  const router = useRouter();
  useEffect(() => {
    const url = window.location.href;
    loginCallbackAction(url).then(() => router.push("/"));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-xl">Authentication...</p>
      </div>
    </div>
  );
}
