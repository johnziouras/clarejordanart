import { useState } from "react";

// Inspiration for column layout taken from https://github.com/ebenz99/blursco/blob/master/src/components/Grid/Grid.scss
const ImageGrid = ({ path }) => {
  const [paintings, setPaintings] = useState([]);

  //   const fetchPaintings = async () => {
  //     try {
  //       const imagesList = await getImages(db, path);
  //       setPaintings(imagesList);
  //     } catch (error) {
  //       console.error("Error fetching paintings:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchPaintings();
  //   }, []);

  if (paintings.length === 0) {
    return <p>Loading paintings...</p>;
  }

  const columns = [[], [], []];
  paintings.forEach((painting, index) => {
    columns[index % 3].push(
      <div key={index} className="w-full my-4 px-2">
        <img src={painting.url} alt="Painting" className="w-full h-auto" />
      </div>
    );
  });

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
