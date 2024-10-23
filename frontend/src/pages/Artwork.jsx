import ImageGrid from "../components/ImageGrid";

const Artwork = ({ path }) => {
  return (
    <main className="relative">
      <ImageGrid path={path} />
    </main>
  );
};

export default Artwork;
