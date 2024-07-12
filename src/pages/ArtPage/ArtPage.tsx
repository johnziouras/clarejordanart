import Footer from "@/components/Footer/Footer";
import Header from "@components/Header/Header";
import ImageGrid from "@components/ImageGrid/ImageGrid";
import { useArt } from "@hooks/useArt";

interface ArtPageProps {
  path: string;
}

function ArtPage({ path }: ArtPageProps) {
  const { art, isLoading, error } = useArt(path);

  console.log(art, isLoading, error);
  return (
    <>
      <Header />
      <ImageGrid art={art} />
      <Footer />
    </>
  );
}

export default ArtPage;
