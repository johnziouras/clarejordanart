import { db, getImages } from "@fb/firebase";
import { DocumentData } from "@firebase/firestore";
import { useEffect, useState } from "react";

export function useArt(query: string) {
  const [art, setArt] = useState<DocumentData>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchArt() {
        try {
          setError("");
          setIsLoading(true);
          const imagesList = await getImages(db, query);
          setArt(imagesList);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchArt();
    },
    [query]
  );

  return { art, isLoading, error };
}
