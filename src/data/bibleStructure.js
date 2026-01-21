// Complete Bible structure with all 66 books and their chapter counts
// Arc lengths will be calculated proportionally based on chapter counts

export const bibleBooks = [
  // Old Testament (39 books)
  { id: 1, name: "Genesis", abbrev: "Gen", chapters: 50, testament: "old" },
  { id: 2, name: "Exodus", abbrev: "Exod", chapters: 40, testament: "old" },
  { id: 3, name: "Leviticus", abbrev: "Lev", chapters: 27, testament: "old" },
  { id: 4, name: "Numbers", abbrev: "Num", chapters: 36, testament: "old" },
  { id: 5, name: "Deuteronomy", abbrev: "Deut", chapters: 34, testament: "old" },
  { id: 6, name: "Joshua", abbrev: "Josh", chapters: 24, testament: "old" },
  { id: 7, name: "Judges", abbrev: "Judg", chapters: 21, testament: "old" },
  { id: 8, name: "Ruth", abbrev: "Ruth", chapters: 4, testament: "old" },
  { id: 9, name: "1 Samuel", abbrev: "1Sam", chapters: 31, testament: "old" },
  { id: 10, name: "2 Samuel", abbrev: "2Sam", chapters: 24, testament: "old" },
  { id: 11, name: "1 Kings", abbrev: "1Kgs", chapters: 22, testament: "old" },
  { id: 12, name: "2 Kings", abbrev: "2Kgs", chapters: 25, testament: "old" },
  { id: 13, name: "1 Chronicles", abbrev: "1Chr", chapters: 29, testament: "old" },
  { id: 14, name: "2 Chronicles", abbrev: "2Chr", chapters: 36, testament: "old" },
  { id: 15, name: "Ezra", abbrev: "Ezra", chapters: 10, testament: "old" },
  { id: 16, name: "Nehemiah", abbrev: "Neh", chapters: 13, testament: "old" },
  { id: 17, name: "Esther", abbrev: "Esth", chapters: 10, testament: "old" },
  { id: 18, name: "Job", abbrev: "Job", chapters: 42, testament: "old" },
  { id: 19, name: "Psalms", abbrev: "Ps", chapters: 150, testament: "old" },
  { id: 20, name: "Proverbs", abbrev: "Prov", chapters: 31, testament: "old" },
  { id: 21, name: "Ecclesiastes", abbrev: "Eccl", chapters: 12, testament: "old" },
  { id: 22, name: "Song of Solomon", abbrev: "Song", chapters: 8, testament: "old" },
  { id: 23, name: "Isaiah", abbrev: "Isa", chapters: 66, testament: "old" },
  { id: 24, name: "Jeremiah", abbrev: "Jer", chapters: 52, testament: "old" },
  { id: 25, name: "Lamentations", abbrev: "Lam", chapters: 5, testament: "old" },
  { id: 26, name: "Ezekiel", abbrev: "Ezek", chapters: 48, testament: "old" },
  { id: 27, name: "Daniel", abbrev: "Dan", chapters: 12, testament: "old" },
  { id: 28, name: "Hosea", abbrev: "Hos", chapters: 14, testament: "old" },
  { id: 29, name: "Joel", abbrev: "Joel", chapters: 3, testament: "old" },
  { id: 30, name: "Amos", abbrev: "Amos", chapters: 9, testament: "old" },
  { id: 31, name: "Obadiah", abbrev: "Obad", chapters: 1, testament: "old" },
  { id: 32, name: "Jonah", abbrev: "Jonah", chapters: 4, testament: "old" },
  { id: 33, name: "Micah", abbrev: "Mic", chapters: 7, testament: "old" },
  { id: 34, name: "Nahum", abbrev: "Nah", chapters: 3, testament: "old" },
  { id: 35, name: "Habakkuk", abbrev: "Hab", chapters: 3, testament: "old" },
  { id: 36, name: "Zephaniah", abbrev: "Zeph", chapters: 3, testament: "old" },
  { id: 37, name: "Haggai", abbrev: "Hag", chapters: 2, testament: "old" },
  { id: 38, name: "Zechariah", abbrev: "Zech", chapters: 14, testament: "old" },
  { id: 39, name: "Malachi", abbrev: "Mal", chapters: 4, testament: "old" },

  // New Testament (27 books)
  { id: 40, name: "Matthew", abbrev: "Matt", chapters: 28, testament: "new" },
  { id: 41, name: "Mark", abbrev: "Mark", chapters: 16, testament: "new" },
  { id: 42, name: "Luke", abbrev: "Luke", chapters: 24, testament: "new" },
  { id: 43, name: "John", abbrev: "John", chapters: 21, testament: "new" },
  { id: 44, name: "Acts", abbrev: "Acts", chapters: 28, testament: "new" },
  { id: 45, name: "Romans", abbrev: "Rom", chapters: 16, testament: "new" },
  { id: 46, name: "1 Corinthians", abbrev: "1Cor", chapters: 16, testament: "new" },
  { id: 47, name: "2 Corinthians", abbrev: "2Cor", chapters: 13, testament: "new" },
  { id: 48, name: "Galatians", abbrev: "Gal", chapters: 6, testament: "new" },
  { id: 49, name: "Ephesians", abbrev: "Eph", chapters: 6, testament: "new" },
  { id: 50, name: "Philippians", abbrev: "Phil", chapters: 4, testament: "new" },
  { id: 51, name: "Colossians", abbrev: "Col", chapters: 4, testament: "new" },
  { id: 52, name: "1 Thessalonians", abbrev: "1Thess", chapters: 5, testament: "new" },
  { id: 53, name: "2 Thessalonians", abbrev: "2Thess", chapters: 3, testament: "new" },
  { id: 54, name: "1 Timothy", abbrev: "1Tim", chapters: 6, testament: "new" },
  { id: 55, name: "2 Timothy", abbrev: "2Tim", chapters: 4, testament: "new" },
  { id: 56, name: "Titus", abbrev: "Titus", chapters: 3, testament: "new" },
  { id: 57, name: "Philemon", abbrev: "Phlm", chapters: 1, testament: "new" },
  { id: 58, name: "Hebrews", abbrev: "Heb", chapters: 13, testament: "new" },
  { id: 59, name: "James", abbrev: "Jas", chapters: 5, testament: "new" },
  { id: 60, name: "1 Peter", abbrev: "1Pet", chapters: 5, testament: "new" },
  { id: 61, name: "2 Peter", abbrev: "2Pet", chapters: 3, testament: "new" },
  { id: 62, name: "1 John", abbrev: "1John", chapters: 5, testament: "new" },
  { id: 63, name: "2 John", abbrev: "2John", chapters: 1, testament: "new" },
  { id: 64, name: "3 John", abbrev: "3John", chapters: 1, testament: "new" },
  { id: 65, name: "Jude", abbrev: "Jude", chapters: 1, testament: "new" },
  { id: 66, name: "Revelation", abbrev: "Rev", chapters: 22, testament: "new" },
];

// Calculate totals
export const TOTAL_CHAPTERS = bibleBooks.reduce((sum, book) => sum + book.chapters, 0);
export const TOTAL_BOOKS = bibleBooks.length;
export const OLD_TESTAMENT_BOOKS = bibleBooks.filter(b => b.testament === "old").length;
export const NEW_TESTAMENT_BOOKS = bibleBooks.filter(b => b.testament === "new").length;

// Calculate arc data for each book (proportional to chapter count)
// Starting at -90 degrees (12 o'clock position) and going clockwise
export const calculateArcData = () => {
  let currentAngle = -90; // Start at top (12 o'clock)

  return bibleBooks.map(book => {
    const arcLength = (book.chapters / TOTAL_CHAPTERS) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + arcLength;
    const midAngle = startAngle + arcLength / 2;

    currentAngle = endAngle;

    return {
      ...book,
      startAngle,
      endAngle,
      arcLength,
      midAngle,
    };
  });
};

export const booksWithArcs = calculateArcData();

// Helper to convert degrees to radians
export const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

// Helper to get arc path for SVG
export const getArcPath = (centerX, centerY, radius, startAngle, endAngle, innerRadius = 0) => {
  const startRad = degreesToRadians(startAngle);
  const endRad = degreesToRadians(endAngle);

  const x1 = centerX + radius * Math.cos(startRad);
  const y1 = centerY + radius * Math.sin(startRad);
  const x2 = centerX + radius * Math.cos(endRad);
  const y2 = centerY + radius * Math.sin(endRad);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  if (innerRadius > 0) {
    const x3 = centerX + innerRadius * Math.cos(endRad);
    const y3 = centerY + innerRadius * Math.sin(endRad);
    const x4 = centerX + innerRadius * Math.cos(startRad);
    const y4 = centerY + innerRadius * Math.sin(startRad);

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
  }

  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
};
