import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

function FormModal({ onCloseClick, taskToEdit, ...props }) {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [deadline, setDeadline] = useState(taskToEdit?.deadline || "");
  const [status, setStatus] = useState(taskToEdit?.status || "A Fazer");
  const options = ["A Fazer", "Em Progresso", "Concluido"];

  return (
    <Modal>
      <div>
        <h2>Título</h2>
        <Input
          variant="title"
          placeholder="Insira um título"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div>
        <h2>Descrição</h2>
        <Input
          variant="description"
          placeholder="Insira uma descrição"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div>
        <h2>Prazo de entrega</h2>
        <input
          className="w-full p-2 rounded-md border border-black/20 bg-slate-50"
          type="date"
          onChange={(e) => setDeadline(e.target.value)}
          value={deadline}
        />
      </div>

      <div>
        <h2>Status da tarefa</h2>
        <div className="flex justify-around flex-wrap gap-2 flex-col md:flex-row">
          {options.map((opt) => (
            <label key={opt} className="cursor-pointer">
              <input
                type="radio"
                name="status"
                value={opt}
                className="sr-only"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              />
              <span
                className={`px-4 py-2 rounded-md border-2 border-black/20 inline-block transition-colors ${status === opt ? "bg-amber-200" : "bg-amber-50"}`}
              >
                {opt}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-around mt-auto shrink-0">
        <Button
          variant="submit"
          onClick={() => {
            title && description && status && deadline && title.length < 100
              ? props.onAddTask(title, description, status, deadline)
              : alert("Preencha todos os campos!");
            onCloseClick();
            return;
          }}
        >
          {taskToEdit ? "Editar" : "Adicionar"}
        </Button>
        <Button
          onClick={() => {
            props.setTaskToEdit(null);
            onCloseClick();
          }}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
export default FormModal;
