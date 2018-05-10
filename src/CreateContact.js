import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageInput from "./ImageInput";
import serializeForm from "form-serialize";

class CreateContact extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    if (this.props.onCreateContact) {
      this.props.onCreateContact(values);
    }
  };

  render() {
    // Link allows you to add declarative, accessible navigation around your application
    // passing to navigates what url you go to
    // Link> component fully renders a proper anchor tag (<a>) with the appropriate href, you can expect it to behave how a normal
    // link on the web behaves.
    return (
      <div>
        <Link className="close-create-contact" to="/">
          Close
        </Link>
        <form onSubmit={this.handleSubmit} className="create-contact-form">
          <ImageInput
            className="create-contact-avatar-input"
            name="avatarURL"
            maxHeight={64}
          />
          <div className="create-contact-details">
            <input type="text" name="name" placeholder="Name" />
            <input type="text" name="email" placeholder="email" />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateContact;
