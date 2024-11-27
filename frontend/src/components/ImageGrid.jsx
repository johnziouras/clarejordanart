import "photoswipe/dist/photoswipe.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { getArtwork, reset } from "../features/artwork/artworkSlice";
// import CustomImage from "./CustomImage";
import CustomImage from "./CustomImage";

// Inspiration for column layout taken from https://github.com/ebenz99/blursco/blob/master/src/components/Grid/Grid.scss
const ImageGrid = ({ type }) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { artwork, isLoading, isSuccess } = useSelector(
    (state) => state.artwork
  );

  const handleLoad = () => {
    setLoading(!loading);
  };
  // let col1,
  //   col2,
  //   col3 = [];

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

  // if (isSuccess) {
  //   col1 = artwork.filter((_, index) => index % 3 === 0);
  //   col2 = artwork.filter((_, index) => index % 3 === 1);
  //   col3 = artwork.filter((_, index) => index % 3 === 2);
  // }

  return (
    <div className="w-full p-8">
      <div className="columns-2 md:columns-3 gap-4">
        {artwork && artwork.length ? (
          artwork.map((artworkObj) => (
            <div className="mb-8">
              <CustomImage artworkObj={artworkObj} />{" "}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p>No artwork available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
