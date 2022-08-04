import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "components/Loader";
import todoService from "services/todo.service";
import { TodoItem } from "types/Index";

function TodoIndex() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todo, setTodo] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const [todoList, setTodoList] = useState<TodoItem[] | null>(null);

  useEffect(() => {
    getTodoArr();
  }, []);

  const getTodoArr = async () => {
    try {
      const { data } = await todoService.getTodos();
      setTodoList(data);
    } catch (e) {}
  };

  const newTodo = async (e: any) => {
    e.preventDefault();
    if (isLoading) return false;
    setIsLoading(true);
    try {
      const { data } = await todoService.createTodo(todo.title, todo.content);
      setTodoList([...todoList!, data]);
      setTodo({
        title: "",
        content: "",
      });
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e: any) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  // const deleteTodo = async (id: string) => {
  //   if (isLoading) return false;
  //   setIsLoading(true);
  //   try {
  //     await todoService.deleteTodo(id);
  //     setTodoList(
  //       todoList!.filter((todo: TodoItem) => {
  //         return todo.id !== id;
  //       })
  //     );
  //   } catch (e) {
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return !todoList ? (
    <Loader />
  ) : (
    <>
      <article className="add">
        <h2>To Do List</h2>
        <form onSubmit={newTodo}>
          <input name="title" value={todo.title} onChange={handleInput} />
          <input name="content" value={todo.content} onChange={handleInput} />
          <button type="submit">Add</button>
        </form>
      </article>

      <article>
        <ul>
          {todoList!.map((item: TodoItem) => (
            <li
              key={item.id}
              onClick={() => {
                navigate(`/todo/${item.id}`);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}

export default TodoIndex;
