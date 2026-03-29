"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { Client } from "@/components";
import {
  ClientInfoCard,
  CreateClientModal,
  CreateNewClientCard,
  DeleteConfirmationScreen,
  HeadingWithDescription,
  ScreenLoader,
} from "@/components";
import { DASHBOARD_ROUTES } from "@/constants/routes";
import { useAppContext } from "@/context/AppContext";
import { clientService } from "@/services/client-service";

function ClientPage() {
  const t = useTranslations("ClientPage");
  const router = useRouter();
  const { setClient } = useAppContext();
  const [isClientsLoading, setIsClientLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [editData, setEditData] = useState<Client | null>(null);
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);

  const toggleCreateClientModal = () => {
    setShowCreateClientModal(!showCreateClientModal);
  };

  const fetchClients = async () => {
    try {
      setIsClientLoading(true);
      const response = (await clientService.getAllClient()) as Client[];
      if (response && Array.isArray(response)) {
        setClients(response);
      }
    } finally {
      setTimeout(() => {
        setIsClientLoading(false);
      }, 500);
    }
  };

  const deleteClient = async (clientId: string) => {
    await clientService.deleteClient(clientId);
    setDeleteId("");
    toast.success("Client deleted successfully");
    fetchClients();
  };

  const handleEdit = (client: Client) => {
    setEditData(client);
    toggleCreateClientModal();
  };

  const updateClient = async (clientId: string, updatedData: any) => {
    // Logic to update a client
    await clientService.updateClient(clientId, updatedData);
    toast.success("Client updated successfully");
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

  const selectClient = (id: string) => {
    setClient(clients.find((client) => client._id === id) ?? null);
    router.push(DASHBOARD_ROUTES.CLIENT);
  };

  return (
    <div className="w-full">
      {deleteId && (
        <DeleteConfirmationScreen
          heading="Delete Client"
          description="Are you sure you want to delete the client? This action is irreversible."
          handleCancel={() => setDeleteId("")}
          handleContinue={() => deleteClient(deleteId)}
        />
      )}
      {isClientsLoading && (
        <ScreenLoader
          heading={t("loader_heading")}
          description={t("loader_description")}
        />
      )}
      {showCreateClientModal && (
        <CreateClientModal
          editData={editData ?? undefined}
          toggleModal={handleToggle}
          refetchClients={fetchClients}
          updateClient={updateClient}
        />
      )}
      <HeadingWithDescription
        title="Clients"
        description="Here you can manage and create new clients for your organization."
      />
      <div className="mx-auto my-5 grid w-11/12 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CreateNewClientCard onClick={toggleCreateClientModal} />
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

export { ClientPage };
