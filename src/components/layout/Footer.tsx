import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { collections } from '@/data/products';
import { motion } from "framer-motion";

export default function Footer() {
  const [done, setDone] = useState(true);

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in your invitation services. Can you help me?"
    );
    window.open(`https://api.whatsapp.com/send?phone=91 9121080131&text=${message}`, '_blank');
  };

  return (
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-primary-glow py-12">
        <div className="container-custom text-center">
          <h3 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">
            Ready to Create Your Dream Invitation?
          </h3>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let us help you make your special occasion unforgettable with our premium digital invitations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="heroOutline"
              size="xl"
              onClick={openWhatsApp}
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Talk on WhatsApp
            </Button>
            <Link to="/contact">
              <Button
                variant="heroOutline"
                size="xl"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <Link to="/" className="relative h-20 flex items-center">
                {done && (
                  <motion.img
                    layoutId="site-logo"
                    src="/whitelogo.png"
                    alt="Logo"
                    className="h-28 w-auto object-contain"
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                )}
              </Link>
              <p className="text-muted-foreground text-sm mb-6">
                Where dreams meet innovation, and every occasion becomes a cherished memory.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/40 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
                <li><Link to="/collections" className="text-muted-foreground hover:text-primary transition-colors">Collections</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/process" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Collections */}
            <div>
              <h4 className="font-semibold mb-6">Collections</h4>
              <ul className="space-y-3">
                {collections.slice(0, 6).map((collection) => (
                  <li key={collection.id}>
                    <Link
                      to={`/collections/${collection.slug}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {collection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-muted-foreground">+91 9121080131</p>
                    <p className="text-xs text-muted-foreground/70">Mon-Sat, 10AM-7PM</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <p className="text-muted-foreground">hello@outrightsluringinvite.com</p>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <p className="text-muted-foreground">Hyderabad, Telangana, India</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-muted-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Outright's Luring Invite. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
