import React from "react";
import Typewriter from "typewriter-effect";
import './style.css'

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          '<span style="color: black;font-weight:600;font-size:3rem;">Empowering Brands with Sentiment Intelligence</span>',
          '<span style="color: black;font-weight:600;font-size:3rem;">Where Data Meets Emotions for Marketing Success.</span>'
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
        html: true,
        cursorClassName:"cursor"
      }}

    />
  );
}

export default Type;
