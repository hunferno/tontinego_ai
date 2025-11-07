import { StyleSheet, ScrollView, View } from "react-native";
import BannerCarousel from "../components/BannerCarousel";
import WinnersList from "../components/WinnersList";
import UserSalonCard from "../components/UserSalonCard";
import HeaderBalance from "../components/HeaderBalance";
import Constants from "expo-constants";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: Constants.statusBarHeight }}>
      <HeaderBalance />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <BannerCarousel />
        <WinnersList />
        <UserSalonCard />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});
