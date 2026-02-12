import {
  ChevronRightIcon,
  ClipboardClock,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import Button from "./Button";

function Task({ task, colors, ...props }) {
  return (
    <li
      className={`${colors[task.status]} shadow-xl flex flex-col p-2 space-y-2 min-h-60 max-h-60 transition-all duration-300 ease-out hover:-translate-1 hover:shadow-lg`}
    >
      <h2 className="text-xl text-center m-2 text-black">{task.title}</h2>

      <p className="flex-1 line-clamp-3 wrap-break-word leading-relaxed m-2">
        {task.description}
      </p>

      <span className="flex gap-2">
        <ClipboardClock />
        <h3>
          {new Date(task.deadline).toLocaleDateString("pt-BR", {
            timeZone: "UTC",
          })}
        </h3>
      </span>

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
    </li>
  );
}

export default Task;
