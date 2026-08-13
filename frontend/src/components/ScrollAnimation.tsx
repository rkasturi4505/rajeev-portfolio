import { useEffect, useRef, useState } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
}


function ScrollAnimation({ children }: ScrollAnimationProps) {

  const ref = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);


  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          setVisible(true);

          observer.disconnect();

        }

      },
      {
        threshold: 0.2,
      }
    );


    if (ref.current) {

      observer.observe(ref.current);

    }


    return () => observer.disconnect();


  }, []);



  return (

    <div
      ref={ref}
      className={visible ? "animate visible" : "animate"}
    >

      {children}

    </div>

  );

}


export default ScrollAnimation;