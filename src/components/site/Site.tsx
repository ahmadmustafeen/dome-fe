'use client'
import { Site, SiteInfoCard, HeadingWithDescription, CreateNewSiteCard, CreateSiteModal } from '@/components';
import { siteService } from '@/services/site-service';
import { authService, } from '@/services/auth-service';
import { useEffect, useState } from 'react';
import { LogOutIcon } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


function SitePage({ params }: { params: { locale: string, clientId: string } }) {

  const router = useRouter()
  const [sites, setSites] = useState<Site[]>([]);
  const [editData, setEditData] = useState<Site | null>(null);
  const [showCreateSiteModal, setshowCreateSiteModal] = useState(false);

  const toggleCreateClientModal = () => {
    setshowCreateSiteModal(!showCreateSiteModal);
  };

  const fetchSites = async () => {
    // Logic to fetch sites from the server
    const response = await siteService.getAllSite() as Site[];
    if (response && Array.isArray(response)) {
      setSites(response);
    }
  };

  const deleteClient = async (clientId: string) => {
    await siteService.deleteSite(clientId);
    toast.success('Site deleted successfully');
    fetchSites();
  };

  const handleEdit = (client: Site) => {
    setEditData(client);
    toggleCreateClientModal();
  };

  const updateClient = async (clientId: string, updatedData: any) => {
    // Logic to update a client
    await siteService.updateSite(clientId, updatedData);
    toast.success('Client updated successfully');
    setEditData(null);
    toggleCreateClientModal();
    fetchSites();
  };

  const handleToggle = () => {
    toggleCreateClientModal();
    setEditData(null);
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success('Logged out successfully');
      window.location.replace('/en/sign-in');
      // Redirect to login page or perform other actions after logout
    } catch (error) {
      toast.error('An error occurred during logout');
    }
  }

  const selectClient = (id: string) => {
    router.push(`dashboard/${id}`)
  }


  return (
    <div className="w-full">
      {showCreateSiteModal && <CreateSiteModal
        clientId={params.clientId}
        editData={editData ?? undefined}
        toggleModal={handleToggle} refetchClients={fetchSites}
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
      <HeadingWithDescription title='Sites' description='Here you can manage and create new sites for your organization.' />
      <div className='my-5 w-4/5 mx-auto flex flex-wrap gap-4'>
        <CreateNewSiteCard onClick={toggleCreateClientModal} />
        {sites.map((site, index) => (
          <SiteInfoCard key={index} site={site}
            onSelectClient={() => selectClient(site._id)}
            handleDelete={() => deleteClient(site._id)}
            handleEdit={() => handleEdit(site)}
          />
        ))}
      </div>
    </div>
  );
}


export { SitePage }