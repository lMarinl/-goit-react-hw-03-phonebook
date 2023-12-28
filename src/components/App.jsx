import React, { Component } from 'react';

import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';

import { Form } from './Form/Form';
import { ContactsList } from './ListContacts/ListContacts';
import { Filter } from './Filter/Filter';

import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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
