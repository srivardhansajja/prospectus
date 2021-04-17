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

const wishlistQuery = `
  SELECT CourseID_wish, Description 
  FROM Wishlist 
  WHERE UserID_wish = ? AND Description LIKE CONCAT('%', ?, '%') 
  ORDER BY CourseID_wish asc
`;

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
  SELECT CourseID_ct 
  FROM CoursesTaken 
  WHERE UserID_ct = ?
`;

module.exports = {
  Search,
  wishlistQuery,
  wishlistInsert,
  wishlistUpdate,
  wishlistDelete,
  coursesTakenQuery,
};
