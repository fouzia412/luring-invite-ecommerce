import { motion } from 'framer-motion';
import { Video, Image, Palette, PenTool, Gift, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Video,
    title: 'AI Video Invitations',
    description: 'Stunning AI-powered video invitations that bring your special moments to life with cutting-edge 3D animation and cinematic storytelling.',
    link: '/collections?category=ai-video-invites',
  },
  {
    icon: Image,
    title: 'Digital Invitations',
    description: 'Elegant digital invitations crafted with love, from traditional designs to modern minimalist styles for every occasion.',
    link: '/collections?category=digital-invites',
  },
  {
    icon: Palette,
    title: 'Custom Logo Design',
    description: 'Unique couple monograms and wedding logos that become the signature of your celebration.',
    link: '/collections/logo',
  },
  {
    icon: PenTool,
    title: 'Caricature Art',
    description: 'Fun and personalized caricature illustrations that add a playful touch to your invitations.',
    link: '/collections/caricature',
  },
  {
    icon: Gift,
    title: 'Complete Stationery',
    description: 'Full wedding stationery suites including save the dates, RSVPs, thank you cards, and more.',
    link: '/collections/stationery',
  },
{
  icon: Sparkles,
  title: 'Customized Magnets',
  description: 'Make your moments memorable with beautifully designed customized magnets—perfect for weddings, events, and keepsakes that last.',
  link: '/contact',
},

];

export default function ServicesSection() {
  return (
    <section className="section-padding bg-muted/30 overflow-hidden">
      <div className="container-custom px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            From concept to delivery, we offer a comprehensive range of invitation design services.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={service.link} className="group block h-full">
                  <div className="h-full bg-card border border-border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 glow-border">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:from-primary/30 group-hover:to-primary/10 transition-colors">
                      <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                    </div>
                    
                    <h3 className="font-semibold text-lg md:text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-10 md:mt-12"
        >
          <Link to="/services">
            <Button variant="cta" size="lg">
              Explore All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
