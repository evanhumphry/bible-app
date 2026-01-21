import { useState, useCallback } from 'react';

// Using bible-api.com which serves World English Bible by default
const API_BASE = 'https://bible-api.com';

export const useBibleAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchChapter = useCallback(async (bookName, chapter) => {
    setLoading(true);
    setError(null);

    try {
      // bible-api.com uses book names in the URL
      // Format: https://bible-api.com/genesis+1
      const formattedName = bookName.toLowerCase().replace(/\s+/g, '+');
      const response = await fetch(`${API_BASE}/${formattedName}+${chapter}`);

      if (!response.ok) {
        throw new Error('Failed to fetch chapter');
      }

      const data = await response.json();
      setLoading(false);

      // Transform to consistent format
      return data.verses.map(v => ({
        verse: v.verse,
        text: v.text.trim()
      }));
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  }, []);

  return {
    loading,
    error,
    fetchChapter,
  };
};

export default useBibleAPI;
