import config from './config';

export default class Data {
  /**
   * Fetch data with API
   * @param path url from API
   * @param method method for header
   * @param body body values passed into
   * @param requiresAuth true if needs to be authenticated
   * @param credentials if need to be auth pass username and password 
   * @returns [promise] of the fecthing with API
   */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null ) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'max-age=31557600'
      },
      // async: true,
      // crossDomain: true,
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth && credentials) {
      const {username, password} = credentials;
      const encodedCredentials = btoa(`${username}:${password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options)
           
  }

  // USER
  /**
   * Get user from API
   * @param username as emailAddress to be validated
   * @param password hashed or unhashed to be validated
   * @returns [object] if authenticated or [array] errors if not
   */
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password })
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return response.json().then(data => {
        if (data.code) {
          const result = Array(data.message)
          return result;
        } else {
          return data.errors
        }

      });
    }
    else {
      throw new Error();
    }
  }
  
  /**
   * Creates a new user in API
   * @param user object with all attributes
   * @returns [array] empty if ok and errors if not  
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        if (data.code) {
          const result = Array(data.message)
          return result;
        } else {
          return data.errors
        }

      });
    }
    else {
      throw new Error();
    }
  }

  // COURSES
  /**
   * Get a list of courses in API
   * @returns [array] of courses if ok or errors if not
   */
  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data.courses);
    } else if (response.status === 500) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error("Can't got courses");
    }
  }

  /**
   * Get a course in API
   * @param id - from the course
   * @returns [object] of course if ok or [array] errors if not
   */
  async getCourse(id){
    if (!id) {
      throw new Error("No course sent");
    }
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data.courses);
    } else if (response.status === 500) {
      return response.json().then(data => {
        return data.errors;
      }
    )} else if (response.status === 404) {
      throw new Error('Course not found',404);
    }
  }

  /**
   * Creates a course in API
   * @param course [object] of the course
   * @param user [object] that owner the course
   * @returns [object] of course if ok or [array] errors if not
   */
  async createCourse(course, user) {
    const response = await this.api('/courses', 'POST', course, true, user)
    if (response.status === 201) {
      return course;
    }
    else if (response.status === 400) {
       return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error('Course not created',500);
    }
  }

  /**
   * Updates a course in API
   * @param course [object] of the course
   * @param user [object] that owner the course
   * @returns [object] of course if ok or [array] errors if not
   */
  async updateCourse(course, user) {
    const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, user)
    if (response.status === 204) {
      return course;
    }
    else if (response.status >= 400) {
       return response.json().then(data => {
        if (data.code) {
          const result = Array(data.message)
          return result;
        } else {
          return data.errors
        }
      });
    }
    else {
      throw new Error('Course not updated',500);
    }
  }

  /**
   * Deletes a course in API
   * @param id [int] of the course
   * @param user [object] that owner the course
   * @returns [null] if ok or [array] errors if not
   */
  async deleteCourse(id, user) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, user)
    if (response.status === 204) {
      return null;
    }
    else if (response.status >= 400) {
       return response.json().then(data => {
         console.log('data', data)
        if (data.code) {
          const result = Array(data.message)
          return result;
        } else {
          return data.errors
        }
      });
    }
    else {
      throw new Error('Course not deleted',500);
    }
  }
}
