import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Title } from "react-native";
import { List, Button } from "react-native-paper";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { loadAll, clearAsyncStorage } from "./store";

export const MainScreen = () => {
  const navigation = useNavigation();
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      const newMemos = await loadAll();
      setMemos(newMemos);
    };
    const unsubscribe = navigation.addListener("focus", initialize);
    return unsubscribe;
  }, [navigation]);

  // const clearFunction = () => {
  //   clearAsyncStorage();
  // };

  // const memos = [
  //   {
  //     text: "本日は晴天なり",
  //     createAt: 1587774700000, //2020.03.30 22:25
  //   },
  //   {
  //     text: "これは重要なメモだよ",
  //     createAt: 1899774700000,
  //   },
  //   {
  //     text: "長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ長いメモ",
  //     createAt: 1729774321000,
  //   },
  // ];

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={memos}
        keyExtractor={(item) => `${item.createdAt}`}
        renderItem={({ item }) => (
          <List.Item
            title={item.text}
            titleNumberOfLines={5}
            description={`作成日時：${format(
              item.createdAt,
              "yyyy.MM.dd HH:mm"
            )} `}
            //{}でjavaScriptを埋め込むことになる。そこで``が使えるようになる。その中で$を使う。
            descriptionStyle={{ textAlign: "right" }}
          />
        )}
      />
      <Button
        style={styles.Fab}
        mode="elevated"
        textColor="blue"
        onPress={() => {
          navigation.navigate("Compose");
        }}
      >
        メモ追加
      </Button>
      {/* <Button
        style={styles.Clear}
        mode="elevated"
        textColor="blue"
        onPress={() => {
          clearFunction();
        }}
      >
        クリア
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  Fab: {
    position: "absolute",
    right: 16,
    width: "30%",
    bottom: 28,
  },
});
