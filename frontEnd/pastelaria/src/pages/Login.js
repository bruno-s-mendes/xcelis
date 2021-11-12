import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectRoute:'',
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    const token = localStorage.getItem('token')
    if (token) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 'Authorization': token },
      }

      fetch('http://localhost:3100/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.role === 'admin') {
          console.log(data.role)
          this.setState({
            redirectRoute: '/admin'
          })
        }
        if(data.role === 'user') {
          console.log(data.role)
          this.setState({
            redirectRoute: '/user'
          })
        }
      })
      .catch(error => {
        console.log(error)
      });
    }
  }

  handleChanges(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    }
    let responseStatus;
    let responseData;
    
    await fetch('http://localhost:3100/login', requestOptions)
    .then(response => {
      responseStatus = response.status;
      return response.json();
    })
    .then(data => responseData = data)
    .catch(error => {
      console.log(error)
    });

    if (responseStatus === 200) {
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('role', responseData.role);
      if(responseData.role === 'admin') {
        console.log(responseData.role)
        this.setState({
          redirectRoute: '/admin'
        })
      }
      if(responseData.role === 'user') {
        console.log(responseData.role)
        this.setState({
          redirectRoute: '/user'
        })
      }
    }
  }

  render() {
    const { email, password, redirectRoute } = this.state;
    return (
      redirectRoute? <Redirect to={`${redirectRoute}`}/> :
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={ (event) => this.handleChanges(event)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={ (event) => this.handleChanges(event)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={ (event) => this.handleSubmit(event)}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

export default Login;