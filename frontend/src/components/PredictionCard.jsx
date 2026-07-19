import React from "react";

export default function PredictionCard({ result }) {
  if (!result) {
    return (
      <div className="w-full h-full rounded-md border border-pink-200 bg-[#fcf8f7] p-10">
        <h2 className="mb-10 font-mono text-2xl tracking-[0.35em] text-[#6b5d65]">
          02 · RESULT
        </h2>

        <div className="flex h-180 flex-col items-center justify-center text-center">
          <div className="mb-8 text-7xl text-pink-200">❀</div>

          <p className="max-w-xl text-[2rem] leading-snug text-[#6f5f67]">
            Upload a photograph and
            <br />
            identify it to see the result here,
            <br />
            laid out like a specimen label.
          </p>
        </div>
      </div>
    );
  }

  const confidence = result.confidence * 100;

  const scores = Object.entries(result.all_confidence_scores).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="w-full rounded-md border border-pink-200 bg-[#fcf8f7] p-10">
      {/* Heading */}
      <h2 className="mb-10 font-mono text-2xl tracking-[0.35em] text-[#6b5d65]">
        02 · RESULT
      </h2>

      {/* Prediction */}
      <p className="mb-2 text-xl uppercase tracking-[0.35em] text-pink-500">
        IDENTIFIED AS
      </p>

      <h1 className="mb-10 text-7xl font-serif text-[#2d2028]">
        {result.predicted_class}
      </h1>

      <hr className="mb-10 border-pink-200" />

      {/* Confidence */}
      <div className="mb-4 flex items-end justify-between">
        <h3 className="text-3xl text-[#6f5f67]">
          Confidence
        </h3>

        <span className="text-6xl font-bold text-pink-700">
          {confidence.toFixed(1)}%
        </span>
      </div>

      {/* Main Progress Bar */}
      <div className="mb-12 h-3 w-full rounded-full bg-[#d9ddd2]">
        <div
          className="h-3 rounded-full bg-pink-700 transition-all duration-500"
          style={{ width: `${confidence}%` }}
        />
      </div>

      {/* All Confidence Scores */}
      <div className="space-y-5">
        {scores.map(([flower, score], index) => (
          <div key={flower}>
            <div className="flex items-center justify-between">
              {/* Left */}
              <div className="flex items-center gap-5">
                <span className="w-10 font-mono text-2xl text-[#6b5d65]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="text-3xl text-[#2d2028]">
                  {flower}
                </span>
              </div>

              {/* Right */}
              <div className="flex items-center gap-5">
                <div className="h-2 w-36 rounded-full bg-[#d9ddd2]">
                  <div
                    className="h-2 rounded-full bg-pink-600 transition-all duration-500"
                    style={{
                      width: `${score * 100}%`,
                    }}
                  />
                </div>

                <span className="w-24 text-right text-2xl text-[#6b5d65]">
                  {(score * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {index !== scores.length - 1 && (
              <hr className="mt-4 border-pink-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}