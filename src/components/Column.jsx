import {
  ClipboardClock,
  ChevronRightIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import Section from "./Section";
import Button from "./Button";
import DetailsModal from "./DetailsModal";

function Column({ title, tasks, ...props }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const colors = {
    "A Fazer": "bg-red-100 rounded-md border border-red-200",
    "Em Progresso": "bg-yellow-100 rounded-md border border-yellow-300",
    Concluido: "bg-green-100 rounded-md border border-green-200",
  };

  return (
    <Section>
      <div className="mb-4 shrink-0">
        <h1 className="text-xl text-black">{title}</h1>
      </div>

      <ul className="flex-1 overflow-y-auto space-y-4 pr-2 text-justify ">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`${colors[task.status]} shadow-xl flex flex-col p-2 space-y-2 min-h-62`}
          >
            <h2 className="text-xl text-center m-2 text-black">{task.title}</h2>
            <p className="flex-1 line-clamp-3 wrap-break-word leading-relaxed m-2">
              {task.description}
            </p>
            <span className="flex gap-2">
              <ClipboardClock />
              <h3>
                {new Date(task.deadline).toLocaleDateString("pr-BR", {
                  timeZone: "UTC",
                })}
              </h3>
            </span>

            <span>
              <Button
                variant="task"
                onClick={() => {
                  setSelectedTask(task);
                }}
              >
                <ChevronRightIcon />
              </Button>
              <Button
                variant="task"
                onClick={() => {
                  props.onTaskToEdit(task);
                }}
              >
                <EditIcon />
              </Button>
              <Button
                variant="task"
                onClick={() => {
                  props.onDeleteTask(task.id);
                }}
              >
                <TrashIcon />
              </Button>
            </span>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <DetailsModal
          task={selectedTask}
          colors={colors}
          onCloseClick={() => setSelectedTask(null)}
        />
      )}
    </Section>
  );
}

export default Column;
