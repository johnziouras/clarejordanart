import { DocumentData } from "@firebase/firestore";
import styles from "./ImageGrid.module.css";

interface ImageGridProps {
  art: DocumentData[];
}

function ImageGrid({ art }: ImageGridProps) {
  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        {art.map((image) => (
          <div key={image.id} className={styles.image}>
            <img src={image.url} alt={image.title} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default ImageGrid;
