import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';
import { getBestSellers } from '@/data/products';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

export default function BestSellersCarousel() {
  const bestSellers = getBestSellers();
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const handleWhatsAppEnquiry = (product: any) => {
  const currentUrl = window.location.origin + `/product/${product.slug}`;

  const message = encodeURIComponent(
    `Hi! I'm interested in this product:\n\n` +
    `📌 Product: ${product.title}\n` +
    `💰 Price: Starting at ₹${product.priceFrom}\n` +
    `🔗 Link: ${currentUrl}\n\n` +
    `Please share more details.`
  );

  window.open(
    `https://api.whatsapp.com/send?phone=91 9121080131&text=${message}`,
    "_blank"
  );
};


  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 text-primary mb-4">
              <Flame className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Trending Now</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground">
              Best Sellers
            </h2>
          </div>
          <Link to="/collections" className="mt-4 md:mt-0">
            <Button variant="ctaOutline" className="group">
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-none w-[300px] md:w-[350px]"
              >
                <Link to={`/product/${product.slug}`} className="group block">
                  <div className="relative rounded-xl overflow-hidden mb-4 card-luxury">
                    <div className="aspect-[4/5]">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {product.bestSeller && (
                        <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                          Best Seller
                        </span>
                      )}
                      {product.isNew && (
                        <span className="bg-foreground text-background text-xs font-semibold px-3 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* CTA */}
                    {/* <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="hero" size="lg" className="w-full">
                        View Details
                      </Button>
                    </div> */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <div className="flex gap-2">
    <Button variant="hero" size="default" className="flex-1">
      View Details
    </Button>

    <Button
      type="button"
      variant="whatsapp"
      size="lg"
      className="flex-1"
      onClick={(e) => {
        e.preventDefault();
        handleWhatsAppEnquiry(product);
      }}
    >
      WhatsApp Enquiry
    </Button>
  </div>
</div>

                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-primary">
                        Starting at ₹{product.priceFrom.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {product.deliveryTime} delivery
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
