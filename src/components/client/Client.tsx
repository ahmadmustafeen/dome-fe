'use client'
import { Client, ClientInfoCard, CreateClientModal, CreateNewClientCard, DeleteConfirmationScreen, HeadingWithDescription, ScreenLoader } from '@/components';
import { clientService } from '@/services/client-service';
import { authService, } from '@/services/auth-service';
import { useEffect, useState } from 'react';
import { LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';


function ClientPage({ }: { params: { locale: string } }) {
  const router = useRouter()
  const { setClient } = useAppContext();
  const [isClientsLoading, setIsClientLoading] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const [clients, setClients] = useState<Client[]>([]);
  const [editData, setEditData] = useState<Client | null>(null);
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);

  const toggleCreateClientModal = () => {
    setShowCreateClientModal(!showCreateClientModal);
  };

  const fetchClients = async () => {
    try {
      setIsClientLoading(true)
      const response = await clientService.getAllClient() as Client[];
      if (response && Array.isArray(response)) {
        setClients(response);
      }
    } finally {
      setTimeout(() => {
        setIsClientLoading(false)
      }, 500)
    }
  };

  const deleteClient = async (clientId: string) => {
    await clientService.deleteClient(clientId);
    setDeleteId("")
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

  const selectClient = (id: string) => {
    setClient(clients.find(client => client._id === id) ?? null)
    router.push(`dashboard/client`)
  }


  return (
    <div className="w-full">
      {deleteId &&
        <DeleteConfirmationScreen
          heading="Delete Site"
          description='Are you sure you want to delete the site? This action is irreversible.'
          handleCancel={() => setDeleteId("")}
          handleContinue={() => deleteClient(deleteId)}
        />
      }
      {isClientsLoading &&
        <ScreenLoader
          heading="Loading"
          description='Clients are loading, please wait'
        />
      }
      {showCreateClientModal && <CreateClientModal
        editData={editData ?? undefined}
        toggleModal={handleToggle} refetchClients={fetchClients}
        updateClient={updateClient}
      />}
      <div className='bg-primary w-full p-4 flex justify-between items-center'>
        <div>
          <Image
            src={'/assets/images/glenart-logo.png'}
            alt='Glenart Group Logo'
            width={120}
            height={120}
          />
        </div>
        <div className='w-fit h-full flex justify-center items-center gap-x-4'>
          <h2 className='text-base text-white w-40 text-right'>John Doe</h2>
          <div>
            <LogOutIcon
              className='text-white cursor-pointer'
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
      <HeadingWithDescription
        title='Clients'
        description='Here you can manage and create new clients for your organization.'
      />
      <div className='my-5 w-4/5 mx-auto flex flex-wrap gap-4'>
        <CreateNewClientCard
          onClick={toggleCreateClientModal}
        />
        {clients.map((company, index) => (
          <ClientInfoCard
            key={index}
            client={company}
            onSelectClient={() => selectClient(company._id)}
            handleDelete={() => setDeleteId(company._id)}
            handleEdit={() => handleEdit(company)}
          />
        ))}
      </div>
    </div>
  );
}


export { ClientPage }