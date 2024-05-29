import { ImgHTMLAttributes, useEffect, useState } from 'react';

interface Props extends ImgHTMLAttributes<any> {
  fallback: string;
  src: string;
}

export default function ImgWithFallback({ fallback, src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const onError = (e: any) => {
    e.target.onerror = null;
    setImgSrc(fallback);
  };

  return <img src={imgSrc ? imgSrc : fallback} onError={onError} {...props} />;
}
