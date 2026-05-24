"use client";

import { useEffect } from "react";

// All URLs verified 200 OK
const PHOTOS = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=220&fit=crop&crop=center&q=80&auto=format",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=155&fit=crop&crop=center&q=80&auto=format",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=180&fit=crop&crop=center&q=80&auto=format",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&h=230&fit=crop&crop=center&q=80&auto=format",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=140&fit=crop&crop=center&q=80&auto=format",
  "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=190&fit=crop&crop=center&q=80&auto=format",
  "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=400&h=160&fit=crop&crop=center&q=80&auto=format",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=210&fit=crop&crop=center&q=80&auto=format",
];

const HEIGHTS = [220, 155, 180, 230, 140, 190, 160, 210];

const COLS = [
  [0, 4, 2, 6, 1, 5, 3, 7],
  [3, 1, 5, 0, 7, 2, 6, 4],
  [2, 6, 0, 4, 5, 3, 1, 7],
  [5, 3, 7, 1, 0, 6, 4, 2],
];

const COL_META = [
  { duration: 28, delay: 0,    marginTop: 0 },
  { duration: 34, delay: -12,  marginTop: -80 },
  { duration: 23, delay: -18,  marginTop: -40 },
  { duration: 31, delay: -7,   marginTop: -110 },
];

export default function PhotoWall() {
  useEffect(() => {
    const id = "pw-keyframes";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = "@keyframes pw-scroll{from{transform:translateY(0)}to{transform:translateY(-50%)}}";
      document.head.appendChild(s);
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        gap: 10,
        padding: "0 10px",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Top fade — navbar altı */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
        background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 22%)",
      }} />

      {/* Ana karanlık overlay — fotoğraflar üzerinde okunabilirlik */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "rgba(0,0,0,0.42)",
      }} />

      {/* Columns */}
      {COLS.map((col, ci) => (
        <div
          key={ci}
          className={ci === 3 ? "hidden lg:flex" : "flex"}
          style={{
            flex: 1,
            flexDirection: "column",
            gap: 10,
            marginTop: COL_META[ci].marginTop,
            animation: `pw-scroll ${COL_META[ci].duration}s linear ${COL_META[ci].delay}s infinite`,
            willChange: "transform",
          }}
        >
          {[0, 1].map((rep) =>
            col.map((pi, i) => (
              <div
                key={`${rep}-${i}`}
                style={{
                  flexShrink: 0,
                  borderRadius: 12,
                  width: "100%",
                  height: HEIGHTS[pi],
                  backgroundImage: `url(${PHOTOS[pi]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ))
          )}
        </div>
      ))}
    </div>
  );
}
