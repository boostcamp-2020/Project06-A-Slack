import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  src: string;
  width: string;
  height: string;
  style?: any;
  errorImage?: string;
}

const Img = styled.img`
  object-fit: cover;
  border-radius: 5px;
`;

const LazyImage: React.FC<Props> = ({ src, width, height, style, errorImage }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoad, setIsLoad] = useState(false);

  function onIntersection(entries: IntersectionObserverEntry[], io: IntersectionObserver) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        setIsLoad(true);
      }
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection, {
      threshold: 0,
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
  }, [imgRef]);

  return (
    <Img
      ref={imgRef}
      src={isLoad ? src : `https://via.placeholder.com/${width}x${height}`}
      width={width}
      height={height}
      style={style}
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = errorImage ?? `https://via.placeholder.com/${width}x${height}`;
      }}
    />
  );
};

LazyImage.defaultProps = {
  style: {},
  errorImage: undefined,
};

export default LazyImage;
