import { useState } from "react";
import DetailsModal from "./DetailsModal";
import Task from "./Task";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

function Column({ title, tasks, colors, ...props }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const { setNodeRef } = useDroppable({ id: title });

  return (
    <div className="w-[80vw] md:flex-1 h-full shrink-0 snap-center snap-always flex flex-col">
      <div className="flex-1 flex flex-col text-center bg-amber-50 rounded-md p-5 overflow-hidden shadow-lg">
        <div className="mb-4 shrink-0">
          <h1 className="text-xl text-black">{title}</h1>
        </div>

        <ul
          className="flex-1 overflow-y-auto space-y-4 p-2 text-justify"
          ref={setNodeRef}
        >
          <SortableContext
            items={tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
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
          </SortableContext>
        </ul>
      </div>

      {selectedTask && (
        <DetailsModal
          task={selectedTask}
          colors={colors}
          onCloseClick={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

export default Column;
