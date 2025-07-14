import React from 'react';
import { FaFacebookF, FaLinkedin, FaHome, FaGithub } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const Footer = () => {
  const {user} = useAuth()
  const links =
    <>
      <li><NavLink to="/" className="link link-hover" >Home</NavLink></li>
      {user && <li><NavLink to="/allProperties" className="link link-hover">All Properties</NavLink></li>}
      {user && <li><NavLink to="/dashboard" className="link link-hover">Dashboard</NavLink></li>}
    </>
  return (
    <footer className="bg-cyan-400 text-base-accent pt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaHome size={26} color='#582478'/>
            <span className="text-xl font-bold">RealEstatePro</span>
          </div>
          <p>Your trusted platform for buying and selling real estate in Bangladesh.</p>
          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://www.facebook.com/engrtuhin.roky" target="_blank"><FaFacebookF className="hover:text-primary" /></a>
            <a href="https://github.com/tuhinalrakib" target='_blank'><FaGithub className="hover:text-primary" /></a>
            <a href="#"><FaLinkedin className="hover:text-primary" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="space-y-2">
            {links}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="footer-title">Services</h3>
          <ul className="space-y-2">
            <li className="link link-hover">Property Listing</li>
            <li className="link link-hover">Agent Connect</li>
            <li className="link link-hover">Secure Payment</li>
            <li className="link link-hover">Verified Properties</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="footer-title">Contact Us</h3>
          <p>Dhaka, Bangladesh</p>
          <p>Email: eng.tuhin77@gmail.com</p>
          <p>Phone: +880-1609-253955</p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center py-6 mt-10 border-t border-gray-300">
        <p>&copy; {new Date().getFullYear()} RealEstatePro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
