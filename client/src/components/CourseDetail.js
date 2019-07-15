import React from 'react';
import {Link} from 'react-router-dom';


export default class CourseDetail extends React.PureComponent {
    deleteCourse = (e,id) => {
        e.preventDefault();
        const {context} = this.props;
        const user = context.authenticatedUser;
        if (!user) {
            return false;
        }
        console.log('state user', user)
        context.data.deleteCourse(id,user)
        .then(errors => {
            if (errors.length) {
              this.setState({ errors });
            } else {
                    this.props.history.push('/');    
            };
            }
          )
          .catch( err => {
            // handle rejected promises
            console.log(err);
            //Render an "Error" Route
            // this.props.history.push('/error'); //push to history stack
          });
        this.props.history.push('/')
    }
    
    getCourse = async (id) => {
        const { context } = this.props;
        const course = await context.actions.genCourseDetail(id)
                                .catch(err => {
                                        console.log(err.status)
                                        this.props.history.push('/notfound')
                                });
        this.setState({course: course});
      }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getCourse(id);
    }

    componentWillUnmount() {
        clearInterval(this.props.context);
        
    }
    render() {
        const { context } = this.props;
        const { course } = context;
        let result;
        if (!course) {
            return '...'
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
        const {User} = course;
        const {authenticatedUser} = context;
        let owner;
        if (authenticatedUser) {
            owner = User.id === authenticatedUser.id 
        }
        const actions_bar =  (
            <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span >
                            { authenticatedUser && owner ? 
                        <Link to={`${course.id}/update/`} className="button">Update Course </Link> : null }
                            {authenticatedUser && owner ? 
                        <button className="button"
                            onClick={e => owner? this.deleteCourse(e, course.id) : e.preventDefault()}
                        >Delete Course </button> : null}
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