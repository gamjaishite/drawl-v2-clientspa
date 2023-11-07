import {useState} from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import {Button} from '@/components/ui/button'

const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <main className='h-full w-full flex flex-1 flex-col justify-center items-center'>
      <div className='flex flex-row'>
        <a href='https://vitejs.dev' target='_blank'>
          <img
            src={viteLogo}
            className='h-48 p-6 filter delay-300 ease-in-out hover:drop-shadow-filter'
            alt='Vite logo'
          />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img
            src={reactLogo}
            className='h-48 p-6 animate-spin filter transition-shadow delay-300 hover:drop-shadow-react'
            alt='React logo'
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='p-8 flex flex-col items-center gap-4'>
        <Button
          className='w-fit'
          onClick={() => setCount((count) => count + 100)}
        >
          count is {count}
        </Button>
        <a href='/auth/login'>
          <Button className='w-fit'>
            Login
          </Button>
        </a>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='text-[#888]'>
        Click on the Vite and React logos to learn more
      </p>
    </main>
  )
}

export default Home
