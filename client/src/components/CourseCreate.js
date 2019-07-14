import React, { Component } from 'react';
import Form from './Form';

export default class CourseCreate extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    userId: null,
    errors: [],
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <div className="bounds course--detail">
          <h1>Create Course</h1>
        <div>
                <h2 className="validation--errors--label">Validation Errors</h2>
                <div className="validation-errors">
                    <ul>
                        <li>Please provide a value for "Title"</li>
                    </ul>
                </div>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
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
                
            )} />
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
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors,
      } = this.state;
    
    const User = context.authenticatedUser;

    //user
    const course = {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors,
        User
    };
    console.log(course)

    context.data.createCourse(course)
      .then(location => {
        if (location) {
            console.log('location:', location)
            // this.props.history.push(location)
        } else {
            console.log(location)
        }
      })
      .catch( err => {
        // handle rejected promises
        console.log(err);
        //Render an "Error" Route
        this.props.history.push('/error'); //push to history stack
      });

  }

  cancel = () => {
    this.props.history.push('/');
  }
}
