import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import PageHero from '@/components/shared/PageHero';
import CollectionFilters, { FilterState } from '@/components/shared/CollectionFilters';
import ContactFormSection from '@/components/home/ContactFormSection';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { getCollectionBySlug, getProductsByCollection } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function CollectionDetail() {
  const { slug } = useParams();
  const collection = getCollectionBySlug(slug || '');
  const allProducts = getProductsByCollection(slug || '');

  const [filters, setFilters] = useState<FilterState>({
    style: [],
    deliveryTime: [],
    budget: '',
    language: [],
    sortBy: 'best-selling',
  });

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter(p => {
      // Apply style filter
      if (filters.style.length > 0 && !filters.style.some(s => p.styles.includes(s as any))) return false;
      
      // Apply delivery time filter
      if (filters.deliveryTime.length > 0 && !filters.deliveryTime.includes(p.deliveryTime)) return false;
      
      // Apply language filter
      if (filters.language.length > 0 && !filters.language.some(l => p.languages.includes(l as any))) return false;
      
      // Apply budget filter
      if (filters.budget) {
        if (filters.budget === 'under-1000' && p.priceFrom >= 1000) return false;
        if (filters.budget === '1000-3000' && (p.priceFrom < 1000 || p.priceFrom > 3000)) return false;
        if (filters.budget === 'above-3000' && p.priceFrom <= 3000) return false;
      }
      
      return true;
    });
    
    // Sort
    switch (filters.sortBy) {
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
        break;
      case 'price-low':
        result = result.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case 'price-high':
        result = result.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case 'best-selling':
      default:
        result = result.filter(p => p.bestSeller).concat(result.filter(p => !p.bestSeller));
        break;
    }
    
    return result;
  }, [allProducts, filters]);

  if (!collection) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="section-padding">
          <div className="container-custom text-center px-4">
            <h1 className="font-heading text-3xl text-foreground mb-4">Collection not found</h1>
            <Link to="/collections">
              <Button variant="outline">Back to Collections</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <PageHero 
          title={collection.title} 
          subtitle={collection.description}
          backgroundImage={collection.thumbnail}
        />

        <div className="container-custom section-padding px-4">
          <Link to="/collections" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 text-sm md:text-base">
            <ArrowLeft className="w-4 h-4" /> Back to Collections
          </Link>

          {/* Filters */}
          <CollectionFilters onFilterChange={setFilters} currentFilters={filters} />

          {/* Products grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/product/${product.slug}`} className="group block card-luxury rounded-xl overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {product.bestSeller && (
                        <span className="bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Best Seller
                        </span>
                      )}
                      {product.isNew && (
                        <span className="bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <p className="text-primary font-bold text-sm md:text-base">Starting at ₹{product.priceFrom.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{product.deliveryTime} delivery</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No templates match your filters.</p>
              <Button variant="outline" onClick={() => setFilters({
                style: [],
                deliveryTime: [],
                budget: '',
                language: [],
                sortBy: 'best-selling',
              })}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* <ContactFormSection variant="full" /> */}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
