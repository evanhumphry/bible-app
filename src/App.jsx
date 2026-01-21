import { useState } from 'react';
import BibleCircle from './components/BibleCircle';
import ScriptureReader from './components/ScriptureReader';
import AudioPlayer from './components/AudioPlayer';
import './styles/App.css';

function App() {
  const [selectedChapter, setSelectedChapter] = useState(null);

  const handleChapterSelect = (book, chapter) => {
    setSelectedChapter({ book, chapter });
  };

  const handleCloseReader = () => {
    setSelectedChapter(null);
  };

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
