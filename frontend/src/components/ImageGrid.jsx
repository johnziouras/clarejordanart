import "photoswipe/dist/photoswipe.css";
import { useEffect } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
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
    <div className="w-full pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {artwork && artwork.length ? (
        artwork.map((artworkObj) => (
          <Gallery withCaption>
            <Item
              key={artworkObj._id}
              original={artworkObj.primaryImageUrl}
              thumbnail={artworkObj.primaryImageUrl}
              width={800}
              height={800}
            >
              {({ ref, open }) => (
                <img
                  ref={ref}
                  onClick={open}
                  src={artworkObj.primaryImageUrl}
                  alt={artworkObj.altText}
                  className="w-full h-auto object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
              )}
            </Item>
          </Gallery>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <p>No artwork available</p>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
