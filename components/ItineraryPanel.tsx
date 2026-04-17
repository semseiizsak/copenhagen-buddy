'use client';

import { useState } from 'react';
import { itinerary, Activity } from '@/lib/itinerary';

function getDotColor(type: Activity['type']): string {
  switch (type) {
    case 'highlight':
      return '#4a7fb5';
    case 'food':
      return '#c97a3a';
    case 'transport':
      return '#6ba07a';
    default:
      return '#9ca3af';
  }
}

function getTagStyle(color: string): string {
  switch (color) {
    case 'blue':
      return 'bg-blue-50 text-blue-700';
    case 'amber':
      return 'bg-amber-50 text-amber-700';
    case 'green':
      return 'bg-green-50 text-green-700';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export default function ItineraryPanel({
  initialDayIndex,
}: {
  initialDayIndex: number;
}) {
  const [selectedDay, setSelectedDay] = useState(initialDayIndex);
  const day = itinerary[selectedDay];

  return (
    <div className="flex flex-col h-full">
      {/* Day selector tabs */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {itinerary.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`flex-shrink-0 rounded-xl px-3 py-2 text-center transition-colors ${
                selectedDay === i
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className="text-xs font-semibold">{i + 1}. nap</div>
              <div
                className={`text-xs ${selectedDay === i ? 'text-gray-300' : 'text-gray-400'}`}
              >
                {d.date.split(' ')[1]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Day label */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          {day.label}
        </p>

        {/* Legend */}
        <div className="flex gap-4 mb-5 flex-wrap">
          {[
            { color: '#4a7fb5', label: 'Látnivaló' },
            { color: '#c97a3a', label: 'Evés / kávé' },
            { color: '#6ba07a', label: 'Közlekedés' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: color }}
              />
              {label}
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative pl-7">
          {/* Vertical line */}
          <div className="absolute left-2 top-3 bottom-3 w-px bg-gray-100" />

          <div className="space-y-3">
            {day.activities.map((activity, i) => {
              const dotColor = getDotColor(activity.type);
              return (
                <div key={i} className="relative">
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-5 top-[14px] w-2.5 h-2.5 rounded-full border-2"
                    style={{
                      backgroundColor: dotColor,
                      borderColor: dotColor,
                    }}
                  />

                  {/* Activity card */}
                  <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm hover:border-gray-200 transition-colors">
                    <p className="text-xs text-gray-400 mb-0.5">{activity.time}</p>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                      {activity.description}
                    </p>

                    {activity.tags && activity.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {activity.tags.map((tag, j) => (
                          <span
                            key={j}
                            className={`inline-block text-xs px-2 py-0.5 rounded-md font-medium ${getTagStyle(tag.color)}`}
                          >
                            {tag.text}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tip box */}
        {day.tip && (
          <div className="mt-5 bg-amber-50 border-l-2 border-amber-300 rounded-r-xl px-4 py-3">
            <p className="text-xs text-amber-800 leading-relaxed">{day.tip}</p>
          </div>
        )}

        {/* Bottom padding for last item */}
        <div className="h-4" />
      </div>
    </div>
  );
}
