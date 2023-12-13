import { useEffect, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useCalendar } from "./src/component/use-calendar";
import { useTodoList } from "./src/component/use-todo-list";
import Margin from "./src/Margin";
import { getCalendarColumns, ITEM_WIDTH, height } from "./src/util";
import AddTodoInput from "./src/AddTodoInput";
import Calendar from "./src/Calendar";
import { bottomSpace } from "./src/util";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function MyPage() {
  const now = dayjs();
  const { chooseDate } = useCalendar(now);
  const {
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
  } = useTodoList(chooseDate);

  const listRef = useRef(null);

  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggle(todo.id);
    const onLongPress = () => {
      Alert.alert("삭제하시겠어요?", "", [
        {
          style: "cancel",
          text: "아니요",
        },
        {
          text: "네",
          onPress: () => remove(todo.id),
        },
      ]);
    };
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          flexDirection: "row",
          width: ITEM_WIDTH,
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: "#a6a6a6",
        }}
      >
        <Text style={{ flex: 1, fontSize: 14, color: "#595959" }}>
          {todo.content}
        </Text>
        <Ionicons
          name="ios-checkmark"
          size={17}
          color={isSuccess ? "red" : "#bfbfbf"}
        />
        <Ionicons
          name="trash-outline"
          size={17}
          color={isSuccess ? "#595959" : "#bfbfbf"}
          onLongPress={onLongPress}
        />
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <Text style={styles.succ}>완료된 작업 : {isSuccessTodoListCount}</Text>
        <FlatList
          style={{ flex: 1 }}
          data={isSuccessTodoList}
          ref={listRef}
          renderItem={renderItem}
        />
        <Text style={styles.progress}>
          보류중인 작업 : {isNotSuccessTodoListCount}
        </Text>
        <FlatList
          style={{ flex: 1 }}
          data={isNotSuccessTodoList}
          ref={listRef}
          renderItem={renderItem}
        />
      </Pressable>
    </View>
  );
}

function Calendar_t() {
  const now = dayjs();
  const { chooseDate, setChooseDate, prevMonth, nextMonth } = useCalendar(now);
  const {
    todoList,
    filteredTodoList,
    input,
    setInput,
    toggle,
    remove,
    add,
    resetInput,
  } = useTodoList(chooseDate);

  const col = getCalendarColumns(chooseDate);
  const listRef = useRef(null);
  const prevArrow = prevMonth;
  const arrowRight = nextMonth;
  const date = setChooseDate;

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        todoList={todoList}
        columns={col}
        chooseDate={chooseDate}
        prevArrow={prevArrow}
        nextArrow={arrowRight}
        onPressDate={date}
      />
      <Margin height={20} />
    </View>
  );
  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggle(todo.id);
    const onLongPress = () => {
      Alert.alert("삭제하시겠어요?", "", [
        {
          style: "cancel",
          text: "아니요",
        },
        {
          text: "네",
          onPress: () => remove(todo.id),
        },
      ]);
    };
    return (
      <Pressable
        style={{
          flexDirection: "row",
          width: ITEM_WIDTH,
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: "#a6a6a6",
        }}
      >
        <Text style={{ flex: 1, fontSize: 14, color: "#595959" }}>
          {todo.content}
        </Text>
        <Ionicons
          name="ios-checkmark"
          size={17}
          color={isSuccess ? "red" : "#bfbfbf"}
          onPress={onPress}
        />
        <Ionicons
          name="trash-outline"
          size={17}
          color={isSuccess ? "#595959" : "#bfbfbf"}
          onLongPress={onLongPress}
        />
      </Pressable>
    );
  };
  const onFocus = () => {
    scrollToEnd();
  };
  const scrollToEnd = () => {
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 200);
  };
  const onSubmitEditing = () => {
    add();
    resetInput();
    scrollToEnd();
  };
  const onPressAdd = () => {
    add();
    resetInput();
    scrollToEnd();
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        ref={listRef}
        contentContainerStyle={{ paddingTop: height + 25 }}
        data={filteredTodoList}
        style={{ flex: 1 }}
        renderItem={renderItem}
      />
      <AddTodoInput
        value={input}
        onFocus={onFocus}
        onChangeText={setInput}
        onPressAdd={onPressAdd}
        placeholder={`${dayjs(chooseDate).format("MM.D")}에 추가할투두`}
        onSubmitEditing={onSubmitEditing}
      />
      <Margin height={bottomSpace} />
    </Pressable>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            if (route.name === "Calendar") {
              icon = focused
                ? require("./assets/images/mypage_f.png")
                : require("./assets/images/mypage.png");
            } else if (route.name === "MyPage") {
              icon = focused
                ? require("./assets/images/calendar_f.png")
                : require("./assets/images/calendar.png");
            }

            return <Image source={icon} style={{ width: 20, height: 20 }} />;
          },
        })}
      >
        <Tab.Screen name="Calendar" component={Calendar_t} />
        <Tab.Screen name="MyPage" component={MyPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  succ: {
    color: "powderblue",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: height + 70,
    padding: 4,
    borderBottomColor: "powderblue",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  progress: {
    color: "powderblue",
    fontWeight: "bold",
    fontSize: 15,
    padding: 4,
    borderBottomColor: "powderblue",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
