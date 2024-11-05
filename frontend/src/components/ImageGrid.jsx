import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtwork, reset } from "../features/artwork/artworkSlice";
import Spinner from "./Spinner";

// Inspiration for column layout taken from https://github.com/ebenz99/blursco/blob/master/src/components/Grid/Grid.scss
const ImageGrid = ({ path }) => {
  const dispatch = useDispatch();
  const { artwork, isLoading, isError, message } = useSelector(
    (state) => state.artwork
  );

  useEffect(() => {
    dispatch(getArtwork());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const columns = [[], [], []];
  if (artwork && artwork.length) {
    artwork.forEach((painting, index) => {
      columns[index % 3].push(
        <div key={index} className="w-full my-4 px-2">
          <img src={painting.url} alt="Painting" className="w-full h-auto" />
        </div>
      );
    });
  }

  return (
    <div className="w-full flex flex-wrap md:justify-between sm:justify-center pt-8 md:gap-4 gap-0">
      {columns.map((column, colIndex) => (
        <div className="flex-1 md:mx-4" key={colIndex}>
          {column}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
