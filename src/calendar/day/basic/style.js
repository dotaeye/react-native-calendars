import { StyleSheet, Platform } from "react-native";
import * as defaultStyle from "../../../style";

const STYLESHEET_ID = "stylesheet.day.basic";

export default function styleConstructor(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme };
  return StyleSheet.create({
    base: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center"
    },
    text: {
      fontSize: appStyle.textDayFontSize,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: "300",
      color: appStyle.dayTextColor,
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
    alignedText: {},
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor,
      borderRadius: 18
    },
    today: {
      backgroundColor: appStyle.todayBackgroundColor
    },
    todayText: {
      color: appStyle.todayTextColor
    },
    selectedText: {
      color: appStyle.selectedDayTextColor
    },
    disabledText: {
      color: appStyle.textDisabledColor
    },
    dot: {
      width: 4,
      height: 4,
      marginTop: 1,
      borderRadius: 2,
      opacity: 0
    },
    visibleDot: {
      opacity: 1,
      backgroundColor: appStyle.dotColor
    },
    selectedDot: {
      backgroundColor: appStyle.selectedDotColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
