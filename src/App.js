import React, { Component } from "react";
import ListContacts from "./ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
import CreateContact from "./CreateContact";
import { Route } from "react-router-dom";

/*
Imperative code instructs JavaScript on how it should perform each step.
declarative code, we tell JavaScript what we want to be done,
 and let JavaScript take care of performing the steps.
 React is declarative because we write the code that we want, and
 React is in charge of taking our declared code and performing all of
 the JavaScript/DOM steps to get us to our desired result.
*/
class App extends Component {
  // By having a component manage its own state, any time there are changes made to that state,
  // React will know and automatically make the necessary updates to the page.
  // when it comes to re-rendering the page, we just have to think about updating state.
  state = {
    contacts: []
  };

  // is invoked immediately after a component is mounted.
  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      //The component is able to change its own internal state using this.setState().
      this.setState({ contacts });
    });
  }

  removeContact = contact => {
    this.setState(state => ({
      contacts: state.contacts.filter(c => c.id !== contact.id)
    }));

    ContactsAPI.remove(contact);
  };

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }));
    });
  }

  render() {
    // Route component which is going to decide which components are rendered based on the current URL path.
    // this way you can render the page exactly
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            // pass data with props, this adds these values to the component
            <ListContacts
              onDeleteContact={this.removeContact}
              contacts={this.state.contacts}
            />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
