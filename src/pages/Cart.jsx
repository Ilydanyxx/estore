import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <section className="container mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-semibold mb-6">Корзина пуста</h1>
        <Link
          to="/catalog"
          className="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Перейти в каталог
        </Link>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8">Ваша корзина</h1>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-gray-500">{item.price} ₽ × {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <p className="text-xl font-bold">Итого: {totalPrice} ₽</p>
        <Link
          to="/checkout"
          className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary-dark transition-colors text-center"
        >
          Перейти к оформлению
        </Link>
      </div>
    </section>
  );
}

export default Cart;
