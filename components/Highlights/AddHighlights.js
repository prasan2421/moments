import * as React from "react";
import 'react-native-get-random-values'
import {BSON, ObjectId} from 'realm';
import { Image, StyleSheet, Text, View,StatusBar, SafeAreaView, TouchableOpacity,TextInput, ScrollView, Alert,FlatList  } from "react-native";
import { Button,  Checkbox, Divider, IconButton } from 'react-native-paper';
import { Padding, Border, FontSizeStyle, FontFamily, Color } from "../GlobalStyles";
import { realmContext, Highlight, Category} from "../../lib/RealmSchema";


// export const storage = new MMKV()
const {useRealm, useQuery, useObject} = realmContext;

const AddHighlight = ({navigation}) => {
  const realm = useRealm();
  // const myTask = useQuery(Highlight);
  const myCategory = useQuery(Category);
  
  // const categorySave = useObject(Category, categorySelected !=null?JSON.stringify(categorySelected):new BSON.ObjectId() )
  
    const [text, setText] = React.useState("");
    const [backtrace, setBacktrace] = React.useState(2);
    const [total, setTotal] = React.useState(10);
    const [category, setCategory] = React.useState("");
    const [categorySelected, setCategorySelected] = React.useState(null);
    const [categories, setCategories] = React.useState([]);
    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
      setCategories(myCategory)
      // console.log(`hightlights:${JSON.stringify(myCategory)}`)
        
        }, []);
    
     React.useEffect(() => {
   
//  console.log(`hightlights:${storage.getString('highlights')}`)

//  const highlights = JSON.parse(storage.getString('highlights'));
   
  }, []);

    const saveHighlight=()=>{

      if(text != "" &&  backtrace != "" &&  total !="" &&  categorySelected!=null){
       
        const highlight = {_id:new BSON.ObjectId(), name:text, backtrace:parseInt(backtrace), total:parseInt(total), categoryId:categorySelected}

        // console.log(`Categorysave:${categorySave }`)
     
         realm.write(() => {
          const category = realm.create('Category', {
            _id:categorySelected, 
          },'modified',
           )

           category.highlights.push(highlight);
        });

        // realm.write(() => {
        //   realm.create('Highlight', highlight)
        // });

        // realm.write(() => {
        //   realm.create('Category', highlight)
        // });
        Alert.alert('Success','Highlight added.');
        navigation.goBack()

        // if(storage.getString('highlights')){
        //   const highlights = JSON.parse(storage.getString('highlights'));
        //   // console.log(`hightlights:${JSON.stringify([...highlights,highlight])}`)

        //   storage.set('highlights', JSON.stringify([...highlights,highlight]))
        // }
        // else{
        //   storage.set('highlights', JSON.stringify([highlight]))
        // }

       
      }
      else{
        Alert.alert('Error','Missing.')
      }

     
    }

    const saveCategory=()=>{

      let categoryName = category

      if(category!=""){
        const category = {_id:new BSON.ObjectId(), name:categoryName}

        try {
          realm.write(() => {
            realm.create('Category', category)
          });
          setCategory("");
          Alert.alert('Success','Category added.');
        }
        catch(e){
Alert.alert('Error',e.message)
        }
       

       

        // if(storage.getString('highlights')){
        //   const highlights = JSON.parse(storage.getString('highlights'));
        //   // console.log(`hightlights:${JSON.stringify([...highlights,highlight])}`)

        //   storage.set('highlights', JSON.stringify([...highlights,highlight]))
        // }
        // else{
        //   storage.set('highlights', JSON.stringify([highlight]))
        // }

       
      }
      else{
        Alert.alert('Error','Missing Category.')
      }

     
    }

    categoryItem=(item)=>{
      return(
       <TouchableOpacity onPress={()=> 
        item.highlights.length >= 3?Alert.alert('Error','Cannot add more than 3 highlights in this category.'):
         setCategorySelected(item._id)
        
        }
         style={{display:'flex', justifyContent:'space-between', flexDirection:'row',  alignItems:'center', padding:10,margin:5, borderRadius:5, backgroundColor:categorySelected == item._id.toString() ?'lightgreen':'white'}}>
          <Text variant="titleLarge" style={{color:'black',}}>{item.name}</Text>
          
         
         <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
         <Text variant="titleLarge" style={{color:'black',}}>{item.highlights.length}/3</Text> 
           {/* {categorySelected == item._id.toString() ?(<IconButton  icon="check" iconColor={'gray'} size={20} />):null} */}
           
           </View>
    </TouchableOpacity>
      )
    }
    
  return (
    <View style={{ flex:1, position:'relative'}}>

  
    <ScrollView
   
  
    >
         <StatusBar
        animated={true}
        backgroundColor="#FFF"
       
      />
     <View style={{ paddingHorizontal:15, }}>
      <View style={styles.logoContainer}>
          <View>
          <Text style={{color:'black',marginTop:20, marginLeft:10, color:'#444', fontWeight:'500'}}>Name</Text>
          <TextInput    
        style={styles.input}
        onChangeText={text => setText(text)}
        value={text}
        placeholder={'Name '}
        placeholderTextColor={'gray'}
      />
     
          </View>
          <View>
          <Text style={{color:'black', marginTop:20,marginBottom:10,marginLeft:10, color:'#444', fontWeight:'500'}}>Settings</Text>
          <View style={{backgroundColor:'white', borderRadius:10}}>
         
          <View style={{flexDirection:'row',paddingHorizontal:20, justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:16, }}>Backtrace</Text>
            
            <View style={{flexDirection:'row',  alignItems:'center'}}>
            <TextInput
        style={styles.inputSettings}
        onChangeText={text => setBacktrace(text)}
        value={backtrace.toString()}
       
        keyboardType="numeric"
        placeholderTextColor={'gray'}
      />
    <Text style={{color:'black'}}>sec</Text>
    </View>
          </View>
    <Divider />
    
    <View style={{flexDirection:'row',paddingHorizontal:20, justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:16, }}>Length</Text>
            <View style={{flexDirection:'row',  alignItems:'center'}}>
            <TextInput
        style={styles.inputSettings}
        onChangeText={text =>{
          if (Number(text) >= 10 ||  Number(text)<=30){
            setTotal(text)}
          }
          
        } 
        value={total.toString()}
        
        keyboardType="numeric"
        placeholderTextColor={'gray'}
      />
    <Text style={{color:'black'}}>sec</Text>
    </View>
          </View>
          <Divider />
          <View style={{flexDirection:'row',paddingHorizontal:20, paddingVertical:10, justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'black', fontSize:16, }}>Total</Text>
            <View style={{flexDirection:'row',  alignItems:'center'}}>
            
    <Text style={{color:'black'}}>{Number(backtrace) + Number(total)} sec/s</Text>
    </View>
          </View>
   
  </View>
      
          </View>
         
         
      </View>
      <View>
      <Text style={{color:'black',marginTop:20, marginLeft:10, color:'#444', fontWeight:'500'}}>Category <Text style={{color:'gray', fontSize:12,}}>(max 3 highlights)</Text></Text>
          <View style={{backgroundColor:'white', borderRadius:10, marginTop:10, }}>
          <View style={{  }} >
            
            <FlatList
            scrollEnabled={false}
        data={categories}
        renderItem={({item}) => categoryItem(item)}
        keyExtractor={item => item._id}
        ListEmptyComponent={()=><Text style={{color:'black', fontSize:16,margin:10  }}>No category.. </Text>}
      />
            
          </View>
          <Divider />
    
    <TextInput
        style={styles.inputCategories}
        onChangeText={text => setCategory(text)}
        value={category}
        placeholder={'Category'}
        placeholderTextColor={'gray'}
      />
            
          </View>
      </View>
      <View>
      <TouchableOpacity style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end',}} onPress={() => saveCategory()}>
            <Button  icon="plus" iconColor={Color.purple} /><Text style={{color:Color.purple}}>Add a category</Text>
            </TouchableOpacity>
      </View>
      </View>
      <View style={{height:140}}/>
     
    </ScrollView>
    <View style={styles.bottomButtonContainer}>
     
     <Button mode="contained" style={styles.ButtonWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle} onPress={() => saveHighlight()}>
          SAVE
      </Button>
      <Button mode="outlined" style={styles.signInWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle} onPress={() => navigation.goBack()}>
      CANCEL
      </Button>
      
     
     
    </View>
    </View>
  );
};

export default AddHighlight;

const styles = StyleSheet.create({
   
  bottomButtonContainer:{
    position:'absolute',
    paddingTop:10,
    borderTopWidth:1, borderTopColor:'lightgray',
         bottom:10,
         width:'100%',
         paddingHorizontal:15, 
         backgroundColor:'rgba(244, 239, 244, 1)'
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
     
    //   justifyContent:'center',
  
      justifyContent:'flex-start',
  },
  input: {
    height: 40,
    marginTop:10,
    // borderWidth: 1,
    color:Color.purple,
    backgroundColor:'white',
    borderRadius:10,
    padding: 10,
  },
  inputSettings: {
    height: 40,
    marginVertical:10,
    marginRight:5,
    // borderWidth: 1,
    backgroundColor:'lightgray',
    borderRadius:10,
    color:Color.purple,
    padding: 10,
  },
  inputCategories: {
    height: 40,
    marginVertical:10,
    marginHorizontal:20,
    // flex:1,
    // borderWidth: 1,
    backgroundColor:'lightgray',
    borderRadius:10,
    color:Color.purple,
    // padding: 10,
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
    marginTop:10
  },
  
});


