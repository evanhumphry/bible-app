import { useState } from 'react';
import BookArc from './BookArc';
import ChapterView from './ChapterView';
import { booksWithArcs, TOTAL_CHAPTERS, TOTAL_BOOKS } from '../data/bibleStructure';

const BibleCircle = ({ onChapterSelect }) => {
  const [hoveredBook, setHoveredBook] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const size = 700;
  const centerX = size / 2;
  const centerY = size / 2;
  const outerRadius = 280;
  const innerRadius = 140;

  const handleBookSelect = (book) => {
    setSelectedBook(book);
  };

  const handleBackToCircle = () => {
    setSelectedBook(null);
  };

  const handleChapterClick = (book, chapter) => {
    onChapterSelect(book, chapter);
  };

  // Get hovered book info for center display
  const hoveredBookData = hoveredBook
    ? booksWithArcs.find((b) => b.id === hoveredBook)
    : null;

  if (selectedBook) {
    return (
      <ChapterView
        book={selectedBook}
        onBack={handleBackToCircle}
        onChapterSelect={handleChapterClick}
        size={size}
      />
    );
  }

  return (
    <div className="bible-circle-container">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="bible-circle"
      >
        {/* Subtle background glow */}
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff9e6" stopOpacity="1" />
            <stop offset="70%" stopColor="#fff5d6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Center glow effect */}
        <circle cx={centerX} cy={centerY} r={innerRadius - 10} fill="url(#centerGlow)" />

        {/* Book arcs */}
        {booksWithArcs.map((book) => (
          <BookArc
            key={book.id}
            book={book}
            centerX={centerX}
            centerY={centerY}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            isHovered={hoveredBook === book.id}
            isSelected={false}
            onHover={setHoveredBook}
            onSelect={handleBookSelect}
          />
        ))}

        {/* Center text - Title */}
        <text
          x={centerX}
          y={centerY - 35}
          textAnchor="middle"
          style={{
            fontSize: '24px',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fill: '#4a3728',
          }}
        >
          Holy Bible
        </text>

        {/* Stats line */}
        <text
          x={centerX}
          y={centerY - 10}
          textAnchor="middle"
          style={{
            fontSize: '12px',
            fontFamily: "'Cormorant Garamond', serif",
            fill: '#8b7355',
          }}
        >
          {TOTAL_BOOKS} Books · {TOTAL_CHAPTERS} Chapters
        </text>

        {/* Hovered book name - shown in center when hovering */}
        {hoveredBookData ? (
          <>
            <text
              x={centerX}
              y={centerY + 20}
              textAnchor="middle"
              style={{
                fontSize: '18px',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fill: hoveredBookData.testament === 'old' ? '#b8956e' : '#5a9a8a',
                transition: 'all 0.2s ease',
              }}
            >
              {hoveredBookData.name}
            </text>
            <text
              x={centerX}
              y={centerY + 42}
              textAnchor="middle"
              style={{
                fontSize: '12px',
                fontFamily: "'Cormorant Garamond', serif",
                fill: '#8b7355',
                fontStyle: 'italic',
              }}
            >
              {hoveredBookData.chapters} {hoveredBookData.chapters === 1 ? 'chapter' : 'chapters'}
            </text>
          </>
        ) : (
          <text
            x={centerX}
            y={centerY + 30}
            textAnchor="middle"
            style={{
              fontSize: '11px',
              fontFamily: "'Cormorant Garamond', serif",
              fill: '#a89880',
              fontStyle: 'italic',
            }}
          >
            Hover to explore
          </text>
        )}
      </svg>
    </div>
  );
};

export default BibleCircle;
