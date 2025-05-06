import "photoswipe/dist/photoswipe.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { getArtwork, reset } from "../features/artwork/artworkSlice";
import CustomImage from "./CustomImage";
import EditableImage from "./EditableImage";

const ImageGrid = ({ type }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleClick = () => {
    setIsEditing(!isEditing);
  };

  const { artwork, isLoading, isSuccess } = useSelector(
    (state) => state.artwork
  );
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
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

  const editColumns = [[], [], []];
  const viewColumns = [[], [], []];
  if (isSuccess) {
    artwork.forEach((art, index) => {
      editColumns[index % 3].push(<EditableImage artworkObj={art} />);
      viewColumns[index % 3].push(<CustomImage artworkObj={art} />);
    });
  }

  return (
    <>
      {/* Toggle functionality between visual editor based on user sign-in state */}
      {user && (
        <div className="flex justify-center">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={handleClick}
          >
            {isEditing ? "CANCEL" : "EDIT"}
          </button>
        </div>
      )}
      <div className="w-full grid grid-cols-3 grid-rows-1 gap-4 py-8 px-8 sm:px-16">
        {user && isEditing
          ? editColumns.map((column, colIndex) => (
              <div key={colIndex}>{column}</div>
            ))
          : viewColumns.map((column, colIndex) => (
              <div key={colIndex}>{column}</div>
            ))}
      </div>
    </>
  );
};

export default ImageGrid;
