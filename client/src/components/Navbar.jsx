import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux';
import CartScreen from '../pages/CartScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlices';
import { useNavigate } from 'react-router';
import { resetCart } from '../slices/cartSlice';
import useUserStatus from '../hooks/useUserStatus';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const userStatus = useUserStatus();

  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    try{

      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      
      navigate("/login")
    }catch(err){
      console.log(err);
    }
  }


  const {cartItems} = useSelector(state => state.cart)
  
  const totalCartItems = cartItems.length > 0 ? cartItems.reduce((acc, item) => {
    return acc + item.qty;
  }, 0) : 0;
  
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 fixed w-screen z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                {/* Search bar */}
                <div className="ml-6">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-900 text-white p-2 rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className='text-gray-400 text-xs'>{totalCartItems}</div>
                <button
                  onClick={toggleCart}
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
                  >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {
                    userStatus ?
                      (<div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          />
                      </Menu.Button>
                      </div>): 
                      (
                        <div className='w-20 h-8 text-center font-semibold rounded border bg-blue-100 duration-300 hover:bg-gray-900 hover:border-red-100 hover:text-blue-100 '>
                          <Link to="/login">
                            <button className='py-1'>Login</button>
                          </Link>
                        </div>
                        
                      )
                  }
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                          onClick={handleLogout}
                            className={classNames(active ? 'bg-gray-100' : '', 'text-left w-[100%] h-[100%] block px-4 py-2 text-sm text-gray-700')}
                          >
                            Log Out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          {isCartOpen && <CartScreen status={true} />}
          </div>
        </>
      )}
    </Disclosure>
  )
}
