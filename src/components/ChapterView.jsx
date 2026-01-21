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

  // Bluish-gray color palette
  const baseColor = book.testament === 'old' ? '#7c9cb8' : '#8ba5b8';
  const hoverColor = book.testament === 'old' ? '#9ab4c9' : '#a8bfcf';

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
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="1" />
            <stop offset="70%" stopColor="#f1f5f9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx={centerX} cy={centerY} r={innerRadius - 10} fill="url(#chapterGlow)" />

        {/* Chapter arcs - proportional to verse count */}
        {chapters.map((chapter) => {
          const isHovered = hoveredChapter === chapter.chapter;
          // Softer pop-out effect
          const currentOuterRadius = isHovered ? outerRadius + 8 : outerRadius;
          const currentInnerRadius = isHovered ? innerRadius - 2 : innerRadius;

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
                  filter: isHovered ? 'drop-shadow(0 2px 6px rgba(51,65,85,0.15))' : 'none',
                  opacity: isHovered ? 0.9 : 0.75,
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
            fontSize: '20px',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fill: '#334155',
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
            fontFamily: "'Inter', sans-serif",
            fill: '#64748b',
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
                fontSize: '16px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fill: '#6b8cae',
              }}
            >
              Chapter {hoveredChapterData.chapter}
            </text>
            <text
              x={centerX}
              y={centerY + 40}
              textAnchor="middle"
              style={{
                fontSize: '12px',
                fontFamily: "'Inter', sans-serif",
                fill: '#64748b',
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
              fontFamily: "'Inter', sans-serif",
              fill: '#94a3b8',
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
