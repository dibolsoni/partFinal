import React from 'react';
import CoursesList from './CoursesList'

import withContext from '../Context';
const CoursesListWithContext = withContext(CoursesList);

export default class Courses extends React.PureComponent {

  state = {
    courses: null,
    loading: true
  }

  getCourses = async () => {
    const { context } = this.props;
    const courses = await context.data.getCourses()
    .catch(err=> {
      this.props.history.push('error')
      return {errors: err};
    });

  this.setState({
    courses: courses,
    loading: false
  })


  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState) {
      if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
          this.getCourses();
      } 
    }
  }

  componentDidMount() {
    this.getCourses();
  }


  render() {
    const courses = this.state.courses;
    return (
        <div className="bounds">
          <div className="grid-100">
            {
              <CoursesListWithContext courses={courses}/> 
            }
            
          </div>
        </div>
    );
  }
}