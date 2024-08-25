import React from 'react';

const Contact = () => {
    return (
        <div className="contact-page max-w-2xl mx-auto p-8">
            <h1 className="text-center font-semibold text-3xl mb-8">Contact Us</h1>
            
            <form className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-orange-100 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-orange-100 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Message:</label>
                    <textarea
                        name="message"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:bg-orange-100 focus:border-indigo-500 sm:text-sm"
                        rows="4"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-orange-100"
                >
                    Send Message
                </button>
            </form>
            
            <div className="contact-details mt-12">
                <h2 className="text-xl font-semibold text-gray-900">Our Office</h2>
                <p className="mt-4 text-gray-600">123 Uttara Dhaka-1230, FC 12345</p>
                <p className="mt-2 text-gray-600">Phone: +123-456-7890</p>
                <p className="mt-2 text-gray-600">Email: <a href="mailto:support@foodi.com" className="text-indigo-600 hover:underline">support@foodi.com</a></p>
            </div>
            
            <div className="map-container mt-12">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29186.92906727564!2d90.35768841183838!3d23.87663222938128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5d05e7074dd%3A0xd1c58803049f00c7!2sUttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1724565870329!5m2!1sen!2sbd"
                    width="100%"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    title="Our Location"
                    className="border border-gray-300 rounded-md shadow-sm"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;