import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";

function Cart() {
    const { cart, setCart } = useContext(UserContext);

    function handleRemoveCart(id) {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }

    function handleIncrease(id) {
        setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    }
    function handleDecrease(id) {
        setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0))
    }

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
                <h2 className="text-3xl font-bold text-gray-700">
                    Your Cart is Empty 🛒
                </h2>

                <p className="text-gray-500 mt-2">
                    Add some products to your cart.
                </p>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-3xl font-bold mb-6">
                🛒 My Cart ({cart.length})
            </h2>

            <div className="space-y-5">
                {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
                        <div className="flex items-center gap-5"><img src={item.image} alt={item.title}
                            className="w-28 h-28 object-contain border rounded-lg p-2" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                                <p className="text-sm text-gray-500 mt-1 capitalize">{item.category}</p>
                                <p className="text-xl font-bold text-green-600 mt-2">₹ {(item.price * item.quantity).toFixed(2)}</p>
                                <div className="flex items-center gap-3 mt-3">
                                    <button className="border px-3 py-1 rounded hover:bg-gray-100" onClick={() => handleDecrease(item.id)}>-</button>
                                    <span className="font-semibold">{item.quantity}</span>
                                    <button className="border px-3 py-1 rounded hover:bg-gray-100" onClick={() => handleIncrease(item.id)}>+</button>
                                </div>
                            </div>
                        </div>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition cursor-pointer"
                            onClick={() => handleRemoveCart(item.id)}>Remove</button>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white rounded-xl shadow-md p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                    Total: ₹ {totalPrice.toFixed(2)}
                </h2>

                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Proceed to Checkout
                </button>
            </div>
        </div>




    );
}

export default Cart;