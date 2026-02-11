import { useReducer } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

function reducer(state, action) {
  switch (action.type) {
    case "update":
      return { ...state, [action.field]: action.value };
    default:
      return state;
    // Implementar novas funcionalidades no case futuramente, como limpar formulário
  }
}

function FormModal({ onCloseClick, taskToEdit, ...props }) {
  const [state, dispatch] = useReducer(reducer, {
    title: taskToEdit?.title || "",
    description: taskToEdit?.description || "",
    deadline: taskToEdit?.deadline || "",
    status: taskToEdit?.status || "A Fazer",
  });

  const handleChange = (field, value) => {
    dispatch({ type: "update", field, value });
  };

  const options = ["A Fazer", "Em Progresso", "Concluido"];

  return (
    <Modal>
      <div>
        <h2>Título</h2>
        <Input
          variant="title"
          placeholder="Insira um título"
          onChange={(e) => handleChange("title", e.target.value)}
          value={state.title}
        />
      </div>

      <div>
        <h2>Descrição</h2>
        <Input
          variant="description"
          placeholder="Insira uma descrição"
          onChange={(e) => handleChange("description", e.target.value)}
          value={state.description}
        />
      </div>

      <div>
        <h2>Prazo de entrega</h2>
        <input
          className="w-full p-2 rounded-md border border-black/20 bg-slate-50"
          type="date"
          onChange={(e) => handleChange("deadline", e.target.value)}
          value={state.deadline}
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
                onChange={(e) => handleChange("status", e.target.value)}
              />
              <span
                className={`px-4 py-2 rounded-md border-2 border-black/20 inline-block transition-colors ${state.status === opt ? "bg-amber-200" : "bg-amber-50"}`}
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
            const { title, description, status, deadline } = state; // Desconstrução

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
