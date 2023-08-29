import * as React from "react";
import 'react-native-get-random-values'
import {BSON, ObjectId} from 'realm';
import { Image, StyleSheet, Text, View,StatusBar, SafeAreaView, ScrollView,FlatList, TouchableOpacity} from "react-native";
import { Button, TextInput, Checkbox,Card, IconButton, List } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import { Padding, Border, FontSizeStyle, FontFamily, Color } from "../GlobalStyles";
import { realmContext, Highlight, Category} from "../../lib/RealmSchema";
import DefaultCategory from "../../utils/DefaultCategory";

const {useRealm, useQuery, useObject} = realmContext;

const Register = ({navigation}) => {

  const myHighlights = useQuery(Highlight);
  const myCategory = useQuery(Category);

    const [text, setText] = React.useState("");
    const [checked, setChecked] = React.useState(false);
    const [highlights, setHighlights] = React.useState([]);
    const [expanded, setExpanded] = React.useState(true);
    const [categories, setCategories] = React.useState([]);
    const handlePress = () => setExpanded(!expanded);

    React.useEffect(() => {
      
      setHighlights(myHighlights)
      console.log(`hightlights:${JSON.stringify(myHighlights)}`)
         
        }, []);


    React.useEffect(() => {

      // const FullCategory = myCategory.concat(DefaultCategory)
      setCategories(myCategory)
      console.log(`categories new:${JSON.stringify(myCategory)}`)
        
        }, []);

        highlightItem=(item)=>{
          return(
           <TouchableOpacity style={{backgroundColor:'white',marginTop:10, marginBottom:3, marginLeft:10, marginRight:10, borderRadius:10, padding:10, elevation:3}}>
              <Text variant="titleLarge" style={{color:'black'}}>{item.name}</Text>
        <View style={{ alignItems:'flex-end'}}>
        <Text variant="titleLarge" style={{color:'gray'}}>Backtrace {item.backtrace} sec</Text>
        <Text variant="titleLarge" style={{color:'gray'}}>Total {item.total} sec</Text>
        </View>
        </TouchableOpacity>
          )
        }

        const categoryItem=(item,id)=>{
          return(
            <List.Accordion left={props => <List.Icon {...props} icon="star" />} title={item.name} id={JSON.stringify(id)} description={`Highlights : ${item.highlights.length}`} descriptionStyle={{fontSize:12}}>
             
           
              {(item.highlights).map((highlightItem,i)=>(
                <List.Item 
                right={()=>(<View>
                  <Text style={{color:'black', fontSize:12}}>Backtrace: {highlightItem.backtrace} s</Text>
                <Text style={{color:'black', fontSize:12}}>Total: {highlightItem.total} s</Text>
                </View>)}
                 key={i} style={{color:'black'}} title={highlightItem.name} />
                ))

              }
            
          </List.Accordion>
          )
        }

  return (
    <View
    style={styles.authContainer}
    >
        <StatusBar
        animated={true}
        backgroundColor="#000"
       
      />
 

{/* <FlatList
        data={highlights}
        renderItem={({item}) => highlightItem(item)}
        keyExtractor={item => item._id}
        ListEmptyComponent={()=><Text>No Highlights to display..</Text>}
      /> */}
      
     
  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
  <Text style={{color:'black', marginLeft:20, color:'#444',fontSize:16, fontWeight:'500'}}>CATEGORIES</Text>
  <IconButton  icon="pencil" iconColor={'gray'} size={20} />

  </View>

  <List.AccordionGroup>

  <FlatList
        data={(categories.concat(DefaultCategory)).slice().reverse()}
        renderItem={({item,index}) => categoryItem(item,index)}
        keyExtractor={item => item._id}
        ListEmptyComponent={()=><Text style={{color:'gray', textAlign:'center'}}>No category to display..</Text>}
      />
  
  </List.AccordionGroup>
  
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        // paddingHorizontal:10,
       marginTop:10,
       position:'relative',
      },
      navContainer:{
          flex:1,
          justifyContent:'flex-start',
          paddingBottom:20
        //   alignItems:'center',
      },
 
      buttonWrapperContent: {
   height:50,
 
  },
  fontStyle: {
    fontSize: FontSizeStyle.size_base,
   fontFamily: FontFamily.sFProMedium,
//    fontWeight: "500",
    // width: '100%',
    // borderRadius: Border.br_3xs,
    letterSpacing: 1,
  },
 
  logoContainer:{
      flex:1.2,
    //   justifyContent:'center',
   
      justifyContent:'flex-end',
  },

  logoContainerText: {
    fontSize: 20,
    color: "#000",
    fontFamily: FontFamily.sFProMedium,
    fontWeight: "500",
    letterSpacing: 1,
   marginTop:20
  },
  register: {
    color: "#fff",
  },
  ButtonWrapper: {
   
    backgroundColor: Color.purple,
    borderRadius: Border.br_3xs,
  },
  signIn: {
    color: Color.purple,
  },
  signInWrapper: {
    
    borderColor: "#7636b7",
    borderRadius: Border.br_3xs,
    marginTop:15
  },
  
});


