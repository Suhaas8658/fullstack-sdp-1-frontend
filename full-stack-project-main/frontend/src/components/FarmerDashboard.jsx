import React, { useEffect, useState } from 'react';
import { createProduct, fetchProducts, fetchOrders } from '../api';

const FarmerDashboard = ({ farmer, view, onBack, onShowCart }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState('');
  const [baseCrop, setBaseCrop] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState(5);
  const [qty, setQty] = useState(100);
  const [editPrices, setEditPrices] = useState({});

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);

    fetchOrders().then(data => {
      const farmerOrders = data.filter(
        o => o.product && o.product.farmer && o.product.farmer.id === farmer.id
      );
      setOrders(farmerOrders);
    });
  }, [farmer.id]);

  if (view === 'inventory') {
    return (
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3>Inventory</h3>
            <p className="text-muted">View all your products.</p>
          </div>
          <button className="button secondary" type="button" onClick={onBack}>
            Home
          </button>
        </div>

        <div className="product-list" style={{ marginTop: '0.8rem' }}>
          {products
            .filter(p => p.farmer && p.farmer.id === farmer.id)
            .map(p => (
              <div key={p.id} className="product-row">
                <div>{p.name}</div>
                <div>{p.availableQuantity} units</div>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter your price"
                  value={editPrices[p.id] ?? p.pricePerUnit}
                  onChange={e => setEditPrices(prev => ({ ...prev, [p.id]: Number(e.target.value) }))}
                  style={{ width: '120px', padding: '0.5rem' }}
                />
              </div>
            ))}

          {products.filter(p => p.farmer && p.farmer.id === farmer.id).length === 0 && (
            <p className="text-muted">No products yet</p>
          )}
        </div>
      </div>
    );
  }

  if (view === 'cart') {
    return (
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3>Cart / Order history</h3>
            <p className="text-muted">Review all orders placed for your farm.</p>
          </div>
          <button className="button secondary" type="button" onClick={onBack}>
            Home
          </button>
        </div>

        <div style={{ display: 'grid', gap: '0.6rem', marginTop: '0.8rem' }}>
          {orders.map(o => (
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
                    Buyer: {o.buyer.fullName} • Qty {o.quantity}
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
          {orders.length === 0 && (
            <p className="text-muted">No orders yet for your products.</p>
          )}
        </div>
      </div>
    );
  }

  const handleCreate = async e => {
    e.preventDefault();

    await createProduct(farmer.id, {
      name,
      baseCrop,
      valueAddedType: type,
      description,
      imageUrl,
      pricePerUnit,
      availableQuantity: qty
    });

    const updated = await fetchProducts();
    setProducts(updated);

    setName('');
    setBaseCrop('');
    setType('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <>
      <div className="card" style={{ marginBottom: '0.8rem' }}>
        <div>
          <h3>GreenField Farm</h3>
          <p className="text-muted">
            {farmer.location ? `Verified seller • ${farmer.location}` : 'Verified seller • Your region'}
          </p>
        </div>

        <div className="stat-grid" style={{ marginTop: '0.6rem' }}>
          <div className="stat-card">
            <div className="stat-label">Active products</div>
            <div className="stat-value">
              {products.filter(p => p.farmer && p.farmer.id === farmer.id).length}
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Recent orders</div>
            <div className="stat-value">{orders.length}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Add new product</h3>

        <form onSubmit={handleCreate} style={{ display: 'grid', gap: '0.6rem' }}>
          <input
            className="input"
            placeholder="Product name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <input
            className="input"
            placeholder="Base crop"
            value={baseCrop}
            onChange={e => setBaseCrop(e.target.value)}
          />

          <input
            className="input"
            placeholder="Type"
            value={type}
            onChange={e => setType(e.target.value)}
          />

          <textarea
            className="textarea"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            className="input"
            placeholder="Image URL"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            required
          />

          <input
            type="number"
            className="input"
            placeholder="Enter your price"
            value={pricePerUnit}
            onChange={e => setPricePerUnit((e.target.value))}
            required
          />

          <input
            type="number"
            inputMode="numeric"
            className="input"
            placeholder="Quantity (e.g. 90)"
            value={qty}
            onChange={e => setQty((e.target.value))}
            required
          />

          <button className="button" type="submit">
            Publish product
          </button>
        </form>
      </div>

    </>
  );
};

export default FarmerDashboard;
