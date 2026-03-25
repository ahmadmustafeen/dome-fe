import { Plus } from "lucide-react";

import { Typography } from "../common";

const CreateNewClientCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 bg-transparent px-4 py-8 transition-all duration-500 hover:scale-[102%] hover:bg-primary"
    >
      <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white transition-all duration-500 group-hover:bg-white group-hover:text-primary sm:h-24 sm:w-24">
        <Plus size={32} />
      </div>
      <Typography
        variant="h4"
        className="my-1 text-primary transition-all duration-500 group-hover:text-white"
      >
        Create Client
      </Typography>
      <Typography
        variant="caption"
        className="text-primary transition-all duration-500 group-hover:text-white"
      >
        Click here to create a new client
      </Typography>
    </div>
  );
};

export { CreateNewClientCard };
