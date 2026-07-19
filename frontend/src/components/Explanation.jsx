import React, { useState } from "react";
import axios from "axios";

export default function Explanation({ result }) {
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/explain?flower_name=${result.predicted_class}`
      );
      setExplanation(response.data.explanation);
    } finally {
      setLoading(false);
    }
  }

  const Card = ({ title, icon, children, green = false }) => (
    <div
      className={`mb-6 flex items-start gap-12 rounded-2xl border p-8 shadow-sm ${
        green ? "border-green-100 bg-green-50" : "border-rose-100 bg-white"
      }`}
    >
      <div className="w-64 shrink-0">
        <p className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.35em] text-green-700">
          <span className="text-base">{icon}</span>
          <span>{title}</span>
        </p>
      </div>

      <div className="flex-1 whitespace-pre-line text-xl leading-10 text-gray-800">
        {children}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Full-width Button, matching "Identify flower" style */}
      <button
        onClick={generate}
        disabled={loading}
        className={`mb-8 w-full rounded-2xl py-6 text-4xl font-serif font-bold text-white shadow-lg transition ${
          loading
            ? "bg-pink-200 cursor-not-allowed"
            : "bg-pink-700 hover:bg-pink-800 hover:shadow-xl cursor-pointer"
        }`}
      >
        {loading ? "Loading..." : "Know About This Flower 🌸"}
      </button>

{explanation && (
  <div className="w-full rounded-3xl bg-rose-50 py-8 px-0">
    <Card title="APPEARANCE" icon="◎" green>
      {explanation.appearance}
    </Card>

    <Card title="BLOOMING SEASON" icon="❀">
      {explanation.blooming_season}
    </Card>

    <Card title="CARE TIPS" icon="💧" green>
      {explanation.care_tips}
    </Card>

    <Card title="HOW TO GROW" icon="🌱">
      {explanation.how_to_grow_at_home}
    </Card>

    <Card title="INTERESTING FACT" icon="✨" green>
      <span className="font-serif text-2xl">
        {explanation.interesting_fact}
      </span>
    </Card>
  </div>
)}
    </div>
  );
}