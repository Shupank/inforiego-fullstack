import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const { user } = useAuth();

  const loadProducts = async (page = 1) => {
    const res = await api.get(`/products?page=${page}`);
    setProducts(res.data.products);
    setPagination(res.data.pagination);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Productos</h1>

      {user?.role === 'admin' && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded">
          <p className="font-semibold">Eres administrador</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p._id} className="border rounded-lg p-5 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700">{p.nombre}</h3>
            <p className="text-2xl font-bold text-green-600">${p.precio}</p>
            <p className="text-sm text-gray-500 mt-1">Stock: {p.stock}</p>
            {p.categoria && (
              <p className="text-sm bg-gray-100 inline-block px-2 py-1 rounded mt-2">
                {p.categoria.nombre}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center gap-4">
        {pagination.hasPrev && (
          <button
            onClick={() => loadProducts(pagination.page - 1)}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Anterior
          </button>
        )}
        <span className="text-lg font-medium">
          Página {pagination.page} de {pagination.pages}
        </span>
        {pagination.hasNext && (
          <button
            onClick={() => loadProducts(pagination.page + 1)}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}