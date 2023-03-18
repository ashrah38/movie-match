import { useState } from "react";
import { View, Text } from "react-native";
import { categoriesArray } from "./CategoriesArray";
import { Button } from "@react-native-material/core";
import styles from "../../styles";
import { Input, ErrorAlert } from "../generic/FormComponents";
import ButtonContainer from "../generic/ButtonContainer";

const Categories = ({ widgetStyles, chosenCategories, hideCategories }) => {
  const [buttonState, onChangeButtonState] = useState(categoriesArray);
  const [categoryList, onChangeCategoryList] = useState([]);

  // triggers when the category buttons are pressed.
  // updates the category list
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
    onChangeButtonState(newButtonState);
  };

  // triggers when the submit button is pressed
  const onSubmitHandler = () => {
    // pass the chosen categories to the parent component
    chosenCategories(categoryList);
    // hide the category component and show the main display
    hideCategories();
  };

  return (
    <View>
      <View style={widgetStyles}>
        <Text style={{ paddingBottom: 5, fontWeight: "bold" }}>Categories</Text>
        <Text style={{ paddingBottom: 15 }}>Choose upto 3 genres - change this at any time! </Text>
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
        <Button title="Submit" style={styles.categorySubmitBtn} onPress={() => onSubmitHandler()} />
      </View>
    </View>
  );
};
export default Categories;
