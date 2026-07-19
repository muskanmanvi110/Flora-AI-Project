import React, { useState } from "react";
import axios from "axios";
import { ImageIcon } from "lucide-react";
im

export default function UploadSection({ setResult }) {
  const [image, setImage] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  async function handlePredict() {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = axios.post(`${API_URL}/predict`, formData);

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Prediction failed.");
    }
  }

  return (
    <div className="w-full h-full rounded-md border border-pink-200 bg-[#fcf8f7] p-10">
      {/* Heading */}
      <h2 className="mb-8 text-2xl tracking-[0.35em] text-[#6b5d65] font-mono">
        01 · UPLOAD PHOTOGRAPH
      </h2>

      {/* Image Box */}
      <div className="h-155 w-full overflow-hidden rounded-md border-2 border-pink-200 bg-[#fdf1f4]">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Selected"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-6 rounded-full border-2 border-pink-400 p-4">
              <ImageIcon className="h-10 w-10 text-pink-500" />
            </div>

            <h3 className="text-5xl font-serif text-[#2f2028]">
              No image selected
            </h3>

            <p className="mt-3 text-2xl text-[#75626b]">
              Choose a photograph to get started
            </p>
          </div>
        )}
      </div>

      {/* Bottom Row */}
      <div className="mt-8 flex items-center justify-between">
        <p className="font-mono text-2xl text-[#5b4a54]">
          {image ? image.name : "No file selected"}
        </p>

        <label className="cursor-pointer rounded border-2 border-[#3d2c34] px-8 py-4 text-2xl font-semibold text-[#3d2c34] transition hover:bg-gray-100">
          Choose image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Predict Button */}
      <button
        onClick={handlePredict}
        disabled={!image}
        className={`mt-10 w-full rounded py-6 text-4xl font-serif font-bold text-white transition ${
          image
            ? "bg-pink-700 hover:bg-pink-800 cursor-pointer"
            : "bg-pink-200 cursor-not-allowed"
        }`}
      >
        Identify flower
      </button>
    </div>
  );
}