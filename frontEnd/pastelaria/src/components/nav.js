/* This example requires Tailwind CSS v2.0+ */
import React from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectRoute:'',
    };
    // this.handleChanges = this.handleChanges.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  classNames (...classes) {
    return classes.filter(Boolean).join(' ')
  }

render() {
  return (
    <nav className="bg-gray-800 flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
      <div className="flex space-x-4">
        <button className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>users</button>
        <button className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>list</button>
      </div>
      <button className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>logoff</button>
    </nav>
  )}
}

export default Nav;