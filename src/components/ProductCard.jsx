import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
  return (
    <motion.div
      className="bg-light dark:bg-dark rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      whileHover={{ scale: 1.02 }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
          <p className="text-primary font-bold text-xl">{product.price} ₽</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default ProductCard;
