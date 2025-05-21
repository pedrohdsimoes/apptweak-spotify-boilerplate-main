import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import Loading from "../Loading";

interface InfiniteLoaderProps {
  onVisible: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const InfiniteLoader: React.FC<InfiniteLoaderProps> = ({ onVisible, isLoading, hasMore }) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = loaderRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          onVisible();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onVisible, hasMore, isLoading]);

  if (!hasMore) return null;

  return (
    <Box ref={loaderRef} sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      {isLoading ? (
        <Loading size={30} />
      ) : (
        <Box sx={{ height: 30, display: "flex", alignItems: "center" }}>Scroll for more</Box>
      )}
    </Box>
  );
};

export default InfiniteLoader;
