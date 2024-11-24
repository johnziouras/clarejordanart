import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader } from "react-spinners";
import { getArtwork, reset } from "../features/artwork/artworkSlice";

// Inspiration for column layout taken from https://github.com/ebenz99/blursco/blob/master/src/components/Grid/Grid.scss
const ImageGrid = ({ type }) => {
  const dispatch = useDispatch();
  const { artwork, isLoading } = useSelector((state) => state.artwork);

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

  return (
    <div className="w-full pt-8">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {artwork && artwork.length ? (
          artwork.map((artworkObj, index) => (
            <div key={index} className="mx-4 mb-8 px-2 break-inside-avoid">
              <img
                src={artworkObj.primaryImageUrl}
                alt={artworkObj.altText}
                className="w-full h-auto"
              />
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
