import css from './ItemContact.module.css';

export const ContactItem = ({ name, number, id, handleDeleteContact }) => {
  return (
    <li className={css.contactItem} key={name} id={id}>
      <p className={css.contactName}>
        {name}: {number}
      </p>
      <button
        className={css.buttonDeleteNumber}
        type="button"
        onClick={() => handleDeleteContact(id)}
      >
        Delete
      </button>
    </li>
  );
};
