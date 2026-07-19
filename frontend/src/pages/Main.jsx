import UploadSection from "../components/UploadSection";
import PredictionCard from "../components/PredictionCard";
import React, { useState } from "react";
import Explanation from "../components/Explanation";

export default function Main() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen w-full bg-[#fdf1f2] px-10 py-10">
      {/* Header */}
      <div className="mb-10 flex w-full items-start justify-between border-b border-pink-200 pb-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl text-pink-600">✿</span>
          <div>
            <h1 className="font-serif text-4xl text-[#2d2028]">
              Flora<span className="text-pink-600">AI</span>
            </h1>
            <p className="mt-1 text-lg text-[#75626b]">
              Flower identification, from a single photograph
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
        <UploadSection setResult={setResult} />
        <PredictionCard result={result} />
      </div>

      {/* Explanation — same padded container as everything above */}
      {result && (
        <div className="mt-8 w-full">
          <Explanation result={result} />
        </div>
      )}
    </div>
  );
}