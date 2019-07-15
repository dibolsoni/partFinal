import React from 'react';
import {Link} from 'react-router-dom';


export default class CourseDetail extends React.PureComponent {

    getCourse = async (id) => {
        const { context } = this.props;
        const course = await context.actions.genCourseDetail(id);
        this.setState({course: course});
      }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getCourse(id);
    }
    render() {
        const { context } = this.props;
        const { course } = context;
        let result;
        if (!course) {
            return 'loading...'
        } else {
            let materialsNeeded;
            const description = course.description
                                    .split('\n\n')
                                    .map((item, index) => {
                                        return <p key={index}>{item}</p>
                                    });
            if (course.materialsNeeded) {
                materialsNeeded = course.materialsNeeded
                    .split('*')
                    .filter(item => item)
                    .map((item, index) => (
                        <li key={index}>{item}</li>
                    )
                );
            } 
            result = (
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>By {course.User.firstName} {course.User.lastName}</p>
                        </div>
                        <div className="course--description">
                            {description}
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                            <li className="course--stats--list--item">
                                {course.estimatedTime}
                                <h4>Estimated Time</h4>
                                <h3>{course.estimatedTime ? course.estimatedTime : 'Not estimated'}</h3>
                            </li>
                            <li className="course--stats--list--item">
                                <h4>Materials Needed</h4>
                                <ul>
                                    {materialsNeeded ? materialsNeeded : 'No materials estimated'}
                                </ul>
                            </li>
                            </ul>
                        </div>
                    </div>                    
                </div>
            )

        }
        const actions_bar =  (
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                            {course.User.id === context.authenticatedUser.id ? 
                                <Link to={`../update/${course.id}`} className="button">Update Course</Link> 
                            : 
                                <Link to={`../update/${course.id}`} className="button" onClick={e => e.preventDefault()} style={{backgroundColor:'#808080'}}>Update Course</Link>}                            
                            <Link to={`../delete/${course.id}`} className="button">Delete Course</Link>
                        </span>
                        <Link to='/' className="button button-secondary">Return to List</Link>
                    </div>
                </div>
            </div>
        )
        return(
            <div>
                {actions_bar}
                {result}
            </div>
        )
    }
}