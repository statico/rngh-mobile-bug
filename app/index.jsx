import { createContext, useRef, useContext } from "react";
import { Text, View } from "react-native";
import {
  FlatList,
  GestureHandlerRootView,
  TouchableOpacity,
  DrawerLayout,
} from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const DrawerContext = createContext(null);

export const Menu = () => {
  const { close } = useContext(DrawerContext);
  return (
    <View style={{ flex: 1, backgroundColor: "papayawhip", padding: 40 }}>
      <Text style={{ marginBottom: 20 }}>
        This is the menu. Open and close me a few times, then scroll the list,
        and it will get stuck open.
      </Text>
      <TouchableOpacity onPress={close}>
        <Text style={{ backgroundColor: "skyblue", padding: 20 }}>
          Close Drawer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerProvider = ({ children }) => {
  const drawer = useRef();

  const open = () => {
    console.log("requesting open");
    drawer.current.openDrawer();
  };

  const close = () => {
    console.log("requesting close");
    drawer.current.closeDrawer();
  };

  return (
    <DrawerContext.Provider value={{ open, close }}>
      <DrawerLayout
        ref={drawer}
        drawerWidth={315}
        renderNavigationView={() => <Menu />}
        onDrawerClose={() => console.log("closed")}
        onDrawerOpen={() => console.log("opened")}
        onDrawerSlide={() => console.log("sliding")}
        onDrawerStateChanged={(state) => console.log("state changed", state)}
      >
        {children}
      </DrawerLayout>
    </DrawerContext.Provider>
  );
};

const ItemRenderer = ({ item }) => {
  return (
    <View style={{ padding: 30, backgroundColor: "pink" }}>
      <Text>Just something to scroll no. {item.id}</Text>
    </View>
  );
};

const Header = () => {
  const { open } = useContext(DrawerContext);
  return (
    <TouchableOpacity onPress={open}>
      <Text style={{ backgroundColor: "skyblue", padding: 20 }}>
        Open Drawer
      </Text>
    </TouchableOpacity>
  );
};

export default function Page() {
  const items = new Array(100).fill(0).map((_, i) => ({ id: i }));
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <DrawerProvider>
          <View style={{ flex: 1, padding: 20 }}>
            <FlatList
              style={{ flex: 1, backgroundColor: "gold" }}
              data={items}
              ListHeaderComponent={Header}
              renderItem={ItemRenderer}
            />
          </View>
        </DrawerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
