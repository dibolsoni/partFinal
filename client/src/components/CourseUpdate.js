import React, { Component } from 'react';
import Form from './Form';
import {Redirect} from 'react-router-dom';


export default class CourseUpdate extends Component {
    _isMounted = false;


  state = {
    id: '',
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    User: this.props.context.authenticatedUser,
    errors: [],
  }


getCourse = async (id) => {
    const { context } = this.props;
    await context.data.getCourse(id)
                          .then(course=>{
                            if (this._isMounted) {
                              this.setState({
                                id: course.id,
                                title: course.title,
                                description: course.description,
                                estimatedTime: course.estimatedTime,
                                materialsNeeded: course.materialsNeeded,
                                owner: `${course.User.firstName} ${course.User.lastName}`,
                                ownerId: course.User.id,
                                isOwner: course.User.id === context.authenticatedUser.id
                                });
                            }                         
                          })
                          .catch(err=> {
                            this.props.history.push('error')
                            return {errors: err};
                          });

    
}



componentDidMount() {
  this._isMounted = true;

  const { id } = this.props.match.params;
  this.getCourse(id);
    
}

componentWillUnmount() {
  this._isMounted = false;
}

  render() {
    const { isOwner } = this.state;
    console.log('owe', isOwner)

    let {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      owner,
    } = this.state;




    return (
      !isOwner && this._isMounted? 
        <Redirect to="/forbidden" />
      :
        <div className="bounds course--detail">
          <h1>Update Course</h1>
        <div>
          {<Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
                
                <React.Fragment>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                            <input className="input-title course--title--input" 
                                id="name" 
                                name="title" 
                                type="text"
                                value={title} 
                                onChange={this.change} 
                                placeholder="Course title..." />
                            </div>
                            <p>by  {owner}</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    value={description} 
                                    onChange={this.change} 
                                    placeholder="Course description..." />
                            </div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                      <input className="course--time--input"
                                          id="estimatedTime" 
                                          name="estimatedTime"
                                          type="text"
                                          value={estimatedTime} 
                                          onChange={this.change} 
                                          placeholder="Hours..." />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea 
                                            id="materialsNeeded" 
                                            name="materialsNeeded"
                                            value={materialsNeeded} 
                                            onChange={this.change} 
                                            placeholder="Use * to separate items..." />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </React.Fragment>
                
          )} />}
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;

    const {
        id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        User
      } = this.state;

    //user
    const course = {
        id,
        title,
        description,
        estimatedTime,
        materialsNeeded,
        userId: User.id
    };

    const user = User;
    user.password = User.password


    context.data.updateCourse(course, user)
      .then(errors => {
        if (errors.length) {
          this.setState({ errors: errors });
        } else {
              this.props.history.push('/');    
        };
        }
      )
      .catch( err => {
        // handle rejected promises
        console.log(err);
        //Render an "Error" Route
        this.props.history.push('/error'); //push to history stack
      });

  }

  cancel = () => {
    const {id} = this.state;
    this.props.history.push(`/courses/${id}`);
  }
}