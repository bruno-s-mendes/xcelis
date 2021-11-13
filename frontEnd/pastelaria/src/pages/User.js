import React from 'react';
import AddTask from '../components/AddTask';
import AddUser from '../components/AddUser';
import UserTable from '../components/UserTable';
import Nav from '../components/Nav';



class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userId: '',
      role:'',
      taskList: [],
      userList: [],
      navButtons: [],
      selectedNav: '',
    };
    this.updateUsers = this.updateUsers.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 'Authorization': token },
      }

      fetch('http://localhost:3100/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        this.setState({
          user: data.name,
          role:data.role,
          userId: data.userId,
        });
        if (data.role === 'admin') {
          this.setState({
            navButtons: [
              {name: 'Usuários', value: 'users'},
              {name: 'Novo Usuários', value: 'addUser'},
              {name: 'Tarefas', value: 'tasks'},
              {name: 'Nova Tarefa', value: 'addTask'},
            ],
            selectedNav: 'users',
          });
        }
        if (data.role === 'user') {
          this.setState({
            navButtons: [
              {name: 'Tarefas', value: 'tasks'},
            ],
            selectedNav: 'tasks',
          });
        }
      })
      .catch(error => {
        console.log(error)
      });
    }
    if (role === 'admin') {
      const getusersoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' , 'Authorization': token },
      }
  
      fetch('http://localhost:3100/user', getusersoptions)
      .then(response => response.json())
      .then(data => {
        this.setState({
          userList: data.users,
        })
      })
      .catch(error => {
        console.log(error)
      });
    }

    const getTaskOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' , 'Authorization': token },
    }
    fetch('http://localhost:3100/task', getTaskOptions)
    .then(response => response.json())
    .then(data => {
      this.setState({
        taskList: data.tasks,
      })
    })
    .catch(error => {
      console.log(error)
    });
  }

  changeNav = (nav) => {
    this.setState({
      selectedNav: nav
    })
  }

  updateUsers = (users) => {
    this.setState({
      userList: users
    })
  }

  render() {
    const { user, navButtons, selectedNav, userList } = this.state;
    console.log(selectedNav);
    switch (selectedNav) {
      case ('addUser'):
        return (
          <div>
            <Nav user={user} navButtons={navButtons} changeNav={this.changeNav}/>
            <AddUser changeNav={this.changeNav}/>
          </div>
         );
         case ('addTask'):
          return (
            <div>
              <Nav user={user} navButtons={navButtons} changeNav={this.changeNav}/>
              <AddTask changeNav={this.changeNav} userList={userList}/>
            </div>
           );
           case ('users'):
            return (
              <div>
                <Nav user={user} navButtons={navButtons} changeNav={this.changeNav}/>
                <UserTable userList={userList} updateUsers={this.updateUsers} changeNav={this.changeNav}/>
              </div>
             );
      default:
        return (
          <div>
            <Nav user={user} navButtons={navButtons} changeNav={this.changeNav}/>
          </div>
         );
    }
  }
}

export default Admin;