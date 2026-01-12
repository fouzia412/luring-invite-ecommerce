import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories, collections } from '@/data/products';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"


export default function CategoriesCarousel() {
   const screenSize = useScreenSize()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
 

  const updateNavState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList().map((_, i) => i));
    updateNavState();

    emblaApi.on('select', updateNavState);
    emblaApi.on('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList().map((_, i) => i));
      updateNavState();
    });
  }, [emblaApi, updateNavState]);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <PixelTrail
  pixelSize={screenSize.lessThan("md") ? 40 : 64}
  fadeDuration={600}
  delay={800}
  className="z-0"
/>

      <div className="container-custom relative z-10">

        {/* Collections Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-10">
           Browse All <span className="text-primary">Collections</span>
          </h2>

          {/* Carousel wrapper (relative for arrows) */}
          <div className="relative">
            {/* Prev */}
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Previous collections"
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10
                rounded-full p-2 backdrop-blur bg-background/70 shadow
                transition-opacity hover:bg-background/90
                ${!canScrollPrev ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}
              `}
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Next collections"
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10
                rounded-full p-2 backdrop-blur bg-background/70 shadow
                transition-opacity hover:bg-background/90
                ${!canScrollNext ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}
              `}
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            {/* Viewport */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {collections.map((collection) => (
                  <div key={collection.id} className="flex-none w-[280px] md:w-[320px]">
                    <Link to={`/collections/${collection.slug}`} className="group block">
                      <div className="relative h-48 rounded-xl overflow-hidden mb-4 card-luxury">
                        <img
                          src={collection.thumbnail}
                          alt={collection.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-background text-sm font-medium">
                            {collection.productCount} templates
                          </span>
                          <ArrowRight className="w-5 h-5 text-background" />
                        </div>
                      </div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {collection.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {collection.description}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation dots (now matches actual snap count) */}
          {/* <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedIndex === index
                    ? 'w-8 bg-primary'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div> */}
        </motion.div>
      </div>
    </section>
  );
}
