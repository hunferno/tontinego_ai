import { StyleSheet, ScrollView } from "react-native";
import BannerCarousel from "../components/BannerCarousel";
import BalanceCard from "../components/BalanceCard";
import WinnersList from "../components/WinnersList";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <BannerCarousel />
      <BalanceCard />
      <WinnersList />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});
