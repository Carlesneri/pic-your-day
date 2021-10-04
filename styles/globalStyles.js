import { StyleSheet } from "react-native"
import { BACKGROUND_COLOR } from "../CONSTANTS"

export default StyleSheet.create({
  h1: {
    fontWeight: "bold",
    fontSize: 24,
    color: 'white',
    fontFamily: 'NotoSansJP-Regular'
  },
  h2: {
    fontWeight: "bold",
    fontSize: 20,
    color: 'white',
  },
  h3: {
    fontWeight: "bold",
    color: 'white',
    fontSize: 16,
  },
  container: {
    padding: 32,
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  p: {
    color: 'white',
  }
})


