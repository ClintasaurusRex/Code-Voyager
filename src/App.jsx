import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
        <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
          <div className='text-center'>
            <a href='https://vite.dev' target='_blank'>
              <img src={viteLogo} className='logo mx-auto' alt='Vite logo' />
            </a>
            <a href='https://react.dev' target='_blank'>
              <img
                src={reactLogo}
                className='logo react mx-auto'
                alt='React logo'
              />
            </a>
          </div>
          <h1 className='text-4xl font-bold text-gray-900 mb-8'>
            Vite + React
          </h1>
          <div className='bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4'>
            <button
              onClick={() => setCount((count) => count + 1)}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              count is {count}
            </button>
            <p className='mt-4 text-gray-600'>
              Edit <code className='bg-gray-100 px-1 rounded'>src/App.jsx</code>{' '}
              and save to test HMR
            </p>
          </div>
          <p className='text-gray-500 mt-4'>
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
