import { StyleSheet } from "react-native";

const mainBackgroundColor = "#f6f6f6";
const primaryFont = "Palatino";
const fontSizeInput = 20;
const fontSizeButton = 10;
const fontSizeLinks = 10;
const fontSizeCategories = 10;
const fontWeightInput = "300";
const fontWeightButton = "500";
const fontWeightCategories = "500";
const borderRadiusInput = "10";
const borderRadiusButton = "10";

const styles = StyleSheet.create({
  primaryContainer: {
    backgroundColor: mainBackgroundColor,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: "auto",
    position: "relative",
    width: "100%",
    maxWidth: 600,
    height: "100%",
    maxHeight: 900,
    minHeight: 600,
    paddingTop: 20,
  },

  formContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
    minWidth: 300,
    minHeight: 400,
    // borderColor: "green",
    // borderWidth: 4,
  },
  loginForm: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
  },
  banner: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  title: {
    fontSize: 54,
    fontWeight: "bold",
  },
  inputField: {
    height: 50,
    width: 300,
    fontSize: fontSizeInput,
    fontWeight: fontWeightInput,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
  },
  errorAlert: {},

  btnContainer: {
    maxHeight: 100,
    width: 300,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  largeBtn: {
    width: "100%",
  },
  returnBtn: {
    backgroundColor: mainBackgroundColor,
    position: "relative",
    paddingLeft: 300,
  },
});

export default styles;
