import { Edit2Icon, Trash } from 'lucide-react'
import { AppButton } from '../common';


export interface Site {
  _id: string;
  name: string;
  address: string;
  startDate: string;
  timeline: string;
  zipCode: string;
  country: string;
  city: string;
  state: string;
  address1: string;
  address2: string
}

export interface iSiteInfoCard {
  site: Site,
  handleDelete: () => void,
  handleEdit: () => void,
  onSelectSite: () => void
}


const SiteInfoCard = ({ site, handleDelete, handleEdit, onSelectSite }: iSiteInfoCard) => {

  return (
    <div className='border relative transition-all duration-500 rounded-xl py-10 w-[32.2%] bg-primary flex justify-center items-center flex-col'>
      <div onClick={onSelectSite} className='absolute underline cursor-pointer top-2 right-2 text-white text-sm'>
        Continue
      </div>
      <div className='w-11/12 mx-auto flex flex-col items-center text-center gap-y-1'>
        <p className='text-white text-xl my-2'>{site.name}</p>
        <p className='text-white text-xs'>Site Address: {site.address1}</p>
        {site.address2 ? <p className='text-white text-xs'>{site.address2}</p> : null}
        <p className="text-white text-xs">Start From: {site.startDate}</p>
        <p className="text-white text-xs">Timeline: {site.timeline} weeks</p>
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

export { SiteInfoCard };