import { useEffect, useState } from "react";
import FormModal from "./components/FormModal";
import Section from "./components/Section";
import Column from "./components/Column";
import Button from "./components/Button";
import { v4 } from "uuid";

function App() {
  const [isFormModalOpen, setFormModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

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

  return (
    <div className="w-screen h-screen bg-red-200 flex flex-col p-2 font-serif space-y-2 text-gray-600 overflow-hidden">
      <header>
        <Section>
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-3xl">Quadro de Tarefas Kanban</h1>
            <Button onClick={toggleFormModal}>Criar Tarefa</Button>
          </div>
        </Section>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="flex flex-col space-y-4 h-full md:flex-row md:space-x-3">
          <Column
            onTaskToEdit={onTaskToEdit}
            onDeleteTask={onDeleteTask}
            title="A Fazer"
            tasks={tasks.filter((t) => t.status == "A Fazer")}
          />
          <Column
            onTaskToEdit={onTaskToEdit}
            onDeleteTask={onDeleteTask}
            title="Em Progresso"
            tasks={tasks.filter((t) => t.status == "Em Progresso")}
          />
          <Column
            onTaskToEdit={onTaskToEdit}
            onDeleteTask={onDeleteTask}
            title="Concluido"
            tasks={tasks.filter((t) => t.status == "Concluido")}
          />
        </div>
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
