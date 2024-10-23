const CustomImage = ({ src, alt }) => {
  return (
    <Image
      className="block w-full h-full object-contain absolute top-0 left-0"
      src={src}
      alt={alt}
      fill
    />
  );
};

export default CustomImage;
