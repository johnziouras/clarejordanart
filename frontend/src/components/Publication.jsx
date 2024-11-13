const Publication = ({
  artworkTitle,
  publicationTitle,
  linkText,
  url,
  year,
}) => {
  return (
    <div className="flex space-x-4">
      <p className="font-thin font-serif lg:text-lg md:text-lg ">
        Artist {artworkTitle} {publicationTitle}{" "}
        <a className="underline" href={url} target="_blank" rel="noreferrer">
          {linkText}
        </a>{" "}
        {year}
      </p>
    </div>
  );
};
export default Publication;
