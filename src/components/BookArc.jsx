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
  // Softer pop-out effect
  const hoverExpand = 8;
  const selectedExpand = 12;

  // Calculate radii based on state
  const currentOuterRadius = isSelected
    ? outerRadius + selectedExpand
    : isHovered
    ? outerRadius + hoverExpand
    : outerRadius;

  const currentInnerRadius = isSelected
    ? innerRadius - 3
    : isHovered
    ? innerRadius - 2
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

  // Bluish-gray color palette
  const baseColor = book.testament === 'old' ? '#7c9cb8' : '#8ba5b8';
  const hoverColor = book.testament === 'old' ? '#9ab4c9' : '#a8bfcf';
  const selectedColor = book.testament === 'old' ? '#adc4d4' : '#b8ccd9';

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
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={0.5}
        style={{
          transition: 'all 0.3s ease-out',
          filter: isHovered || isSelected ? 'drop-shadow(0 2px 6px rgba(51,65,85,0.15))' : 'none',
          opacity: isHovered || isSelected ? 0.9 : 0.75,
        }}
      />
    </g>
  );
};

export default BookArc;
