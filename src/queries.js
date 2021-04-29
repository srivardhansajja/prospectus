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
WHERE LOWER(CourseID) LIKE REPLACE(CONCAT(?, '%'), ' ', '') AND UniversityID_c = (SELECT UniversityID_u FROM Users WHERE UserID = ?)
LIMIT 10)
UNION (
  SELECT * FROM Prospectus.Courses 
  WHERE CourseName LIKE CONCAT('%', ?, '%') AND UniversityID_c = (SELECT UniversityID_u FROM Users WHERE UserID = ?)
  LIMIT 10
) UNION (
  SELECT * FROM Prospectus.Courses 
  WHERE Description LIKE CONCAT('%', ?, '%') AND UniversityID_c = (SELECT UniversityID_u FROM Users WHERE UserID = ?)
  LIMIT 10
)
LIMIT 10
`;

const wishlistQuery = `
  SELECT CourseID_wish, Description 
  FROM Prospectus.Wishlist 
  WHERE UserID_wish = ?  
  AND Description LIKE CONCAT('%', ?, '%')
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

const coursesPlannerQuery = `
  SELECT cp.CourseID_cp, c.CourseName, c.CreditHours
  FROM CoursesPlanner cp JOIN Courses c ON cp.CourseID_cp = c.CourseID
  WHERE cp.UserID_cp = ? AND cp.CourseSemester_cp = ?
`;

const coursesPlannerInsert = `
  INSERT INTO CoursesPlanner(UserID_cp, CourseID_cp, CourseSemester_cp)
  VALUE (?, ?, ?)
`;

const coursesPlannerDelete = `
  DELETE FROM CoursesPlanner
  WHERE UserID_cp = ? AND CourseID_cp = ? AND CourseSemester_cp = ?
`;

const relevantCoursesQuery = `
  CALL GetWishListRecs(?);
  SELECT * FROM Courses WHERE CourseID IN (SELECT * FROM tmpRecsTable);
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
  coursesPlannerQuery,
  coursesPlannerInsert,
  coursesPlannerDelete,
  coursesTakenQuery,
  coursesTakenDelete,
  relevantCoursesQuery,
  courseDescQuery,
  coursesTakenInsert,
  Searchv2,
};
