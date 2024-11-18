import { useEffect, useState } from 'react';

interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  imgSrc: string;
  webpSrc?: boolean;
  avifSrc?: boolean;
  className?: string;
}
export const checkImageExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

export const OptimizedImage = ({
  alt,
  imgSrc,
  webpSrc = false,
  avifSrc = false,
  className,
  ...props
}: IProps) => {
  const [fallbackSrc] = useState(`${imgSrc}.png`);
  const [srcSet, setSrcSet] = useState({
    png: ``,
    webp: ``,
    avif: ``,
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

  const handleSourceLoad = async () => {
    const imgSet = { png: '', webp: '', avif: '' };
    const resolutions = ['512', '1024', ''];
    for (const res of resolutions) {
      const suffix = res ? `-${res}` : '';
      const size = res || '2001';

      if (await checkImageExists(`${imgSrc}${suffix}.png`)) {
        imgSet.png += `${imgSrc}${suffix}.png ${size}w, `;
      }
      if (webpSrc && (await checkImageExists(`${imgSrc}${suffix}.webp`))) {
        imgSet.webp += `${imgSrc}${suffix}.webp ${size}w, `;
      }
      if (avifSrc && (await checkImageExists(`${imgSrc}${suffix}.avif`))) {
        imgSet.avif += `${imgSrc}${suffix}.avif ${size}w, `;
      }
    }
    setSrcSet({
      png: imgSet.png.trim().replace(/, $/, ''),
      webp: imgSet.webp.trim().replace(/, $/, ''),
      avif: imgSet.avif.trim().replace(/, $/, ''),
    });
  };
  useEffect(() => {
    handleSourceLoad();
  }, [imgSrc]);

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
        src={fallbackSrc}
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
