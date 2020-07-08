import React from 'react';
import { StyleSheet, Text, TextInput, FlatList, View, TouchableOpacity, Alert, Image } from 'react-native';
import { getFavoriteRecipes, clearStorage } from '../lib/async-storage';

const styles = StyleSheet.create({
  outerView: {
    backgroundColor: '#F1F0EE',
    width: '100%',
    height: '100%'
  },
  inputsView: {
    backgroundColor: '#F1F0EE',
    padding: 5
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#44346c',
    fontSize: 14,
    paddingBottom: 5
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#1062FE',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15
  },
  deleteButton: {
    backgroundColor: '#da1e28',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    marginHorizontal:10,
    textAlign:'center'
  },
  searchResultText: {
    fontFamily: 'IBMPlexSans-Bold',
    padding: 10,
    color: '#44346c'
  },
  flatListView: {
    backgroundColor: '#F1F0EE',
    alignSelf: 'center',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  itemTouchable: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal:10,
    marginVertical:5,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 14,
    color: '#44346c',
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemDescription: {
    fontSize: 12,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  logo: { 
    justifyContent: 'flex-start',
    padding: 2,
    width: "100%",
    height: 150
  }
});
//
const MyCookbook = function ({ route, navigation }) {
  const [items, setItems] = React.useState([]);
  const [info, setInfo] = React.useState('');

  const clearCookbook = () => {
    clearStorage()
      .then((value) => {
        loadCookbook();
      });
  };
  const Item = (props) => {
    return (
      <TouchableOpacity style={styles.itemTouchable}
          onPress={() => { navigation.navigate('Recipe Details', { item: props }); }}>
      
        <View style={styles.itemView}>
        <Image
        style={styles.logo}
        source={{uri: props.imageUrl}}
        />

        </View>
        <Text style={styles.itemName}>{props.name}</Text>
          <Text style={styles.itemDescription}>{props.description}</Text>
      </TouchableOpacity>

       
    );
  };

const loadCookbook = () => {
  getFavoriteRecipes()
    .then((cookbook) => {
      cookbook = JSON.parse(cookbook);
      if(!cookbook){
        cookbook = [];
      }
      setInfo(`${cookbook.length} result(s)`)
      setItems(cookbook);
    });
}  
React.useEffect(() => {

  navigation.addListener('focus', () => {
    loadCookbook();
  });
  
}, []);

  return (
    <View style={styles.outerView}>
      <View style={styles.inputsView}>
        
      <TouchableOpacity onPress={clearCookbook}>
        <Text style={styles.deleteButton}>Clear Cookbook</Text>
      </TouchableOpacity>
      </View>

      <Text style={styles.searchResultText}>{info}</Text>

      <FlatList style={styles.flatListView}
        data={items}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={item => item.id || item['_id'] || item['tracking-id']}
      />
    </View>
  );
};

export default MyCookbook;
