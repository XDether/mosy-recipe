import AsyncStorage from '@react-native-async-storage/async-storage';

const createData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const getDataWithId = async (id) => {
  try {
    const data = await getData()
    for(let item of data)
    {
      if (id == item.id){
        return item
      }
    }
  } catch(e) {
    // error reading value
  }
}

const addData = async (value) => {
  try {
    const data = await getData();
    data.push(value);

    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
    console.error(e)
  }
}

const mergeData = async (value) => 
{
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.mergeItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }

}

export default {getData, createData, mergeData, addData, getDataWithId}