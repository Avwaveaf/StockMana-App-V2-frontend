import React from 'react';
import { GiLockedChest } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import heroSVG from '../../assets/undraw_projections_re_ulc6.svg';

import bgSVG from '../../assets/topography.svg';
import ProtectedRoutes, { ShowOnLogOut } from '../../components/protect/ProtectedRoutes.component';

const Home = () => {
  return (
    <>
      <div className='absolute inset-0  h-screen w-full -z-50 '>
        <img src={bgSVG} alt='' className='h-full w-full object-cover' />
      </div>
      <header className='text-gray-600 py-2 bg-white shadow-md body-font px-10 '>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <nav className='flex lg:w-2/5 gap-5 flex-wrap items-center text-base md:ml-auto'>
            <ShowOnLogOut>
              <Link to='/login' className='hover:text-gray-900'>
                Login
              </Link>
              <Link to='/register' className='hover:text-gray-900'>
                Register
              </Link>
            </ShowOnLogOut>
          </nav>
          <Link
            to='/'
            className='flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0'
          >
            <GiLockedChest size={30} />
            <span className='ml-3 text-xl font-bold'>StockMana</span>
          </Link>
          <div className='lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0'>
            <button className='inline-flex items-center bg-red-400 border-0 py-1 px-3 focus:outline-none animate-pulse hover:animate-none text-white  hover:bg-red-500 rounded text-base mt-4 md:mt-0'>
              <ShowOnLogOut>
              <Link to='/register'>Get Started</Link>
              </ShowOnLogOut>
              <ProtectedRoutes>
              <Link to='/dashboard'>Dashboard</Link>
              </ProtectedRoutes>
            </button>
          </div>
        </div>
      </header>

      <section className='text-gray-600 body-font px-10 '>
        <div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
          <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 lg:bg-gray-100 lg:p-10 hidden lg:block'>
            <img
              className='object-cover object-center rounded'
              alt='hero'
              src={heroSVG}
            />
          </div>
          <div className='lg:flex-grow bg-white p-5  md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center'>
            <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
              StockMana
              <br className='hidden lg:inline-block' />
              Your Inventory and Stock Management Solution
            </h1>
            <p className='mb-8 leading-relaxed text-justify'>
              Take control of your business like never before with StockMana.
              Our app revolutionizes the way you manage your inventory and
              stock, making it easier than ever to keep track of your assets.
              With our user-friendly interface, advanced reporting features, and
              real-time updates, you'll have a complete overview of your entire
              business operations. Say goodbye to manual processes, Excel
              sheets, and headaches. Say hello to StockMana, your inventory and
              stock management solution. Empower your business with StockMana
              today!"
            </p>
            <div className='flex lg:flex-row md:flex-col'>
              <button className='bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center hover:bg-gray-200 focus:outline-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='w-6 h-6'
                  viewBox='0 0 512 512'
                >
                  <path d='M99.617 8.057a50.191 50.191 0 00-38.815-6.713l230.932 230.933 74.846-74.846L99.617 8.057zM32.139 20.116c-6.441 8.563-10.148 19.077-10.148 30.199v411.358c0 11.123 3.708 21.636 10.148 30.199l235.877-235.877L32.139 20.116zM464.261 212.087l-67.266-37.637-81.544 81.544 81.548 81.548 67.273-37.64c16.117-9.03 25.738-25.442 25.738-43.908s-9.621-34.877-25.749-43.907zM291.733 279.711L60.815 510.629c3.786.891 7.639 1.371 11.492 1.371a50.275 50.275 0 0027.31-8.07l266.965-149.372-74.849-74.847z'></path>
                </svg>
                <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 mb-1'>GET IT ON</span>
                  <span className='title-font font-medium'>Google Play</span>
                </span>
              </button>
              <button className='bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center lg:ml-4 md:ml-0 ml-4 md:mt-4 mt-0 lg:mt-0 hover:bg-gray-200 focus:outline-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  className='w-6 h-6'
                  viewBox='0 0 305 305'
                >
                  <path d='M40.74 112.12c-25.79 44.74-9.4 112.65 19.12 153.82C74.09 286.52 88.5 305 108.24 305c.37 0 .74 0 1.13-.02 9.27-.37 15.97-3.23 22.45-5.99 7.27-3.1 14.8-6.3 26.6-6.3 11.22 0 18.39 3.1 25.31 6.1 6.83 2.95 13.87 6 24.26 5.81 22.23-.41 35.88-20.35 47.92-37.94a168.18 168.18 0 0021-43l.09-.28a2.5 2.5 0 00-1.33-3.06l-.18-.08c-3.92-1.6-38.26-16.84-38.62-58.36-.34-33.74 25.76-51.6 31-54.84l.24-.15a2.5 2.5 0 00.7-3.51c-18-26.37-45.62-30.34-56.73-30.82a50.04 50.04 0 00-4.95-.24c-13.06 0-25.56 4.93-35.61 8.9-6.94 2.73-12.93 5.09-17.06 5.09-4.64 0-10.67-2.4-17.65-5.16-9.33-3.7-19.9-7.9-31.1-7.9l-.79.01c-26.03.38-50.62 15.27-64.18 38.86z'></path>
                  <path d='M212.1 0c-15.76.64-34.67 10.35-45.97 23.58-9.6 11.13-19 29.68-16.52 48.38a2.5 2.5 0 002.29 2.17c1.06.08 2.15.12 3.23.12 15.41 0 32.04-8.52 43.4-22.25 11.94-14.5 17.99-33.1 16.16-49.77A2.52 2.52 0 00212.1 0z'></path>
                </svg>
                <span className='ml-4 flex items-start flex-col leading-none'>
                  <span className='text-xs text-gray-600 mb-1'>
                    Download on the
                  </span>
                  <span className='title-font font-medium'>App Store</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className='text-gray-600 body-font p-5'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='xl:w-1/2 lg:w-3/4 w-full mx-auto text-center'>
            <img
              alt='testimonial'
              className='w-40 h-40 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100'
              src='https://avatars.githubusercontent.com/u/49422146?s=400&u=5b8daa9cb7887165bae6c63b8f44ef6d52773c42&v=4'
            />
            <p className='leading-relaxed text-lg text-justify'>
              "Hello and welcome! I'm a Junior Software Engineer with expertise
              in both front-end and back-end development. I have been fortunate
              enough to work on the development of StockMana, a cutting-edge
              inventory and stock management solution. With my passion for
              coding and my commitment to delivering high-quality solutions, I
              have been able to contribute to the success of StockMana. I
              believe in writing clean and efficient code, and I am always
              striving to learn and improve my skills. I am excited to continue
              working on innovative projects like StockMana and am eager to see
              what the future holds for my career as a software engineer."
            </p>
            <span className='inline-block h-1 w-10 rounded bg-red-500 mt-8 mb-6'></span>
            <h2 className='text-gray-900 font-medium title-font tracking-wider text-sm'>
              Muhamad Afif Fadillah
            </h2>
            <p className='text-gray-500'>Junior Software Engineer</p>
            <span className='inline-flex mt-5'>
              <a
                className='text-gray-500 cursor-pointer'
                href='https://github.com/Avwaveaf'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </a>
              <a
                className='ml-2 text-gray-500 cursor-pointer'
                href='https://www.linkedin.com/in/muhamad-afif-fadillah-9bab0221a/'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
