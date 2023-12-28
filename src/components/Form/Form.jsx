import { Component } from 'react';
import css from './Form.module.css';

export class Form extends Component {
  state = {
    filter: '',
  };

  handelSubmit = event => {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.number.value;

    const formData = {
      name,
      number,
    };
    this.props.handlerAddContact(formData);
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handelSubmit}>
        <label className={css.label}>
          <span className={css.spanLabel}>Name</span>
          <input className={css.formInput} type="text" name="name" required />
        </label>
        <label className={css.label}>
          <span className={css.spanLabel}>Number</span>
          <input className={css.formInput} type="tel" name="number" required />
        </label>
        <button className={css.buttonSubmit} type="submit">
          Add number{' '}
        </button>
      </form>
    );
  }
}
