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
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // SVG Refs
  const flapRef = useRef<SVGPolygonElement>(null);
  const seamRef = useRef<SVGPolylineElement>(null);
  const flapShadowRef = useRef<SVGPathElement>(null);

  // Layer Refs
  const cardRef = useRef<HTMLDivElement>(null);
  const flapContainerRef = useRef<HTMLDivElement>(null);

  // Seal (logo sticker) ref
  const sealRef = useRef<HTMLButtonElement>(null);

  const isMobile = useIsMobile();

  const handleSealClick = () => {
    if (timelineRef.current) {
      timelineRef.current.play();
    }
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    const flap = flapRef.current;
    const seam = seamRef.current;
    const shadow = flapShadowRef.current;
    const card = cardRef.current;
    const flapContainer = flapContainerRef.current;
    const seal = sealRef.current;

    if (!section || !wrap || !flap || !seam || !shadow || !card || !flapContainer || !seal) return;

    // --- INITIAL STATE (RESET) ---

    // 1. Envelope Parts
    gsap.set(flap, { attr: { points: FLAP_CLOSED } });
    gsap.set(seam, { attr: { points: SEAM_CLOSED } });
    gsap.set(flapContainer, { zIndex: 30 });
    gsap.set(shadow, { opacity: 0 });
    gsap.set(wrap, { clearProps: "transformPerspective, rotateX, transformStyle" });

    // 2. Seal
    gsap.set(seal, {
      scale: isMobile ? 0.8 : 1,
      opacity: 1,
      rotate: 0,
    });

    // 3. Card Initial Position
    // CHANGED: Added autoAlpha (opacity + visibility).
    // On mobile, autoAlpha is 0 initially so the card is completely hidden.
    gsap.set(card, {
      y: isMobile ? 100 : 100, 
      scale: isMobile ? 0.9 : 0.95, // Adjusted mobile scale slightly up since InviteCard is now fluid
      zIndex: 10,
      autoAlpha: isMobile ? 0 : 1, // <--- HIDDEN INITIALLY ON MOBILE
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: "+=100",
          pin: true,
          scrub: false,
          once: true,
          toggleActions: "play none none none",
        },
      });

      timelineRef.current = tl;

      // === ANIMATION SEQUENCE === //

      // 1. Open Flap
      tl.to(flap, { attr: { points: FLAP_OPEN_OVERSHOOT }, duration: 1.5, ease: "power2.inOut" }, 0)
        .to(seam, { attr: { points: SEAM_OPEN_OVERSHOOT }, duration: 1.5, ease: "power2.inOut" }, 0)
        .to(seal, { scale: 1.2, opacity: 0, duration: 1.0 }, 0)
        .to(shadow, { opacity: 0.14, duration: 1.0 }, 0.5);

      // 2. Settle Flap
      tl.to(flap, { attr: { points: FLAP_OPEN_SETTLE }, duration: 0.8, ease: "power2.out" }, 1.5)
        .to(seam, { attr: { points: SEAM_OPEN_SETTLE }, duration: 0.8, ease: "power2.out" }, 1.5);

      // 3. Send Flap to Back
      tl.set(flapContainer, { zIndex: 0 }, 2.2);

      // 4. Extract Card UP
      const wrapH = wrap.getBoundingClientRect().height;
const extractionY = isMobile ? -(wrapH * 0.9) : -380;


      tl.to(card, {
        y: extractionY,
        duration: 1.8,
        ease: "power3.inOut",
      }, 2.2);

      // CHANGED: Fade IN card on mobile as it extracts
      if (isMobile) {
        tl.to(card, { 
            autoAlpha: 1, 
            duration: 0.6, 
            ease: "power2.in" 
        }, 2.4); // Start showing it just as it clears the pocket lip
      }

      // 5. Swap Z-Index
      tl.set(card, { zIndex: 40 }, 4.0);

      // 6. Present Card DOWN & Full Scale
      tl.to(card, {
        y: 0, 
        scale: 1, 
        duration: 1.5,
        ease: "back.out(0.8)",
      }, 4.0);

    }, sectionRef);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative pb-10 w-full min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/bg3.png')",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center py-20 px-4">
        
        {/* WRAPPER */}
        <div ref={wrapRef} className="relative w-[95%] md:w-full max-w-5xl aspect-[960/650]">

          {/* BACK LAYER */}
          <div className="absolute inset-0 z-0">
            <EnvelopeSVG part="back" flapShadowRef={flapShadowRef} className="w-full h-full" />
          </div>

          {/* CARD LAYER */}
          <div
            ref={cardRef}
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ willChange: "transform, opacity" }}
          >
            {/* CHANGED: 
               1. Removed fixed width/height on this wrapper.
               2. Added aspect-ratio matching the card design (820/520) ~ 1.57.
               This ensures the fluid InviteCard retains its shape.
            */}
            <div className="w-[92%] md:w-[820px] h-[78vh] max-h-[700px] md:h-[520px] shadow-lg">
              <InviteCard />
            </div>
          </div>

          {/* POCKET LAYER */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <EnvelopeSVG part="pocket" className="w-full h-full" />
          </div>

          {/* SEAL BUTTON */}
          <button
            ref={sealRef}
            type="button"
            onClick={handleSealClick}
            className="absolute z-[35] left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2 w-[70px] h-[70px] md:w-[92px] md:h-[92px] rounded-full shadow-md active:scale-[0.98] transition-transform cursor-pointer"
            aria-label="Open invitation"
          >
            <img
              src="/main-logo.webp"
              alt="Seal Logo"
              className="w-full h-full object-contain"
              draggable={false}
            />
          </button>

          {/* FLAP LAYER */}
          <div ref={flapContainerRef} className="absolute inset-0 z-30 pointer-events-none">
            <EnvelopeSVG part="flap" flapRef={flapRef} seamRef={seamRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InviteSection;