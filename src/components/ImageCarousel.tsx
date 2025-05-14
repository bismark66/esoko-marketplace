import { useState, useEffect } from "react";

interface ImageCarouselProps {
  images: string[];
  title: string;
  autoRotate?: boolean;
  rotationInterval?: number;
  containerClassName?: string;
  imageContainerClassName?: string;
}

const ImageCarousel = ({
  images,
  title,
  autoRotate = true,
  rotationInterval = 5000,
  containerClassName = "w-full bg-white rounded-lg shadow-md overflow-hidden group",
  imageContainerClassName = "relative aspect-square w-full",
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToNext = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToIndex = (index: number): void => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoRotate || images.length <= 1) return;

    const interval = setInterval(goToNext, rotationInterval);
    return () => clearInterval(interval);
  }, [currentIndex, images.length, autoRotate, rotationInterval]);

  return (
    <div className={`relative ${containerClassName}`}>
      {" "}
      {/* Added relative here */}
      {/* Image container */}
      <div className={imageContainerClassName}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title} - ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        ))}
      </div>
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-green p-2 rounded-full z-10 hover:bg-black/90 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-green p-2 rounded-full z-10 hover:bg-black/90 transition-colors"
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}
      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#2E8B57] w-6"
                  : "bg-white/80 hover:bg-green"
              }`}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Chevron icons remain the same
const ChevronLeftIcon = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

const ChevronRightIcon = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

export default ImageCarousel;