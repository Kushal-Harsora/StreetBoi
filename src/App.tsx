// System Components import
import React from 'react'
import ReactLenis from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'

// Styles import
import './index.css'

// UI Components import
import Loader from './components/loader'

// Hooks and helpers
import { useImageLoader } from './hooks/useImageLoader'


// Register the Scroll Trigger Plugin
gsap.registerPlugin(ScrollTrigger)


const App = () => {

  const lenisRef = React.useRef<LenisRef | null>(null);

  const images = [
    `${import.meta.env.BASE_URL}images/img1.jpg`,
    `${import.meta.env.BASE_URL}images/img2.jpg`,
    `${import.meta.env.BASE_URL}images/img3.jpg`,
    `${import.meta.env.BASE_URL}images/img4.jpg`,
    `${import.meta.env.BASE_URL}images/img5.jpg`,
    `${import.meta.env.BASE_URL}images/img6.jpg`,
    `${import.meta.env.BASE_URL}images/img7.jpg`,
    `${import.meta.env.BASE_URL}images/img8.jpg`
  ];

  const { loadedImage, progress } = useImageLoader(images)

  React.useEffect(() => {
    let rafId: number

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time)
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)

    return () => cancelAnimationFrame(rafId)
  }, []);

  React.useEffect(() => {
    const footer = document.querySelector(".footer") as HTMLElement;
    const lastImage = document.querySelector(".scroll") as HTMLElement;
    const images = gsap.utils.toArray(".pinned") as HTMLElement[];

    images.forEach((section, index, sections) => {
      const img = section.querySelector(".img") as HTMLDivElement;
      const nextSection = sections[index + 1] || lastImage;

      const endScalePoint = `top+=${nextSection.offsetTop - section.offsetTop} top`;

      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: index === sections.length ? `+=${footer.offsetHeight / 2}` : footer.offsetTop - window.innerHeight,
          pin: true,
          pinSpacing: false,
          scrub: 1
        }
      });

      gsap.fromTo(img, { scale: 1 }, {
        scale: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: endScalePoint,
          scrub: 1,
        }
      });
    })
  })

  React.useEffect(() => {
    const logo = document.querySelector(".logo") as HTMLElement;
    const hero = document.querySelector(".hero") as HTMLElement;

    gsap.fromTo(logo, { y: -100, opacity: 0 }, {
      y: 0,
      opacity: 1,
      ease: 'power1.in',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=150',
        scrub: 1
      }
    });

    gsap.fromTo(hero, { y: 0, opacity: 1 }, {
      y: -100,
      opacity: 0,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=150',
        scrub: 1
      }
    })
  })

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        smoothWheel: true,
        easing: (t: number) => 1 - (1 - t) * (1 - t),
        duration: 1.25,
        syncTouch: true,
        wheelMultiplier: 0.8,
        gestureOrientation: 'vertical'
      }}
      ref={lenisRef}
    >
      {
        !loadedImage
          ?
          (
            <AnimatePresence>
              {progress < 1 && <Loader progress={progress} />}
            </AnimatePresence>
          )
          :
          (
            <main className=' h-full w-full'>
              <section className=' pinned absolute top-0 left-0 text-center translate-x-[50%] p-2 px-6 z-50 navbar text-2xl logo'>
                Street Boi
              </section>

              <section className=' pinned w-screen h-[75vh]'>
                <h1 className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center text-9xl navbar hero'>
                  Street Photography
                </h1>
              </section>

              {images.map((image, index) => (
                <section
                  key={index}
                  className={`h-screen w-screen ${index === images.length - 1 ? 'scroll relative' : 'pinned'}`}
                >
                  <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] h-[80vh] w-[80vw] img'>
                    <img className=' object-cover rounded-2xl' src={`${image}`} alt={`image${index + 1}`} />
                  </div>
                </section>
              ))}

              <section className=' h-[50vh] w-screen flex flex-row items-center justify-center gap-6 footer heading text-xl bg-[#fcf6f2]'>
                <h3 className=' mt-[12.5vh]'>
                  Get in Touch
                </h3>
                <motion.button
                  whileHover={{
                    scaleX: 1.25,
                    scaleY: 1.15,
                    backgroundColor: "#60a5fa",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="cursor-pointer bg-blue-300 py-2 px-6 rounded-3xl text-lg font-semibold text-black shadow-md mt-[12.5vh]"
                  onClick={() => {
                    window.location.href = "mailto:kushalharsora2003@gmail.com?subject=Freelance Collaboration Inquiry&body=Hi Kushal,%0D%0A%0D%0AI came across your work, and I am interested in discussing a potential freelance opportunity with you. Please let me know your availability to connect.%0D%0A%0D%0ABest regards,%0D%0A[Your Name]"
                  }}
                >
                  Email Me!
                </motion.button>
              </section>

              <section className=' h-fit w-screen py-2 flex items-baseline justify-center bg-[#fcf6f2] heading border-t-[1px] border-black'>
                © {new Date().getFullYear()} StreetBoi. Developed by
                <a
                  href="https://github.com/Kushal-Harsora/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400"
                >
                  &nbsp;Kushal Harsora
                </a>
                .
              </section>
            </main>
          )
      }
    </ReactLenis>
  )
}

export default App