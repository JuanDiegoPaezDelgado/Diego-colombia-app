import { Tabs } from "expo-router";

/*los parentesis de tabs son para que no salga en la url */
export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="hobbies" options={{ headerShown: false }} />
      <Tabs.Screen name="qrpage" />
    </Tabs>
  );
};
