import React from 'react';
import '../App.css';
import styled from 'styled-components';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #0B7B16;
  padding: 20px 10px; /* Reduced padding */
  color: #fff;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center; /* Centers content horizontally */
  align-items: center; /* Centers content vertically */
`;

const FooterContent = styled.div`
  text-align: center;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center; /* Centers icons horizontally within this container */
  align-items: center; /* Centers icons vertically within this container */
  margin-bottom: 10px; /* Reduced margin */

  a {
    color: #fff;
    margin: 0 5px; /* Reduced margin */
    font-size: 24px;
    transition: color 0.3s ease;

    &:hover {
      color: #E9D280;
    }
  }
`;

const Footer = () => {
  const footerYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <SocialIcons>
          <a href="https://www.facebook.com/Transtu.tn"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
        </SocialIcons>
        <p>copyright &copy; {footerYear} All rights reserved</p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
