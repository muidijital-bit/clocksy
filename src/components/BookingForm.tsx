"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services, staff } from "@/lib/data";
import { Check, Clock, Star, ChevronLeft, ChevronRight } from "lucide-react";

const bookingSchema = z.object({
  service: z.string().min(1, "Hizmet seçiniz"),
  staffId: z.string().min(1, "Usta seçiniz"),
  date: z.string().min(1, "Tarih seçiniz"),
  time: z.string().min(1, "Saat seçiniz"),
  name: z.string().min(2, "Adınızı giriniz").max(50),
  phone: z
    .string()
    .regex(/^(\+90|0)?[5][0-9]{9}$/, "Geçerli telefon numarası giriniz"),
  email: z
    .string()
    .email("Geçerli e-posta giriniz")
    .optional()
    .or(z.literal("")),
  notes: z.string().max(300).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
];

function getNextDays(count: number): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("tr-TR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

const stepLabels = ["Hizmet", "Usta", "Tarih & Saat", "Bilgiler"];

export default function BookingForm({ defaultService }: { defaultService?: string }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: defaultService || "",
      staffId: "",
      date: "",
      time: "",
      name: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  const watchedValues = watch();
  const availableDays = getNextDays(14);

  const onSubmit = (_data: BookingFormData) => {
    setSubmitted(true);
  };

  const canProceed = () => {
    if (step === 1) return !!watchedValues.service;
    if (step === 2) return !!watchedValues.staffId;
    if (step === 3) return !!watchedValues.date && !!watchedValues.time;
    return true;
  };

  const selectedService = services.find((s) => s.slug === watchedValues.service);
  const selectedStaff = staff.find((m) => m.id === watchedValues.staffId);

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-green-600" />
        </div>
        <h2
          className="text-2xl font-bold text-[#181613] mb-3"
          style={{ fontFamily: "var(--font-fraunces), serif" }}
        >
          Randevunuz alındı!
        </h2>
        <p className="text-[#5a5750] mb-6">
          Onay SMS ve e-postanıza gönderildi. Randevu günü iyi tıraşlar dileriz 🤝
        </p>
        <div className="bg-[#f4f3ee] border border-[#e6e3da] rounded-2xl p-6 text-left space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-[#908a7e]">Hizmet</span>
            <span className="font-medium text-[#181613]">{selectedService?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#908a7e]">Usta</span>
            <span className="font-medium text-[#181613]">{selectedStaff?.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#908a7e]">Tarih</span>
            <span className="font-medium text-[#181613]">{watchedValues.date && formatDate(watchedValues.date)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#908a7e]">Saat</span>
            <span className="font-medium text-[#181613]">{watchedValues.time}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#908a7e]">Ad</span>
            <span className="font-medium text-[#181613]">{watchedValues.name}</span>
          </div>
          <div className="border-t border-[#e6e3da] pt-3 flex justify-between">
            <span className="text-[#908a7e] text-sm">Toplam</span>
            <span className="font-bold text-[#181613]">{selectedService?.price} ₺</span>
          </div>
        </div>
        <p className="text-sm text-[#908a7e]">
          Ödeme salonda nakit veya kart ile alınır.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center mb-10">
        {stepLabels.map((label, i) => {
          const num = i + 1;
          const isActive = num === step;
          const isDone = num < step;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isDone
                      ? "bg-green-500 text-white"
                      : isActive
                      ? "bg-[#181613] text-[#fafaf7]"
                      : "bg-[#ebe9e2] text-[#908a7e]"
                  }`}
                >
                  {isDone ? <Check size={13} /> : num}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    isActive ? "text-[#181613]" : "text-[#908a7e]"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < stepLabels.length - 1 && (
                <div className="flex-1 h-px bg-[#e6e3da] mx-3" />
              )}
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Service */}
        {step === 1 && (
          <div>
            <h2
              className="text-xl font-bold text-[#181613] mb-5"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Hizmet seçin
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => {
                const isSelected = watchedValues.service === service.slug;
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => setValue("service", service.slug)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-[#181613] bg-[#181613] text-[#fafaf7]"
                        : "border-[#e6e3da] bg-white hover:border-[#d3cfc2]"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-semibold text-sm">{service.name}</p>
                      {service.popular && (
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"}`}>
                          Popüler
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs flex items-center gap-1 ${isSelected ? "text-[#fafaf7]/70" : "text-[#908a7e]"}`}>
                        <Clock size={11} /> {service.duration} dk
                      </span>
                      <span className={`text-xs font-medium ${isSelected ? "text-[#fafaf7]" : "text-[#181613]"}`}>
                        {service.price} ₺
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.service && (
              <p className="text-red-500 text-sm mt-2">{errors.service.message}</p>
            )}
          </div>
        )}

        {/* Step 2: Staff */}
        {step === 2 && (
          <div>
            <h2
              className="text-xl font-bold text-[#181613] mb-5"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Usta seçin
            </h2>
            <div className="space-y-3">
              {/* Farketmez option */}
              <button
                type="button"
                onClick={() => setValue("staffId", "any")}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  watchedValues.staffId === "any"
                    ? "border-[#181613] bg-[#181613] text-[#fafaf7]"
                    : "border-[#e6e3da] bg-white hover:border-[#d3cfc2]"
                }`}
              >
                <p className="font-semibold">Farketmez</p>
                <p className={`text-sm mt-0.5 ${watchedValues.staffId === "any" ? "text-[#fafaf7]/70" : "text-[#908a7e]"}`}>
                  En erken müsait usta ile devam et
                </p>
              </button>

              {staff.map((member) => {
                const isSelected = watchedValues.staffId === member.id;
                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() => setValue("staffId", member.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? "border-[#181613] bg-[#181613] text-[#fafaf7]"
                        : "border-[#e6e3da] bg-white hover:border-[#d3cfc2]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-white/20" : "bg-[#ebe9e2]"}`}>
                        <span className={`font-bold text-sm ${isSelected ? "text-white" : "text-[#5a5750]"}`}>
                          {member.initials}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{member.name}</p>
                        <p className={`text-xs mt-0.5 ${isSelected ? "text-[#fafaf7]/70" : "text-[#908a7e]"}`}>
                          {member.title} · {member.experience}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={12} className={isSelected ? "fill-yellow-300 text-yellow-300" : "fill-amber-400 text-amber-400"} />
                        <span className={`text-xs font-medium ${isSelected ? "text-[#fafaf7]" : "text-[#5a5750]"}`}>
                          {member.rating}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.staffId && (
              <p className="text-red-500 text-sm mt-2">{errors.staffId.message}</p>
            )}
          </div>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <div>
            <h2
              className="text-xl font-bold text-[#181613] mb-5"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Tarih ve saat seçin
            </h2>

            <div className="mb-6">
              <p className="text-sm font-medium text-[#5a5750] mb-3">Tarih</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {availableDays.map((day) => {
                  const isSelected = watchedValues.date === day;
                  const date = new Date(day + "T00:00:00");
                  const weekday = date.toLocaleDateString("tr-TR", { weekday: "short" });
                  const dayNum = date.getDate();
                  const month = date.toLocaleDateString("tr-TR", { month: "short" });
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setValue("date", day)}
                      className={`flex-shrink-0 w-16 py-3 rounded-xl border-2 text-center transition-all ${
                        isSelected
                          ? "border-[#181613] bg-[#181613] text-[#fafaf7]"
                          : "border-[#e6e3da] bg-white hover:border-[#d3cfc2]"
                      }`}
                    >
                      <p className={`text-xs mb-1 ${isSelected ? "text-[#fafaf7]/70" : "text-[#908a7e]"}`}>{weekday}</p>
                      <p className="font-bold text-sm">{dayNum}</p>
                      <p className={`text-xs mt-1 ${isSelected ? "text-[#fafaf7]/70" : "text-[#908a7e]"}`}>{month}</p>
                    </button>
                  );
                })}
              </div>
              {errors.date && (
                <p className="text-red-500 text-sm mt-2">{errors.date.message}</p>
              )}
            </div>

            {watchedValues.date && (
              <div>
                <p className="text-sm font-medium text-[#5a5750] mb-3">Saat</p>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {timeSlots.map((time) => {
                    const isSelected = watchedValues.time === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setValue("time", time)}
                        className={`py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                          isSelected
                            ? "border-[#181613] bg-[#181613] text-[#fafaf7]"
                            : "border-[#e6e3da] bg-white hover:border-[#d3cfc2]"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
                {errors.time && (
                  <p className="text-red-500 text-sm mt-2">{errors.time.message}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 4: Personal info */}
        {step === 4 && (
          <div>
            <h2
              className="text-xl font-bold text-[#181613] mb-5"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Bilgilerinizi girin
            </h2>

            {/* Summary */}
            {selectedService && (
              <div className="bg-[#f4f3ee] border border-[#e6e3da] rounded-xl p-4 mb-6 text-sm">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[#908a7e]">Hizmet</span>
                  <span className="font-medium text-[#181613]">{selectedService.name}</span>
                </div>
                {selectedStaff && (
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[#908a7e]">Usta</span>
                    <span className="font-medium text-[#181613]">{selectedStaff.name}</span>
                  </div>
                )}
                {watchedValues.date && (
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[#908a7e]">Tarih & Saat</span>
                    <span className="font-medium text-[#181613]">{formatDate(watchedValues.date)}, {watchedValues.time}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#e6e3da] pt-2 mt-1">
                  <span className="text-[#908a7e]">Toplam</span>
                  <span className="font-bold text-[#181613]">{selectedService.price} ₺</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5a5750] mb-1.5">
                  Ad Soyad <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Örn: Ahmet Yıldız"
                  className="w-full px-4 py-3 rounded-xl border border-[#e6e3da] bg-white text-[#181613] placeholder:text-[#908a7e] focus:outline-none focus:border-[#181613] transition-colors"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5a5750] mb-1.5">
                  Telefon <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  className="w-full px-4 py-3 rounded-xl border border-[#e6e3da] bg-white text-[#181613] placeholder:text-[#908a7e] focus:outline-none focus:border-[#181613] transition-colors"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5a5750] mb-1.5">
                  E-posta <span className="text-[#908a7e] font-normal">(isteğe bağlı)</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#e6e3da] bg-white text-[#181613] placeholder:text-[#908a7e] focus:outline-none focus:border-[#181613] transition-colors"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5a5750] mb-1.5">
                  Notlar <span className="text-[#908a7e] font-normal">(isteğe bağlı)</span>
                </label>
                <textarea
                  {...register("notes")}
                  rows={3}
                  placeholder="Örn: Sol taraftan daha kısa kesim istiyorum..."
                  className="w-full px-4 py-3 rounded-xl border border-[#e6e3da] bg-white text-[#181613] placeholder:text-[#908a7e] focus:outline-none focus:border-[#181613] transition-colors resize-none"
                />
                {errors.notes && (
                  <p className="text-red-500 text-xs mt-1">{errors.notes.message}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#e6e3da] bg-white text-[#5a5750] text-sm font-medium hover:border-[#d3cfc2] transition-colors"
            >
              <ChevronLeft size={16} /> Geri
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#181613] text-[#fafaf7] text-sm font-medium hover:bg-[#2a2520] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Devam <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#181613] text-[#fafaf7] text-sm font-semibold hover:bg-[#2a2520] transition-colors"
            >
              <Check size={16} /> Randevuyu Onayla
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
