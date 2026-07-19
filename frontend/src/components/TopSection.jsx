import React from "react";
import { Sparkles, Flower2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopSection() {
  const navigate = useNavigate();
  
  return (
    <section className="bg-[#FDF2F6] py-28 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-pink-200 rounded-full px-6 py-2 text-pink-500 text-sm font-semibold tracking-[0.2em] uppercase bg-white/40">
          <Sparkles size={16} />
          <span>Flower Identification Tool</span>
        </div>

        {/* Heading */}
        <h1 className="mt-10 text-6xl md:text-8xl font-bold text-[#6B2748] font-serif">
          Flora AI
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-xl md:text-2xl leading-relaxed text-[#B35B86]">
          Snap a photo of your favorite bloom and let the model guess
          which of eight flowers it is, with a full breakdown of every
          possibility.
        </p>

        {/* Button */}
        <button className="mt-14 inline-flex items-center gap-3 bg-[#E55297] hover:bg-[#D94288] text-white font-semibold text-xl px-10 py-5 rounded-full shadow-lg transition duration-300 hover:scale-105"
        onClick={() => navigate('/main')}>
          <Flower2 size={24} />
          Identify a flower
        </button>

      </div>
    </section>
  );
}
