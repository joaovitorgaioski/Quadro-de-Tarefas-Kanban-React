import Modal from "./Modal";
import { CircleX, AlignLeft, Calendar } from "lucide-react";

function DetailsModal({ task, colors, onCloseClick }) {
  return (
    <Modal>
      <button
        className="ml-auto transition-colors hover:text-red-500 rounded-full"
        onClick={onCloseClick}
      >
        <CircleX size={40} />
      </button>

      <div className="flex flex-col gap-10 h-full w-full">
        <div className="bg-orange-200 p-4 rounded-md border-3 border-orange-300 flex justify-center text-center">
          <h1 className="text-3xl text-black font-bold">{task.title}</h1>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <AlignLeft size={20} />
            <span className="font-bold">Descrição:</span>
          </div>

          <p className="text-xl overflow-y-auto wrap-break-word max-h-60 shadow-md border border-black/20 rounded-md p-3 bg-slate-50 whitespace-pre-wrap text-justify">
            {task.description}
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <Calendar size={20} />
          <span className="text-xl">
            {new Date(task.deadline).toLocaleDateString("pr-BR", {
              timeZone: "UTC",
            })}
          </span>
        </div>

        <div className="mt-auto">
          <h2
            className={`${colors[task.status]} px-6 py-2 rounded-md border-2 font-bold`}
          >
            {task.status}
          </h2>
        </div>
      </div>
    </Modal>
  );
}

export default DetailsModal;
