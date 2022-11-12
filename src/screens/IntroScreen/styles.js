import {StyleSheet} from 'react-native'
import Fonts from '../../theme/Fonts'
import {Dimensions} from 'react-native'
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  contentContainerNew: {
    flex: 1,
    width: width,
    // alignItems:'center', 
    // justifyContent:'center', 
    marginBottom: 0, 
    width: width,
    padding: 24
  },
  descriptionContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'flex-start'
  },
  titleText: {
    fontFamily: Fonts.fontFamily.bold,
    fontSize: 36,
    fontWeight: Fonts.weight.bold,
    color: '#FFF',
    textAlign:'left'
  },
  description: {
    fontFamily: Fonts.fontFamily.regular,
    fontWeight: Fonts.weight.normal,
    fontSize: 36,
    color:"rgba(255, 255, 255, 0.92)",
    lineHeight: 43.2,
    letterSpacing: -0.3,
    textAlign: 'left',
    width: '100%'
  },
  buttonContainer: {
    flex: 0,
    alignSelf: 'stretch',
    borderRadius: 36,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 60,
  },
  buttonText: {
    fontFamily: Fonts.fontFamily.medium,
    fontSize: 36,
    fontWeight: Fonts.weight.bold,
    color: '#000000',
  },  
});
export default styles;
