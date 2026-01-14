import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EnvelopeSVG from "./EnvelopeSVG";
import InviteCard from "./InviteCard";
import { useIsMobile } from "./useIsMobile";

gsap.registerPlugin(ScrollTrigger);

// --- FLAP GEOMETRY ---
const FLAP_CLOSED = "30,100 480,380 930,100";
const FLAP_OPEN_OVERSHOOT = "30,100 480,-220 930,100";
const FLAP_OPEN_SETTLE = "30,100 480,-180 930,100";

const SEAM_CLOSED = FLAP_CLOSED;
const SEAM_OPEN_OVERSHOOT = FLAP_OPEN_OVERSHOOT;
const SEAM_OPEN_SETTLE = FLAP_OPEN_SETTLE;

const InviteSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // SVG Refs
  const flapRef = useRef<SVGPolygonElement>(null);
  const seamRef = useRef<SVGPolylineElement>(null);
  const flapShadowRef = useRef<SVGPathElement>(null);

  // Layer Refs
  const cardRef = useRef<HTMLDivElement>(null);
  const flapContainerRef = useRef<HTMLDivElement>(null); // To control Z-index of flap

  const isMobile = useIsMobile();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const flap = flapRef.current;
    const seam = seamRef.current;
    const shadow = flapShadowRef.current;
    const card = cardRef.current;
    const flapContainer = flapContainerRef.current;

    if (!section || !wrap || !flap || !seam || !shadow || !card || !flapContainer) return;

    // --- INITIAL STATE ---
    // 1. Envelope Flap Closed
    gsap.set(flap, { attr: { points: FLAP_CLOSED } });
    gsap.set(seam, { attr: { points: SEAM_CLOSED } });
    
    // 2. Flap is on top (z-index 30)
    gsap.set(flapContainer, { zIndex: 30 });

    // 3. Card is Hidden Inside (y shifted down, z-index 10)
    gsap.set(card, {
      y: 100, // Sitting deep in the pocket
      scale: 0.95,
      zIndex: 10, // Between Back (0) and Pocket (20)
    });

    gsap.set(shadow, { opacity: 0 });

    // 4. Initial Tilt of the whole envelope
    gsap.set(wrap, {
      transformPerspective: 1200,
      transformStyle: "preserve-3d",
      rotateX: 10,
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: isMobile ? "+=200%" : "+=300%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // === PHASE 1: OPENING === //

      // Tilt envelope for better view
      tl.to(wrap, { rotateX: 15, duration: 0.8 }, 0);

      // Open Flap
      tl.to(flap, { attr: { points: FLAP_OPEN_OVERSHOOT }, duration: 1, ease: "power2.inOut" }, 0)
        .to(seam, { attr: { points: SEAM_OPEN_OVERSHOOT }, duration: 1, ease: "power2.inOut" }, 0)
        .to(flap, { attr: { points: FLAP_OPEN_SETTLE }, duration: 0.4, ease: "power2.out" }, 1)
        .to(seam, { attr: { points: SEAM_OPEN_SETTLE }, duration: 0.4, ease: "power2.out" }, 1);
      
      // Shadow appears inside
      tl.to(shadow, { opacity: 0.14, duration: 0.6 }, 0.5);

      // CRITICAL: Once flap is open, move it behind the card visually for the extraction
      // We do this by changing the z-index of the flap container
      tl.set(flapContainer, { zIndex: 0 }, 0.8);

      // === PHASE 2: EXTRACTION === //

      // 1. Slide Card UP (still inside pocket, z-10)
      tl.to(card, {
        y: -350, // Move it HIGH enough to clear the pocket visual
        duration: 1.8,
        ease: "power3.inOut",
      }, 0.8);

      // 2. MAGIC SWITCH: When card is at peak, bring it to front (z-40)
      // This happens instantly in the middle of the scrub
      tl.set(card, { zIndex: 40 }, 1.8);

      // 3. Slide Card DOWN & Scale UP (now covering the pocket)
      tl.to(card, {
        y: 100, // Center it
        scale: 1,
        //boxShadow: "0px 20px 40px rgba(0,0,0,0.3)", // Add drop shadow for depth
        duration: 1.2,
        ease: "power2.out",
      }, 1.8);

      // Flatten envelope rotation
      tl.to(wrap, { rotateX: 0, duration: 1 }, 1.8);


      // === PHASE 3: CLOSING (Reverse Logic) === //

      // 1. Slide Card UP again
      tl.to(card, {
        y: -350,
        scale: 0.95,
        boxShadow: "none",
        duration: 1.2,
        ease: "power2.in",
      }, 3.5);

      // 2. MAGIC SWITCH BACK: Put card back inside (z-10)
      tl.set(card, { zIndex: 10 }, 4.6);

      // 3. Slide Card DOWN into pocket
      tl.to(card, {
        y: 100,
        duration: 1.2,
        ease: "power3.out",
      }, 4.7);

      // 4. Bring Flap to front to close it
      tl.set(flapContainer, { zIndex: 30 }, 5.0);

      // 5. Close Flap
      tl.to(flap, { attr: { points: FLAP_CLOSED }, duration: 1, ease: "power2.inOut" }, 5.2)
        .to(seam, { attr: { points: SEAM_CLOSED }, duration: 1, ease: "power2.inOut" }, 5.2);

      tl.to(shadow, { opacity: 0, duration: 0.5 }, 5.5);
      tl.to(wrap, { rotateX: 10, duration: 0.8 }, 5.5);

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative pb-10 w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden flex items-center justify-center perspective-1000"
      style={{
    backgroundImage: "url('/images/bg3.png')",
  }}
    >
      <div className="relative w-full h-full flex items-center justify-center ">
        
        {/* ENVELOPE WRAPPER */}
        <div ref={wrapRef} className="relative w-full max-w-5xl aspect-[960/650]">
          
          {/* LAYER 1: BACK (Fixed Base) */}
          <div className="absolute inset-0 z-0">
             <EnvelopeSVG part="back" flapShadowRef={flapShadowRef} className="w-full h-full" />
          </div>

          {/* LAYER 2: CARD (Animates In/Out) */}
          <div
            ref={cardRef}
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ willChange: "transform" }}
          >
             <InviteCard />
          </div>

          {/* LAYER 3: POCKET (Visual Overlay) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
             <EnvelopeSVG part="pocket" className="w-full h-full" />
          </div>

          {/* LAYER 4: FLAP (Animates Open/Close) */}
          <div ref={flapContainerRef} className="absolute inset-0 z-30 pointer-events-none">
             <EnvelopeSVG 
                part="flap" 
                flapRef={flapRef} 
                seamRef={seamRef} 
                className="w-full h-full" 
              />
          </div>

        </div>
      </div>
    </section>
  );
};

export default InviteSection;