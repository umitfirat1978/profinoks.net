import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { t } from "../../i18n";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
  const { logout } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    try {
      const res = await axios.get(`${API}/admin/products`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (editingId) {
        await axios.patch(`${API}/admin/products/${editingId}`, form);
      } else {
        await axios.post(`${API}/admin/products`, form);
      }
      setForm(emptyForm);
      setEditingId(null);
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
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
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API}/admin/products/${id}`);
      await loadProducts();
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const labelForName = lang === "tr" ? "name_tr" : "name_en";

  return (
    <div className="mt-[140px] bg-[#050505] pb-16 pt-10 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-[0.18em] uppercase">
            {t(lang, "admin.productsHeading")}
          </h1>
          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white/80 hover:bg-white/10"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-[2fr,3fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-md border border-white/10 bg-black/70 p-4 text-sm"
          >
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
              {editingId ? "Edit product" : t(lang, "admin.newProduct")}
            </h2>

            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-white/60">
                  SKU
                </label>
                <input
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-white/60">
                  Name (EN)
                </label>
                <input
                  name="name_en"
                  value={form.name_en}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-white/60">
                  Name (TR)
                </label>
                <input
                  name="name_tr"
                  value={form.name_tr}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-white/60">
                  Description (EN)
                </label>
                <textarea
                  name="description_en"
                  value={form.description_en}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-white/60">
                  Description (TR)
                </label>
                <textarea
                  name="description_tr"
                  value={form.description_tr}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-white/60">
                  Group slug
                </label>
                <select
                  name="group_slug"
                  value={form.group_slug}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm"
                >
                  <option value="restaurant-equipments">restaurant-equipments</option>
                  <option value="housekeeping-equipments">housekeeping-equipments</option>
                  <option value="front-office-equipments">front-office-equipments</option>
                  <option value="banquet-meeting-equipments">banquet-meeting-equipments</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-white/60">
                  Image URL
                </label>
                <input
                  name="image_url"
                  value={form.image_url}
                  onChange={handleChange}
                  className="w-full rounded-md border border-white/20 bg-black/40 px-3 py-1.5 text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="is_active"
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                  className="h-3 w-3"
                />
                <label
                  htmlFor="is_active"
                  className="text-[11px] uppercase tracking-[0.14em] text-white/70"
                >
                  Active
                </label>
              </div>

              {error && (
                <div className="rounded-md border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {error}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-60"
                >
                  {t(lang, "admin.save")}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-md border border-white/20 px-4 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/5"
                  >
                    {t(lang, "admin.cancel")}
                  </button>
                )}
              </div>
            </div>
          </form>

          <div className="rounded-md border border-white/10 bg-black/70 p-4 text-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                Current products
              </h2>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.14em] text-white/60">
                    <th className="p-2 text-left">SKU</th>
                    <th className="p-2 text-left">{labelForName}</th>
                    <th className="p-2 text-left">Group</th>
                    <th className="p-2 text-left">Active</th>
                    <th className="p-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-2 align-top">{p.sku}</td>
                      <td className="p-2 align-top">
                        {lang === "tr" ? p.name_tr : p.name_en}
                      </td>
                      <td className="p-2 align-top">{p.group_slug}</td>
                      <td className="p-2 align-top">
                        {p.is_active ? "Yes" : "No"}
                      </td>
                      <td className="p-2 align-top text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(p)}
                          className="rounded-md border border-white/20 px-2 py-0.5 text-[11px] text-white/80 hover:bg-white/10"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="rounded-md border border-red-500/60 px-2 py-0.5 text-[11px] text-red-300 hover:bg-red-500/10"
                        >
                          {t(lang, "admin.delete")}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-4 text-center text-[11px] text-white/50"
                      >
                        No products yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
