import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SalonsScreen from "../screens/SalonsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
        tabBarStyle: {
          height: 90,
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Feather.glyphMap = "home";

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Salons") iconName = "users";
          else if (route.name === "Mon Espace") iconName = "user";

          return <Feather name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#999",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Salons" component={SalonsScreen} />
      <Tab.Screen name="Mon Espace" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
