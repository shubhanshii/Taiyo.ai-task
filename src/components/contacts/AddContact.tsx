import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { contactActions, contactSelector } from '../../store/contact-slice';
import { v4 as uuid } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';

const AddContact = () => {
  const params = useParams();
  const contacts = useAppSelector(contactSelector);
  const contact = contacts.find((contact) => contact.id === params.contactId);

  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState(false);

  //If this is edit page we get the contacts from Id and save it using useEffect
  useEffect(() => {
    if (contact) {
      setFirstName(contact.firstName.toString());
      setLastName(contact.lastName.toString());
      setStatus(contact.status ? true : false);
    }
  }, [contact]);

  const navigate = useNavigate();

  //Submits the form by dispatching the data to addContact reducer in redux
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contact) {
      const id = uuid().slice(0, 8);
      dispatch(contactActions.addContact({ id, firstName, lastName, status }));
      return navigate('/contacts');
    }
    dispatch(
      contactActions.updateContact({
        id: contact.id,
        firstName,
        lastName,
        status,
      })
    );
    return navigate('/contacts');
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col mx-auto justify-center items-center gap-4 md:gap-8 w-full text-black p-2"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-1 md:gap-6 w-full text-base md:text-lg">
        <label>First Name: </label>
        <input
          className="text-black rounded-lg px-4 py-1 outline-0 border-2 focus:border-teal-600"
          type="text"
          required
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-1 md:gap-6 w-full text-base md:text-lg">
        <label>Last Name: </label>
        <input
          className="text-black rounded-lg px-4 py-1 outline-0 border-2 focus:border-teal-600"
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-1 md:gap-8 w-full text-base md:text-lg">
        <label>Status: </label>
        <div className="flex items-center justify-center gap-3 ml-3">
          <label className="flex gap-1">
            <input
              type="radio"
              name="status"
              id="active"
              value="active"
              checked={status}
              onChange={(e) => setStatus(true)}
            />{' '}
            <p>Active</p>
          </label>
          <label className="flex gap-1">
            <input
              type="radio"
              name="status"
              id="active"
              value="inactive"
              checked={!status}
              onChange={(e) => setStatus(false)}
            />{' '}
            Inactive
          </label>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-base px-4 py-2 text-slate-100 rounded-xl shadow-lg shadow-gray-400"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-red-500 text-base px-4 py-2 text-slate-100 rounded-xl shadow-lg shadow-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddContact;
