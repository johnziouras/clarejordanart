import { useState } from "react";
import { Link } from "react-router-dom";

const EditableImage = ({ artworkObj }) => {
  const [loaded, setLoaded] = useState(false);

  const { _id, primaryImageThumbnail, altText, primaryImageDimensions } =
    artworkObj;

  const imageWidth = primaryImageDimensions.width;
  const imageHeight = primaryImageDimensions.height;
  const aspectRatio = (imageHeight / imageWidth) * 100;

  return (
    <div
      className="mb-4"
      style={{
        paddingBottom: loaded ? "0" : `${aspectRatio}%`,
      }}
    >
      <Link to={`/update/${_id}`}>
        <img
          onLoad={() => setLoaded(true)}
          src={primaryImageThumbnail}
          alt={altText}
          className="w-full h-auto object-cover cursor-pointer hover:opacity-80 transition-opacity"
        />
      </Link>
    </div>
  );
};
export default EditableImage;
