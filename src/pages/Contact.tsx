import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message Sent!', description: 'We will get back to you soon.' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="section-padding">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-4">Contact Us</h1>
            <p className="text-muted-foreground">Get in touch for enquiries, collaborations, or questions.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
                <Phone className="w-6 h-6 text-primary" />
                <div><h3 className="font-semibold mb-1">Phone</h3><p className="text-muted-foreground">+91 9121080131</p></div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
                <Mail className="w-6 h-6 text-primary" />
                <div><h3 className="font-semibold mb-1">Email</h3><p className="text-muted-foreground">hello@outrightsluringinvite.com</p></div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-xl">
                <MapPin className="w-6 h-6 text-primary" />
                <div><h3 className="font-semibold mb-1">Location</h3><p className="text-muted-foreground">Hyderabad, Telangana, India</p></div>
              </div>
            </motion.div>
            
            <motion.form initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-4">
              <Input placeholder="Your Name" required />
              <Input type="email" placeholder="Your Email" required />
              <Input placeholder="Subject" />
              <Textarea placeholder="Your Message" className="min-h-[150px]" required />
              <Button type="submit" variant="cta" size="lg" className="w-full">Send Message</Button>
            </motion.form>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
