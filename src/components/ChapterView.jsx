import { useState, useMemo } from 'react';
import { getArcPath, degreesToRadians } from '../data/bibleStructure';
import { calculateChapterArcs, getTotalVersesInBook } from '../data/verseData';

const ChapterView = ({ book, onBack, onChapterSelect, size }) => {
  const [hoveredChapter, setHoveredChapter] = useState(null);

  const centerX = size / 2;
  const centerY = size / 2;
  const outerRadius = 280;
  const innerRadius = 100;

  // Calculate chapter arcs proportionally based on verse counts
  const chapters = useMemo(() => calculateChapterArcs(book.name), [book.name]);
  const totalVerses = useMemo(() => getTotalVersesInBook(book.name), [book.name]);

  // Get hovered chapter data
  const hoveredChapterData = hoveredChapter
    ? chapters.find((c) => c.chapter === hoveredChapter)
    : null;

  const baseColor = book.testament === 'old' ? '#d4a574' : '#7eb5a6';
  const hoverColor = book.testament === 'old' ? '#e8c49a' : '#a3d4c5';

  return (
    <div className="chapter-view-container">
      <button className="back-button" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to All Books
      </button>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="chapter-circle"
      >
        <defs>
          <radialGradient id="chapterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff9e6" stopOpacity="1" />
            <stop offset="70%" stopColor="#fff5d6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx={centerX} cy={centerY} r={innerRadius - 10} fill="url(#chapterGlow)" />

        {/* Chapter arcs - proportional to verse count */}
        {chapters.map((chapter) => {
          const isHovered = hoveredChapter === chapter.chapter;
          const currentOuterRadius = isHovered ? outerRadius + 15 : outerRadius;
          const currentInnerRadius = isHovered ? innerRadius - 5 : innerRadius;

          const path = getArcPath(
            centerX,
            centerY,
            currentOuterRadius,
            chapter.startAngle,
            chapter.endAngle,
            currentInnerRadius
          );

          return (
            <g
              key={chapter.chapter}
              className="chapter-arc"
              onMouseEnter={() => setHoveredChapter(chapter.chapter)}
              onMouseLeave={() => setHoveredChapter(null)}
              onClick={() => onChapterSelect(book, chapter.chapter)}
              style={{ cursor: 'pointer' }}
            >
              <path
                d={path}
                fill={isHovered ? hoverColor : baseColor}
                stroke="#fff"
                strokeWidth={isHovered ? 2 : 1}
                style={{
                  transition: 'all 0.2s ease-out',
                  filter: isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none',
                }}
              />
            </g>
          );
        })}

        {/* Center text - Book name and stats */}
        <text
          x={centerX}
          y={centerY - 35}
          textAnchor="middle"
          style={{
            fontSize: '22px',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fill: '#4a3728',
          }}
        >
          {book.name}
        </text>
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
          {book.chapters} Chapters · {totalVerses} Verses
        </text>

        {/* Hovered chapter info - shown in center */}
        {hoveredChapterData ? (
          <>
            <text
              x={centerX}
              y={centerY + 20}
              textAnchor="middle"
              style={{
                fontSize: '18px',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fill: book.testament === 'old' ? '#b8956e' : '#5a9a8a',
              }}
            >
              Chapter {hoveredChapterData.chapter}
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
              {hoveredChapterData.verseCount} verses
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

export default ChapterView;
