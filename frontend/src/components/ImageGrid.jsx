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

  return (
    <div className="w-full py-8 px-24">
      <div className="columns-3xs lg:columns-sm gap-8">
        {artwork && artwork.length ? (
          artwork.map((artworkObj) => (
            <div key={artworkObj._id} className="mb-8">
              <CustomImage key={artworkObj._id} artworkObj={artworkObj} />{" "}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p>No artwork available</p>
          </div>
        )}
      </div>
    </div>

    // <div className="w-full p-8">
    //   {/* <div className="columns-2 md:columns-3 gap-8"> */}
    //   {artwork && artwork.length ? (
    //     <Masonry
    //       items={artwork}
    //       columnGutter={8}
    //       columnWidth={172}
    //       overscanBy={5}
    //       render={CustomImage}
    //     />
    //   ) : (
    //     <div className="flex items-center justify-center">
    //       <p>No artwork available</p>
    //     </div>
    //   )}
    //   {/* </div> */}
    // </div>
  );
};

export default ImageGrid;
