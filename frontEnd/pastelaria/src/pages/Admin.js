import React from 'react';
// import { Redirect } from 'react-router-dom';
import Nav from '../components/nav';
import Table from '../components/table';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChanges = this.handleChanges.bind(this);
  }


  handleChanges(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    return (
     <div>
       <Nav />
       <Table />
     </div>
    );
  }
}

export default Admin;