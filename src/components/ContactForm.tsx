"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-10">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Check size={22} className="text-green-600" />
        </div>
        <h3 className="font-bold text-[#181613] mb-2">Mesajınız alındı!</h3>
        <p className="text-sm text-[#5a5750]">En kısa sürede size dönüş yapacağız.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-[#5a5750] mb-1.5">
          Ad Soyad <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Adınız Soyadınız"
          className="w-full px-4 py-3 rounded-xl border border-[#e6e3da] bg-[#fafaf7] text-[#181613] placeholder:text-[#908a7e] focus:outline-none focus:border-[#181613] transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#5a5750] mb-1.5">
          E-posta <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="ornek@email.com"
          className="w-full px-4 py-3 rounded-xl border border-[#e6e3da] bg-[#fafaf7] text-[#181613] placeholder:text-[#908a7e] focus:outline-none focus:border-[#181613] transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#5a5750] mb-1.5">
          Konu <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          placeholder="Konunuzu yazın"
          className="w-full px-4 py-3 rounded-xl border border-[#e6e3da] bg-[#fafaf7] text-[#181613] placeholder:text-[#908a7e] focus:outline-none focus:border-[#181613] transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[#5a5750] mb-1.5">
          Mesaj <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Mesajınızı buraya yazın..."
          className="w-full px-4 py-3 rounded-xl border border-[#e6e3da] bg-[#fafaf7] text-[#181613] placeholder:text-[#908a7e] focus:outline-none focus:border-[#181613] transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-[#181613] text-[#fafaf7] font-semibold text-sm hover:bg-[#2a2520] transition-colors"
      >
        Gönder
      </button>
    </form>
  );
}
