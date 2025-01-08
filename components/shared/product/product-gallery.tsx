"use client";

import Image from "next/image";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const ProductGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col gap-5">
      <div className="w-full">
        <Zoom classDialog="custom-zoom">
          <div className="relative h-[500px]">
            <Image
              src={images[selectedImage]}
              alt={"product image"}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </Zoom>
      </div>

      <ul className="flex gap-5">
        {images.map((image, index) => (
          <li
            key={index}
            onClick={() => {
              setSelectedImage(index);
            }}
            onMouseOver={() => {
              setSelectedImage(index);
            }}
            role="option"
            aria-selected={selectedImage === index}
            className={`bg-white rounded-sm overflow-hidden ${
              selectedImage === index
                ? "ring-2 ring-blue-500"
                : "ring-1 ring-gray-300"
            }`}
          >
            <Image
              src={image}
              alt={"product image"}
              width={75}
              height={75}
              className="object-contain aspect-square"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
