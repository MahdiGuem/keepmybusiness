'use client'

import { useState } from 'react';
import Image from 'next/image';

const Contact = (props) => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthdate: '',
    personalEmail: '',
    businessEmail: '',
    about: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      fetch(`http://localhost:8080/request/new`, {
        headers: {
          'Content-Type': 'application/json',
        }, 
        method: 'POST',
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to submit form');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Form submitted successfully:', data);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        });
    }

    // Reset form after submission
    setFormData({
      fullName: '',
      birthdate: '',
      personalEmail: '',
      businessEmail: '',
      about: '',
    });
  };

  return (
    <div className="w-full flex justify-center marker gap-5" id={props.id}>
      <div className="bg_image w-1/3 h-screen" />
      <div className="flex flex-col w-2/3 gap-3 sm:mx-30 sm:m-10 mt-5 justify-center">
        <h1 className="head_text">Contact Us</h1>
        <form onSubmit={handleContactSubmit} method="POST">
          <div className="grid grid-cols-2 gap-1">
            <div className="flex flex-col">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form_input"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Birthdate</label>
              <input
                type="date"
                name="birthdate"
                className="form_input"
                value={formData.birthdate}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Personal Email</label>
              <input
                type="email"
                name="personalEmail"
                className="form_input"
                value={formData.personalEmail}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Business Email</label>
              <input
                type="email"
                name="businessEmail"
                className="form_input"
                value={formData.businessEmail}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>About your business</label>
            <textarea
              name="about"
              className="form_input min-h-20"
              value={formData.about}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="flex mt-3 flex-between center">
            <button type="submit" className="green_btn">
              Send request
            </button>
            <p className="text-gray-700 italic text-sm text-right w-3/5">
              (confirmation will be sent to your personal email)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
