import React, { useState } from "react";
import "./FindEvent.css";

const FindEvent = ({ events }) => {
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to toggle expanded view
  const toggleExpand = (eventId) => {
    setExpandedEventId((prev) => (prev === eventId ? null : eventId));
  };

  // Function to collapse expanded event when clicking outside
  const handlePageClick = (e) => {
    if (!e.target.closest(".event-item")) {
      setExpandedEventId(null);
    }
  };

  // Filter events based on search query
  const filteredEvents = events.filter((event) =>
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="find-event-container"
      onClick={handlePageClick} // Listen for clicks on the container
    >
      <h2>Find Events</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search events by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div
              key={index}
              className={`event-item ${
                expandedEventId === index ? "expanded" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the container click
                toggleExpand(index);
              }}
            >
              <h3>{event.eventName}</h3>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              {expandedEventId === index && (
                <div className="event-details">
                  <p>
                    <strong>Host:</strong> {event.firstName} {event.lastName}
                  </p>
                  <p>
                    <strong>Description:</strong> {event.description}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default FindEvent;
