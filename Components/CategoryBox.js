import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { icons } from "../assets/iconsData";
import { connect } from "react-redux";

function CategoryBox({
  item,
  activeCategories,
  setActiveCategories,
  categories,
  color = "#e2e8f0",
}) {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const find = activeCategories.filter(ctg => ctg.label === item.label);
    if (find.length >= 1) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [activeCategories]);

  const pressHandler = () => {
    if (check) {
      if (item.label === "All") {
        setActiveCategories([]);
      } else {
        const filterCategories = activeCategories.filter(
          ctg => ctg.label !== item.label
        );
        const filterAll = filterCategories.filter(ctg => ctg.label !== "All");
        setActiveCategories(filterAll);
      }
    } else {
      if (item.label === "All") {
        setActiveCategories([...categories, { label: "All", name: "All" }]);
        return;
      }
      setActiveCategories(prev => [...prev, item]);
    }
  };
  return (
    <TouchableOpacity
      onPress={pressHandler}
      style={[
        styles.container,
        { backgroundColor: color },
        check && styles.activeContainer,
      ]}
    >
      <Image style={styles.image} source={{ uri: icons[item.label] }} />
      <Text style={[styles.title, check && styles.activeText]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    borderRadius: 6,
    paddingHorizontal: 20,
    marginRight: 22,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  activeContainer: {
    backgroundColor: "#818cf8",
  },
  activeText: {
    color: "#fff",
  },
});

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps)(CategoryBox);
