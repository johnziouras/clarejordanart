import "photoswipe/dist/photoswipe.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { getArtwork, reset } from "../features/artwork/artworkSlice";
import CustomImage from "./CustomImage";

const ImageGrid = ({ type }) => {
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

  const columns = [[], [], []];
  if (isSuccess) {
    artwork.forEach((art, index) => {
      columns[index % 3].push(<CustomImage artworkObj={art} />);
    });
  }

  return (
    <div className="w-full grid grid-cols-3 grid-rows-1 gap-4 py-8 px-8 sm:px-16">
      {columns.map((column, colIndex) => (
        <div key={colIndex}>{column}</div>
      ))}
    </div>
  );
};

export default ImageGrid;
