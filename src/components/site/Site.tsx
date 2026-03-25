"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { Site } from "@/components";
import {
  CreateNewSiteCard,
  CreateSiteModal,
  DeleteConfirmationScreen,
  HeadingWithDescription,
  ScreenLoader,
  SiteInfoCard,
} from "@/components";
import { useAppContext } from "@/context/AppContext";
import { siteService } from "@/services/site-service";

function SitePage() {
  const t = useTranslations("SitePage");
  const { setSite, client } = useAppContext();
  const router = useRouter();
  const [sites, setSites] = useState<Site[]>([]);
  const [editData, setEditData] = useState<Site | null>(null);
  const [isSiteLoading, setIsSiteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [showCreateSiteModal, setshowCreateSiteModal] = useState(false);

  const toggleCreateClientModal = () => {
    setshowCreateSiteModal(!showCreateSiteModal);
  };

  const fetchSites = async () => {
    setIsSiteLoading(true);
    if (!client?._id) {
      return router.back();
    }
    try {
      const response = await siteService.getAllSites({ clientId: client?._id });
      if (Array.isArray(response)) {
        setSites(response);
      } else {
        setSites([]);
      }
    } catch (error) {
      console.error("Failed to fetch sites:", error);
      setSites([]);
    } finally {
      setIsSiteLoading(false);
    }
  };

  const deleteSite = async (siteId: string) => {
    await siteService.deleteSite(siteId);
    setDeleteId("");
    toast.success("Site deleted successfully");
    fetchSites();
  };

  const handleEdit = (site: Site) => {
    setEditData(site);
    toggleCreateClientModal();
  };

  const updateSite = async (siteId: string, updatedData: any) => {
    // Logic to update a client
    await siteService.updateSite(siteId, updatedData);
    toast.success("Site updated successfully");
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

  const selectSite = (id: string) => {
    setSite(sites.find((item) => item._id === id) || null);
    router.push(`/en/dashboard/assets-management`);
  };

  return (
    <div className="w-full">
      {deleteId && (
        <DeleteConfirmationScreen
          heading="Delete Site"
          description="Are you sure you want to delete the site? This action is irreversible."
          handleCancel={() => setDeleteId("")}
          handleContinue={() => deleteSite(deleteId)}
        />
      )}
      {isSiteLoading && (
        <ScreenLoader
          heading={t("loader_heading")}
          description={t("loader_description")}
        />
      )}
      {showCreateSiteModal && client?._id && (
        <CreateSiteModal
          clientId={client._id}
          editData={editData ?? undefined}
          toggleModal={handleToggle}
          refetchClients={fetchSites}
          updateSite={updateSite}
        />
      )}
      <HeadingWithDescription
        title="Sites"
        description="Here you can manage and create new sites"
      />

      <div className="mx-auto my-5 flex w-11/12 flex-wrap gap-4">
        <CreateNewSiteCard onClick={toggleCreateClientModal} />
        {sites.map((site, index) => (
          <SiteInfoCard
            key={index}
            site={site}
            onSelectSite={() => selectSite(site._id)}
            handleDelete={() => setDeleteId(site._id)}
            handleEdit={() => handleEdit(site)}
          />
        ))}
      </div>
    </div>
  );
}

export { SitePage };
