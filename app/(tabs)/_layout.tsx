import { Tabs } from "expo-router";

/*los parentesis de tabs son para que no salga en la url */
export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="list" />
    </Tabs>
  );
};
