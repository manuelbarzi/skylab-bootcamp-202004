import React, { useState } from "react";
import { 
  StyleSheet,
  View,
  StatusBar
} from "react-native";
import Home from "./src/Home"
import MapBar from "./src/MapBar";
import MapRestaurant from "./src/MapRestaurant";
import ProfilePage from "./src/ProfilePage";
import Favourites from "./src/Favourites";
import Modal from "./src/Modal";
import Menu from "./src/Menu";
import Comments from "./src/Comments";

const App = () => {
  const [view, setView] = useState("home");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={true} />
      { view === "home" && <Home 
        onGoToMapBar={ () => setView("mapBar") } 
        onGoToMapRestaurant={ () => setView("mapRestaurant") } 
      /> }
      { view === "mapBar" && <MapBar
        onShowModal={ () => setModalVisible(true) }
      /> }
      { view === "mapRestaurant" && <MapRestaurant 
        onShowModal={ () => setModalVisible(true) }
      /> }
      { view === "profilePage" && <ProfilePage 
        onShowModal={ () => setModalVisible(true) }
        onGoToHome={ () => setView("home") }
        onGoToComments={ () => setView("comments") } 
      /> }
      { view === "comments" && <Comments 
        onShowModal={ () => setModalVisible(true) }
      /> }
      { view === "favourites" && <Favourites
        onShowModal={ () => setModalVisible(true) }
      /> }
 
      <Modal 
        isVisible={ modalVisible } 
        onGoToHome={ () => setView("home") }
        onHideModal={ () => setModalVisible(false) } />
      <Menu onGoTo={ setView } />
    </View>
  )
}

console.disableYellowBox = true

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  }
});

export default App;
