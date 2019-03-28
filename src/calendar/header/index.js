import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { View, Text, TouchableOpacity, Image } from "react-native";
import XDate from "xdate";
import PropTypes from "prop-types";
import styleConstructor from "./style";
import { weekDayNames } from "../../dateutils";
import {
  CHANGE_MONTH_LEFT_ARROW,
  CHANGE_MONTH_RIGHT_ARROW
} from "../../testIDs";

const chineseNum = num => {
  switch (num) {
    case "0":
      return "零";
    case "1":
      return "一";
    case "2":
      return "二";
    case "3":
      return "三";
    case "4":
      return "四";
    case "5":
      return "五";
    case "6":
      return "六";
    case "7":
      return "七";
    case "8":
      return "八";
    case "9":
      return "九";
  }
};

const chineseMonthNum = num => {
  switch (num) {
    case 1:
      return "一月";
    case 2:
      return "二月";
    case 3:
      return "三月";
    case 4:
      return "四月";
    case 5:
      return "五月";
    case 6:
      return "六月";
    case 7:
      return "七月";
    case 8:
      return "八月";
    case 9:
      return "九月";
    case 10:
      return "十月";
    case 11:
      return "十一";
    case 12:
      return "十二";
  }
};

class CalendarHeader extends Component {
  static propTypes = {
    theme: PropTypes.object,
    hideArrows: PropTypes.bool,
    month: PropTypes.instanceOf(XDate),
    addMonth: PropTypes.func,
    showIndicator: PropTypes.bool,
    firstDay: PropTypes.number,
    renderArrow: PropTypes.func,
    hideDayNames: PropTypes.bool,
    weekNumbers: PropTypes.bool,
    onPressArrowLeft: PropTypes.func,
    onPressArrowRight: PropTypes.func
  };

  static defaultProps = {
    monthFormat: "MMMM yyyy"
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.addMonth = this.addMonth.bind(this);
    this.substractMonth = this.substractMonth.bind(this);
    this.onPressLeft = this.onPressLeft.bind(this);
    this.onPressRight = this.onPressRight.bind(this);
  }

  addMonth() {
    this.props.addMonth(1);
  }

  substractMonth() {
    this.props.addMonth(-1);
  }

  formatYear(month) {
    return month
      .getFullYear()
      .toString()
      .split("")
      .map(x => chineseNum(x))
      .join("");
  }

  formatMonth(month) {
    return chineseMonthNum(month.getMonth() + 1);
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.month.toString("yyyy MM") !==
      this.props.month.toString("yyyy MM")
    ) {
      return true;
    }
    if (nextProps.showIndicator !== this.props.showIndicator) {
      return true;
    }
    if (nextProps.hideDayNames !== this.props.hideDayNames) {
      return true;
    }
    return false;
  }

  onPressLeft() {
    const { onPressArrowLeft } = this.props;
    if (typeof onPressArrowLeft === "function") {
      return onPressArrowLeft(this.substractMonth);
    }
    return this.substractMonth();
  }

  onPressRight() {
    const { onPressArrowRight } = this.props;
    if (typeof onPressArrowRight === "function") {
      return onPressArrowRight(this.addMonth);
    }
    return this.addMonth();
  }

  render() {
    let leftArrow = <View />;
    let rightArrow = <View />;
    let weekDaysNames = weekDayNames(this.props.firstDay);
    if (!this.props.hideArrows) {
      leftArrow = (
        <TouchableOpacity
          onPress={this.onPressLeft}
          style={this.style.arrow}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
          testID={CHANGE_MONTH_LEFT_ARROW}
        >
          {this.props.renderArrow ? (
            this.props.renderArrow("left")
          ) : (
            <Image
              source={require("../img/previous.png")}
              style={this.style.arrowImage}
            />
          )}
        </TouchableOpacity>
      );
      rightArrow = (
        <TouchableOpacity
          onPress={this.onPressRight}
          style={this.style.arrow}
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
          testID={CHANGE_MONTH_RIGHT_ARROW}
        >
          {this.props.renderArrow ? (
            this.props.renderArrow("right")
          ) : (
            <Image
              source={require("../img/next.png")}
              style={this.style.arrowImage}
            />
          )}
        </TouchableOpacity>
      );
    }
    let indicator;
    if (this.props.showIndicator) {
      indicator = <ActivityIndicator />;
    }

    return (
      <View>
        <View style={this.style.header}>
          {leftArrow}
          <View style={{ flexDirection: "row" }}>
            <Text
              allowFontScaling={false}
              style={this.style.monthText}
              accessibilityTraits="header"
            >
              {this.formatYear(this.props.month)}年 &bull;{" "}
              {this.formatMonth(this.props.month)}
            </Text>
            {indicator}
          </View>
          {rightArrow}
        </View>

        {!this.props.hideDayNames && (
          <View style={this.style.week}>
            {this.props.weekNumbers && (
              <Text allowFontScaling={false} style={this.style.dayHeader} />
            )}
            {weekDaysNames.map((day, idx) => (
              <Text
                allowFontScaling={false}
                key={idx}
                accessible={false}
                style={this.style.dayHeader}
                numberOfLines={1}
                importantForAccessibility="no"
              >
                {day}
              </Text>
            ))}
          </View>
        )}
      </View>
    );
  }
}

export default CalendarHeader;
