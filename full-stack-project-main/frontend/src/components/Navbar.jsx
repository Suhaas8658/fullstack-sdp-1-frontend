import React from 'react';

const Navbar = ({ currentUser, onLogout, onShowCart, onShowInventory, isCartActive, isInventoryActive }) => {
  return (
    <header style={{ padding: '1rem 1.5rem 0.5rem' }}>
      <div
        style={{
          maxWidth: 1120,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span className="chip">
            <span className="chip-dot" />
            AgroValue
          </span>
          <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
            Turning crops into global-ready products
          </span>
        </div>
        {currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {currentUser.role === 'FARMER' && (
              <button
                type="button"
                className={`button secondary cart-button${isInventoryActive ? ' active' : ''}`}
                onClick={onShowInventory}
              >
                Products
              </button>
            )}
            <button
              type="button"
              className={`button secondary cart-button${isCartActive ? ' active' : ''}`}
              onClick={onShowCart}
            >
              🛒 Cart
            </button>
            <span className="tag">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: '#22c55e'
                }}
              />
              {currentUser.role.toLowerCase()}
            </span>
            <span style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>
              {currentUser.fullName}
            </span>
            <button className="button secondary" onClick={onLogout}>
              Sign out
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
