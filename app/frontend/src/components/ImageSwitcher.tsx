import React, { useState, useEffect } from 'react';
import first from '../Assets/pexels-aa-dil-1961183.jpg';
import second from '../Assets/pexels-avonne-stalling-3916455.jpg';
import third from '../Assets/pexels-collis-3031397.jpg';
import fourth from '../Assets/pexels-dibakar-roy-4064960.jpg';
import fifth from '../Assets/pexels-ebuka-onyewuchi-5889715.jpg'
import sixth from '../Assets/pexels-hamid-tajik-4956618.jpg'
import seventh from '../Assets/pexels-jamiesx-co-4242520.jpg'
import eighth from '../Assets/pexels-kalyn-kostov-3460478.jpg'
import ninenth from '../Assets/pexels-maria-eduarda-loura-magalhães-3715200.jpg'
import tenth from '../Assets/pexels-maria-eduarda-loura-magalhães-4118789.jpg'
import eleventh from '../Assets/pexels-steshka-willems-4536190.jpg'
import twelevth from '../Assets/pexels-taiwo-ifeoluwa-2427506.jpg'

import './style.css'

const ImageSwitcher = () => {
  const images = [first, second, third, fourth,fifth,sixth,seventh,eighth,ninenth,tenth,eleventh,twelevth];
  const [imageIndex, setImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (imageIndex + 1) % images.length;
      setImageIndex(newIndex);
      setCurrentImage(images[newIndex]);
    }, 700);

    return () => {
      clearInterval(interval);
    };
  }, [imageIndex]);

  return (
    <div className='image-container'>
      <img src={currentImage} alt=""  className='image' loading='lazy'/>
    </div>
  );
};

export default ImageSwitcher;
