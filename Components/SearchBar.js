import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import { Feather } from "@expo/vector-icons";

export default function SearchBar({ placeholder, search, setSearch }) {
  const searchField = useRef(null);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => searchField.current.focus()}
      style={styles.container}
    >
      <Feather name="search" size={24} color="gray" />
      <TextInput
        value={search}
        onChangeText={setSearch}
        ref={searchField}
        style={styles.textField}
        placeholder={placeholder}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",

    alignItems: "center",
    flex: 1,
    paddingHorizontal: 14,
    borderRadius: 32,
    borderColor: "#e4e4e4",
    borderWidth: 1,
    paddingVertical: 9
  },
  textField: {
    fontSize: 17,
    marginLeft: 8,
    fontWeight: "500",
  },
});
