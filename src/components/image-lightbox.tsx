"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  quality?: number;
  priority?: boolean;
  fillHeight?: boolean;
};

export function ImageLightbox({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  imageClassName,
  quality = 72,
  priority = false,
  fillHeight = false,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button type="button" className={`zoom-trigger ${className || ""}`} onClick={() => setOpen(true)}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          quality={quality}
          className={imageClassName}
          priority={priority}
          style={{ width: "100%", height: fillHeight ? "100%" : "auto" }}
        />
      </button>

      {open ? (
        <div className="lightbox-backdrop" role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
          <button type="button" className="lightbox-close" onClick={() => setOpen(false)}>
            Close
          </button>
          <div className="lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1200}
              sizes="100vw"
              quality={90}
              className="lightbox-image"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
