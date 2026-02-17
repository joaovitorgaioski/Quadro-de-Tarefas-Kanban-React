import { useEffect, useState } from "react";
import FormModal from "./components/FormModal";
import Column from "./components/Column";
import Button from "./components/Button";
import { v4 } from "uuid";
import {
  DndContext,
  PointerSensor,
  useSensors,
  useSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import Task from "./components/Task";

function App() {
  const [isFormModalOpen, setFormModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const colors = {
    "A Fazer": "bg-red-100 rounded-md border border-red-200",
    "Em Progresso": "bg-yellow-100 rounded-md border border-yellow-300",
    Concluido: "bg-green-100 rounded-md border border-green-200",
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onAddTask(title, description, status, deadline) {
    if (taskToEdit) {
      const newTasks = tasks.map((task) =>
        taskToEdit.id === task.id
          ? { ...task, title, description, status, deadline }
          : task,
      );
      setTasks(newTasks);
      setTaskToEdit(null);
    } else {
      const newTask = {
        id: v4(),
        title,
        description,
        deadline,
        status,
      };

      setTasks([...tasks, newTask]);
    }
  }

  function onTaskToEdit(task) {
    setTaskToEdit(task);
    toggleFormModal();
  }

  function onDeleteTask(taskId) {
    const newTask = tasks.filter((t) => t.id != taskId);

    setTasks(newTask);
  }

  function toggleFormModal() {
    setFormModal(!isFormModalOpen);
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id;
    const overId = over.id;
    const columns = ["A Fazer", "Em Progresso", "Concluido"];

    // Verificação se caiu em local vazio dentro da coluna ou sobre uma task
    const newStatus = columns.includes(overId)
      ? overId
      : tasks.find((t) => t.id === overId)?.status;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  }

  const activeTask = tasks.find((t) => t.id === activeId);

  return (
    <div className="w-full h-screen bg-red-200 flex flex-col p-2 gap-2 font-serif text-gray-600 overflow-hidden">
      <header className="text-center flex flex-col bg-amber-50 rounded-md p-5">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-3xl">Quadro de Tarefas Kanban</h1>
          <Button onClick={toggleFormModal}>Criar Tarefa</Button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex h-full overflow-x-auto snap-x snap-mandatory px-[10vw] md:px-0 gap-2">
            <Column
              onTaskToEdit={onTaskToEdit}
              onDeleteTask={onDeleteTask}
              colors={colors}
              title="A Fazer"
              tasks={tasks.filter((t) => t.status == "A Fazer")}
            />
            <Column
              onTaskToEdit={onTaskToEdit}
              onDeleteTask={onDeleteTask}
              colors={colors}
              title="Em Progresso"
              tasks={tasks.filter((t) => t.status == "Em Progresso")}
            />
            <Column
              onTaskToEdit={onTaskToEdit}
              onDeleteTask={onDeleteTask}
              colors={colors}
              title="Concluido"
              tasks={tasks.filter((t) => t.status == "Concluido")}
            />
          </div>
          <DragOverlay
            dropAnimation={{
              sideEffects: defaultDropAnimationSideEffects({
                styles: { active: { opacity: "0.3" } },
              }),
            }}
          >
            {/* Renderiza se activeTask existir, ou seja, caso esteja acontecendo um drag, senão null */}
            {activeTask ? (
              <Task task={activeTask} colors={colors} isOverlay />
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      {isFormModalOpen && (
        <FormModal
          onCloseClick={toggleFormModal}
          onAddTask={onAddTask}
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
        />
      )}
    </div>
  );
}

export default App;
