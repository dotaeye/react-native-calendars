import { StyleSheet, Platform } from "react-native";
import * as defaultStyle from "../../style";

const STYLESHEET_ID = "stylesheet.calendar.header";

export default function(theme = {}) {
  const appStyle = { ...defaultStyle, ...theme };
  return StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: 10,
      paddingRight: 10,
      alignItems: "center"
    },
    monthText: {
      fontSize: appStyle.textMonthFontSize,
      fontFamily: appStyle.textMonthFontFamily,
      fontWeight: appStyle.textMonthFontWeight,
      color: appStyle.monthTextColor,
      margin: 10
    },
    arrow: {
      padding: 10
    },
    arrowImage: {
      ...Platform.select({
        ios: {
          tintColor: appStyle.arrowColor
        },
        android: {
          tintColor: appStyle.arrowColor
        }
      })
    },
    week: {
      flexDirection: "row",
      height: 24,
      justifyContent: "space-around",
      alignItems: "center"
    },
    dayHeader: {
      lineHeight: 24,
      width: 32,
      textAlign: "center",
      fontSize: appStyle.textDayHeaderFontSize,
      fontFamily: appStyle.textDayHeaderFontFamily,
      color: appStyle.textSectionTitleColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
}
