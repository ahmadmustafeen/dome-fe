import { Edit2Icon, Trash } from "lucide-react";

import { formatPhoneNumber } from "@/utils/Helpers";

import { AppButton, Typography } from "../common";

export interface Client {
  _id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

type ClientInfoCardProps = {
  client: Client;
  handleDelete: () => void;
  handleEdit: () => void;
  onSelectClient: () => void;
};

const ClientInfoCard = ({
  client,
  handleDelete,
  handleEdit,
  onSelectClient,
}: ClientInfoCardProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center rounded-xl border bg-primary px-4 py-8">
      <button
        onClick={onSelectClient}
        className="absolute top-3 right-3 cursor-pointer text-xs text-white underline underline-offset-2 transition-opacity hover:opacity-80"
      >
        Continue
      </button>

      {/* Avatar */}
      <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-primary sm:h-24 sm:w-24 sm:text-3xl">
        {client.name[0]?.toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex w-full flex-col items-center gap-y-1 text-center">
        <Typography variant="h4" className="my-1 text-white">
          {client.name}
        </Typography>
        <Typography variant="caption" className="text-white/90">
          Address: {client.address}
        </Typography>
        <Typography variant="caption" className="text-white/90">
          Phone: {formatPhoneNumber(client.phone)}
        </Typography>
        <Typography variant="caption" className="text-white/90">
          Email: {client.email}
        </Typography>
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <AppButton
          onClick={handleEdit}
          variant="secondary"
          icon={<Edit2Icon size={14} />}
          title="Edit"
        />
        <AppButton
          onClick={handleDelete}
          variant="default"
          icon={<Trash size={14} />}
          title="Delete"
        />
      </div>
    </div>
  );
};

export { ClientInfoCard };
