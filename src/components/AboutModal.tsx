import { useEffect, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  open: boolean;
  onClose: () => void;
  enableSound?: boolean;
  soundSrc?: string;
}

function getHeaderOffset() {
  const header = document.querySelector("header") as HTMLElement | null; // sticky header
  const topbar = header?.previousElementSibling as HTMLElement | null;   // purple bar
  const headerH = header?.offsetHeight ?? 0;
  const topbarH = topbar?.offsetHeight ?? 0;
  return headerH + topbarH + 16; // add a little gap
}

const AboutModal: React.FC<Props> = ({
  open,
  onClose,
  enableSound = false,
  soundSrc = "/sounds/envelope-open.mp3",
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // ✅ compute offset each open (header height can change in responsive)
  const topOffset = useMemo(() => (open ? getHeaderOffset() : 0), [open]);

  // scroll lock + focus
  useEffect(() => {
    if (!open) return;
    prevFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = "";
      prevFocusRef.current?.focus?.();
    };
  }, [open]);

  // ESC close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-md px-4"
          style={{
            paddingTop: topOffset,   // ✅ pushes modal below sticky header
            paddingBottom: 24,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="presentation"
        >
          {/* ✅ align at top (not center) so it respects header area */}
          <div className="w-full h-full flex items-start justify-center">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="about-title"
              className="
                w-full max-w-4xl
                max-h-[72vh] md:max-h-[74vh]
                bg-[#fffaf3] border border-amber-200/40 shadow-2xl
                rounded-md overflow-hidden
                flex flex-col
              "
              initial={{ y: 18, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.99 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 md:px-8 py-4 bg-gradient-to-b from-amber-50 to-[#fffaf3] border-b border-amber-200/40">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 id="about-title" className="text-xl md:text-2xl font-serif text-gray-900">
                      Know Us Well!
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      A warm note from the hearts behind Outright&apos;s Luring Invite.
                    </p>
                  </div>

                  <button
                    ref={closeBtnRef}
                    onClick={onClose}
                    className="shrink-0 rounded-md border border-amber-200 bg-white px-3 py-2 text-gray-700 hover:bg-amber-50"
                    aria-label="Close modal"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Scrollable content */}
            <div className="px-6 md:px-8 py-5 overflow-y-auto">
              <div className="grid md:grid-cols-2 gap-6 items-start">
                {/* Left: images (optional placeholders) */}
                <div className="space-y-3">
                  <div className="border border-amber-200/40 bg-amber-50/40">
                    <div className="aspect-[4/3] w-full" />
                  </div>
                  <div className="border border-amber-200/40 bg-amber-50/25">
                    <div className="aspect-[4/3] w-full" />
                  </div>
                  
                </div>

                {/* Right: text */}
                <div>
                  <p className="text-gray-700 leading-relaxed">
                    Welcome to <strong>Outright&apos;s Luring Invite</strong>, where dreams meet innovation, and every occasion
                    becomes a cherished memory. Founded under the visionary leadership of our Director,{" "}
                    <strong>Ms. Gurleen Kaur</strong>, Outright&apos;s Luring Invite is more than just a digital invitation service —
                    it&apos;s a reflection of passion, creativity, and a commitment to making your special moments truly unforgettable.
                  </p>

                  <p className="mt-3 text-gray-700 leading-relaxed">
                    Driven by Gurleen&apos;s personal dedication to infuse every event with warmth and a personalized touch,
                    Outright&apos;s Luring Invite embodies a mission to redefine the art of celebration. With a keen eye for detail
                    and a heart full of creativity, Gurleen ensures that each client&apos;s vision is brought to life — transforming
                    dreams into captivating digital invitations that resonate with authenticity and charm.
                  </p>

                  {/* <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      onClick={onClose}
                      className="rounded-md bg-amber-600 text-white px-5 py-2 shadow-md hover:shadow-lg"
                    >
                      Continue
                    </button>
                    <button
                      onClick={onClose}
                      className="rounded-md border border-amber-300 text-amber-900 px-5 py-2 hover:bg-amber-50"
                    >
                      Close
                    </button>
                  </div> */}

                  {/* <p className="mt-2 text-xs text-gray-500">
                    Tip: Press <span className="font-semibold">Esc</span> to close.
                  </p> */}
                </div>
              </div>
            </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AboutModal;
