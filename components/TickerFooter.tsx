"use client";

// Repeats enough times to fill any screen width seamlessly
const ITEM = "Seoul Chess Club, where curious minds meet";
const SEPARATOR = "\u00A0\u00A0\u00A0•\u00A0\u00A0\u00A0";
const REPEATED = Array(12).fill(ITEM).join(SEPARATOR) + SEPARATOR;

export default function TickerFooter() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-50 overflow-hidden"
      style={{ height: "40px", background: "#fe9ff7" }}
    >
      <div
        className="flex items-center h-full"
        style={{
          display: "inline-flex",
          whiteSpace: "nowrap",
          animation: "marquee 45s linear infinite",
        }}
      >
        {/* Two identical spans so the loop is seamless (translateX -50%) */}
        <span className="font-corbert text-[14px] tracking-wide" style={{ color: "#2a0d29" }}>
          {REPEATED}
        </span>
        <span className="font-corbert text-[14px] tracking-wide" style={{ color: "#2a0d29" }}>
          {REPEATED}
        </span>
      </div>
    </div>
  );
}
