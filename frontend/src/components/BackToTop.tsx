import { useEffect, useState } from "react";
import "./BackToTop.css";

function BackToTop() {

  const [visible, setVisible] = useState(false);


  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }

    };


    window.addEventListener(
      "scroll",
      handleScroll
    );


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };


  }, []);



  const scrollTop = () => {

    window.scrollTo({

      top:0,

      behavior:"smooth"

    });

  };



  return (

    <>

    {
      visible && (

        <button

          className="back-to-top"

          onClick={scrollTop}

        >

          ↑

        </button>

      )
    }

    </>

  );

}


export default BackToTop;