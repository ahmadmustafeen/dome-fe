import { Plus } from 'lucide-react'


const CreateNewClientCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className='border-2 group cursor-pointer hover:bg-primary transition-all duration-500 hover:scale-[105%] rounded-xl py-10 w-[32.2%] bg-transparent flex justify-center items-center flex-col' onClick={onClick} >
      <div className='bg-primary group-hover:bg-white transition-all duration-500 text-white group-hover:text-primary w-24 h-24 rounded-full flex justify-center items-center text-3xl mb-2'>
        <Plus />
      </div>
      <p className='text-primary group-hover:text-white transition-all duration-500 text-2xl my-2'>Create Client</p>
      <p className='text-primary group-hover:text-white transition-all duration-500 text-xs'>Click here to create a new client</p>
    </div>
  )
}

export { CreateNewClientCard }