import { useState } from 'react';

interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  imgSrc: string;
  webpSrc?: boolean;
  avifSrc?: boolean;
  className?: string;
}

export const OptimizedImage = ({
  alt,
  imgSrc,
  webpSrc = false,
  avifSrc = false,
  className,
  ...props
}: IProps) => {
  // const [fallbackSrc] = useState(`${imgSrc}-1024.png`);
  const [srcSet, setSrcSet] = useState({
    png: `${imgSrc}-512.png 512w, ${imgSrc}-1024.png 1024w, ${imgSrc}.png 2001w`,
    webp: `${imgSrc}-512.webp 512w, ${imgSrc}-1024.webp 1024w, ${imgSrc}.webp 2001w`,
    avif: `${imgSrc}-512.avif 512w, ${imgSrc}-1024.avif 1024w, ${imgSrc}.avif 2001w`,
  });
  const name = className || '';
  const handleSourceError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.currentSrc.includes('-512')) {
      setSrcSet({
        png: `${imgSrc}-1024.png 1024w, ${imgSrc}.png 2001w`,
        webp: `${imgSrc}-1024.webp 1024w, ${imgSrc}.webp 2001w`,
        avif: `${imgSrc}-1024.avif 1024w, ${imgSrc}.avif 2001w`,
      });
    } else if (e.currentTarget.currentSrc.includes('-1024')) {
      setSrcSet({
        png: `${imgSrc}.png 2001w`,
        webp: `${imgSrc}.webp 2001w`,
        avif: `${imgSrc}.avif 2001w`,
      });
    }
  };

  return (
    <picture>
      {/* AVIF format for browsers that support it */}
      {avifSrc && (
        <source
          type="image/avif"
          srcSet={srcSet.avif}
          sizes="(max-width: 512px) 50vw, (max-width: 1024px) 50vw, 2001px"
        />
      )}

      {/* WebP format as a fallback if AVIF is not supported */}
      {webpSrc && (
        <source
          type="image/webp"
          srcSet={srcSet.webp}
          sizes="(max-width: 512px) 50vw, (max-width: 1024px) 50vw, 2001px"
        />
      )}

      {/* Fallback to PNG if neither AVIF nor WebP are supported */}
      <img
        className={name}
        // src={`${imgSrc}-1024.png`}
        src={`${imgSrc}.png`}
        srcSet={srcSet.png}
        sizes="(max-width: 512px) 50vw, (max-width: 1024px) 50vw, 2001px"
        onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
          handleSourceError(e)
        }
        alt={alt}
        {...props}
      />
    </picture>
  );
};
