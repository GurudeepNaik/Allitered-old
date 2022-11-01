import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  scrollView: {
    backgroundColor: 'black',
    paddingHorizontal: 25,
    height: '90%',
  },
  date: {
    fontFamily: 'Jost',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: -0.06,
    color: '#fff',
  },
  level: {
    color: 'white',
    fontFamily: 'Jost',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: -0.06,
  },
  text: {
    fontFamily: 'Jost',
    fontWeight: '500',
    fontSize: 28,
    fontStyle: 'normal',
    color: '#FFF',
    lineHeight: 36,
    letterSpacing: -0.06,
    textAlign: 'left',
    flexGrow: 0,
  },
  arrowright: {
    marginTop: 50,
    marginBottom: 30,
  },
  view: {
    paddingBottom: 50,
  },
  back: {
    color: '#fff',
    fontSize: 20,
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
  },
  share: {
    alignSelf: 'flex-end',
  },
});
