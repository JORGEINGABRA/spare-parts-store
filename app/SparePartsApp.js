"use client";
import { useState } from "react";

const initialProducts = [
  {
    id: 1,
    name: "Bateria Litio 48V 12Ah",
    price: 800,
    image: "/images/products/battery.png",
  },
  {
    id: 2,
    name: "Motor Electrico Citycoco 1500W",
    price: 1200,
    image: "/images/products/motor.png",
  },
  {
    id: 3,
    name: "Llanta Bicimoto 2.50x14",
    price: 70,
    image: "/images/products/tire.png",
  },
  {
    id: 4,
    name: "Controlador Bicimoto 48V 350W",
    price: 170,
    image: "/images/products/controller.png",
  },
];

export default function SparePartsApp() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = initialProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const sendToWhatsApp = () => {
    const phone = "51985776343";

    let message = "Hola, quiero comprar:\n\n";

    cart.forEach((item) => {
      message += `${item.name} - S/ ${item.price}\n`;
    });

    message += `\nTotal: S/ ${total}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    }).format(price);

  return (
  <div className="p-6 bg-black text-white min-h-screen">
    
    <h1 className="text-4xl font-bold mb-4">
      Tienda de Repuestos de Moto Electricas
    </h1>

    <input
      className="border border-gray-700 bg-gray-800 text-white p-2 rounded w-full max-w-md mb-6"
      placeholder="Buscar partes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <div className="flex gap-6 flex-wrap">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-gray-900 p-4 rounded-xl shadow-md w-48"
        >
          <img src={product.image} className="w-full h-32 object-cover mb-2" />
          <h2 className="font-bold">{product.name}</h2>
          <p className="text-green-600 font-semibold">{formatPrice(product.price)}</p>
          <button
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            onClick={() => addToCart(product)}
          >
            Agregar al Carro
          </button>
        </div>
      ))} 
    </div>

    <h2 className="text-2xl font-bold mt-8">Cart</h2>

    {cart.map((item, index) => (
      <p key={index}>
        {item.name} - {formatPrice(item.price)}
      </p>
    ))}

    <h3 className="text-xl font-bold mt-2">Total: {formatPrice(total)}</h3>
    <button
      onClick={sendToWhatsApp}
      className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Comprar por WhatsApp
    </button>

  </div>
);
}