import React from 'react';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      content: '',
      deadline: '',
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
    const { userId, content, deadline } = this.state;
    const { changeNav } = this.props
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' , 'Authorization': token },
      body: JSON.stringify({
        userId,
        content,
        deadline,
      }),
    }
    fetch('http://localhost:3100/task', requestOptions)
    .then(response => {
      if (response.status === 201) {
        changeNav('task');
      }
    })
    .catch(error => console.log(error));
  }

  render() {
    const { userId, content, deadline} = this.state;
    const { userList } = this.props;
    return (
      <form 
      style={{display: 'flex', flexDirection: 'column'}}
      className="mt-8 space-y-6 min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
            Usuário
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
          <select
            name="userId"
            value={userId}
            onChange={ (event) => this.handleChanges(event)}
            style={{border: "solid black 1px"}}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
          >{
              userList.map((user) => {
                return(<option value={user.id}>{user.name}</option>)
              })
            }
          </select>
        </div>
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
            Prazo de entrega
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="date"
              name="deadline"
              value={deadline}
              onChange={ (event) => this.handleChanges(event)}
              style={{border: "solid black 1px"}}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
            />
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Tarefa
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="text"
              name="content"
              value={content}
              onChange={ (event) => this.handleChanges(event)}
              style={{border: "solid black 1px"}}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
            />
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

export default AddTask;