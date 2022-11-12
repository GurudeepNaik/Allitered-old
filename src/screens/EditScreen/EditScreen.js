import React, { useEffect, useState, useRef } from 'react'
import styles from './styles'
import { View, Text, TouchableOpacity, TextInput, Keyboard, BackHandler } from 'react-native' 
import {promptPath} from '../../helper/prompts'
import Icon from 'react-native-vector-icons/Ionicons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { EventsAction } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const EditScreen = props => {
  const [bottomMargin, setBottomMargin] = useState(20);
  const [userTypedPrompt, setUserTypedPrompt] = useState(props.route.params.promptToDisplay.trim() + ' ')
  const [changedPrompt, setChangedPrompt] = useState(props.route.params.promptToDisplay)
  const [addedText, setAddedText] = useState(props.route.params.promptToDisplay)
  const [actualPrompt, setactualPrompt] = useState(props.route.params.promptData[0].title)
  const [totalWords, setTotalWords] = useState(props.route.params.promptData[0].letters)
  const [remainingWords, setRemainingWords] = useState(props.route.params.promptData[0].letters)
  const [points, setPoints] = useState(0)
  const [prePoints, setPrePoints] = useState(0)
  const [totalLength, setTotalLength] = useState(0)
  const [counter, setCounter] = useState(0)
  const [showFinish, setShowFinish] = useState(true)
  const [showError, setShowError] = useState(false)
  const [showFlashPoints, setShowFlashPoints] = useState(true)
  const [init, setInit] = useState(false)
  const {promptData, promptToDisplay} = props.route.params
  const inputRef = useRef()
  const scrollRef = useRef()
  var intervalRef = useRef()
  var finishTimeoutRef = useRef()
  var errorTimeoutRef = useRef()

  const dispatch = useDispatch()
  const [userLevel, userPoints, tempSavedPrompt, savedPrompts] = useSelector(({ Events }) => [
    Events.userLevel,
    Events.userPoints,
    Events.tempSavedPrompt,
    Events.savedPrompts,
  ])

  useEffect(() => {
    inputRef.current.focus()
    calculateRemainingWords(userTypedPrompt)
    validateTypedPrompt(promptToDisplay)
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  },[])


  const handleBackButton = () => {
    return true;
  }

  useEffect( () => {
    const timerFlash = setTimeout(() => { 
      setShowFlashPoints(true)
     }, 2000)

    return () => {
      //clearTimeout(timerError)
      clearTimeout(timerFlash)
      //setShowError(false)
    }
  },[changedPrompt])


  const onBackSavePrompt = () => {
    if(isDataMissing()){
      props.navigation.goBack()
      return
    }
    if(tempSavedPrompt)
    {
      let tempData = [{
        promptId: promptData[0].id,
        userTypedPrompt,
        points
      }]
      dispatch(EventsAction.SetTempSavedPrompt(tempData))
      props.navigation.goBack()
    }
  }

  const onFinish = () => {
    if(tempSavedPrompt && tempSavedPrompt.length > 0){
      dispatch(EventsAction.SetTempSavedPrompt([]))
    }
    const now = Date.now();
    let tempData = {
      id: 'ID'+now,
      promptId: promptData[0].id,
      promptTitle: userTypedPrompt,
      date: getTodayDate(),
      dateTime: now,
    }
    dispatch(EventsAction.SetSavedPrompts(tempData))
    if(userLevel >= 13){
      dispatch(EventsAction.SetUserLevel(1))
      dispatch(EventsAction.SetUserPoints(0)) 
      props.navigation.goBack() 
      return
    }
    dispatch(EventsAction.SetUserLevel(userLevel + 1))
    dispatch(EventsAction.SetUserPoints(userPoints + points))
    props.navigation.goBack()
  }

  const getTodayDate = () => {
    const date = new Date()
    var month = date.getMonth() + 1
    var day = date.getDate()
  
    if(month <=9){
      month = "0"+month
    }
    if(day <=9){
      day = "0"+day
    }
    return date.getFullYear()+"-"+month+"-"+day
  }

  const isDataMissing = () => {
    if(userTypedPrompt.trim() == promptToDisplay)
      return true
    else
      return false
  }

  const showFinishText = () => {
    return(
    <View style={{flex:0, flexDirection: 'row', justifyContent: 'flex-end',
      marginRight: 24,bottom: bottomMargin}}>
      <Text style={styles.finishText} onPress={()=>onFinish()}>
        {'Finish'}
      </Text>
    </View>)
  }

  const showErrorText = () => {
    return(
    <View style={{flex:0, flexDirection: 'row', justifyContent: 'flex-end',
      marginRight: 24,bottom: bottomMargin}}>
      <Text style={styles.finishText} onPress={()=>onFinish()}>
        {'negative points'}
      </Text>
    </View>)
  }

  const showExceedText = (value) => {
    return(
    <View style={{flex:0, flexDirection: 'row', justifyContent: 'flex-end',
      marginRight: 24,bottom: bottomMargin}}>
      <Text style={styles.finishText} onPress={()=>onFinish()}>
        {value + ' characters'}
      </Text>
    </View>)
  }

  const getLetterCount = (str) => {
    var letters = 0
    var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    var ar = alphabet.split("")
    for (var i=0; i<str.length;i++) {
        if (ar.indexOf(str[i]) > -1) {
            letters = letters + 1;
        }
    }
    return letters
  }

  const clearForErrorFinishTimeouts = () => {
    if(finishTimeoutRef.current){
      clearTimeout(finishTimeoutRef.current)
    }
    if(errorTimeoutRef.current){
      clearTimeout(errorTimeoutRef.current)
    }

  }

  const handleChange = (event) => {
    setShowFinish(false)
    setShowError(false)

    const { text } = event.nativeEvent;
    if(!init){
      setInit(true)
      return
    }

    if(intervalRef.current){
      //clearTimeout(intervalRef.current)
    }
    clearForErrorFinishTimeouts()
    
    errorTimeoutRef.current = setTimeout(() => { setShowError(true) }, 3000)
    finishTimeoutRef.current = setTimeout(() => {
        setShowFinish(true)
    },3000)

    intervalRef.current = setTimeout(() => {
      setChangedPrompt(text)
      var newText = text.replace(addedText, '').trim()
      newText = newText.replace(actualPrompt, '').trim()
      var countRemovedPoints = false
      validateTypedPrompt(text, countRemovedPoints)
      if(addedText.length > text.length){
        // get deleted text
        newText = addedText.replace(text, '').trim()
        countRemovedPoints = true
      }
      if(newText.trim()!=''){
        setShowFlashPoints(false)
        setAddedText(text)
        clearForErrorFinishTimeouts()
      }else{
        setShowFinish(true)
        setShowError(true)
      }
    },2000)
  }

  useEffect(() => {
    if(!showFlashPoints){
      setShowFinish(true)
      setShowError(true)
    }
  },[points])

  const calculateRemainingWords = (typedText) => {
    let lettersCount = getLetterCount(typedText.replace(actualPrompt, ""))
    if(lettersCount == totalWords){
      setRemainingWords(0)
    }else if(lettersCount > totalWords){
      setRemainingWords(0)
    }else{
      setRemainingWords(totalWords - lettersCount)
    }
  }

  const validateTypedPrompt = (text, countRemovedPoints) => {
    let matchChar = actualPrompt[0].toLowerCase()
    let typedText = text.replace(actualPrompt, '')
    let matches = typedText.split(' ').filter((item) => item.trim()!='')
    let countPoints = 0

    matches.map(word => {
      if(!countRemovedPoints){
        if(word[0].toLowerCase() == matchChar){
          countPoints += 1
        }
        else{
          countPoints = countPoints - 4
        }
      }
      // else{
      //   if(word[0].toLowerCase() != matchChar){
      //     countPoints += 4
      //   }else{
      //     countPoints = countPoints - 1
      //   }
      // } 
    })
    setPrePoints(countPoints)
    setPoints(countPoints)
  }

  return(
    <View style={styles.root}>
      <View style={{marginTop: 12}}>
        <View style={{top: 0, left: 0, position: 'absolute', marginLeft: 24, alignItems:'center', justifyContent:"space-evenly" , "flexDirection":"row", "width":60}}>
          <TouchableOpacity onPress={()=> onBackSavePrompt()}  style={{ flexDirection: 'row', alignItems:'center', justifyContent:'center' }}>
          <Icon onPress={() =>  onBackSavePrompt()} name="arrow-back" size={20} color="#fff" style={styles.arrowright}/>
            <Text style={styles.saveText} onPress={() => { onBackSavePrompt()}}>save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={[styles.pointsText,{}]}>
            {(!showFlashPoints && prePoints!=0)  ?
              prePoints > 0 ? '+' + prePoints: '-' + prePoints
              : (userPoints + points) == 1 ? (userPoints + points)+' pt' : (userPoints + points)+' pts'}
          </Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={styles.headerText}>{'Level '+promptData[0]?.level}</Text>
        </View>
      </View>
      <View style={{flex: 1, marginTop: 12,}}>
      <KeyboardAwareScrollView
        onKeyboardWillShow={e => {
          setBottomMargin(e.endCoordinates.height);
        }}
        onKeyboardWillHide={e => {
          setBottomMargin(20);
        }}
        keyboardShouldPersistTaps="always"
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, }}>
        <TextInput
          style={styles.promptText}
          ref={inputRef}
          autoFocus={true}
          multiline={true}
          value={userTypedPrompt}
          autoCompleteType={'off'}
          onChange={handleChange}
          autoCorrect={false}
          spellCheck={false}
          underlineColorAndroid="transparent"
          onChangeText={ (text) => {
            calculateRemainingWords(text)
            if(text.toLowerCase().startsWith(actualPrompt.toLowerCase())){
              setTotalLength(text.length)
              setUserTypedPrompt(text)
            }
          }}
          keyboardType="default"
          returnKeyType="done"
          scrollEnabled={false}
          onSubmitEditing={() => { Keyboard.dismiss(); }}
        />
      </KeyboardAwareScrollView>
      </View>
      {remainingWords > 0 && points >= 0 && (<View style={{flex:0, flexDirection: 'row', justifyContent: 'flex-end',
        marginRight: 24,bottom: bottomMargin}}>
        <Text style={styles.finishText} onPress={()=>{}}>
          {remainingWords != 0 ? remainingWords == 1
            ? remainingWords+' letter' : remainingWords+' letters' : null}
        </Text>
      </View>)}
      {
        showFlashPoints && showFinish && points >= 0 && totalLength <= 100 && remainingWords == 0 && showFinishText()
      }
      {
        showFlashPoints && showError && points < 0 && totalLength <= 100 && showErrorText()
      }
      {
        showFlashPoints && showError && totalLength > 100 && showExceedText(100 - totalLength)
      }
    </View>
  )
}

export default EditScreen