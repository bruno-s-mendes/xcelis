import React from 'react';

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      birth: '',
      phone: '',
      cell: '',
      email: '',
      password: '',
      role: 'admin',
    };
    this.handleChanges = this.handleChanges.bind(this);
  }

  handleChanges(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem('token')
    const { username, birth, phone, cell, email, password, role } = this.state;
    const { changeNav } = this.props
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , 'Authorization': token },
      body: JSON.stringify({
        name: username,
        birth,
        phone,
        cell,
        email,
        password,
        role,
      }),
    }
    console.log(requestOptions.body);
    fetch('http://localhost:3100/user', requestOptions)
    .then(response => {
      if (response.status === 201) {
        changeNav('user');
      }
    })
    .catch(error => {
      console.log(error.message)
    });
  }

  render() {
    const { username, birth, phone, cell, email, password, role} = this.state;
    return (
      <form 
      style={{display: 'flex', flexDirection: 'column'}}
      className="mt-8 space-y-6 min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="username"
              value={username}
              onChange={ (event) => this.handleChanges(event)}
              style={{border: "solid black 1px"}}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
            />
          </div>
        </div>
        <div>
          <label htmlFor="birth" className="block text-sm font-medium text-gray-700">
            Data de Nascimento
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="date"
              name="birth"
              value={birth}
              onChange={ (event) => this.handleChanges(event)}
              style={{border: "solid black 1px"}}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
            />
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Telefone
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={ (event) => this.handleChanges(event)}
              style={{border: "solid black 1px"}}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
            />
          </div>
        </div>
        <div>
          <label htmlFor="cell" className="block text-sm font-medium text-gray-700">
            Celular
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              name="cell"
              value={cell}
              onChange={ (event) => this.handleChanges(event)}
              style={{border: "solid black 1px"}}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="email"
              name="email"
              value={email}
              onChange={ (event) => this.handleChanges(event)}
              style={{border: "solid black 1px"}}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Senha
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="password"
              value={password}
              onChange={ (event) => this.handleChanges(event)}
              style={{border: "solid black 1px"}}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
            />
          </div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
          <select
            name="role"
            value={role}
            onChange={ (event) => this.handleChanges(event)}
            style={{border: "solid black 1px"}}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
          >
            <option value='admin'>admin</option>
            <option value='user'>user</option>
          </select>
        </div>
        </div>
        <button
              type="submit"
              className="group flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={ (event) => this.handleSubmit(event)}
            >
              Adicionar
            </button>
      </form>
    
    );
  }
}

export default AddUser;