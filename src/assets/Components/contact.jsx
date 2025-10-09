import React, { useState } from 'react';
import { RiContactsLine, RiMailLine, RiPhoneLine, RiUserLine, RiMessageLine } from "react-icons/ri";

const Contactus = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [focusedField, setFocusedField] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4'>
            <div className='max-w-2xl mx-auto'>
                <div className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden'>
                    {/* Header Section */}
                    <div className='bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-center'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm'>
                            <RiContactsLine className='text-3xl text-white' />
                        </div>
                        <h2 className='text-3xl font-bold text-white mb-2'>
                            Get In Touch
                        </h2>
                        <p className='text-blue-100 text-lg'>
                            We'd love to hear from you. Send us a message!
                        </p>
                    </div>

                    {/* Form Section */}
                    <div className='p-8 space-y-6'>
                        {/* Name Field */}
                        <div className='relative'>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Full Name *
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <RiUserLine className={`text-xl transition-colors duration-200 ${focusedField === 'name' || formData.name ? 'text-blue-600' : 'text-gray-400'
                                        }`} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder='Enter your full name'
                                    className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-0 transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white'
                                />
                            </div>
                        </div>


                        {/* Email Field */}
                        <div className='relative'>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Email Address *
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <RiMailLine className={`text-xl transition-colors duration-200 ${focusedField === 'email' || formData.email ? 'text-blue-600' : 'text-gray-400'
                                        }`} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder='Enter your email address'
                                    className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-0 transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white'
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className='relative'>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Message *
                            </label>
                            <div className='relative'>
                                <div className='absolute top-3 left-3 flex items-start pointer-events-none'>
                                    <RiMessageLine className={`text-xl transition-colors duration-200 ${focusedField === 'message' || formData.message ? 'text-blue-600' : 'text-gray-400'
                                        }`} />
                                </div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    rows="4"
                                    placeholder='Type your message here...'
                                    className='w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:ring-0 transition-all duration-200 text-gray-700 placeholder-gray-400 bg-gray-50 focus:bg-white resize-none'
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='pt-4'>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50'
                            >
                                Send Message
                            </button>
                        </div>

                        {/* Contact Info */}
                        <div className='mt-8 pt-6 border-t border-gray-200'>
                            <div className='text-center text-gray-600'>
                                <p className='text-sm'>
                                    Need immediate assistance? Call us at{' '}
                                    <span className='text-blue-600 font-semibold'>+1 (555) 123-4567</span>
                                </p>
                                <p className='text-sm mt-1'>
                                    Or email us at{' '}
                                    <span className='text-blue-600 font-semibold'>contact@yourcompany.com</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info Cards */}
                <div className='grid md:grid-cols-3 gap-6 mt-8'>
                    <div className='bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center'>
                        <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                            <RiMailLine className='text-blue-600 text-xl' />
                        </div>
                        <h3 className='font-semibold text-gray-800 mb-1'>Email Us</h3>
                        <p className='text-sm text-gray-600'>contact@yourcompany.com</p>
                    </div>

                    <div className='bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center'>
                        <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                            <RiPhoneLine className='text-blue-600 text-xl' />
                        </div>
                        <h3 className='font-semibold text-gray-800 mb-1'>Call Us</h3>
                        <p className='text-sm text-gray-600'>+1 (555) 123-4567</p>
                    </div>

                    <div className='bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center'>
                        <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                            <RiContactsLine className='text-blue-600 text-xl' />
                        </div>
                        <h3 className='font-semibold text-gray-800 mb-1'>Visit Us</h3>
                        <p className='text-sm text-gray-600'>123 Business St.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contactus;