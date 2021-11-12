import React from 'react';
import { Redirect } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectRoute:'',
    };
    // this.handleChanges = this.handleChanges.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
logoff = () => {
  localStorage.clear();
  this.setState({
    redirectRoute: '/login',
  })
}
render() {
  const { user, navButtons, changeNav } = this.props
  const { redirectRoute } = this.state;
  return (
    redirectRoute? <Redirect to={`${redirectRoute}`}/> :
    <nav className="bg-gray-800 flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
      <div className= 'text-gray-300 px-3 py-2 rounded-md text-sm font-medium'>{`Bem vindo ${user}`}</div>
      <div className="flex space-x-4">
        {navButtons? navButtons.map((navItem) => {
            return( <button className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              onClick={() => changeNav(navItem.value)}
            >
              {navItem.name}
            </button>)
          }) : <>Loading</>
        }
      </div>
      <button className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
      onClick={(()=> this.logoff())}
      >logoff</button>
    </nav>
  )}
}

export default Nav;