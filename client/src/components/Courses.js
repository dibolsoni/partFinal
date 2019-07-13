import React from 'react';
import CoursesList from './CoursesList'

export default class Courses extends React.PureComponent {
  getCourses = async () => {
    const { context } = this.props;
    const courses = await context.actions.genCourseList();
    this.setState({courses: courses});
  }


  CourseList = (courses) => {
    if (courses.length > 0) {
      const result = courses.map(course => (
        <div>{course.title}</div>
      ));
      console.log(result);
      return result
    } else {
      return 'loading...';
    }
  }
  async componentDidMount () {
    this.getCourses();
  }

  render() {
    // let CourseList = null;
    // const a = this.state;
    // console.log(a)

  //   if (a.length > 0) {
  //     CourseList = a.map(course => (
  //       <div class="course--module course--link">
  // //       <h4>{course.title}</h4>
  // //       <h3>{course.description}</h3>
  // //     </div>
  //       ))
    // } 
    const { courses } = this.props.context;
    console.log(courses);


    


    return (

        <div className="bounds">
          <div className="grid-100">
            <CoursesList courses={courses} />
          </div>
        </div>
    );
  }
}