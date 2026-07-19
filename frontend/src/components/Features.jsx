import React from "react";
import { Camera, Heart, FileText, BookOpen } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Camera size={38} />,
      title: "Snap or upload a photo",
    },
    {
      icon: <Heart size={38} />,
      title: "Model scores 8 species",
    },
    {
      icon: <FileText size={38} />,
      title: "View confidence breakdown",
    },
    {
      icon: <BookOpen size={38} />,
      title: "Learn care, growth & flower facts",
    },
  ];

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`
              h-72
              flex flex-col
              justify-center
              items-center
              text-center
              px-8
              ${
                index !== features.length - 1
                  ? "lg:border-r border-pink-200"
                  : ""
              }
            `}
          >
            <div className="text-pink-500 mb-6">
              {feature.icon}
            </div>

            <p className="text-[#6B2748] text-2xl font-medium max-w-57.5 leading-snug">
              {feature.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}