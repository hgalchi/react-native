import dayjs from "dayjs";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultTodoList = [];

const KEY = "KEY";

export const useTodoList = (selected) => {
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [input, setInput] = useState("");

  const saveTodoList = (newTodoList) => {
    setTodoList(newTodoList);
    //todoList 저장소
    AsyncStorage.setItem(KEY, JSON.stringify(newTodoList));
  };

  const add = () => {
    const len = todoList.length; // 3
    const lastId = len === 0 ? 0 : todoList[len - 1].id;

    const newTodoList = [
      ...todoList,
      {
        id: lastId + 1,
        content: input,
        date: selected,
        isSuccess: false,
      },
    ];
    saveTodoList(newTodoList);
  };

  const remove = (todoId) => {
    console.log("삭제되었습니다.");
    const newTodoList = todoList.filter((todo) => todo.id !== todoId);
    saveTodoList(newTodoList);
  };

  const toggle = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      };
    });
    saveTodoList(newTodoList);
  };

  const resetInput = () => setInput("");

  // 캘린더에서 선택한 날짜에 등록된 todolist목록  반환
  const filteredTodoList = todoList.filter((todo) => {
    const isSameDate = dayjs(todo.date).isSame(selected, "date");
    return isSameDate;
  });

  // 완료된 todolist목록 반환
  const isSuccessTodoList = todoList.filter((todo) => {
    if (todo.isSuccess === true) return todo;
  });

  const isSuccessTodoListCount = isSuccessTodoList.length;

  // 진행중인 todolist목록 반환
  const isNotSuccessTodoList = todoList.filter((todo) => {
    if (todo.isSuccess === false) return todo;
  });

  const isNotSuccessTodoListCount = isNotSuccessTodoList.length;

  //처음 실행시 날짜에 맞는 todolist의 목록 반환
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const result = await AsyncStorage.getItem(KEY);
    console.log("asyncStorage에 들어있는 todolist확인", typeof result, result);
    if (result) {
      const newTodoList = JSON.parse(result);
      console.log("newTodoList", typeof newTodoList, newTodoList);
      setTodoList(newTodoList);
    }
  };

  return {
    todoList,
    filteredTodoList,
    isSuccessTodoList,
    isNotSuccessTodoList,
    isSuccessTodoListCount,
    isNotSuccessTodoListCount,
    add,
    remove,
    toggle,
    input,
    setInput,
    resetInput,
  };
};
