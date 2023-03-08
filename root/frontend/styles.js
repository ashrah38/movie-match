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
  },
  loginForm: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
  },
  roomsContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  startPageContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  categoryContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "95%",
    maxHeight: "95%",
    borderColor: "#ccc",
    borderWidth: 2,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    padding: 10,
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
  btnContainerWidget: {
    width: 250,
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
  roomsBtn: {
    minWidth: "85%",
    marginBottom: 40,
  },
  categoryBtn: {
    margin: 2,
  },
  categorySubmitBtn: {
    margin: 5,
    marginTop: 30,
    minWidth: "35%",
  },
  hideMainRoomDisplay: {
    display: "none",
  },
  recentRoomsWidget: {
    minWidth: "85%",
    minHeight: 300,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  widgetHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  roomWidgets: {
    position: "absolute",
    zIndex: 10,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: "auto",
    padding: 20,
    minWidth: "85%",
    minHeight: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  hideWidget: {
    display: "none",
  },
});

export default styles;
