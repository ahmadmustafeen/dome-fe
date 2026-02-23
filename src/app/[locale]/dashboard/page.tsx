'use client'
import { Button, ClientInfoCard } from '@/components';


const client = [
  {
    name: "Element Critical",
    address: "7990 Quantum Drive, Vienna, VA 22182",
    phone: "855-234-6493",
    email: "corporate@elementcritical.com"
  }, {
    name: "Acme Corp",
    address: "123 Main St, Anytown, USA",
    phone: "555-123-4567",
    email: "info@acmecorp.com"
  },
  {
    name: "Element Critical",
    address: "7990 Quantum Drive, Vienna, VA 22182",
    phone: "855-234-6493",
    email: "corporate@elementcritical.com"
  }, {
    name: "Acme Corp",
    address: "123 Main St, Anytown, USA",
    phone: "555-123-4567",
    email: "info@acmecorp.com"
  },
  {
    name: "Acme Corp",
    address: "123 Main St, Anytown, USA",
    phone: "555-123-4567",
    email: "info@acmecorp.com"
  }
]


export default function DashboardPage() {


  return (
    <div className="w-full">
      <div className='bg-primary w-full py-3 px-6 flex justify-between items-center'>
        <h2 className='text-xl text-white font-bold'>Glenart Group </h2>
        <div className='w-fit h-full flex justify-center items-center gap-x-4'>
          <Button variant="default" onClick={() => { }} text='Log Out' />
        </div>
      </div>
      <h1 className="text-4xl mt-10 w-full mx-auto text-center">Select or Create Client</h1>
      <div className='w-4/5 flex mx-auto justify-end'>
        <div className='w-40'>
          <Button variant="bg-transparent hover:bg-primary !border !border-primary !text-primary hover:!text-white" onClick={() => { }} text='Create Client' />
        </div>
      </div>
      <div className='my-5 w-4/5 mx-auto flex flex-wrap gap-4'>
        {client.map((company, index) => (
          <ClientInfoCard key={index} client={company} />
        ))}
      </div>
    </div>
  );
}
