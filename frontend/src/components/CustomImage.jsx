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
        key={`${_id}-primary`}
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
      {alternativeImageUrls &&
        alternativeImageUrls.length > 0 &&
        alternativeImageUrls.map((altImageObj, idx) => (
          <Item
            key={`${_id}-alt-${idx}`}
            original={altImageObj.url}
            thumbnail={altImageObj.url}
            width={altImageObj.dimensions.width}
            height={altImageObj.dimensions.height}
          >
            {/* Really hacky, there is probably a smarter way to do this */}
            {({ ref, open }) => (
              <span ref={ref} style={{ display: "none" }} onClick={open}></span>
            )}
          </Item>
        ))}
    </Gallery>
  );
};

export default CustomImage;
