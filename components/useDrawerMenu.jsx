import { createContext, useContext, useRef } from "react";
import { DrawerLayout } from "react-native-gesture-handler";

import { Menu } from ".";

const DrawerContext = createContext < DrawerContextValue > null;

export const DrawerProvider = ({ children }) => {
  const drawer = useRef < DrawerLayout > null;

  const open = () => {
    drawer.current.openDrawer();
  };

  const onClose = () => {
    drawer.current.closeDrawer();
  };

  return (
    <DrawerContext.Provider value={{ open }}>
      <DrawerLayout
        ref={drawer}
        drawerWidth={315}
        renderNavigationView={() => <Menu onClose={onClose} />}
      >
        {children}
      </DrawerLayout>
    </DrawerContext.Provider>
  );
};

export const useDrawerMenu = () => {
  const value = useContext(DrawerContext);

  if (!value) {
    throw new TypeError(
      "[useDrawerMenu]: Can't use outside of a DrawerContext",
    );
  }

  return value;
};
