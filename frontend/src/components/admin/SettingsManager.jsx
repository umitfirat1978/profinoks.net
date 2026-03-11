import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FiPlus, FiTrash2, FiEdit2, FiUpload, FiX } from "react-icons/fi";

const SettingsManager = () => {
  const { collection } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [collection]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/settings/${collection}`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);
    setUploading(true);

    try {
      const res = await axios.post("/api/admin/upload", data);
      setFormData({ ...formData, image_url: res.data.imageUrl });
    } catch (err) {
      alert("Yükleme başarısız");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`/api/admin/settings/${collection}/${editingItem._id}`, formData);
      } else {
        await axios.post(`/api/admin/settings/${collection}`, formData);
      }
      setShowModal(false);
      fetchItems();
    } catch (err) {
      alert("İşlem başarısız");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(`/api/admin/settings/${collection}/${id}`);
      fetchItems();
    } catch (err) {
      alert("Silme başarısız");
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setFormData(item || getInitialFormData());
    setShowModal(true);
  };

  const getInitialFormData = () => {
    switch (collection) {
      case 'slider': return { title: '', image_url: '' };
      case 'groups': return { title: '', slug: '', image_url: '', description: '' };
      case 'references': return { image_url: '' };
      case 'testimonials': return { hotel: '', person: '', role: '', quote: '', image_url: '' };
      default: return {};
    }
  };

  const renderFormFields = () => {
    switch (collection) {
      case 'slider':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Başlık</label>
              <input name="title" value={formData.title || ''} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded" />
            </div>
          </div>
        );
      case 'groups':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Başlık</label>
              <input name="title" value={formData.title || ''} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Slug</label>
              <input name="slug" value={formData.slug || ''} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Açıklama</label>
              <textarea name="description" value={formData.description || ''} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded h-24" />
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Otel Adı</label>
                <input name="hotel" value={formData.hotel || ''} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Yetkili</label>
                <input name="person" value={formData.person || ''} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Pozisyon</label>
              <input name="role" value={formData.role || ''} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-1">Yorum</label>
              <textarea name="quote" value={formData.quote || ''} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 p-2 text-sm rounded h-24" />
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold tracking-widest uppercase">
          {collection === 'slider' ? 'Slider Yönetimi' : 
           collection === 'groups' ? 'Ürün Grupları' : 
           collection === 'references' ? 'Referanslar' : 'Referans Mektupları'}
        </h1>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-primary px-4 py-2 text-sm font-semibold rounded hover:opacity-90"
        >
          <FiPlus /> Yeni Ekle
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-20 text-white/40">Yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item._id} className="bg-white/5 border border-white/10 rounded-lg overflow-hidden flex flex-col">
              <div className="aspect-video bg-black/40 relative">
                <img src={item.image_url} alt="" className="w-full h-full object-contain p-2" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => openModal(item)} className="p-2 bg-black/60 rounded-full hover:bg-black text-blue-400 border border-white/10"><FiEdit2 /></button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 bg-black/60 rounded-full hover:bg-black text-red-400 border border-white/10"><FiTrash2 /></button>
                </div>
              </div>
              <div className="p-4 flex-1">
                {collection === 'slider' && <h3 className="font-semibold">{item.title}</h3>}
                {collection === 'groups' && <h3 className="font-semibold">{item.title}</h3>}
                {collection === 'testimonials' && (
                  <>
                    <h3 className="font-semibold text-primary">{item.hotel}</h3>
                    <p className="text-xs text-white/60 mt-1">{item.person} - {item.role}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-[#111] border border-white/10 rounded-xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h2 className="text-xl font-bold tracking-widest uppercase">{editingItem ? 'Düzenle' : 'Yeni Ekle'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><FiX size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Görsel</label>
                <div className="flex gap-4 items-start">
                  <div className="w-32 h-20 bg-white/5 border border-white/10 rounded flex items-center justify-center overflow-hidden">
                    {formData.image_url ? (
                      <img src={formData.image_url} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <FiImage size={24} className="text-white/20" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-2 cursor-pointer bg-white/5 border border-white/10 px-4 py-2 rounded text-xs hover:bg-white/10">
                      <FiUpload /> {uploading ? 'Yükleniyor...' : 'Dosya Seç'}
                      <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*" disabled={uploading} />
                    </label>
                    <p className="text-[10px] text-white/40 mt-2 italic">Önerilen format: JPG/PNG, Maksimum 2MB</p>
                  </div>
                </div>
              </div>

              {renderFormFields()}

              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/5">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 text-sm text-white/60 hover:text-white">İptal</button>
                <button type="submit" className="bg-primary px-8 py-2 text-sm font-bold rounded hover:opacity-90">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsManager;
