import React from 'react'
import Lottie from "react-lottie";
import loading from "../../../src/lottie/14467-music.json";

export default function Loading() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div style={{marginTop : '13rem'}}>
        <Lottie 
          options={defaultOptions}
          height={300}
          width={300}
        />
      </div>
    );
  }

