import React, { Component } from 'react';

import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { Form } from './Form/Form';
import { ContactsList } from './ListContacts/ListContacts';
import { Filter } from './Filter/Filter';

import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handlerAddContact = formData => {
    const hasDuplicates = this.state.contacts.some(
      contact => contact.name === formData.name
    );
    if (hasDuplicates) {
      Notiflix.Notify.warning(
        'A contact with this name is already added to your contacts'
      );
      return;
    }
    const newContact = { ...formData, id: nanoid() };
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });
  };

  handleChangeFilter = event => {
    const value = event.target.value;
    this.setState({ filter: value });
  };

  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase().trim())
    );
  };

  handleDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };
  componentDidMount() {
    const stringifiedContacts = localStorage.getItem('contacts');
    const contacts = JSON.parse(stringifiedContacts) ?? [];
    this.setState({ contacts });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  render() {
    const filterContacts = this.filterContacts();
    return (
      <div className={css.phoneBookContainer}>
        <h1 className={css.phoneBookTitle}>Phone book</h1>
        <Form handlerAddContact={this.handlerAddContact} />
        <div className={css.contactsContainer}>
          <h2 className={css.contactsTitle}>Contacts</h2>
          <Filter
            filter={this.state.filter}
            handleChangeFilter={this.handleChangeFilter}
          />

          <ContactsList
            contacts={filterContacts}
            handleDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}
