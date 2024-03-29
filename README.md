# Prospectus

*Listed in the Hall of Fame in **CS 411: Database Systems** at the University of Illinois at Urbana-Champaign*

[Link for feature demo](https://www.youtube.com/watch?v=AYsb6ZZ1cdU)

## Summary

With Prospectus, students from any university are able to easily login with their school assigned google accounts. Assuming the course information has been collected, they’ll be presented with the ability to instantly search their school for courses, explore an interactive prerequisite/postrequisite graph, see related courses and course details (description, GPA, credit hours, department, etc). They can also add courses to their wishlist or mark as already taken. Prospectus also allows students to plan their upcoming schedules and mark notes about specific classes. In addition, students will be presented with accurate recommendations based off of their wishlist entries. And finally, the user profile is customizable, initially using information from Google login and then allowing the user to update their school, profile information and picture. 

![Screenshot (1140)](https://user-images.githubusercontent.com/14220994/128651102-7b963a10-ead4-49aa-bb41-ec7ec91ef150.png)


## Application Design and Features

As mentioned before, Prospectus is a complete solution for students to plan their college schedule. It assists students in searching for interesting courses, view advanced course details such as ‘average GPA’ and planning their semesters, and view a course’s prerequisites and courses for which it is a dependency. It enables students to plan their coursework by letting them assign their favorite courses to semesters. Prospectus uses an advanced stored procedure to expertly recommend courses to a user based on their wishlist.

#### Feature Specification
- Google Authentication + University domain validation
- Advanced universal course search (based on name, number, department, description keywords, and general education category)
- Expert course recommendations
- Wishlist and Taken Courses Management
- College coursework planner, based on semester
- Profile Customization, for university, major, profile picture, etc

## Usefulness

The usefulness of this project comes from the UI advantage that other services such as Course Explorer and DARS don’t provide. Our project is able to better navigate through courses with our search functionality and with the benefit of quickly adding these courses to a wishlist, students can easily plan out their future semester courses in an intuitive way.

We combine several datasets including GPA data, prerequisite relations, course details so that more information can be visualized and explored in one single place!

## Data Collection

We collected data mainly from the UIUC Course Explorer API (https://courses.illinois.edu/cisdocs/explorer), where we received specific information about each course at UIUC. To do so, we used Node.js (JavaScript w/ node-fetch + XML-parser) to traverse departments and courses XML documents. All of this information was collected into JSON & CSV documents. The information from the CSV file would be imported into our MySQL database where our website would use this database to display specific information about the courses. 
DescFreq was generated by using the same scrapped documents as before, with Node.js to generate frequency (counts) of every word for every course description (removing punctuation, blank entries etc).
Prerequisite relation information was gathered from:
 https://waf.cs.illinois.edu/discovery/class_hierarchy_at_illinois/static/res/class_hierarchy.json
and GPA data was collected from:
https://github.com/wadefagen/datasets
User, Wishlist, Courses Taken and University data was mocked initially (populated with real data when app was built up), by running Python scripts for generating tuples (which fit tables schema) in bulk

We used the React Bootstrap 4 template provided by Creative Tim linked [here](https://www.creative-tim.com/product/argon-dashboard-react) to standardize the styling of our application. However, we used many of our own stylesheets for the final product.

## Database

The data in our database primarily includes information about universities, courses, and the users (google login information). It also contains frequency information for course descriptions and prerequisite relationships. 
Each User will have a unique userID in which the users can search up for classes of their liking and update the information as necessary as they want. Whenever they change the information in the website, the change will be updated accordingly. The user has UserID, Name, YearEnrolled, Major, and University ID.
Each user will be paired up with the unique university, in which it has the city and the name of the university. The university table has city, UniversityID, and university_name as columns.
Then the university will be then paired with courses of that university, in which the user can add it to their wishlist. The courses will have a variety of information about the courses. This will include the number of students enrolled and average GPA of the courses. The Courses table has Credit_hours, numStudents, Description, UniversityID, Average GPA, Course Department, CourseName, and CourseID. The CourseID will be the unique ID.
Among the relationships, we have Course Planner and Course Relationships tables for the convenience of the user. We use these relationships, which are stemmed from the three tables (Courses, Users, and University). We use Course Planner for the users so that they can use this data to have a record of what classes they can take. We use the Course Relationships table to suggest recommended courses and also create course dependency graphs



<img src="https://user-images.githubusercontent.com/14220994/128650486-6812aa71-97d7-4987-a071-1f710f59dac2.png" alt="database-schema" width=700>
 
## Hosted Web App

(Currently not live)
https://prospectus-1.uc.r.appspot.com/

## Setup and run instructions

#### Express (backend)
```
npm install
npm start
```

#### React (frontend)
```
cd frontend
npm install
npm start
```

#### .env
```
DB_HOST=1.1.1.1
DB_DATABASE=testDB
DB_USER=root
DB_PASS=password_here
CLIENT_ID=.....apps.googleusercontent.com
TOKEN_SECRET=JWT_SECRET_KEY
```

#### env_variables.yaml (for GCP deploy)
```
env_variables:
  DB_HOST: ''
  DB_DATABASE: 'Prospectus'
  DB_USER: ''
  DB_PASS: ''
  CLIENT_ID: '.apps.googleusercontent.com'
  TOKEN_SECRET: 'JWT SECRET KEY'
```

----
## Old API spec:
https://app.swaggerhub.com/apis/Braeden0/Prospectus/1.0.0#/
