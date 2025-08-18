import "photoswipe/dist/photoswipe.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { getArtwork, reset } from "../features/artwork/artworkSlice";
import CustomImage from "./CustomImage";

const useNumColumns = () => {
  const getCols = (width) => {
    if (width < 640) return 1;
    if (width < 1024) return 2;
    if (width < 1440) return 3;
    return 4;
  };

  const [numCols, setNumCols] = useState(() => getCols(window.innerWidth));

  useEffect(() => {
    const onResize = () => setNumCols(getCols(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return numCols;
};

const ImageGrid = ({ type }) => {
  const dispatch = useDispatch();
  const { artwork, isLoading, isSuccess } = useSelector(
    (state) => state.artwork
  );
  const numCols = useNumColumns();

  useEffect(() => {
    dispatch(getArtwork(type));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, type]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <MoonLoader />
      </div>
    );
  }

  const columns = Array.from({ length: numCols }, () => ({
    items: [],
    height: 0,
  }));

  if (isSuccess) {
    artwork.forEach((art, index) => {
      const shortest = columns.reduce((a, b) => (a.height < b.height ? a : b));
      const aspectRatio =
        art.primaryImageDimensions.height / art.primaryImageDimensions.width;
      shortest.items.push(
        <div key={index} className="mb-4">
          <CustomImage artworkObj={art} />
        </div>
      );
      shortest.height += aspectRatio;
    });
    console.log(columns);
  }

  return (
    <div
      className="w-full px-8 sm:px-16 py-8 grid gap-4"
      style={{ gridTemplateColumns: `repeat(${numCols}, 1fr)` }}
    >
      {columns.map((col, colIdx) => (
        <div key={colIdx}>{col.items}</div>
      ))}
    </div>
  );
};

export default ImageGrid;
