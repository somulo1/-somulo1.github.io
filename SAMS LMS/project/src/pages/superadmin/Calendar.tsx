import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Plus, Trash2, X } from "lucide-react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  category: 'academic' | 'administrative' | 'event' | 'holiday';
  location?: string;
  color?: string;
}

const categoryColors = {
  academic: '#4F46E5', // Indigo
  administrative: '#059669', // Green
  event: '#D97706', // Amber
  holiday: '#DC2626', // Red
};

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Faculty Meeting",
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 12, 0),
      description: "Monthly faculty meeting to discuss academic progress",
      category: "administrative",
      location: "Conference Room A",
    },
    {
      id: 2,
      title: "Mid-term Examinations",
      start: new Date(2024, 2, 20, 9, 0),
      end: new Date(2024, 2, 24, 17, 0),
      description: "Mid-term examinations for all departments",
      category: "academic",
      location: "Examination Halls",
    },
    {
      id: 3,
      title: "Spring Break",
      start: new Date(2024, 3, 1),
      end: new Date(2024, 3, 7),
      description: "Spring break holiday",
      category: "holiday",
    },
  ]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    start: new Date(),
    end: new Date(),
    description: "",
    category: "academic",
    location: "",
  });

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({ 
      title: "", 
      start, 
      end, 
      description: "", 
      category: "academic",
      location: "",
    });
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent(event);
    setShowEventModal(true);
  };

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end || !newEvent.category) return;

    if (selectedEvent) {
      setEvents(
        events.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, ...newEvent }
            : event
        )
      );
    } else {
      setEvents([
        ...events,
        { ...newEvent, id: Math.max(...events.map((e) => e.id), 0) + 1 } as Event,
      ]);
    }

    setShowEventModal(false);
    setNewEvent({ 
      title: "", 
      start: new Date(), 
      end: new Date(), 
      description: "",
      category: "academic",
      location: "",
    });
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((event) => event.id !== selectedEvent.id));
      setShowEventModal(false);
      setSelectedEvent(null);
    }
  };

  const eventStyleGetter = (event: Event) => {
    const color = categoryColors[event.category];
    return {
      style: {
        backgroundColor: color,
        borderRadius: '4px',
        opacity: 0.9,
        color: '#fff',
        border: 'none',
        display: 'block',
      },
    };
  };

  return (
    <div className="h-full flex flex-col p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Academic Calendar</h2>
          <p className="mt-1 text-sm text-gray-500">Manage academic events and schedules</p>
        </div>
        <button
          onClick={() => {
            setNewEvent({ 
              title: "", 
              start: new Date(), 
              end: new Date(), 
              description: "",
              category: "academic",
              location: "",
            });
            setSelectedEvent(null);
            setShowEventModal(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Event
        </button>
      </div>

      <div className="flex gap-6 mb-6">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-gray-600 capitalize">{category}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", padding: "20px" }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          popup
          views={["month", "week", "day", "agenda"]}
          eventPropGetter={eventStyleGetter}
          className="font-sans"
        />
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowEventModal(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedEvent ? "Edit Event" : "Add New Event"}
                  </h3>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter event title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={newEvent.start?.toISOString().slice(0, 16)}
                        onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={newEvent.end?.toISOString().slice(0, 16)}
                        onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as Event['category'] })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="academic">Academic</option>
                      <option value="administrative">Administrative</option>
                      <option value="event">Event</option>
                      <option value="holiday">Holiday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter event location (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                      placeholder="Enter event description"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSaveEvent}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  {selectedEvent ? "Update Event" : "Add Event"}
                </button>
                {selectedEvent && (
                  <button
                    onClick={handleDeleteEvent}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                )}
                <button
                  onClick={() => setShowEventModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
