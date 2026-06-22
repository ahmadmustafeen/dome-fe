export interface NavItem {
  id: number;
  title: string;
  link: string;
  subItems?: {
    id: number;
    title: string;
    link: string;
  }[];
}

export const Navbar: NavItem[] = [
  { id: 1, title: "Client Management", link: "" },
  { id: 2, title: "Site Management", link: "client" },
  {
    id: 3,
    title: "Assets Management",
    link: "assets-management",
    subItems: [
      { id: 31, title: "Assets Listing", link: "assets-management" },
      { id: 32, title: "Invalid Assets", link: "assets-management/invalid" },
    ],
  },
  { id: 9, title: "Maintenance Schedule", link: "maintenance-schedule" },
  { id: 4, title: "Document Management", link: "document-management" },
  { id: 4, title: "RAG Management", link: "rag-management" },
  // { id: 5, title: "Document Generator", link: "document-generator" },
  { id: 6, title: "SOP Management", link: "sop-management" },
  { id: 7, title: "EOP Management", link: "eop-management" },
  { id: 8, title: "MOP Management", link: "mop-management" },
];

export interface iTableHeader {
  id: string;
  label: string;
  key: string;
}

export const AssetTableHeaders: iTableHeader[] = [
  { id: "assetId", label: "Asset Id", key: "assetId" },
  { id: "assetName", label: "Asset Name", key: "assetName" },
  { id: "category", label: "Category", key: "category" },
  { id: "subCategory", label: "Sub Category", key: "subCategory" },
  { id: "equipmentName", label: "Equipment Name", key: "equipmentName" },
  { id: "make", label: "Make", key: "make" },
  { id: "model", label: "Model", key: "modelName" },
  { id: "location", label: "Location", key: "location" },
  { id: "serialNumber", label: "Serial Number", key: "serialNumber" },
];
