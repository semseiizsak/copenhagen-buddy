'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { itinerary } from '@/lib/itinerary';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_ACTIONS = [
  { label: '🏨 Vissza a hotelbe, mi legyen ezután?', text: 'Vissza kell mennünk a hotelbe. Mi legyen ezután?' },
  { label: '😴 A baba fáradt', text: 'A baba nagyon fáradt, pihenőre van szükség. Mit javasolsz?' },
  { label: '🍽️ Hol együnk most?', text: 'Hol együnk a közelben? Mit ajánlasz?' },
  { label: '⏰ Késtünk a tervtől', text: 'Késtünk, mit hagyjunk ki hogy kényelmes maradjon a nap?' },
  { label: '📍 Mi a következő lépés?', text: 'Mi legyen a következő lépés?' },
  { label: '🔄 Adjál alternatívát', text: 'Adjál egy alternatívát a mai programhoz, valami lazábbat.' },
  { label: '☕ Kávéhelyet keresel?', text: 'Hol a legjobb kávézó a közelünkben?' },
  { label: '🌧️ Esik az eső, most mi?', text: 'Esik az eső. Mit csinálhatunk fedett helyen?' },
];

function renderMarkdown(text: string) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return (
      <span key={i}>
        {parts}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatPanel({ currentDayIndex }: { currentDayIndex: number }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const day = itinerary[currentDayIndex];
    const greeting = `Szia! 👋 Ma **${day?.dayName}** — **${day?.date}**.\n\nMondj el mit csináltok éppen, vagy kérdezz bármit a programotokkal kapcsolatban — és én segítek kitalálni a legjobb következő lépést!`;
    setMessages([{ role: 'assistant', content: greeting }]);
  }, [currentDayIndex]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  const resizeTextarea = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = { role: 'user', content };
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setInput('');
      setIsLoading(true);
      setStreamingText('');

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }

      abortRef.current = new AbortController();

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            currentDayIndex,
          }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split('\n')) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                fullText += parsed.text;
                setStreamingText(fullText);
              }
            } catch {}
          }
        }

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: fullText },
        ]);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Hiba történt. Próbáld újra!',
          },
        ]);
      } finally {
        setIsLoading(false);
        setStreamingText('');
        abortRef.current = null;
      }
    },
    [messages, isLoading, currentDayIndex]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-0.5">
                🗺️
              </div>
            )}
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-tr-sm'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm shadow-sm'
              }`}
            >
              {renderMarkdown(msg.content)}
            </div>
          </div>
        ))}

        {/* Streaming bubble */}
        {streamingText && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-0.5">
              🗺️
            </div>
            <div className="max-w-[82%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed bg-white text-gray-800 border border-gray-100 shadow-sm">
              {renderMarkdown(streamingText)}
              <span className="inline-block w-0.5 h-3.5 bg-gray-400 animate-pulse ml-0.5 align-middle" />
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {isLoading && !streamingText && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-sm flex-shrink-0 mr-2 mt-0.5">
              🗺️
            </div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-white border border-gray-100 shadow-sm">
              <div className="flex gap-1 items-center h-4">
                {[0, 150, 300].map((delay) => (
                  <div
                    key={delay}
                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2 bg-white border-t border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {QUICK_ACTIONS.map((action, i) => (
            <button
              key={i}
              onClick={() => sendMessage(action.text)}
              disabled={isLoading}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:border-gray-300 transition-colors disabled:opacity-40 whitespace-nowrap"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="px-4 py-3 bg-white border-t border-gray-200">
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              resizeTextarea();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Írd le a helyzetet vagy kérdezz..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-gray-50 leading-relaxed"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Küldés"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1.5 text-center">
          Enter = küldés · Shift+Enter = sortörés
        </p>
      </div>
    </div>
  );
}
