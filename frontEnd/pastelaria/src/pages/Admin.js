import React from 'react';
// import { Redirect } from 'react-router-dom';
import Nav from '../components/nav';
import Table from '../components/table';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      userId: '',
      role:'',
      // taskList: [],
      // userList: [],
      navButtons: [],
      selectedNav: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
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
  }

  changeNav = (nav) => {
    this.setState({
      selectedNav: nav
    })
  }

  // componentDidUpdate() {
  //   const token = localStorage.getItem('token')
  //   const { userId, role } = this.state;

  //   if (role === 'admin') {
  //     const getusersoptions = {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' , 'Authorization': token },
  //     }
  
  //     fetch('http://localhost:3100/user', getusersoptions)
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({
  //         userList: data.user,
  //       })
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     });
  //   }
  // }

  render() {
    const { user, navButtons, selectedNav } = this.state;
    console.log(selectedNav);
    return (
     <div>
       <Nav user={user} navButtons={navButtons} changeNav={this.changeNav}/>
       <Table />
     </div>
    );
  }
}

export default Admin;