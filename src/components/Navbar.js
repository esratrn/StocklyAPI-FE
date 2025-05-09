import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate();

const handleLogout = () => {
  // (Varsa) kullanıcı oturum verilerini temizle
  localStorage.removeItem('token'); // örnek
  // Login sayfasına yönlendir
  navigate('/login');
};
    return (
        <nav style={{ backgroundColor: '#BE123C' }} className=" text-white fixed top-0 w-full z-50">
          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <a className="text-lg font-semibold" href="/#">STOCKLY</a>
            <button
              className="text-white focus:outline-none"
              onClick={() =>
                document
                  .getElementById('offcanvasDarkNavbar')
                .classList.remove('translate-x-full')
                  
              }
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div
            style={{ backgroundColor: '#9F0F34' }}
              id="offcanvasDarkNavbar"
              className="fixed top-0 right-0 w-72 h-full bg-slate-800 text-white transform translate-x-full transition-transform duration-300 ease-in-out shadow-lg"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h5 className="text-lg font-semibold">Control Panel</h5>
                <button
                  className="text-white"
                  onClick={() =>
                    document
                      .getElementById('offcanvasDarkNavbar')
                      .classList.add('translate-x-full')
                  }
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <ul className="flex flex-col gap-2">
                <li>
  <a className="hover:text-gray-300 font-medium flex items-center gap-1" href="/#">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-heart" viewBox="0 0 16 16">
      <path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982"/>
      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
    </svg>
    Home
  </a>
</li>

<li>
  <Link to="/add-product" className="hover:text-gray-300 font-medium flex items-center gap-1" >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
    </svg>
    Add Product
  </Link>
</li>

<li>
  <Link to="/stock-status" className="hover:text-gray-300 font-medium flex items-center gap-1" >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-activity" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2"/>
    </svg>
    Stock Status
  </Link>
</li>

<li>
  <Link to="/sales-orders" className="hover:text-gray-300 font-medium flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box2-heart" viewBox="0 0 16 16">
      <path d="M8 7.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982"/>
      <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zm0 1H7.5v3h-6zM8.5 4V1h3.75l2.25 3zM15 5v10H1V5z"/>
    </svg>
    Sales Orders
  </Link>
</li>

<li>
  <Link to="/purchase-orders" className="hover:text-gray-300 font-medium flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box2-heart-fill" viewBox="0 0 16 16">
      <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM8.5 4h6l.5.667V5H1v-.333L1.5 4h6V1h1zM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
    </svg>
    Purchase Orders
  </Link>
</li>
<li>
  <Link to="/suppliers" className="hover:text-gray-300 font-medium flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
      <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
    </svg>
    Suppliers
  </Link>
</li>

<li>
  <Link to="/warehouses" className="hover:text-gray-300 font-medium flex items-center gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-seam-fill" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003zM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461z"/>
    </svg>
    Warehouses
  </Link>
</li>

                  <li className="group relative">
                    <button className="hover:text-gray-300 font-medium cursor-pointer">Dropdown ▼</button>
                    <ul className="ml-4 mt-1 hidden group-hover:block">
                    <Link to="/notifications">Notifications</Link>
                      <li><a className="hover:text-gray-300 block" href="/#">Profile</a></li>
                      <li><hr className="border-gray-600 my-2" /></li>
                      <li>
  <button
    onClick={handleLogout}
    className="hover:text-gray-300 block w-full text-left"
  >
    Log Out
  </button>
</li>

                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      );
    }
  export default Navbar;
  