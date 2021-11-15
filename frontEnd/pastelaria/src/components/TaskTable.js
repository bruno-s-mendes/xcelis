import React from 'react';

class TaskTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleChanges = this.handleChanges.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const { updateTasks } = this.props;
    const getusersoptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' , 'Authorization': token },
    }

    fetch('http://localhost:3100/task', getusersoptions)
    .then(response => response.json())
    .then(data => {
      updateTasks(data.tasks);
    })
    .catch(error => {
      console.log(error)
    });
  }

  handleChanges = (event, id) => {
    const token = localStorage.getItem('token');
    const updateTaskOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' , 'Authorization': token },
      body: JSON.stringify({
        status: event.target.value,
      })
    }
    fetch(`http://localhost:3100/task/${id}`, updateTaskOptions)
    .then(response => response.json())
    .catch(error => {
      console.log(error)
    });
  }

render() {
  const { taskList } = this.props;
  const role = localStorage.getItem('role');
  return (
    <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Usuario
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tarefa
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Prazo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taskList.map((task, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{task.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.deadline}</td>
                  { role === 'user'? 
                  <select
                    name="userId"
                    value={task.status}
                    onChange={ (event) => this.handleChanges(event, task.id)}
                    style={{border: "solid black 1px"}}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-indigo-500  rounded-md"
                  >
                    <option value='pending'>Pendente</option>)
                    <option value='complete'>Terminado</option>)
                  </select>
                  : <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.status}</td>
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )}
}

export default TaskTable;