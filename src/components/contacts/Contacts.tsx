import React from 'react';
import { contactSelector } from '../../store/contact-slice';
import { useAppSelector } from '../../store/hooks';
import ContactList from './ContactList';
import { Link } from 'react-router-dom';

const Contacts = () => {
  //Getting Contacts from Redux Store
  const contacts = useAppSelector(contactSelector);

  return (
    <div className="flex flex-col gap-6 md:gap-10 text-black text-base md:text-lg">
      <h1 className="text-2xl md:text-3xl font-semibold">Contact Lists</h1>
      {contacts.length !== 0 ? (
        contacts.map((contact) => <ContactList key={contact.id} {...contact} />)
      ) : (
        <h1>No Contact Found.</h1>
      )}
      <Link
        to={'/addcontact'}
        className="mx-auto text-slate-100 font-semibold bg-blue-500 text-base px-4 py-2 rounded-xl shadow-lg shadow-gray-400 hover:bg-blue-600"
      >
        Create Contact
      </Link>
    </div>
  );
};

export default Contacts;
