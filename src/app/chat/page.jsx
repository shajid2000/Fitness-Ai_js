'use client';

import useGeminiAgent from 'gemini-ai-agent/react';

export default function ChatPage() {
  const agent = useGeminiAgent({
    apiKey: "AIzaSyB7x5Rkja88Q2RYB4VOpegiTDTKq6B8TxM"
  });

  return (
    <button onClick={agent.toggleRecording}>
      {agent.isRecording ? 'Stop' : 'Start'} Recording
    </button>
  );
}