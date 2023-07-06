import AsyncStorage from '@react-native-async-storage/async-storage';

const createData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
    console.log(e)
  }
}

const getData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    const allData = new Array();

    for(let item of values){
      allData.push(JSON.parse(item[1]));
    }
    console.log(allData[0])
    return allData

  } catch(e) {
    // error reading value
    console.log(e);
  }
}

const getDataWithId = async (id) => {
  try {
    const value = await AsyncStorage.getItem("id"+id);
    return JSON.parse(value);
  } catch(e) {
    // error reading value
    console.log(e);
  }
}

const addData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem("id"+value.id, jsonValue)
  } catch (e) {
    // saving error
    console.error(e)
  }
}

const removeData = async (id) => {
  try {
    AsyncStorage.removeItem("id"+id)
  } catch(e) {
    console.log(e)
  }
}

const mergeData = async (value) => 
{
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.mergeItem('@storage_Key', jsonValue)
  } catch (e) {
    console.log(e);
  }

}

const generateIDFromData = (data) =>
{
  let id = 0;
  if(data.length === 0)
  {
    return id;
  }
  else
  {
    for(item of data)
    {
      if(item.id > id)
      {
        id = item.id;
      }
    }
    return id + 1;
  }
}

const clear = async ()=>{
  await AsyncStorage.clear()
}
export default {getData, clear,createData, mergeData, addData,removeData, getDataWithId, generateIDFromData}