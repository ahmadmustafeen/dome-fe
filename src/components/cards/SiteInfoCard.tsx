import { Edit2Icon, Trash } from 'lucide-react'


export interface Site {
  _id: string;
  name: string;
  address: string;
  startDate: string;
  timeline: string;
}

const SiteInfoCard = ({ site, handleDelete, handleEdit, onSelectClient }: { site: Site, handleDelete: () => void, handleEdit: () => void, onSelectClient: () => void }) => {
  return (
    <div className='border cursor-pointer hover:bg-secondary transition-all duration-500 hover:scale-[105%] rounded-xl py-10 w-[32.2%] bg-primary flex justify-center items-center flex-col' onClick={onSelectClient}>
      <div className='bg-white text-primary w-24 h-24 rounded-full flex justify-center items-center text-3xl mb-2'>
        <p>{site.name.split("")?.[0]}</p>
      </div>
      <div className='w-11/12 mx-auto flex flex-col justify-center items-center text-center gap-y-1'>
        <p className='text-white text-2xl my-2'>{site.name}</p>
        <p className='text-white text-xs'>{site.address}</p>
        <p className="text-white text-xs">{site.startDate}</p>
        <p className="text-white text-xs">{site.timeline}</p>
      </div>
      <div className='flex gap-x-2 mt-5'>
        <button
          onClick={handleEdit}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg mr-2 flex justify-center items-center gap-x-2 cursor-pointer"><Edit2Icon size={14} /> Edit</button>
        <button
          onClick={handleDelete}
          className="bg-red-700 text-white px-4 py-2 rounded-lg flex justify-center items-center gap-x-2 cursor-pointer"><Trash size={14} /> Delete</button>
      </div>
    </div>
  )
}

export { SiteInfoCard };