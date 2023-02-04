import React from 'react';
import ReactDOM  from 'react-dom';

const Loader = () => {
  return ReactDOM.createPortal(
      <div className='w-full h-screen absolute bg-gray-600 justify-center items-center flex flex-col gap-20 z-50' style={{backgroundColor: "rgba(51, 51, 51, 0.8)"}}>
          <div className='w-40 h-16 border-4 border-dashed rounded-full animate-spin border-white z-10'>
            
          </div>
          <h1 className='text-white font-bold z-10'>Loading ...</h1>
    </div>, document.getElementById("loader")
  );
};

export default Loader;
