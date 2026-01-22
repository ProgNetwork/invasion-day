'use client';

import React, { useState } from 'react';
import eventsData from '../../data/events.json';

// Event coordinates aligned with actual SVG coastline
const eventCoordinates: Record<string, { x: number; y: number }> = {
  Perth: { x: 60, y: 430 },      // Western Australia - west coast
  Adelaide: { x: 400, y: 420 },   // South Australia - south coast
  Melbourne: { x: 510, y: 520 },  // Victoria - southeast coast
  Sydney: { x: 640, y: 430 },     // NSW - east coast
  Brisbane: { x: 670, y: 315 },   // Queensland - northeast coastline (on the line)
  Hobart: { x: 540, y: 620 },     // Tasmania - bottom island
};

interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    venueName: string;
    address: string;
    city: string;
    region: string;
    country: string;
  };
  imageUrl?: string;
  url: string;
  timezone: string;
}

interface HoverPopupProps {
  event: Event;
  position: { x: number; y: number };
  onClose: () => void;
}

const HoverPopup: React.FC<HoverPopupProps> = ({ event, position, onClose }) => {
  return (
    <div
      className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
      <h3 className="font-bold text-lg mb-2 pr-6">{event.name}</h3>
      <p className="text-sm text-gray-600 mb-2">
        {new Date(event.startDate).toLocaleDateString('en-AU', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>
      <p className="text-sm mb-2">
        <strong>Location:</strong> {event.location.venueName}
      </p>
      <a
        href={`/events/${event.id}`}
        className="inline-block bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
      >
        View Details
      </a>
    </div>
  );
};

const AustraliaMap: React.FC = () => {
  const [hoveredEvent, setHoveredEvent] = useState<Event | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  // Filter upcoming events
  const upcomingEvents = eventsData.filter(event => new Date(event.endDate) >= new Date());

  const handleMarkerHover = (event: Event, eventElement: React.MouseEvent<SVGCircleElement>) => {
    const svgElement = eventElement.currentTarget.closest('svg');
    if (svgElement) {
      const svgRect = svgElement.getBoundingClientRect();
      const containerRect = svgElement.closest('.australia-map-container')?.getBoundingClientRect();

      if (containerRect) {
        const coordinates = eventCoordinates[event.location.city as keyof typeof eventCoordinates];
        if (coordinates) {
          // Convert SVG coordinates to screen coordinates
          const scaleX = svgRect.width / 674.71;
          const scaleY = svgRect.height / 628.37;

          setPopupPosition({
            x: svgRect.left - containerRect.left + (coordinates.x * scaleX),
            y: svgRect.top - containerRect.top + (coordinates.y * scaleY) - 30,
          });
          setHoveredEvent(event);
        }
      }
    }
  };

  const handleMarkerLeave = () => {
    setHoveredEvent(null);
  };

  return (
    <>
      {/* Invisible placeholder to maintain layout */}
      <div className="h-[500px] w-full"></div>

      {/* Full-width background overlay */}
      <div className="absolute left-0 right-0 top-0 h-[500px] overflow-hidden australia-map-container">
        <svg
          viewBox="0 0 674.71 628.37"
          className="w-full h-full"
          style={{ background: 'linear-gradient(to bottom, #000000 0%, #000000 50%, #FF0000 50%, #FF0000 100%)' }}
        >
          {/* Australia SVG content */}
          <image
            href="/images/australia.svg"
            width="674.71"
            height="628.37"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Event markers embedded in SVG */}
          {upcomingEvents.map((event: Event) => {
            const coordinates = eventCoordinates[event.location.city as keyof typeof eventCoordinates];
            if (!coordinates) {
              return null;
            }

            return (
              <g key={event.id}>
                <circle
                  cx={coordinates.x}
                  cy={coordinates.y}
                  r="8"
                  fill="#ef4444"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="cursor-pointer hover:fill-red-600 transition-colors animate-pulse"
                  onMouseEnter={(e) => handleMarkerHover(event, e)}
                  onMouseLeave={handleMarkerLeave}
                />
              </g>
            );
          })}
        </svg>

        {/* Hover popup */}
        {hoveredEvent && (
          <HoverPopup
            event={hoveredEvent}
            position={popupPosition}
            onClose={() => setHoveredEvent(null)}
          />
        )}
      </div>
    </>
  );
};

export default AustraliaMap;
