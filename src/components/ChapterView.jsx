import { useState } from 'react';
import { getArcPath, degreesToRadians } from '../data/bibleStructure';

const ChapterView = ({ book, onBack, onChapterSelect, size }) => {
  const [hoveredChapter, setHoveredChapter] = useState(null);

  const centerX = size / 2;
  const centerY = size / 2;
  const outerRadius = 280;
  const innerRadius = 100;

  // Calculate chapter arcs - each chapter gets equal portion
  const chapterArcLength = 360 / book.chapters;
  const chapters = Array.from({ length: book.chapters }, (_, i) => {
    const chapterNum = i + 1;
    const startAngle = -90 + i * chapterArcLength;
    const endAngle = startAngle + chapterArcLength;
    const midAngle = startAngle + chapterArcLength / 2;

    return {
      number: chapterNum,
      startAngle,
      endAngle,
      midAngle,
    };
  });

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

        {/* Chapter arcs */}
        {chapters.map((chapter) => {
          const isHovered = hoveredChapter === chapter.number;
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

          // Label position
          const midAngleRad = degreesToRadians(chapter.midAngle);
          const labelRadius = (currentOuterRadius + currentInnerRadius) / 2;
          const labelX = centerX + labelRadius * Math.cos(midAngleRad);
          const labelY = centerY + labelRadius * Math.sin(midAngleRad);

          // Text rotation
          let textRotation = chapter.midAngle + 90;
          if (textRotation > 90 && textRotation < 270) {
            textRotation += 180;
          }

          // Only show label if arc is wide enough
          const showLabel = chapterArcLength > 6;

          return (
            <g
              key={chapter.number}
              className="chapter-arc"
              onMouseEnter={() => setHoveredChapter(chapter.number)}
              onMouseLeave={() => setHoveredChapter(null)}
              onClick={() => onChapterSelect(book, chapter.number)}
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
              {showLabel && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textRotation}, ${labelX}, ${labelY})`}
                  style={{
                    fontSize: chapterArcLength > 12 ? '12px' : '10px',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fill: '#4a3728',
                    pointerEvents: 'none',
                  }}
                >
                  {chapter.number}
                </text>
              )}
            </g>
          );
        })}

        {/* Center text */}
        <text
          x={centerX}
          y={centerY - 15}
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
          y={centerY + 15}
          textAnchor="middle"
          style={{
            fontSize: '14px',
            fontFamily: "'Cormorant Garamond', serif",
            fill: '#8b7355',
          }}
        >
          {book.chapters} Chapters
        </text>
      </svg>

      {/* Hovered chapter tooltip */}
      {hoveredChapter && (
        <div className="chapter-tooltip">
          <p>Chapter {hoveredChapter}</p>
          <p className="hint">Click to read</p>
        </div>
      )}
    </div>
  );
};

export default ChapterView;
