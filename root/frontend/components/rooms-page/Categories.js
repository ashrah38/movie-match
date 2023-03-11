import { useState } from "react";
import { View, Text } from "react-native";
import { categoriesArray } from "./CategoriesArray";
import { Button } from "@react-native-material/core";
import styles from "../../styles";
import { Input, ErrorAlert } from "../generic/FormComponents";
import ButtonContainer from "../generic/ButtonContainer";

const Categories = ({}) => {
  const [buttonState, onChangeButtonState] = useState(categoriesArray);
  const [categoryList, onChangeCategoryList] = useState([]);

  const onPressHandler = (id) => {
    const newButtonState = buttonState.map((category) => {
      if (category.id == id) {
        if (category.variant == "outlined") {
          if (categoryList.length < 3) {
            let newListState = categoryList;
            newListState.push(category.name);
            onChangeCategoryList(newListState);
            category.variant = "contained";
          }
        } else {
          let newListState = categoryList;
          const indexToRemove = newListState.indexOf(category.name);
          newListState.splice(indexToRemove, 1);
          onChangeCategoryList(newListState);
          category.variant = "outlined";
        }
      }
      return category;
    });
    console.log(categoryList);
    onChangeButtonState(newButtonState);
  };
  return (
    <View>
      <View style={styles.categoryContainer}>
        <Text>Categories</Text>
        <Text>Choose upto 3 genres - change this at any time! </Text>
        {buttonState.map((category) => (
          <Button
            style={styles.categoryBtn}
            variant={category.variant}
            title={category.name}
            key={category.id}
            onPress={() => {
              onPressHandler(category.id);
            }}
          />
        ))}
        <Button title="Cancel" style={styles.categorySubmitBtn} />
        <Button title="Submit" style={styles.categorySubmitBtn} />
      </View>
    </View>
  );
};
export default Categories;
