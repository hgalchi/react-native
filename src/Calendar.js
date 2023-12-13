import dayjs from "dayjs";
import React from "react";
import { getDayColor } from "./util";
import { TouchableOpacity, Text, View, FlatList } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

const columnSize = 35;
const Column = ({
  text,
  hasTodo,
  disabled,
  onPress,
  opacity,
  isSelected,
  today,
  color,
}) => {
  return (
    <View
      style={{
        borderRadius: columnSize / 1,
        backgroundColor: today ? "#7CF8FF" : "transparent",
      }}
    >
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{
          width: columnSize,
          height: columnSize,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: columnSize / 1,
          backgroundColor: isSelected ? "#FFFE91" : "transparent",
        }}
      >
        <Text
          style={{ color, opacity, fontWeight: hasTodo ? "bold" : "normal" }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const ArrBttn = ({ icon, press }) => {
  return (
    <TouchableOpacity onPress={press} style={{ padding: 20 }}>
      <SimpleLineIcons name={icon} size={15} color="red" />
    </TouchableOpacity>
  );
};

export default ({
  columns,
  chooseDate,
  todoList,
  prevArrow,
  nextArrow,
  onPressDate,
  header,
}) => {
  const Header = () => {
    const todayDate = dayjs(chooseDate).format("YYYY.MM.DD");

    const logOnPress = () => {
      console.log("Button pressed!");
    };

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={prevArrow} style={{ padding: 20 }}>
            <SimpleLineIcons name={"arrow-left"} size={15} color="red" />
          </TouchableOpacity>

          <TouchableOpacity onPress={header}>
            <Text style={{ fontSize: 20, color: "black" }}>{todayDate}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={nextArrow} style={{ padding: 20 }}>
            <SimpleLineIcons name={"arrow-right"} size={15} color="red" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          {["일", "월", "화", "수", "목", "금", "토"].map((yoil, index) => (
            <Column key={`day-${index}`} text={yoil} />
          ))}
        </View>
      </View>
    );
  };
  const dayItem = ({ item: d }) => {
    const today = dayjs(d).isSame(dayjs(), "date");
    const isSelected = dayjs(d).isSame(chooseDate, "date");
    const date_t = dayjs(d).get("date");
    const day = dayjs(d).get("day");
    const day_Color = getDayColor(day);
    const this_Month = dayjs(d).month() === dayjs(chooseDate).month();
    const onPress = () => onPressDate(d);
    const hasTodo = todoList.find((todo) =>
      dayjs(todo.date).isSame(dayjs(d), "date")
    );

    return (
      <Column
        today={today}
        isSelected={isSelected}
        text={date_t}
        color={day_Color}
        opacity={this_Month ? 1 : 0.2}
        onPress={onPress}
        hasTodo={hasTodo}
      />
    );
  };

  return (
    <FlatList
      renderItem={dayItem}
      data={columns}
      numColumns={7}
      ListHeaderComponent={Header}
    />
  );
};
