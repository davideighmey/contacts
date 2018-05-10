import React, { Component } from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import { Link } from "react-router-dom";

/*
Components represent the modularity and reusability of React.
*/

// functional components when you just want to render html from props
// less overhead since we do not have calss
/*function ListContacts (props) {
  return (
    <ol className='contact-list'>
      {props.contacts.map((contact) => (
        <li key={contact.id} className='contact-list-item'>
          <div className='contact-avatar' style={{
            backgroundImage: `url(${contact.avatarURL}`
          }}/>
          <div className='contact-details'>
            <p>{contact.name}</p>
            <p>{contact.email}</p>
          </div>
          <button onClick={() => props.onDeleteContact(contact)} className='contact-remove'>
            Remove
          </button>
        </li>
      )
    )}
    </ol>
  )
}*/

// Class compoent so we can use state
class ListContacts extends Component {
  // use Proptypes this allows
  // validate intended data types
  static PropTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  };

  // state that will be used to manage controlled form elements in your components.
  state = {
    query: ""
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  // render is for rendering only data should not be fetched here
  render() {
    // get these from the props
    const { contacts, onDeleteContact } = this.props;
    //get query from state
    const { query } = this.state;

    let showingContacts;

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingContacts = contacts.filter(contact => match.test(contact.name));
    } else {
      showingContacts = contacts;
    }

    showingContacts.sort(sortBy("name"));

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search contacts"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />

          <Link to="/create" className="add-contact">
            Add Contact
          </Link>
        </div>

        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {showingContacts.legnth} of {contacts.legnth} total
            </span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}

        <ol className="contact-list">
          {showingContacts.map(contact => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL}`
                }}
              />
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button
                onClick={() => onDeleteContact(contact)}
                className="contact-remove"
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
