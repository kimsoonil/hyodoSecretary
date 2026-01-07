"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ChatScreen from "@/components/chat-screen";

function ChatContent() {
  const searchParams = useSearchParams();
  const initialMessage = searchParams.get("message") || undefined;

  return <ChatScreen initialMessage={initialMessage} />;
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}

