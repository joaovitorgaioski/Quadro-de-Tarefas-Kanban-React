import {
  ChevronRightIcon,
  ClipboardClock,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import Button from "./Button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task({ task, colors, isOverlay, ...props }) {
  // Para o dnd-kit funcionar, também definimos um style. O setNodeRef obtem o endereço da task
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: isOverlay });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.2 : 1,
    zIndex: isDragging ? 50 : 0,
    cursor: isOverlay ? "grabbing" : "grab",
  };

  return (
    <div className="transition-all hover:-translate-1 shadow-md hover:shadow-xl">
      <li
        className={`${colors[task.status]} flex flex-col p-2 space-y-2 md:min-h-60 md:max-h-60`}
        ref={isOverlay ? null : setNodeRef}
        style={style}
        {...(!isOverlay ? attributes : {})}
        {...(!isOverlay ? listeners : {})}
      >
        <h2 className="text-xl text-center m-2 text-black">{task.title}</h2>

        {window.innerWidth < 640 ? null : (
          <p className="flex-1 line-clamp-3 wrap-break-word leading-relaxed m-2">
            {task.description}
          </p>
        )}

        <span className="flex gap-2">
          <ClipboardClock />
          <h3>
            {new Date(task.deadline).toLocaleDateString("pt-BR", {
              timeZone: "UTC",
            })}
          </h3>
        </span>

        {!isOverlay && (
          <span>
            <Button
              title="Expandir tarefa"
              variant="task"
              onClick={() => {
                props.setSelectedTask(task);
              }}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              title="Editar tarefa"
              variant="task"
              onClick={() => {
                props.onTaskToEdit(task);
              }}
            >
              <EditIcon />
            </Button>
            <Button
              title="Deletar tarefa"
              variant="task"
              onClick={() => {
                props.onDeleteTask(task.id);
              }}
            >
              <TrashIcon />
            </Button>
          </span>
        )}
      </li>
    </div>
  );
}

export default Task;
