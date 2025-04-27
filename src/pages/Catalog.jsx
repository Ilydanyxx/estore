import products from '../api/products';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

function Catalog() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Каталог товаров</h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </section>
  );
}

export default Catalog;
