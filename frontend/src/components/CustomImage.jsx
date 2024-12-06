import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css";
import { Gallery, Item } from "react-photoswipe-gallery";

const CustomImage = ({ artworkObj }) => {
  const {
    _id,
    primaryImageUrl,
    title,
    height,
    width,
    year,
    available,
    description,
    altText,
    primaryImageDimensions,
    alternativeImageUrls,
  } = artworkObj;

  const imageWidth = primaryImageDimensions.width;
  const imageHeight = primaryImageDimensions.height;

  const getCaption = (title, height, width, year, available, description) => {
    const formattedCaption = `
    <div style="font-family: 'sans-serif';font-size: 20px;">
      <div>
        <em>${title}</em><br>
        ${height}" x ${width}"<br>
        ${year}<br>
        ${available ? "Available" : "Sold"}<br>
        ${description ? description : ""}
      </div>
    </div>`;
    return formattedCaption;
  };

  const options = {
    padding: { top: 20, bottom: 40, left: 100, right: 100 },
  };

  return (
    <Gallery
      plugins={(pswpLightbox) => {
        const captionPlugin = new PhotoSwipeDynamicCaption(pswpLightbox, {
          captionContent: (slide) => slide.data.caption,
        });
      }}
      options={options}
    >
      <Item
        key={`${_id}-primary`}
        original={primaryImageUrl}
        thumbnail={primaryImageUrl}
        width={imageWidth}
        height={imageHeight}
        caption={getCaption(title, height, width, year, available, description)}
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
            caption={getCaption(
              title,
              height,
              width,
              year,
              available,
              description
            )}
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
