import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Header from "../Components/Header";
import { connect } from "react-redux";
import { SELECT_PAYMENT_METHOD } from "../Redux/Constants";
import ActivitySteps from "../Components/ActivitySteps";

function SelectPaymentMethod({ selectPaymentMethod, navigation }) {
  const onPaymentSelect = paymentMethod => {
    selectPaymentMethod(paymentMethod);
    navigation.navigate("Checkout");
  };
  return (
    <View style={{ flex: 1, paddingTop: 16 }}>
      <Header />
      <View style={{marginTop: 14}}/>
      <ActivitySteps step={3}/>
      <View style={styles.container}>
        <Text style={styles.heading}>Debit Card</Text>
        <TouchableOpacity onPress={() => onPaymentSelect("bank")}>
          <Image
            style={styles.image}
            source={{
              uri: "https://res.cloudinary.com/dlxyvl6sb/image/upload/v1660668034/Screen_Shot_2022-08-16_at_8.33.09_PM_qfcrpp.png",
            }}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Blockchain</Text>
        <TouchableOpacity onPress={() => onPaymentSelect("blockchain")}>
          <Image
            style={styles.image}
            source={{
              uri: "https://www.simplilearn.com/ice9/free_resources_article_thumb/how_to_start_a_career_in_blockchain_technology.jpg",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  
  },
  image: {
    width: "100%",
    height: 225,
    marginBottom: 32,
    borderRadius: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    selectPaymentMethod: payment => {
      dispatch({
        type: SELECT_PAYMENT_METHOD,
        payload: payment,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(SelectPaymentMethod);
