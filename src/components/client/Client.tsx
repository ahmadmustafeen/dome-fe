'use client'
import { Client, ClientInfoCard, CreateClientModal, CreateNewClientCard } from '@/components';
import { clientService } from '@/services/client-service';
import { authService, } from '@/services/auth-service';
import { useEffect, useState } from 'react';
import { LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';


function ClientPage({ }: { params: { locale: string } }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [editData, setEditData] = useState<Client | null>(null);
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);

  const toggleCreateClientModal = () => {
    setShowCreateClientModal(!showCreateClientModal);
  };

  const fetchClients = async () => {
    // Logic to fetch clients from the server
    const response = await clientService.getAllClient() as Client[];
    if (response && Array.isArray(response)) {
      setClients(response);
    }
  };

  const deleteClient = async (clientId: string) => {
    await clientService.deleteClient(clientId);
    toast.success('Client deleted successfully');
    fetchClients();
  };

  const handleEdit = (client: Client) => {
    setEditData(client);
    toggleCreateClientModal();
  };

  const updateClient = async (clientId: string, updatedData: any) => {
    // Logic to update a client
    await clientService.updateClient(clientId, updatedData);
    toast.success('Client updated successfully');
    setEditData(null);
    toggleCreateClientModal();
    fetchClients();
  };

  const handleToggle = () => {
    toggleCreateClientModal();
    setEditData(null);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success('Logged out successfully');
      window.location.replace('/en/sign-in');
      // Redirect to login page or perform other actions after logout
    } catch (error) {
      console.log({ error });

      toast.error('An error occurred during logout');
    }
  }


  return (
    <div className="w-full">
      {showCreateClientModal && <CreateClientModal
        editData={editData ?? undefined}
        toggleModal={handleToggle} refetchClients={fetchClients}
        updateClient={updateClient}
      />}
      <div className='bg-primary w-full p-4 flex justify-between items-center'>
        <div>
          <Image src={'/assets/images/glenart-logo.png'} alt='Glenart Group Logo' width={120} height={120} />
        </div>
        <div className='w-fit h-full flex justify-center items-center gap-x-4'>
          <h2 className='text-base text-white w-40 text-right'>John Doe</h2>
          <div>
            <LogOutIcon className='text-white cursor-pointer' onClick={handleLogout} />
          </div>
        </div>
      </div>
      <div className='text-center my-6'>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-heading md:text-5xl lg:text-6xl">Clients</h1>
        <p className="text-lg font-normal text-body lg:text-xl sm:px-16 xl:px-48">Here you can manage and create new clients for your organization.</p>
      </div>
      <div className='my-5 w-4/5 mx-auto flex flex-wrap gap-4'>
        <CreateNewClientCard onClick={toggleCreateClientModal} />
        {clients.map((company, index) => (
          <ClientInfoCard key={index} client={company}
            handleDelete={() => deleteClient(company._id)}
            handleEdit={() => handleEdit(company)}
          />
        ))}
      </div>
    </div>
  );
}


export { ClientPage }