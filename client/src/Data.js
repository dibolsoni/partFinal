import config from './config';

export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null ) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
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
  async getUser(username, password) {
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
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
      });
    } else {
      throw new Error("Can't got course");
    }
  }

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
      throw new Error();
    }
  }

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
      throw new Error();
    }
  }
}
