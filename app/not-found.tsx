"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // 404 페이지에 접근하면 홈으로 리다이렉트
    router.replace("/");
  }, [router]);

  return null;
}

