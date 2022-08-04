import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import todoService from "services/todo.service";
import Loader from "components/Loader";
import { TodoItem } from "types/Index";

function TodoDetail() {
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoItem>({} as TodoItem);
  const [formTodo, setFormTodo] = useState<TodoItem>({} as TodoItem);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    try {
      const { data } = await todoService.getTodoById(params.id!);
      setTodo(data);
      setFormTodo(data);
    } catch (e) {}
  };

  const fixTodo = async (e: any) => {
    e.preventDefault();
    if (isLoading) return false;
    if (todo.title === formTodo.title && todo.content === formTodo.content) {
      cancelUpdate();
      return false;
    }
    setIsLoading(true);
    try {
      const { data } = await todoService.updateTodo(
        formTodo.id,
        formTodo.title,
        formTodo.content
      );
      setTodo(data);
      setFormTodo(data);
      setIsUpdate(false);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const cancelUpdate = () => {
    setFormTodo(todo);
    setIsUpdate(false);
  };

  const deleteTodo = async (id: string) => {
    if (isLoading) return false;
    const result = window.confirm("Do you really want to delete?");
    if (!result) return false;
    setIsLoading(true);
    try {
      await todoService.deleteTodo(id);
      try {
        navigate(-1);
      } catch (e) {
        navigate("/todo");
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e: any) => {
    setFormTodo({ ...formTodo, [e.target.name]: e.target.value });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {isUpdate ? (
        <article>
          <form onSubmit={fixTodo}>
            <input name="title" value={formTodo.title} onChange={handleInput} />
            <input
              name="content"
              value={formTodo.content}
              onChange={handleInput}
            />
            <div>
              <button type="submit">Confirm</button>
              <button onClick={cancelUpdate}>Cancel</button>
            </div>
          </form>
        </article>
      ) : (
        <article>
          <h2>{todo.title}</h2>
          {todo.content}
          <div>
            <button
              onClick={() => {
                setIsUpdate(true);
              }}
            >
              Modify
            </button>
            <button
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              Delete
            </button>
          </div>
        </article>
      )}
    </>
  );
}

export default TodoDetail;
