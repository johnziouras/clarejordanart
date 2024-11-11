import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtwork, reset } from "../features/artwork/artworkSlice";
import Spinner from "./Spinner";

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
    return <Spinner />;
  }

  // const columns = [[], [], []];
  // console.log(artwork);
  // if (artwork && artwork.length) {
  //   artwork.forEach((artworkObj, index) => {
  //     columns[index % 3].push(
  //       <div key={index} className="w-full my-4 px-2">
  //         <img
  //           src={artworkObj.primaryImageUrl}
  //           alt={artworkObj.altText}
  //           className="w-full h-auto"
  //         />
  //       </div>
  //     );
  //   });
  // }

  // return (
  //   <div className="w-full flex flex-wrap gap-4 justify-center pt-8">
  //     {columns.map((column, colIndex) => (
  //       <div className="flex-1 w-full sm:w-1/2 md:w-1/3 px-2" key={colIndex}>
  //         {column}
  //       </div>
  //     ))}
  //   </div>
  // );

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
          <p>No artwork available</p>
        )}
      </div>
    </div>
  );
};

export default ImageGrid;
