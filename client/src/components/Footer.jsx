import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h4>BioMedica</h4>
          <p>Инновационное медицинское оборудование для современной диагностики и терапии.</p>
        </div>

        <div className="footer-column">
          <h4>Контакты</h4>
          <p>Email: info@biomedica.kg</p>
          <p>Телефон: +996 (555) 123-456</p>
        </div>

        <div className="footer-column">
          <h4>Навигация</h4>
          <p>Каталог</p>
          <p>О компании</p>
          <p>Контакты</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BioMedica. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
