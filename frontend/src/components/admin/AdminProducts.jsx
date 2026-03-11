import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../i18n";
import { FiPlus, FiTrash2, FiEdit2, FiUpload, FiX, FiImage } from "react-icons/fi";

const emptyForm = {
  sku: "",
  name_en: "",
  name_tr: "",
  description_en: "",
  description_tr: "",
  group_slug: "restaurant-equipments",
  image_url: "",
  is_active: true,
};

const AdminProducts = () => {
  const { lang } = useLanguage();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadProducts = async () => {
    try {
      const res = await axios.get(`/api/admin/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("Ürünler yüklenirken hata oluştu");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);
    setUploading(true);

    try {
      const res = await axios.post("/api/admin/upload", data);
      setForm({ ...form, image_url: res.data.imageUrl });
    } catch (err) {
      alert("Görsel yükleme başarısız");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (editingId) {
        await axios.put(`/api/admin/products/${editingId}`, form);
      } else {
        await axios.post(`/api/admin/products`, form);
      }
      setForm(emptyForm);
      setEditingId(null);
      setShowModal(false);
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError("Kaydetme başarısız");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id || p._id);
    setForm({
      sku: p.sku,
      name_en: p.name_en,
      name_tr: p.name_tr,
      description_en: p.description_en || "",
      description_tr: p.description_tr || "",
      group_slug: p.group_slug,
      image_url: p.image_url || "",
      is_active: p.is_active,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(`/api/admin/products/${id}`);
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError("Silme başarısız");
    }
  };

  const openNewModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold tracking-widest uppercase">ÜRÜN YÖNETİMİ</h1>
        <button 
          onClick={openNewModal}
          className="flex items-center gap-2 bg-primary px-4 py-2 text-sm font-semibold rounded hover:opacity-90"
        >
          <FiPlus /> Yeni Ürün Ekle
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-white/60 uppercase tracking-widest text-[10px]">
                <th className="px-6 py-4">Görsel</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Ürün Adı</th>
                <th className="px-6 py-4">Grup</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => (
                <tr key={p.id || p._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-black rounded border border-white/10 overflow-hidden">
                      <img src={p.image_url} alt="" className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{p.sku}</td>
                  <td className="px-6 py-4 font-medium">{p.name_tr}</td>
                  <td className="px-6 py-4 text-white/60">{p.group_slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${p.is_active ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {p.is_active ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => handleEdit(p)} className="text-blue-400 hover:text-blue-300 transition-colors"><FiEdit2 size={18} /></button>
                    <button onClick={() => handleDelete(p.id || p._id)} className="text-red-400 hover:text-red-300 transition-colors"><FiTrash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-10 text-center text-white/40 italic">Henüz ürün eklenmemiş.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold tracking-widest uppercase">{editingId ? 'Ürünü Düzenle' : 'Yeni Ürün'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><FiX size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Side: Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">SKU</label>
                    <input name="sku" value={form.sku} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Ürün Grubu</label>
                    <select name="group_slug" value={form.group_slug} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded focus:border-primary outline-none">
                      <option value="restaurant-equipments text-black">Restaurant Equipments</option>
                      <option value="housekeeping-equipments text-black">Housekeeping Equipments</option>
                      <option value="front-office-equipments text-black">Front Office Equipments</option>
                      <option value="banquet-meeting-equipments text-black">Banquet & Meeting Equipments</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input id="is_active" type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} className="h-4 w-4 bg-primary rounded border-white/10" />
                    <label htmlFor="is_active" className="text-xs uppercase tracking-widest text-white/70">Aktif Mi?</label>
                  </div>
                </div>

                {/* Right Side: Image Upload */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Ürün Görseli</label>
                  <div className="aspect-square bg-white/5 border border-white/10 rounded flex flex-col items-center justify-center relative overflow-hidden">
                    {form.image_url ? (
                      <>
                        <img src={form.image_url} className="w-full h-full object-contain p-4" alt="Preview" />
                        <label className="absolute bottom-2 right-2 p-2 bg-black/60 rounded-full cursor-pointer hover:bg-black text-white border border-white/10">
                          <FiUpload size={14} />
                          <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                        </label>
                      </>
                    ) : (
                      <div className="text-center p-4">
                        <FiImage size={32} className="text-white/20 mx-auto mb-2" />
                        <label className="cursor-pointer text-xs text-primary font-bold hover:underline">
                          Görsel Yükle
                          <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" />
                        </label>
                        {uploading && <p className="text-[10px] text-white/40 mt-2">Yükleniyor...</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Names and Descriptions */}
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Ürün Adı (TR)</label>
                    <input name="name_tr" value={form.name_tr} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Ürün Adı (EN)</label>
                    <input name="name_en" value={form.name_en} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded focus:border-primary outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Açıklama (TR)</label>
                    <textarea name="description_tr" value={form.description_tr} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded h-24 focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Açıklama (EN)</label>
                    <textarea name="description_en" value={form.description_en} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded h-24 focus:border-primary outline-none" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/5">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 text-sm text-white/60 hover:text-white">Vazgeç</button>
                <button type="submit" disabled={loading} className="bg-primary px-8 py-2 text-sm font-bold rounded hover:opacity-90 disabled:opacity-50">
                  {loading ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
