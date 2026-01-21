import { getArcPath } from '../data/bibleStructure';

const BookArc = ({
  book,
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  isHovered,
  isSelected,
  onHover,
  onSelect,
}) => {
  const hoverExpand = 15;
  const selectedExpand = 20;

  // Calculate radii based on state
  const currentOuterRadius = isSelected
    ? outerRadius + selectedExpand
    : isHovered
    ? outerRadius + hoverExpand
    : outerRadius;

  const currentInnerRadius = isSelected
    ? innerRadius - 5
    : isHovered
    ? innerRadius - 3
    : innerRadius;

  // Generate the arc path
  const path = getArcPath(
    centerX,
    centerY,
    currentOuterRadius,
    book.startAngle,
    book.endAngle,
    currentInnerRadius
  );

  // Color based on testament
  const baseColor = book.testament === 'old' ? '#d4a574' : '#7eb5a6';
  const hoverColor = book.testament === 'old' ? '#e8c49a' : '#a3d4c5';
  const selectedColor = book.testament === 'old' ? '#f0d4aa' : '#b8e6d8';

  const fillColor = isSelected ? selectedColor : isHovered ? hoverColor : baseColor;

  return (
    <g
      className="book-arc"
      onMouseEnter={() => onHover(book.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(book)}
      style={{ cursor: 'pointer' }}
    >
      <path
        d={path}
        fill={fillColor}
        stroke="#fff"
        strokeWidth={isHovered || isSelected ? 2 : 1}
        style={{
          transition: 'all 0.3s ease-out',
          filter: isHovered || isSelected ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'none',
          opacity: isHovered || isSelected ? 0.95 : 0.7,
        }}
      />
    </g>
  );
};

export default BookArc;
