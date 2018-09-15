import React from 'react';
import {
  StyleSheet,
  Button,
  Image,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native'

import moment from 'moment'
// const data = {
  
// }

export default class App extends React.Component {
  state ={
    now:0,
    start : 0,
    laps: []
  }
  startCounter =() => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
      laps:[0]
    })
    this.timer = setInterval(()=>{
      this.setState({
        now: new Date().getTime()
      })
    }, 100)
  }
  lapsCount = ()=>{
    const timestamp = new Date().getTime()
    const {laps, now, start} = this.state
    const [firstLap, ...othersLap] = laps 
    this.setState({
      laps: [0, firstLap + now - start, ...othersLap],
      start: timestamp,
      now:timestamp
    })
  }
  stopCounter = () => {
    clearInterval(this.timer)
    const timestamp = new Date().getTime()
    const {
      laps,
      now,
      start
    } = this.state
    const [firstLap, ...othersLap] = laps
    this.setState({
      laps: [0, firstLap + now - start, ...othersLap],
      start: 0,
      now: 0
    })
  }
  reset = ()=>{
    this.setState({
      laps: [],
      start: 0,
      now: 0
    })
  }
  resumeCounter = () => {
    const now = new Date().getTime()
    this.setState({
      start:now,
      now
    })
    this.timer = setInterval(() => {
      this.setState({
        now: new Date().getTime()
      })
    }, 100)
  }
  componentWillUnmount(){
     clearInterval(this.timer)
  }
  render() {
    const {laps, now, start} = this.state
    const timer = now - start 
    return (
      <View style={styles.container}>
        <Timer style={styles.timer} interval={laps.reduce((total, current)=>{
          return total + current 
        }, 0) + timer} /> 
        {laps.length == 0 && (
          <ButtonGroup >
            <RoundButton onPress={this.startCounter} title="Start" color="#fcfcfc" backgroundColor="#555" />      
            <RoundButton onPress={this.reset} title="Reset" color="#fcfcfc" backgroundColor="darkred" disabled  /> 
          </ButtonGroup>
        ) }
        {laps.length > 0 && start >0 && (
          <ButtonGroup>
            <RoundButton onPress={this.stopCounter} title="Stop" color="#fcfcfc" backgroundColor="darkred" />      
            <RoundButton onPress={this.lapsCount} title="Lap" color="#fcfcfc" backgroundColor="#555" /> 
          </ButtonGroup>
        )}
          {laps.length > 0 && start == 0  &&(
          <ButtonGroup>
            <RoundButton fontSize={12} onPress={this.resumeCounter} title="Resume" color="#fcfcfc" backgroundColor="#555" />      
            <RoundButton onPress={this.reset} title="Reset" color="#fcfcfc" backgroundColor="#555" /> 
          </ButtonGroup>
        )}
        
        <LapTable laps={laps} timer= {timer}  />    
      </View>
    );
  }
}

function Timer({interval, style}){
  const display = (n)=> n < 10 ? '0'+n : n
  const duration = moment.duration(interval)
  const milliseconds = Math.floor(duration.milliseconds() / 10)
  return <Text style={style}>{display(duration.minutes())}
    :{display(duration.seconds())}
    .{display(milliseconds)} </Text>
}

function ButtonGroup({ children }) {
  return (
    <View style={styles.buttonGroup}>
      {children}
    </View> 
  )
}

function RoundButton({ title, color,backgroundColor,fontSize, onPress, disabled }) {
  return (
    <TouchableOpacity style={styles.button} onPress ={() => !disabled && onPress()} activeOpacity ={ disabled ? 1.0 :0.7} >
      <View style={[styles.buttonIner, { backgroundColor }]}>
      <Text style={[styles.buttonText,{color,fontSize}]}> {title} </Text>
      </View>       
    </TouchableOpacity>
  )
}

function Laps({ lapNumber, interval ,fastest,slowest}) {
  console.log(fastest, slowest)
  const lapStyle = [
    styles.lapsText,
     fastest && styles.fastest,
     slowest && styles.slowest
  ]
  // console.log(lapStyle)
  // console.log('afters')
  // console.log(styles.lapsText)
  return (
    <View style={styles.laps}>
      <Text style={lapStyle}> Laps :  {lapNumber} </Text>
      <Timer style = {lapStyle} interval = {interval} />
    </View>
  )
}
function LapTable({ laps,timer }) {
  const finishedLaps = laps

  console.log(finishedLaps);
  let max = Number.MAX_SAFE_INTEGER
  let min = Number.MIN_SAFE_INTEGER
    if (finishedLaps.length >= 2) {
      finishedLaps.forEach(lap=>{
        console.log(lap);
        console.log(max);
        if (lap < min) min = lap
        if (lap > max) max = lap
      })     
    }
  return (
    <ScrollView style={styles.lapsContainer}>
      {
        laps.map((lap, index) => {
        return <Laps key={laps.length - index}
         lapNumber={laps.length-index}
          interval={index== 0? timer+lap : lap}
          fastest={lap==min}
          slowest = {lap ==max} />
      })}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:20,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
    paddingTop:70
    // justifyContent: 'center',
  },
  timer:{
    color:'#fff',
    fontSize:70,
    fontWeight:'200'
  },
  button:{
    // padding:20,
    width:80,
    height:80,
    borderRadius:40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  buttonIner:{
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#555',
    borderWidth:1,
    borderColor:'#ccc'
  },
  buttonGroup:{
    marginTop:70,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignSelf:'stretch'
  },
  buttonText:{
    fontSize:18
  },
  laps:{
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop:30,
    justifyContent: 'space-between',
    borderTopWidth:1,
    borderColor: '#ccc',
    paddingVertical:10
  },
  lapsContainer:{
    alignSelf: 'stretch',
    marginTop:50
  },
  lapsText:{
    color: "#fff",
    fontSize:16
  },
  fastest: {
    color: 'green'
  },
  slowest:{
    color:'darkred'
  }
})
