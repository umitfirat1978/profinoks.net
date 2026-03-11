import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { 
  FiPackage, 
  FiImage, 
  FiMessageSquare, 
  FiLogOut, 
  FiSettings,
  FiUsers
} from "react-icons/fi";

const AdminLayout = ({ children }) => {
  const { logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    { title: "Ürünler", icon: <FiPackage />, path: "/admin/products" },
    { title: "Slider", icon: <FiImage />, path: "/admin/settings/slider" },
    { title: "Ürün Grupları", icon: <FiSettings />, path: "/admin/settings/groups" },
    { title: "Referanslar", icon: <FiUsers />, path: "/admin/settings/references" },
    { title: "Referans Mektupları", icon: <FiMessageSquare />, path: "/admin/settings/testimonials" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black p-6">
        <div className="mb-8 pl-4">
          <h2 className="text-xl font-bold tracking-widest text-primary">ADMIN PANEL</h2>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="mt-8 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-400 transition-all hover:bg-red-500/10 hover:text-red-300"
          >
            <FiLogOut />
            Çıkış Yap
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-10">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
