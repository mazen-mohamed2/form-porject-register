import { useState } from "react";
import Header from "../components/Header";
import country from "../components/common/country";
import usFlag from "../assets/images/flags/us.svg";
import image from "../assets/auction womn-01.svg";
import {  Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios'; // Import Axios if you haven't already

const Form = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    id: 240,
    flagImg: usFlag,
    countryName: "United States of America",
    countryCode: "+1",
  });
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthdate: '',
    email: '',
    phone: '',
    address: '',
    street: '',
    state: '',
    country: selectedCountry.countryName,
    zip: '',
    detailedDescription: '',
  });
  const [localPhoneNumber, setLocalPhoneNumber] = useState('');
  const handleLocalPhoneNumberChange = (e) => {
    setLocalPhoneNumber(e.target.value);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountryChange = (selected) => {
    setSelectedCountry(selected);
    setFormData(prevState => ({
      ...prevState,
      country: selected,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();
  const fullPhoneNumber = `${selectedCountry.countryCode} ${localPhoneNumber}`;
  const submissionData = {
    ...formData,
    phoneNumber: fullPhoneNumber,
  };

  try {
    // Send a POST request to the endpoint with form data
    const response = await axios.post('http://192.168.1.46:8000/api/register', submissionData);

    // Handle success response
    console.log('Response:', response.data);

    // Clear the form after successful submission if needed
    setFormData({
      name: '',
      gender: '',
      birthdate: '',
      email: '',
      phone: '',
      address: '',
      street: '',
      state: '',
      country: selectedCountry.countryName,
      zip: '',
      detailedDescription: '',
    });
    setLocalPhoneNumber('');
  } catch (error) {
    // Handle error response
    console.error('Error:', error.response.data);
  }
};
  return (
    <div className="overflow-y-auto">
      <Header title="Action registration form" type={'register'} description="address and contact information" />
      <main className="relative grid place-items-center">
        <div className="bg-transparent bg-opacity-80 p-8 w-full max-w-4xl relative z-30">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Your Name</label>
              <input
                className="border-2 border-secondary rounded-lg py-1 px-2"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Gender</label>
              <div className="flex flex-col space-y-3">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Date of Birth</label>
              <input
                className="border-2 border-secondary rounded-lg py-1 px-2"
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Email</label>
              <input
                className="border-2 border-secondary rounded-lg py-1 px-2"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Phone Number</label>
              <div className="grid grid-flow-row-dense grid-cols-7 md:grid-cols-10 gap-0 w-100">
                <Menu as="div" className="flex col-span-3 md:col-span-2 gap-10" aria-required>
                  <div>
                    <div className="border-2 border-secondary rounded-lg py-1 px-4">
                      <Menu.Button as="button" type="button" className="flex items-center">
                        <img src={selectedCountry.flagImg} alt="country flag" className="h-5 w-5" />
                        <span className="countrylist-codeno text-muted mx-2">{selectedCountry.countryCode}</span>
                        <ChevronDownIcon className="mr-1 ml-2 h-5 w-5 text-red-200 hover:text-violet-100" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition as="div" enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items as="ul" className="list-unstyled w-72 dropdown-menu-list mb-0 mt-3 pt-3 bg-slate-100">
                        {country.map((item, key) => (
                          <Menu.Item as="li" key={key} onClick={() => handleCountryChange(item)} className="dropdown-item d-flex">
                            <div className="flex cursor-pointer my-2 mx-3">
                              <div className="flex-shrink-0 mr-2">
                                <img src={item.flagImg} alt="country flag" className="h-5 w-5" />
                              </div>
                              <div className="flex-grow-0">
                                <div className="flex">
                                  <div className="country-name me-1">{item.countryName}</div>
                                  <span className="countrylist-codeno text-muted">{item.countryCode}</span>
                                </div>
                              </div>
                            </div>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </div>
                </Menu>
                <div className="col-span-4 md:col-span-8">
                <input
                    name="localPhoneNumber"
                    type="text"
                    placeholder="Phone number"
                    className="border-2 border-secondary rounded-lg py-1 px-2 w-full"
                    value={localPhoneNumber}
                    onChange={handleLocalPhoneNumberChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Address</label>
              <textarea
                className="border-2 border-secondary rounded-lg py-1 px-2"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Street</label>
              <input
                className="border-2 border-secondary rounded-lg py-1 px-2"
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">State</label>
              <input
                className="border-2 border-secondary rounded-lg py-1 px-2"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Zip Code</label>
              <input
                className="border-2 border-secondary rounded-lg py-1 px-2"
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="px-0 py-3 font-semibold">Detailed Description</label>
              <textarea
                className="border-2 border-secondary rounded-lg py-1 px-2"
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                required
              />
            </div>
            <button className="btn bg-secondary text-black rounded-md py-2 font-medium" type="submit">
              Submit
            </button>
          </form>
        </div>
        <img src={image} alt="Auction" className="absolute h-[80rem] w-[23rem] top-0 z-0" />
      </main>
    </div>
  );
};

export default Form;
