import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import {enUS} from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Plus } from "lucide-react";

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
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "System Maintenance",
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 12, 0),
      description: "Scheduled system maintenance and updates",
    },
    {
      id: 2,
      title: "Team Meeting",
      start: new Date(2024, 2, 20, 14, 0),
      end: new Date(2024, 2, 20, 15, 30),
      description: "Monthly team sync-up meeting",
    },
  ]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    start: new Date(),
    end: new Date(),
    description: "",
  });

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewEvent({ title: "", start, end, description: "" });
    setSelectedEvent(null);
    setShowEventModal(true);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent(event);
    setShowEventModal(true);
  };

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) return;

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
        { ...newEvent, id: Math.max(...events.map((e) => e.id)) + 1 } as Event,
      ]);
    }

    setShowEventModal(false);
    setNewEvent({ title: "", start: new Date(), end: new Date(), description: "" });
    setSelectedEvent(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Calendar</h2>
        <button
          onClick={() => {
            setNewEvent({ title: "", start: new Date(), end: new Date(), description: "" });
            setSelectedEvent(null);
            setShowEventModal(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Event
        </button>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow">
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
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedEvent ? "Edit Event" : "Add Event"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newEvent.start?.toISOString().slice(0, 16)}
                      onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      rows={3}
                      placeholder="Enter event description"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSaveEvent}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {selectedEvent ? "Update Event" : "Add Event"}
                </button>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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
