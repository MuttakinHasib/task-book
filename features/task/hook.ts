import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { addTask, removeTask } from ".";

export const useTask = () => {
  const { tasks } = useAppSelector((state) => state.task);
  const createTask = useAppDispatch(addTask);
  const deleteTask = useAppDispatch(removeTask);
  return { tasks, createTask, deleteTask };
};
