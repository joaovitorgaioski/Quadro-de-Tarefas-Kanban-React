import { useState } from "react";
import Section from "./Section";
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
    <Section>
      <div className="mb-4 shrink-0">
        <h1 className="text-xl text-black">{title}</h1>
      </div>

      <ul
        className="flex-1 overflow-y-auto space-y-4 p-2 text-justify"
        ref={setNodeRef}
      >
        <SortableContext
          items={tasks.map(task => task.id)}
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
