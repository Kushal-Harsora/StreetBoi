// System Components import
import React from 'react'
import ReactLenis from 'lenis/react'
import type { LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Styles import
import './index.css'

// UI Components import
import Loader from './components/loader'

// Hooks and helpers
import { useImageLoader } from './hooks/useImageLoader'


// Register the Scroll Trigger Plugin
gsap.registerPlugin(ScrollTrigger)


const App = () => {

  const lenisRef = React.useRef<LenisRef | null>(null)
  const navbar = React.useRef<HTMLSpanElement | null>(null);
  const header = React.useRef<HTMLSpanElement | null>(null);


  const images = [
    '/images/img1.jpg',
    '/images/img2.jpg',
    '/images/img3.jpg',
    '/images/img4.jpg'
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
  }, [])

  React.useEffect(() => {
    if (!navbar.current || !header.current) return

    gsap.set(navbar.current, { y: -50, opacity: 0 })

    gsap.to(
      navbar.current, {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: 'power3.in',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=200',
          scrub: true,
          pin: false,
          markers: true
        }
      }
    )

    gsap.to(
      header.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=200',
          scrub: true,
          pin: false,
          markers: true
        }
      }
    )
  }, [])

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
      ref={lenisRef}>
      <main className="h-fit w-screen flex flex-col justify-center items-center">
        {!loadedImage && <Loader progress={progress} />}

        <div className='fixed top-0 left-0 h-[10vh] w-screen flex items-center justify-center bg-white'>
          <span className=' text-4xl navbar' ref={navbar}>
            Street Boi
          </span>
        </div>

        <div className=' h-screen w-screen flex items-center justify-center'>
          <span className=' text-9xl navbar' ref={header}>
            Street Boi
          </span>
        </div>

        <div className={`flex flex-col gap-6 ${loadedImage ? 'visible' : 'hidden'}`}>
          {images.map((imgUrl, index) => (
            <div key={index} className="w-[80vw] h-[90vh] bg-gray-200 overflow-hidden rounded-2xl">
              <img
                src={imgUrl}
                alt={`img-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </main>
    </ReactLenis>
  )
}

export default App