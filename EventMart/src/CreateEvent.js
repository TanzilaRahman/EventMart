import './CreateEvent.css';
import React, { Component } from "react";

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      firstName: "",
      lastName: "",
      location: "",
      date: "",
      description: "",
    };

    // Binding methods to this context
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Method to handle input changes
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  }

  // Method to handle form submission
  handleSubmit(event) {
    event.preventDefault();

    // Simple validation (ensure fields are not empty)
    if (
      !this.state.eventName ||
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.location ||
      !this.state.date ||
      !this.state.description
    ) {
      alert("Please fill in all the fields");
      return;
    }

    // Log the event data (could send to API or handle here)
    console.log("Event Created:", this.state);

    const newEvent = { ...this.state };
    this.props.addEvent(newEvent);

    // Optionally, reset the form after submission
    this.setState({
      eventName: "",
      firstName: "",
      lastName: "",
      location: "",
      date: "",
      description: "",
    });
    }

  render() {
    return (
      <div className="create-event-container">
        <div className="form-wrapper">
          <h2>Create Event</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Name of Event:</label>
              <input
                type="text"
                name="eventName"
                value={this.state.eventName}
                onChange={this.handleInputChange}
                placeholder="Enter the event name"
                required
              />
            </div>

            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                placeholder="Enter the first name"
                required
              />
            </div>

            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                placeholder="Enter the last name"
                required
              />
            </div>

            <div>
              <label>Location of Event:</label>
              <input
                type="text"
                name="location"
                value={this.state.location}
                onChange={this.handleInputChange}
                placeholder="Enter the event location (e.g., 123 Main St)"
                required
              />
            </div>

            <div>
              <label>Date of Event:</label>
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleInputChange}
                required
              />
            </div>

            <div>
              <label>Description of Event:</label>
              <textarea
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
                placeholder="Provide a description of the event"
                required
              />
            </div>

            <button type="submit">Create Event</button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
