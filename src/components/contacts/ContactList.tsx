import React from 'react';
import { Contact, contactActions } from '../../store/contact-slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';

const ContactList = ({ id, firstName, lastName, status }: Contact) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //This function Navigates to edit page when edit button is clicked
  const onClickEditHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.bubbles = true;
    if (e.stopPropagation) e.stopPropagation();
    navigate(`${id}/edit`);
  };

  //This function deletes the contact by dispatching the id to deleteContact reducer
  const onClickDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.bubbles = true;
    if (e.stopPropagation) e.stopPropagation();
    if (!window.confirm(' You want to delete this contact?')) return;
    dispatch(contactActions.deleteContact(id));
    navigate('/contacts');
  };

  return (
    <div
      className="card w-full max-w-xl cursor-pointer hover:bg-slate-200 mx-auto"
      onClick={() => navigate(`/contacts/${id}`)}
    >
      <h3>
        {firstName} {lastName}
      </h3>
      <h3 className="flex items-center justify-center gap-1">
        {status ? (
          <img alt="green-dot" src="/green-dot.png" height={12} width={12} />
        ) : (
          <img alt="red-dot" src="/red-dot.png" height={12} width={12} />
        )}
        {status ? 'Active' : 'Inactive'}
      </h3>
      <div className="flex justify-center gap-2 md:gap-5 items-center z-10">
        <button
          onClick={onClickEditHandler}
          className="bg-blue-500 text-sm md:text-base px-3 py-2 md:px-4 md:py-2 rounded-xl text-white shadow-lg hover:bg-blue-600"
        >
          Edit
        </button>
        <button onClick={()=> navigate('ContactDetails')} className='bg-blue-500 px-3 py-2 rounded-xl text-xs md:text-base text-white'>
Contact Details 
        </button>
        <button
          onClick={onClickDeleteHandler}
          className="bg-red-500 text-white text-sm md:text-base px-3 py-2 md:px-4 md:py-2  rounded-xl shadow-lg hover:bg-red-400"
        >
          Delete
        </button>
       
      </div>
    </div>
  );
};

export default ContactList;
