import { ContactItem } from './ItemContact';

export const ContactsList = ({ contacts, handleDeleteContact }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <ContactItem
          key={contact.name}
          {...contact}
          handleDeleteContact={handleDeleteContact}
        />
      ))}
    </ul>
  );
};
