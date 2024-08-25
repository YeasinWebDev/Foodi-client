import React from 'react';

const About = () => {
  return (
    <div className="about-page max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-center text-4xl font-extrabold mb-8">About <span className='px-2 text-orange-600'>Foodi</span></h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to <span className='px-2 text-orange-600 font-semibold'>Foodi</span>, your number one source for all things food. We are passionate about bringing you the best culinary experiences, and we are dedicated to offering a diverse selection of gourmet food, with a strong emphasis on quality, customer service, and uniqueness.
      </p>

      <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
      <p className="text-lg text-gray-700 mb-6">
        Founded in 2024, Foodi began as a small startup in Uttara City. Our journey started with a simple idea: to make high-quality food accessible to everyone. Fueled by our passion for great food, we embarked on this journey to create an online platform that would offer the finest culinary delights. Today, Foodi has grown to serve customers nationwide, delivering gourmet food right to their doorsteps.
      </p>

      <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
      <p className="text-lg text-gray-700 mb-6">
        At Foodi, our mission is to enrich lives through the joy of food. We believe that food is more than just sustenance—it is an experience, a way to bring people together, and a means to celebrate life. We strive to offer a seamless shopping experience where you can discover, explore, and indulge in a wide range of gourmet products.
      </p>

      <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
      <p className="text-lg text-gray-700 mb-6">
        Our vision is to become the leading online destination for food enthusiasts around the world. We aim to provide a platform where our customers can find high-quality, unique, and diverse food products that cater to all tastes and preferences. We are committed to innovation and excellence in every aspect of our business.
      </p>

      <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
      <ul className="list-disc pl-5 mb-6 space-y-2 text-lg text-gray-700">
        <li><strong>Quality:</strong> We are committed to offering only the best quality products, sourced from trusted suppliers.</li>
        <li><strong>Customer Satisfaction:</strong> Our customers are at the heart of everything we do. We are dedicated to providing exceptional service and creating memorable experiences.</li>
        <li><strong>Innovation:</strong> We continuously seek to improve and innovate our services and offerings to better serve our customers.</li>
        <li><strong>Community:</strong> We believe in the power of community and strive to make a positive impact through our products and services.</li>
      </ul>
      <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
      <p className="text-lg text-gray-700 mb-6">
        We love to hear from our customers! If you have any questions, suggestions, or feedback, feel free to reach out to us. You can contact us via email at <a href="mailto:support@foodi.com" className="text-orange-600 hover:underline">support@foodi.com</a> or visit our <a href="/contact" className="text-orange-600 hover:underline">Contact Us</a> page for more information.
      </p>

      <h2 className="text-3xl font-semibold mb-4">Join Our Community</h2>
      <p className="text-lg text-gray-700 mb-6">
        Stay connected with us by following Foodi on social media! We regularly share updates, recipes, and special promotions that you won't want to miss.
      </p>

      <div className="social-media-links text-center space-x-4">
        <a href="https://www.facebook.com/yeasinarafat.arafat.9026" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">Facebook</a> |
        <a href="https://www.linkedin.com/in/yeasinarafat121/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline"> Linkedin</a> |
        <a href="https://github.com/YeasinWebDev" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline"> GitHub</a>
      </div>
    </div>
  );
};

export default About;
