"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  html: string;
};

type ActiveImage = {
  src: string;
  alt: string;
};

export function ArticleBody({ html }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);

  const normalizedHtml = useMemo(
    () =>
      html
        .replaceAll('src="https://www.peaq.ch/assets/', 'src="/assets/')
        .replaceAll('src="https://peaq.ch/assets/', 'src="/assets/'),
    [html],
  );

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const clickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!(target instanceof HTMLImageElement)) return;
      const source = target.getAttribute("src");
      if (!source) return;
      event.preventDefault();
      setActiveImage({
        src: source,
        alt: target.getAttribute("alt") || "Article image",
      });
    };

    const images = root.querySelectorAll("img");
    images.forEach((image) => {
      image.loading = "lazy";
      image.classList.add("article-inline-image");
      image.setAttribute("decoding", "async");
    });

    root.addEventListener("click", clickHandler);
    return () => root.removeEventListener("click", clickHandler);
  }, [normalizedHtml]);

  useEffect(() => {
    if (!activeImage) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [activeImage]);

  return (
    <>
      <div ref={containerRef} className="article-body" dangerouslySetInnerHTML={{ __html: normalizedHtml }} />

      {activeImage ? (
        <div className="lightbox-backdrop" role="dialog" aria-modal="true" onClick={() => setActiveImage(null)}>
          <button type="button" className="lightbox-close" onClick={() => setActiveImage(null)}>
            Close
          </button>
          <div className="lightbox-frame" onClick={(event) => event.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeImage.src} alt={activeImage.alt} className="lightbox-image" />
          </div>
        </div>
      ) : null}
    </>
  );
}
