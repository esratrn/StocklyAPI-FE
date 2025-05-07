import { useEffect, useState } from 'react';
import API from '../services/api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ürün Listesi</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.stock} adet
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
