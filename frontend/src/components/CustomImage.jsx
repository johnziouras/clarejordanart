import { Gallery, Item } from "react-photoswipe-gallery";

const CustomImage = ({ artworkObj }) => {
  const {
    _id,
    primaryImageUrl,
    altText,
    primaryImageDimensions,
    alternativeImageUrls,
  } = artworkObj;

  const { width, height } = primaryImageDimensions;

  return (
    <Gallery withCaption>
      <Item
        key={_id}
        original={primaryImageUrl}
        thumbnail={primaryImageUrl}
        width={width}
        height={height}
      >
        {({ ref, open }) => (
          <img
            ref={ref}
            onClick={open}
            src={primaryImageUrl}
            alt={altText}
            className="max-w-full h-auto object-cover cursor-pointer hover:opacity-80 transition-opacity"
          />
        )}
      </Item>
    </Gallery>
  );
};

export default CustomImage;
