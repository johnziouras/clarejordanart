import "photoswipe/dist/photoswipe.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { getArtwork, reset } from "../features/artwork/artworkSlice";
import CustomImage from "./CustomImage";

const ImageGrid = ({ type }) => {
  const [numCols, setNumCols] = useState(3);

  // TODO: remove magic numbers, create constants file
  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 640) setNumCols(2);
      else if (window.innerWidth < 1024) setNumCols(3);
      else setNumCols(4);
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  const dispatch = useDispatch();
  const { artwork, isLoading, isSuccess } = useSelector(
    (state) => state.artwork
  );

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

  const columns = Array.from({ length: numCols }, () => []);
  if (isSuccess) {
    artwork.forEach((art, index) => {
      columns[index % numCols].push(<CustomImage artworkObj={art} />);
    });
  }

  return (
    <div className="w-full flex gap-8 py-8 sm:px-8">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex-1 flex flex-col gap-4">
          {column}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
