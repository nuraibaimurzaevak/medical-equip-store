import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import '../styles/Home.css';
import homepageImage from '../styles/images/homepage_image6.jpg';
import newProductImage from '../styles/images/new1.jpg'; // добавь картинку новинки

const HomePage = () => {
  return (
    <>
      <Navbar />

      <main className="home-main">
        <div className="home-image-container">
          <img src={homepageImage} alt="Медицинское оборудование" className="home-image" />
        </div>

        <section className="home-text-container">
          <h1 className="home-title">Добро пожаловать в BioMedica</h1>
          <p className="home-description">
            Современное медицинское оборудование для вашего здоровья и комфорта.
          </p>
          <button className="home-button">Смотреть каталог</button>
        </section>
      </main>

      {/* 🆕 Секция "Новинки" */}
      <section className="home-featured">
        <p className="home-featured-label">НОВИНКИ</p>
        <div className="home-featured-content">
          <div className="featured-text">
            <h2>Инновации для вашего здоровья</h2>
            <p>
 Мы постоянно обновляем наш ассортимент, предлагая новейшее медицинское оборудование, соответствующее международным стандартам качества.
        Новые модели аппаратов созданы с применением передовых технологий, обеспечивая точную диагностику, высокую эффективность и комфорт в использовании как для врачей, так и для пациентов.
                    </p>
            <button className="home-button">Смотреть новинки</button>
          </div>
          <div className="featured-image">
            <img src='https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaWNhbCUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D' alt="Новинка" />
          </div>
        </div>
      </section>
      <section className="encyclopedia">
  <h2 className="encyclopedia-heading">Энциклопедия BioMedica</h2>

  <div className="encyclopedia-grid">
    <div className="encyclopedia-card">
      <img src="https://www.draeger.com/Media/Content/Content/Hospital-Scene-Vista120-3-2-D-9868-2019.jpg?imwidth=480" alt="Мировое влияние" />
      <div className="encyclopedia-text">
        <h3>Глобальный вклад BioMedica в здравоохранение</h3>
        <p>
          В стремительно развивающемся мире медицины BioMedica формирует новое поколение оборудования, улучшая качество диагностики и терапии по всему миру.
        </p>
        <a href="#">Читать далее</a>
      </div>
    </div>

    <div className="encyclopedia-card">
      <img src='https://cdn.pixabay.com/photo/2015/02/26/15/40/doctor-650534_1280.jpg' alt="Диагностика" />
      <div className="encyclopedia-text">
        <h3>Будущее диагностического оборудования</h3>
        <p>
          Узнайте, как инновации BioMedica обеспечивают точность, надёжность и скорость в современной диагностике.
        </p>
        <a href="#">Читать далее</a>
      </div>
    </div>

    <div className="encyclopedia-card">
      <img src='https://www.draeger.com/Media/Content/Content/illustration-of-a-lung-protected-in-an-orb-3-2-dgt-601-2017.jpg?imwidth=768' alt="Советы по здоровью" />
      <div className="encyclopedia-text">
        <h3>Полезные советы от экспертов BioMedica</h3>
        <p>
          Истинное здоровье начинается с заботы о себе. Читайте рекомендации по улучшению самочувствия и поддержанию баланса тела и разума.
        </p>
        <a href="#">Читать далее</a>
      </div>
    </div>
  </div>

  <div className="encyclopedia-footer">
    <a href="#" className="view-all-link">Смотреть все статьи</a>
  </div>
</section>
      <Footer />
    </>
  );
};

export default HomePage;
