/**
 * MySQL queries for Prospectus
 */

const Search = `
  (
    (
      SELECT * FROM Prospectus.Courses 
      WHERE CourseName LIKE CONCAT('%', ?, '%') AND CourseID LIKE ? 
      ORDER BY CourseID asc
    ) 
    UNION 
    (
      SELECT * FROM Prospectus.Courses 
      WHERE Description LIKE CONCAT('%', ?, '%') 
      ORDER BY CourseID asc
    ) 
    LIMIT 10
  ) 
  UNION 
  (
    SELECT * FROM Prospectus.Courses pc 
    WHERE pc.CourseID LIKE ? 
    ORDER BY pc.CourseID asc 
    LIMIT 10
  ) 
  UNION 
  (
    SELECT * FROM Prospectus.Courses c 
    WHERE c.CourseID IN 
    ( 
      SELECT RelatedCourseID FROM Prospectus.CoursesRelationships cr 
      WHERE cr.CourseID_cr IN ( 
        SELECT CourseID_ct FROM Prospectus.CoursesTaken 
        WHERE UserID_ct = ? 
      ) AND cr.Relationship = 0
    ) 
    ORDER BY CourseID asc 
    LIMIT 10
  )
`;
const Searchv2 = `
(SELECT * FROM Prospectus.Courses 
WHERE LOWER(CourseID) LIKE REPLACE(CONCAT(?, '%'), ' ', '')
LIMIT 10)
UNION (
  SELECT * FROM Prospectus.Courses 
  WHERE CourseName LIKE CONCAT('%', ?, '%') 
  LIMIT 10
) UNION (
  SELECT * FROM Prospectus.Courses 
  WHERE Description LIKE CONCAT('%', ?, '%') 
  LIMIT 10
)
LIMIT 10
`;


const wishlistQuery = `
  SELECT CourseID_wish, Description 
  FROM Prospectus.Wishlist 
  WHERE UserID_wish = ?  
  ORDER BY CourseID_wish asc
`;
// AND Description LIKE CONCAT('%', ?, '%')

const wishlistInsert = `
  INSERT INTO Wishlist(UserID_wish, CourseID_wish, Description)
    SELECT ?, ?, CourseName
    FROM Courses
    WHERE CourseID = ?
`;

const wishlistDelete = `
  DELETE FROM Wishlist 
  WHERE UserID_wish = ? AND CourseID_wish = ?
`;

const wishlistUpdate = `
  UPDATE Wishlist 
  SET Description = ? 
  WHERE CourseID_wish = ? AND UserID_wish = ?
`;

const coursesTakenQuery = `
  SELECT ct.CourseID_ct, c.CourseName, c.CreditHours  
  FROM CoursesTaken ct JOIN Courses c ON ct.CourseID_ct = c.CourseID
  WHERE ct.UserID_ct = ?
`;

const coursesTakenInsert = `
  INSERT INTO CoursesTaken(UserID_ct, CourseID_ct)
  VALUE (?, ?)
`;

const coursesTakenDelete = `
  DELETE FROM CoursesTaken 
  WHERE UserID_ct = ? AND CourseID_ct = ?
`;

const relevantCoursesQuery = `
  SELECT * FROM Courses WHERE CourseID IN
    (SELECT CourseID_fr FROM 
      (SELECT CourseID_fr, word as keyword, count/word_count as word_weight
      FROM Prospectus.DescFreq
      INNER JOIN (SELECT CourseID_fr as ID, sum(count) as word_count
        FROM Prospectus.DescFreq
        GROUP BY CourseID_fr) as tmp ON CourseID_fr = ID
      INNER JOIN 
        (SELECT word as common_word 
        FROM Prospectus.DescFreq
            WHERE CourseID_fr = 'CS225' 
            AND word NOT IN (
              SELECT word
              FROM Prospectus.DescFreq
              GROUP BY word
              HAVING sum(count) > 100
              ORDER BY sum(count) DESC
            ) 
        ORDER BY count desc
        LIMIT 5) as tmp2 
      ON word = common_word
      GROUP BY word, CourseID_fr, count, UniversityID_fr
      HAVING CourseID_fr != 'CS225' AND UniversityID_fr = 1
      ORDER BY word_weight DESC
    LIMIT 20) as tempTable)
  ORDER BY AverageGPA desc
`;

const courseDescQuery = `
  SELECT * FROM Courses
  WHERE CourseID = ?
`;

module.exports = {
  Search,
  wishlistQuery,
  wishlistInsert,
  wishlistUpdate,
  wishlistDelete,
  coursesTakenQuery,
  coursesTakenDelete,
  relevantCoursesQuery,
  courseDescQuery,
  coursesTakenInsert,
  Searchv2,
};
