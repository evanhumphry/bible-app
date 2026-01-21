import { useState, useEffect } from 'react';
import useBibleAPI from '../hooks/useBibleAPI';

const ScriptureReader = ({ book, chapter, onClose, onPrevChapter, onNextChapter, hasPrev, hasNext }) => {
  const [verses, setVerses] = useState([]);
  const { loading, error, fetchChapter } = useBibleAPI();

  useEffect(() => {
    const loadChapter = async () => {
      setVerses([]);
      const data = await fetchChapter(book.name, chapter);
      if (data) {
        setVerses(data);
      }
    };

    loadChapter();
  }, [book.name, chapter, fetchChapter]);

  return (
    <div className="scripture-reader-overlay">
      <div className="scripture-reader">
        <header className="scripture-header">
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <h1>{book.name}</h1>
          <h2>Chapter {chapter}</h2>
        </header>

        <div className="scripture-content">
          {loading && (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading scripture...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <p>Unable to load scripture. Please try again.</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}

          {!loading && !error && verses.length > 0 && (
            <div className="verses">
              {verses.map((verse) => (
                <p key={verse.verse} className="verse">
                  <span className="verse-number">{verse.verse}</span>
                  <span className="verse-text">{verse.text}</span>
                </p>
              ))}
            </div>
          )}

          {!loading && !error && verses.length === 0 && (
            <div className="empty-state">
              <p>No verses found for this chapter.</p>
            </div>
          )}
        </div>

        {/* Navigation arrows */}
        <div className="scripture-navigation">
          <button
            className="nav-button prev"
            onClick={onPrevChapter}
            disabled={!hasPrev}
            title="Previous chapter"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Previous</span>
          </button>

          <button
            className="nav-button next"
            onClick={onNextChapter}
            disabled={!hasNext}
            title="Next chapter"
          >
            <span>Next</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <footer className="scripture-footer">
          <p>World English Bible (WEB) Translation</p>
        </footer>
      </div>
    </div>
  );
};

export default ScriptureReader;
