import "photoswipe/dist/photoswipe.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { getArtwork, reset } from "../features/artwork/artworkSlice";
import CustomImage from "./CustomImage";

const ImageGrid = ({ type }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [numCols, setNumCols] = useState(3);
  const [columns, setColumns] = useState([]);
  const [originalColumns, setOriginalColumns] = useState([]); // save original order

  const dispatch = useDispatch();
  const { artwork, isLoading, isSuccess } = useSelector(
    (state) => state.artwork
  );
  const { user } = useSelector((state) => state.auth);

  const handleClick = () => {
    if (isEditing) {
      setColumns(originalColumns.map((col) => [...col]));
    }
    setIsEditing(!isEditing);
  };

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

  useEffect(() => {
    dispatch(getArtwork(type));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, type]);

  useEffect(() => {
    if (isSuccess && artwork.length > 0) {
      const newColumns = Array.from({ length: numCols }, () => []);
      artwork.forEach((art, index) => {
        newColumns[index % numCols].push(art);
      });
      setColumns(newColumns);
      setOriginalColumns(newColumns); // save baseline
    }
  }, [isSuccess, artwork, numCols]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <MoonLoader />
      </div>
    );
  }

  const moveImage = (colIndex, imgIndex, direction) => {
    const newColumns = columns.map((col) => [...col]);
    const [movedImg] = newColumns[colIndex].splice(imgIndex, 1);

    switch (direction) {
      case "up":
        if (imgIndex > 0) {
          newColumns[colIndex].splice(imgIndex - 1, 0, movedImg);
        } else {
          newColumns[colIndex].unshift(movedImg);
        }
        break;

      case "down":
        if (imgIndex < newColumns[colIndex].length) {
          newColumns[colIndex].splice(imgIndex + 1, 0, movedImg);
        } else {
          newColumns[colIndex].push(movedImg);
        }
        break;

      case "left":
        if (colIndex > 0) {
          const targetCol = newColumns[colIndex - 1];
          if (imgIndex < targetCol.length) {
            const temp = targetCol[imgIndex];
            targetCol[imgIndex] = movedImg;
            newColumns[colIndex].splice(imgIndex, 0, temp);
          } else {
            targetCol.push(movedImg);
          }
        } else {
          newColumns[colIndex].splice(imgIndex, 0, movedImg);
        }
        break;

      case "right":
        if (colIndex < newColumns.length - 1) {
          const targetCol = newColumns[colIndex + 1];
          if (imgIndex < targetCol.length) {
            const temp = targetCol[imgIndex];
            targetCol[imgIndex] = movedImg;
            newColumns[colIndex].splice(imgIndex, 0, temp);
          } else {
            targetCol.push(movedImg);
          }
        } else {
          newColumns[colIndex].splice(imgIndex, 0, movedImg);
        }
        break;

      default:
        break;
    }

    setColumns(newColumns);
  };

  return (
    <>
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
      <div className="w-full flex gap-8 py-8 sm:px-8">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 flex flex-col gap-4">
            {column.map((art, imgIndex) => (
              <CustomImage
                key={art._id}
                artworkObj={art}
                isEditing={isEditing}
                onMove={(dir) => moveImage(colIndex, imgIndex, dir)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGrid;
