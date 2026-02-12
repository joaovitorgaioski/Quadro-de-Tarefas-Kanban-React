import { useState } from "react";
import Section from "./Section";
import DetailsModal from "./DetailsModal";
import Task from "./Task";

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

      <ul className="flex-1 overflow-y-auto space-y-4 p-2 text-justify ">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            colors={colors}
            onTaskToEdit={props.onTaskToEdit}
            onDeleteTask={props.onDeleteTask}
            setSelectedTask={setSelectedTask}
          />
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
