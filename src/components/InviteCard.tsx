const InviteCard = () => {
  return (
    <div className="w-[820px] h-[520px] bg-white rounded-lg  border border-border/30 overflow-hidden relative">
      <div className="flex h-full">
        
        {/* Decorative side */}
        <div className="w-[35%] overflow-hidden">
          <img
            src="/images/gurleen.png"
            alt="Decorative side"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content Side */}
        <div className="w-[65%] p-10 flex flex-col justify-between">
          
          <div>
            {/* Heading */}
            <h3 className="font-display text-3xl text-orimary mb-6">
              Know Us Well!
            </h3>

            {/* Description */}
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

          {/* Footer */}
          <div className=" border-t border-border/40 pt-6">
            <p className="font-display text-3xl text-primary">
              Gurleen Kaur
            </p>
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
