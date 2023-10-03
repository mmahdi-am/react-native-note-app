import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import React from "react";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const ListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskToEdit, setSelectedTaskToEdit] = useState();
  const [error, setError] = useState("");
  const isFocused = useIsFocused();

  const getTasks = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    return result;
  };

  const handleDeleteItem = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      getTasks()
        .then((res) => {
          setData(res);
        })
        .catch((e) => {
          console.log(e);
        });
      return true;
    } catch (exception) {
      return false;
    }
  };

  const getTask = async (id) => {
    setModalVisible((p) => !p);
    setSelectedTaskToEdit(id);
    try {
      let value = await AsyncStorage.getItem(id);
      if (value !== null) {
        value = JSON.parse(value);

        setTaskTitle(value.title);
        setTaskDescription(value.description);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const handleEditTask = async () => {

    const res = await AsyncStorage.mergeItem(
      String(selectedTaskToEdit),
      JSON.stringify({
        id: selectedTaskToEdit,
        title: taskTitle,
        description: taskDescription,
      })
    );

    const data = await getTasks()
    setData(data)
    setModalVisible(false)

  };

  useEffect(() => {
    if (isFocused) {
      getTasks()
        .then((res) => {
          setData(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [isFocused]);

  return (
    <View>
      <FlatList
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              borderWidth: 1,
              borderRadius: 10,
              padding: 16,
            }}
          >
            موردی برای نمایش وجود ندارد
          </Text>
        }
        data={data}
        inverted
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() =>
                navigation.navigate("TaskScreen", {
                  id: item[0],
                  title: JSON.parse(item[1]).title,
                  description: JSON.parse(item[1]).description,
                })
              }
            >
              <Card>
                <View>
                  <Card.Title>{JSON.parse(item[1]).title}</Card.Title>
                </View>
                <Card.Divider />

                <View style={styles.user}>
                  <AntDesign
                    style={{ position: "absolute", bottom: 0, left: 0 }}
                    name="delete"
                    size={30}
                    onPress={() => {
                      Alert.alert("آیا قصد حذف این سطر را دارید ؟", "", [
                        {
                          text: "بله",
                          onPress: () => handleDeleteItem(item[0]),
                        },
                        {
                          text: "خیر",
                          onPress: () => {},
                        },
                      ]);
                    }}
                    color="black"
                  />

                  <Entypo
                    name="edit"
                    size={24}
                    onPress={() => getTask(item[0])}
                    color="black"
                    style={{ position: "absolute", bottom: 0, left: 45 }}
                  />

                  <Text style={styles.name}>
                    {" "}
                    {new Date(Number(item[0]))
                      .toLocaleString("fa", { timeZone: "Asia/Tehran" })
                      .toString()}
                  </Text>
                </View>
              </Card>
            </Pressable>
          );
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalStyle}>
          <AntDesign
            name="closecircleo"
            size={24}
            color="black"
            onPress={() => setModalVisible(false)}
          />
          <Text
            style={{
              color: "red",
              textAlign: "center",
              padding: 10,
              fontSize: 20,
            }}
          >
            {error}
          </Text>

          <TextInput
            value={taskTitle}
            onChangeText={setTaskTitle}
            style={styles.input}
            placeholder="عنوان را وارد کنید ..."
          />
          <TextInput
            placeholder="یادداشت حود را وارد کنید ..."
            value={taskDescription}
            onChangeText={setTaskDescription}
            multiline={true}
            numberOfLines={10}
            style={styles.textarea}
          />
          <Pressable
            title="ذخیره"
            style={styles.saveBtn}
            onPress={() => handleEditTask()}
          >
            <Text style={{ textAlign: "center", color: "white" }}>ذخیره</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    alignItems: "center",
    marginBottom: 6,
    position: "relative",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  infoContainer: {
    flexDirection: "row",
  },
  modalStyle: {
    marginTop: 90,
    flex: 1,
    padding: 15,
    backgroundColor: "#EDEDED",
    borderRadius: 15,
    borderWidth: 1,
    borderBottomLeftRadius: 0,

    borderBottomRightRadius: 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  textarea: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,

    padding: 10,
    textAlignVertical: "top",
  },
  saveBtn: {
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "green",
  },
});

export default ListScreen;
