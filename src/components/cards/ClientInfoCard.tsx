import { formatPhoneNumber } from '@/utils/Helpers';
import { Edit2Icon, Trash } from 'lucide-react'
import { AppButton } from '../common';


export interface Client {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const ClientInfoCard = ({ client, handleDelete, handleEdit, onSelectClient }: { client: Client, handleDelete: () => void, handleEdit: () => void, onSelectClient: () => void }) => {
  return (
    <div className='border relative rounded-xl py-10 w-[32.2%] bg-primary flex justify-center items-center flex-col'>
      <div onClick={onSelectClient} className='absolute underline cursor-pointer top-2 right-2 text-white'>
        Continue
      </div>
      <div className='bg-white text-primary w-24 h-24 rounded-full flex justify-center items-center text-3xl mb-2'>
        <p>{client.name.split("")?.[0]}</p>
      </div>
      <div className='w-11/12 mx-auto flex flex-col justify-center items-center text-center gap-y-1'>
        <p className='text-white text-2xl my-2'>{client.name}</p>
        <p className='text-white text-sm'>Address: {client.address}</p>
        <p className="text-white text-sm">Phone: {formatPhoneNumber(client.phone)}</p>
        <p className="text-white text-sm">Email: {client.email}</p>
      </div>
      <div className='flex gap-x-2 mt-5'>
        <AppButton
          onClick={handleEdit}
          variant='secondary'
          icon={<Edit2Icon size={14} />}
          title='Edit'
        />
        <AppButton
          onClick={handleDelete}
          variant='default'
          icon={<Trash size={14} />}
          title='Delete'
        />
      </div>
    </div>
  )
}

export { ClientInfoCard };