// import React from 'react'

// const Navbar = () => {
//   return (
//     <nav className='bg-slate-900 text-white '>
//       <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">


//         <div className="logo font-bold text-xl">
//           <span className='text-green-700'>&lt;</span>
          
//           Passworlds
//           <span className='text-green-700'>/ &gt;</span>

//         </div>
//         <ul>
//           <li className='flex gap-4 '>
//             <a className='hover:font-bold' href="#">Home</a>
//             <a className='hover:font-bold' href="#">About</a>
//             <a className='hover:font-bold' href="#">Contact</a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   )
// }

// export default Navbar

import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-xl">
          <span className="text-green-700">&lt;</span>
          Passworlds
          <span className="text-green-700">/ &gt;</span>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="block md:hidden focus:outline-none"
        >
          <lord-icon
            src="https://cdn.lordicon.com/xhcrhqyz.json"
            trigger="hover"
            style={{ width: "30px", height: "30px" }}
          ></lord-icon>
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex bg-slate-900 md:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li className="flex flex-col md:flex-row gap-4 items-center md:items-center px-4 py-2 md:p-0">
            <a className="hover:font-bold" href="#">Home</a>
            <a className="hover:font-bold" href="#">About</a>
            <a className="hover:font-bold" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
