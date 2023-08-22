import { Text } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ItemRenderer = ({ item }) => {
  return (
    <View style={{ padding: 30, backgroundColor: "grey" }}>
      <Text style={{ wordBreak: "break-all" }}>{JSON.stringify(item)}</Text>
    </View>
  );
};

const Header = () => {
  return (
    <TouchableOpacity style={{ color: "blue" }}>
      <Text>Toggle Menu</Text>
    </TouchableOpacity>
  );
};

export default function Page() {
  return (
    <SafeAreaProvider>
      <DrawerProvider>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            data={new Array(100).fill(0).map((_, i) => i)}
            ListHeaderComponent={Header}
            ItemRenderer={ItemRenderer}
          />
        </View>
      </DrawerProvider>
    </SafeAreaProvider>
  );
}
