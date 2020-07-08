import AsyncStorage from '@react-native-community/async-storage';

export const saveInStorage = async (key, value) => {
  let result = null;
    try {
        result = await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      throw new Error(e);
    }

    return result;
};

export const mergeInStorage = async (key, value) => {
  let result = null;
    try {
        result = await AsyncStorage.mergeItem(key, JSON.stringify(value));
    } catch (e) {
      throw new Error(e);
    }

    return result;
};

export const removeFromStorage = async (key) => {  
  let result = null;
  try {
     result = await AsyncStorage.removeItem(key)
  } catch(e) {
    throw new Error(e);
  }

  return result;
};

export const getFromStorage = async (key) => {  
  let result = null;
  try {
    result = await AsyncStorage.getItem(key)
  } catch(e) {
    throw new Error(e);
  }

  return result;
};

export const clearStorage = async () => {  
  let result = null;
  try {
    result = await AsyncStorage.clear()
  } catch(e) {
    throw new Error(e);
  }

  return result;
};

export const getAllKeysFromStorage = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch(e) {
    throw new Error(e);
  }

  return keys;
}

export const saveFavoriteRecipes = (item) => {

  return new Promise(function (resolve, reject) {
    getFavoriteRecipes()
    .then((cookbook) => {
      if(!cookbook){
          cookbook = [item];
      }else{
        cookbook = JSON.parse(cookbook);
        let exists = false;
        for(i=0;i<cookbook.length;i++){
          if(cookbook[i].id == item.id){
            exists = true;
          }
        }
        if(!exists){
          cookbook.push(item);
        }
        
      } 
      saveInStorage('cookbook', cookbook)
      .then(()=>{
        resolve();
      }); 
    });
  });
};

export const getFavoriteRecipes = () => {
  return getFromStorage('cookbook');
};

