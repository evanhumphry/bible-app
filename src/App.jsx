import { useState } from 'react';
import BibleCircle from './components/BibleCircle';
import ScriptureReader from './components/ScriptureReader';
import AudioPlayer from './components/AudioPlayer';
import { bibleBooks } from './data/bibleStructure';
import './styles/App.css';

function App() {
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleChapterSelect = (book, chapter) => {
    setSelectedChapter({ book, chapter });
  };

  const handleCloseReader = () => {
    setSelectedChapter(null);
  };

  const handlePrevChapter = () => {
    if (!selectedChapter) return;

    const { book, chapter } = selectedChapter;

    if (chapter > 1) {
      // Go to previous chapter in same book
      setSelectedChapter({ book, chapter: chapter - 1 });
    } else {
      // Go to last chapter of previous book
      const currentIndex = bibleBooks.findIndex((b) => b.id === book.id);
      if (currentIndex > 0) {
        const prevBook = bibleBooks[currentIndex - 1];
        setSelectedChapter({ book: prevBook, chapter: prevBook.chapters });
      }
    }
  };

  const handleNextChapter = () => {
    if (!selectedChapter) return;

    const { book, chapter } = selectedChapter;

    if (chapter < book.chapters) {
      // Go to next chapter in same book
      setSelectedChapter({ book, chapter: chapter + 1 });
    } else {
      // Go to first chapter of next book
      const currentIndex = bibleBooks.findIndex((b) => b.id === book.id);
      if (currentIndex < bibleBooks.length - 1) {
        const nextBook = bibleBooks[currentIndex + 1];
        setSelectedChapter({ book: nextBook, chapter: 1 });
      }
    }
  };

  // Determine if prev/next navigation is available
  const hasPrev = selectedChapter
    ? selectedChapter.chapter > 1 || selectedChapter.book.id > 1
    : false;

  const hasNext = selectedChapter
    ? selectedChapter.chapter < selectedChapter.book.chapters ||
      selectedChapter.book.id < bibleBooks.length
    : false;

  return (
    <div className="app">
      {/* Background decorative elements */}
      <div className="background-decoration">
        <div className="light-ray ray-1"></div>
        <div className="light-ray ray-2"></div>
        <div className="light-ray ray-3"></div>
      </div>

      {/* Header */}
      <header className="app-header">
        <h1>The Word</h1>
        <p>A Visual Journey Through Scripture</p>
      </header>

      {/* Main content */}
      <main className="app-main">
        <BibleCircle onChapterSelect={handleChapterSelect} />
      </main>

      {/* Scripture reader modal */}
      {selectedChapter && (
        <ScriptureReader
          book={selectedChapter.book}
          chapter={selectedChapter.chapter}
          onClose={handleCloseReader}
          onPrevChapter={handlePrevChapter}
          onNextChapter={handleNextChapter}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}

      {/* Audio player */}
      <AudioPlayer />

      {/* Footer */}
      <footer className="app-footer">
        <p>World English Bible Translation</p>
      </footer>
    </div>
  );
}

export default App;
