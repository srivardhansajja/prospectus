// const queries = {
//   searchQuery: search(dept, keywords, userid),
// };

function searchQuery(dept, keywords, userid) {
  return (
    search_1 +
    "'" +
    dept +
    "'" +
    search_2 +
    "'" +
    keywords +
    "'" +
    search_3 +
    "'" +
    userid +
    "'" +
    search_4
  );
}

function wishlistQuery(userid) {
  return wishlist_1 + "'" + userid + "'";
}

function coursesTakenQuery(userid) {
  return coursesTaken_1 + "'" + userid + "'";
}

const search_1 = `(SELECT * FROM Prospectus.Courses pc WHERE pc.CourseID LIKE `; // @dept
const search_2 = ` ORDER BY pc.CourseID asc LIMIT 10) UNION (SELECT * FROM Prospectus.Courses WHERE Description LIKE CONCAT('%', `; // @keywords
const search_3 = `, '%') ORDER BY CourseID asc LIMIT 10) UNION (SELECT * FROM Prospectus.Courses c WHERE c.CourseID IN ( SELECT RelatedCourseID FROM Prospectus.CoursesRelationships cr WHERE cr.CourseID_cr IN ( SELECT CourseID_ct FROM Prospectus.CoursesTaken WHERE UserID_ct = `; // @userid
const search_4 = ` ) AND cr.Relationship = 0) ORDER BY CourseID asc LIMIT 10);`;

const coursesTaken_1 = `SELECT CourseID_ct FROM CoursesTaken WHERE UserID_ct = `; // @userid

const wishlist_1 = `SELECT CourseID_wish FROM Wishlist WHERE UserID_wish = `; // @userid

module.exports = {
  searchQuery,
  wishlistQuery,
  coursesTakenQuery,
};
