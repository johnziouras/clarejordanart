import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css";
import { useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";

const CustomImage = ({ artworkObj, isEditing, onMove }) => {
  const {
    _id,
    primaryImageUrl,
    primaryImageThumbnail,
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
  const aspectRatio = (imageHeight / imageWidth) * 100;

  const [loaded, setLoaded] = useState(false);

  const getCaption = (title, height, width, year, available, description) => {
    return `
      <div style="font-family: 'sans-serif';font-size: 20px;">
        <div>
          <em>${title}</em><br>
          ${height && width ? `${height}" x ${width}"<br>` : ""}
          ${year ? `${year}<br>` : ""}
          ${available ? "Available" : "Sold"}<br>
          ${description ? description : ""}
        </div>
      </div>`;
  };

  const options = {
    padding: { top: 20, bottom: 40, left: 100, right: 100 },
  };

  return (
    <div
      className="relative mb-4"
      style={{
        paddingBottom: loaded ? "0" : `${aspectRatio}%`,
      }}
    >
      {isEditing && (
        <div className="absolute inset-0 flex flex-col justify-between items-center z-10 pointer-events-none">
          <button
            onClick={() => onMove("up")}
            className="pointer-events-auto absolute top-3 left-1/2 -translate-x-1/2 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200"
          >
            ↑
          </button>

          <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-3">
            <button
              onClick={() => onMove("left")}
              className="pointer-events-auto bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200"
            >
              ←
            </button>
            <button
              onClick={() => onMove("right")}
              className="pointer-events-auto bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200"
            >
              →
            </button>
          </div>

          <button
            onClick={() => onMove("down")}
            className="pointer-events-auto absolute bottom-3 left-1/2 -translate-x-1/2 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200"
          >
            ↓
          </button>
        </div>
      )}

      <Gallery
        plugins={(pswpLightbox) => {
          // eslint-disable-next-line
          new PhotoSwipeDynamicCaption(pswpLightbox, {
            captionContent: (slide) => slide.data.caption,
          });
        }}
        options={options}
      >
        <Item
          key={`${_id}-primary`}
          original={primaryImageUrl}
          thumbnail={primaryImageThumbnail}
          width={imageWidth}
          height={imageHeight}
          caption={getCaption(
            title,
            height,
            width,
            year,
            available,
            description
          )}
        >
          {({ ref, open }) => (
            <img
              ref={ref}
              onClick={!isEditing ? open : undefined} // disable lightbox when editing
              onLoad={() => setLoaded(true)}
              src={primaryImageThumbnail}
              alt={altText}
              className="w-full h-auto object-cover cursor-pointer hover:opacity-80 transition-opacity"
            />
          )}
        </Item>

        {alternativeImageUrls?.map((altImageObj, idx) => (
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
            {({ ref, open }) => (
              <span ref={ref} style={{ display: "none" }} onClick={open}></span>
            )}
          </Item>
        ))}
      </Gallery>
    </div>
  );
};

export default CustomImage;
