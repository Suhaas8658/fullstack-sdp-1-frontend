import React, { useEffect, useState } from 'react';
import { fetchProducts, createOrder, fetchOrders } from '../api';

const BuyerDashboard = ({ buyer, view, onBack }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [quantities, setQuantities] = useState({});

  const myOrders = Array.isArray(orders)
    ? orders.filter(o => o.buyer && o.buyer.id === buyer.id)
    : [];

  useEffect(() => {
    fetchOrders().then(res => {
      console.log("ORDERS DATA:", res);
      setOrders(res);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    fetchProducts()
      .then(res => {
        console.log("PRODUCTS:", res); // 👈 CHECK THIS
        setProducts(res);
      })
      .catch(console.error);
  }, []);

  const filtered = products.filter(p =>
    (p.name + p.description + (p.baseCrop ?? '') + (p.valueAddedType ?? ''))
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (view === 'cart') {
    return (
      <>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3>Cart / Order history</h3>
              <p className="text-muted">Review the orders placed by you.</p>
            </div>
            <button className="button secondary" type="button" onClick={onBack}>
              Home
            </button>
          </div>

          <div style={{ display: 'grid', gap: '0.6rem', marginTop: '0.8rem' }}>
            {myOrders.map(o => (
              <div
                key={o.id}
                style={{
                  padding: '0.6rem 0.75rem',
                  borderRadius: 14,
                  border: '1px solid rgba(148,163,184,0.35)',
                  background: 'rgba(15,23,42,0.9)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <strong>{o.product.name}</strong>
                    <div className="text-muted" style={{ marginBottom: '0.25rem' }}>
                      From farmer: {o.product.farmer.fullName} • Qty {o.quantity}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                      Total: ${o.totalPrice.toFixed(2)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {myOrders.length === 0 && (
              <p className="text-muted">You have not placed any orders yet.</p>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="card">
        <h3>AgriMarket</h3>
        <p className="text-muted">
          Discover organic jams, spices and handmade goods directly from farmer entrepreneurs.
        </p>
        <input
          className="input"
          placeholder="Search by crop, product, or value-add type..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginTop: '0.8rem' }}
        />
      </div>

      <div className="card">
        <h3>Featured products</h3>
        <div className="product-list">
          {filtered.map(p => (
            <div key={p.id} className="product-row">
              {p.imageUrl && (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="product-image"
                  onError={e => ((e.currentTarget.style.display = 'none'))}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{p.name}</div>
                <div className="product-meta">
                  {p.baseCrop && `${p.baseCrop} • `}
                  {p.valueAddedType && `${p.valueAddedType} • `}
                  by {p.farmer.fullName}
                </div>
              </div>
              <div className="quantity-picker">
                <button
                  type="button"
                  className="quantity-button"
                  onClick={() => {
                    setQuantities(prev => {
                      const current = prev[p.id] ?? 1;
                      return {
                        ...prev,
                        [p.id]: Math.max(1, current - 1),
                      };
                    });
                  }}
                >
                  −
                </button>
                <span className="quantity-value">{quantities[p.id] ?? 1}</span>
                <button
                  type="button"
                  className="quantity-button"
                  onClick={() => {
                    setQuantities(prev => ({
                      ...prev,
                      [p.id]: (prev[p.id] ?? 1) + 1,
                    }));
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
                <div style={{ fontWeight: 600 }}>${p.pricePerUnit.toFixed(2)}</div>
                <div className="product-meta">per unit</div>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const quantity = quantities[p.id] ?? 1;
                  await createOrder(buyer.id, p.id, quantity);
                  alert("Order placed!");

                  const updatedOrders = await fetchOrders();
                  setOrders(updatedOrders);
                }}
                style={{
                  border: '1px solid rgba(22, 163, 74, 0.3)',
                  borderRadius: 14,
                  background: '#ffffff',
                  color: '#166534',
                  padding: '0.65rem 1rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Buy {quantities[p.id] ?? 1}
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted">No products yet. Ask your network of farmers to publish.</p>
          )}
        </div>
      </div>

    </>
  );
};

export default BuyerDashboard;
