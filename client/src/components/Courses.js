import React from 'react';
import CoursesList from './CoursesList'

import withContext from '../Context';
const HeaderWithContext = withContext(CoursesList);

export default class Courses extends React.PureComponent {

  
  getCourses = async () => {
    const { context } = this.props;
    const courses = await context.actions.genCourseList();
    this.setState({courses: courses});
  }

  componentDidMount() {
    this.getCourses();
  }

  componentWillUnmount() {
    clearInterval(this.props.context.courses);
  }

  render() {



    


    return (

        <div className="bounds">
          <div className="grid-100">
            <HeaderWithContext />
          </div>
        </div>
    );
  }
}