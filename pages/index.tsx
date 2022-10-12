import { useTask } from "@features/task/hook";
import { FormEvent, useState } from "react";

type Props = {};

const HomePage = (props: Props) => {
  const { tasks, createTask, deleteTask } = useTask();
  const [description, setDescription] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (description === "") return;

    createTask({
      id: Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1),
      description,
      // completed: false,
    });
    setDescription("");
  };

  return (
    <div className="flex justify-center py-16">
      <div className="space-y-10">
        <h3 className="text(xl blue-600)">Task Book</h3>
        <form {...{ onSubmit }} className="flex items-center gap-5">
          <input
            type="text"
            name="description"
            className="py-1 px-2 border-2"
            placeholder="Enter your task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="bg-white border-2 border-black py-1 px-5 cursor-pointer hover:(text-white bg-black)"
            type="submit"
            value="Submit"
          />
        </form>
        <div className="max-w-2xl w-full">
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between gap-5"
              >
                <div className="flex items-center gap-5">
                  <span>{task.description}</span>
                </div>
                <button
                  className="bg-white border-2 border-black py-1 px-5 cursor-pointer hover:(text-white bg-black)"
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
