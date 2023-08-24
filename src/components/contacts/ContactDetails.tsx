import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { contactActions, contactSelector } from '../../store/contact-slice';
import ContactList from './ContactList';

const ContactDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const contacts = useAppSelector(contactSelector);
  const dispatch = useAppDispatch();

  //Finding the contact from contactId in the params
  const contact = contacts.find((contact) => contact.id === params.contactId);

  //This function deletes the contact by dispatching the id to deleteContact reducer
  const onClickDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!window.confirm('Are you sure to delete this contact')) return;
    dispatch(contactActions.deleteContact(contact!.id) as any);
    navigate('/contacts');
  };

  return (
    <div className="flex flex-col gap-6 md:gap-10 text-black text-base md:text-lg p-4">
      <div className="flex flex-col mx-auto gap-4 md:text-lg bg-stone-200 rounded-xl px-4 py-3 md:py-4 md:px-8 justify-between items-center w-full md:w-3/4 max-w-3xl shadow-lg shadow-slate-600">
        <div className="flex gap-2 items-center">
          <label className="font-semibold">First Name:</label>
          <p>{contact!.firstName}</p>
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-semibold">Last Name:</label>
          <p>{contact!.lastName}</p>
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-semibold">Status:</label>
          <p className="flex items-center justify-center gap-1">
            {contact!.status ? (
              <img
                alt="green-dot"
                src="/green-dot.png"
                height={12}
                width={12}
              />
            ) : (
              <img alt="red-dot" src="/red-dot.png" height={12} width={12} />
            )}
            {contact?.status ? 'Active' : 'Inactive'}
          </p>
        </div>
        <div className="flex gap-6 items-center justify-center">
          <button
            onClick={() => navigate('edit')}
            className="bg-blue-500 text-sm md:text-base px-3 py-2 md:px-4 md:py-2 rounded-xl shadow-lg hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={onClickDeleteHandler}
            className="bg-red-500 text-white text-sm md:text-base px-3 py-2 md:px-4 md:py-2  rounded-xl shadow-lg hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </div>
      <button
        onClick={() => navigate('/')}
        className="mr-auto bg-slate-950 text-white text-sm md:text-base px-3 py-2 md:px-4 md:py-2  rounded-xl shadow-lg hover:bg-slate-800"
      >
        Back
      </button>
    </div>
  );
};

export default ContactDetails;
