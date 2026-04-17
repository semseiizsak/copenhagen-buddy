'use client';

import { useState, useEffect } from 'react';
import ChatPanel from '@/components/ChatPanel';
import ItineraryPanel from '@/components/ItineraryPanel';
import { TRIP_INFO, itinerary } from '@/lib/itinerary';

type Tab = 'chat' | 'plan';

function getCurrentDayIndex(): number {
  const now = new Date();
  // Trip is April 19-23 2026, Copenhagen time (CEST = UTC+2)
  const tripDates = [
    new Date('2026-04-19T00:00:00+02:00'),
    new Date('2026-04-20T00:00:00+02:00'),
    new Date('2026-04-21T00:00:00+02:00'),
    new Date('2026-04-22T00:00:00+02:00'),
    new Date('2026-04-23T00:00:00+02:00'),
  ];
  const tripEnd = new Date('2026-04-23T23:59:59+02:00');
  if (now > tripEnd) return 4;
  for (let i = tripDates.length - 1; i >= 0; i--) {
    if (now >= tripDates[i]) return i;
  }
  return 0;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  useEffect(() => {
    setCurrentDayIndex(getCurrentDayIndex());
  }, []);

  const currentDay = itinerary[currentDayIndex];

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <span>🗺️</span>
              <span>Koppenhága Buddy</span>
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">{TRIP_INFO.subtitle}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg whitespace-nowrap">
              {currentDay?.dayName.split(' — ')[0]}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{currentDay?.date}</div>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto flex">
          {(
            [
              { key: 'chat', icon: '💬', label: 'Segítség' },
              { key: 'plan', icon: '📅', label: 'Program' },
            ] as { key: Tab; icon: string; label: string }[]
          ).map(({ key, icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors relative ${
                activeTab === key
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{icon}</span>
              <span>{label}</span>
              {activeTab === key && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main content — both panels mounted, toggled via display */}
      <main className="flex-1 overflow-hidden max-w-2xl mx-auto w-full">
        <div className={`h-full ${activeTab === 'chat' ? 'flex flex-col' : 'hidden'}`}>
          <ChatPanel currentDayIndex={currentDayIndex} />
        </div>
        <div className={`h-full ${activeTab === 'plan' ? 'flex flex-col' : 'hidden'}`}>
          <ItineraryPanel initialDayIndex={currentDayIndex} />
        </div>
      </main>
    </div>
  );
}
