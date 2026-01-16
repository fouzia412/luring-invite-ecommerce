// src/components/InviteCard.tsx
const InviteCard = () => {
  return (
    <div className="w-full h-full md:w-[820px] md:h-[520px] bg-white rounded-lg border border-border/30 overflow-hidden">
      <div className="flex flex-col md:flex-row h-full">

        {/* Decorative side (shows on mobile at top) */}
        <div className="w-full md:w-[35%] h-[180px] md:h-full shrink-0 overflow-hidden flex items-center justify-center">
          <img
            src="/images/gurleen.png"
            alt="Decorative side"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content Side */}
        <div className="w-full md:w-[65%] p-4 md:p-10 flex flex-col h-full min-h-0">

          {/* ✅ Scrollable content only (footer stays fixed) */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-2 md:pr-0">
            <h3 className="font-display text-xl md:text-3xl text-primary mb-3 md:mb-6">
              Know Us Well!
            </h3>

            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Welcome to Outright's Luring Invite, where dreams meet innovation,
              and every occasion becomes a cherished memory. Founded under the
              visionary leadership of our Director, Ms. Gurleen Kaur, Outright's
              Luring Invite is more than just a digital invitation service — it’s
              a reflection of passion, creativity, and a commitment to making
              your special moments truly unforgettable.
              <br />
              <br />
              Driven by Gurleen’s personal dedication to infuse every event with
              warmth and a personalized touch, Outright's Luring Invite embodies
              a mission to redefine the art of celebration. With a keen eye for
              detail and a heart full of creativity, each client’s vision is
              transformed into captivating digital invitations that resonate
              with authenticity and charm.
            </p>
          </div>

          {/* ✅ Footer always visible */}
          <div className="shrink-0 border-t border-border/40 pt-4 md:pt-6 mt-4">
            <h2 className="font-display text-xl md:text-3xl text-primary">
              Gurleen Kaur
            </h2>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
              Founder & Director
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InviteCard;
