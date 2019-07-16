import React from 'react';
import {Link} from 'react-router-dom';

const ReactMarkdown = require('react-markdown/with-html')



export default class CourseDetail extends React.PureComponent {
    state = {
        course: null
    }

    deleteCourse = (e,id) => {
        e.preventDefault();
        const {context} = this.props;
        const user = context.authenticatedUser;
        if (!user) {
            this.setState({errors: ['You must be logged to delete a course']})
        }
        context.data.deleteCourse(id,user)
            .then(this.setState({location:true}))
            .catch(err => {this.props.history.push('/error')})
        this.props.history.push('/')
    }
    
    getCourse = async (id) => {
        const { context } = this.props;
        const course = await context.data.getCourse(id)
        .catch(err => {
                console.log(err.status)
                this.props.history.push('/notfound')
        });

        this.setState({
            course:course,
            loading: false
        })

      }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getCourse(id);
    }

    render() {
        const { context } = this.props;
        const  course  = this.state.course;
        let result;
        if (!course) {
            return '...'
        } else {
            let materialsNeeded;
            if (course.materialsNeeded) {
                materialsNeeded = course.materialsNeeded
                    .split('*')
                    .filter(item => item)
                    .reduce((acc, item) => {
                         return acc +=  `\n- ${item}\n`;
                    }, '');
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
                            <ReactMarkdown
                                source={course.description}
                                escapeHtml={false}
                                />
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
                                {course.materialsNeeded ?
                                    <ReactMarkdown
                                        source={materialsNeeded}
                                        escapeHtml={false}
                                        list={true}
                                    />
                                : 
                                    'No materials estimated'
                                }
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
                {
                    !this.state.loading ?
                        result
                    :
                        '...'
                }

            </div>
        )
    }
    

}