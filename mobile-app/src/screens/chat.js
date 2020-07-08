import React from 'react';
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, Text, TextInput, Button, TouchableOpacity, Linking, Image } from 'react-native';

import { session, message } from '../lib/utils';

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F1F0EE'
  },
  innerContainer: {
    width: '100%',
    height: '100%'
  },
  scrollContainer: {
    flex:1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 5
  },
  messageContainer: {
    flexDirection: 'column',
    marginTop: 10,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  waText: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 10,
    alignSelf: 'flex-start',
    maxWidth: '85%'
  },
  myText: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#44346c',
    color:'#68ddea',
    padding: 10,
    alignSelf: 'flex-end',
    maxWidth: '80%'
  },
  inputContainer: {
    backgroundColor: '#F1F0EE',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    elevation: 2,
    paddingRight: 70,
    marginBottom: 25
  },
  submitButton: {
    fontFamily: 'IBMPlexSans-Medium',
    position: 'absolute',
    right: 24,
    bottom: 47
  },
  anchorLink: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#1062FE',
    padding: 2.5
  },
  chatText: {
    fontFamily: 'IBMPlexSans-Medium',
    color:'#68ddea'
  },
  itemTouchable: { //overall tile
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25
  },
  itemTouchable: {
    flexDirection: 'column',
    padding: 15,
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

const Chat = function ({ navigation }) {
  const [input, setInput] = React.useState('');
  const [sessionId, setSessionId] = React.useState('');
  const [messages, setMessages] = React.useState([]);


  const RecipeLink = (props) => {
    return (
      <TouchableOpacity style={styles.itemTouchable}
          onPress={() => { navigation.navigate('Recipe Details', { item: props }); }}>

        <View style={styles.itemView}>
        <Image
        style={styles.logo}
        source={{uri: props.display.images[0]}}  
        />

        </View>
        <Text style={styles.itemName}>{props.display.displayName}</Text> 
        <Text style={styles.itemDescription}>{props.seo.web['meta-tags'].description}</Text>
      </TouchableOpacity>
      

    )
  };

  const Resource = (props) => {
    return <RecipeLink {...props} />
  };
  
  const Message = (props) => {
    const style = props.fromInput ? styles.myText : styles.waText;

    if(typeof props.text === 'object'){
      return (
        <View style={styles.messageContainer}>
          <View style={style}>
            { props.text.feed.map((resource, i) => {
              resource.key = resource['tracking-id'];
              return <Resource {...resource} />
            })}
          </View>
        </View>
      );
    }else{
      return (
        <View style={styles.messageContainer}>
          <View style={style}>
            <Text style={styles.chatText}>{props.text}</Text>
          </View>
        </View>
      );
    }
    
  };

  const getSession = () => {
    return session()
      .then(sid => {
        setSessionId(sid);
        return sid;
      });
  };

  const handleMessageResponse = (response) => {
    if (!response.ok) {
      throw new Error(response.statusText || response.message || response.status);
    } else {
      return response.json().then(response => {
        addMessages(response.generic, false, response.resources);
      })
    }
  }

  const sendMessage = () => {
    const payload = {
      text: input.trim(),
      sessionid: sessionId
    };

    addMessages([{ text: input }], true);

    setInput('');

    message(payload)
      .then(handleMessageResponse)
      .catch(e => {
        getSession()
          .then((sid) => {
            return message({
              text: payload.text,
              sessionid: sid
            });
          })
          .then(handleMessageResponse)
          .catch(err => {
            console.log(err)
            addMessages([{
              text: 'ERROR: Please try again. If the problem persists contact an administrator.'
            }]);
          });
      });
  };

  const addMessages = (msgs, fromInput, resources) => {
    const date = (new Date()).getTime();
    const result = msgs.map((r, i) => {
      try{
        let data = JSON.parse(r.text);
        r.text = data;
      }catch(e){}
      
      return {
        text: r.text,
        fromInput: fromInput,
        resources: resources || []
      };
    });

    setMessages(msgs => [
      ...msgs,
      ...result
    ]);
  };

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getSession();
    });
  }, []);

  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior='height'
        keyboardVerticalOffset={Platform.select({
          ios: 78,
          android: 0
        })} >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {messages.map((msg, i) => {
            msg.key = `msg-${(new Date()).getTime()}-${i}`;
            return <Message {...msg} />
          })}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType='send'
            enablesReturnKeyAutomatically={true}
            placeholder='Ask a question...'
            blurOnSubmit={false}
          />
          <View style={styles.submitButton}>
            {input !== '' && <Button title='Send' onPress={sendMessage} color='#44346c'/>}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;
