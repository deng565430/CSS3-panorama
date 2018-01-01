import React, { Component } from 'react';
import './app.css';

// 生成并填充数组
const arr = Array(20).fill(0);


// 计算
const caluclateRadius = (length, totalNum) => Math.round(length / (2 * Math.tan(Math.PI / totalNum))) - 3
const radius = caluclateRadius(129, arr.length)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: '⏸',
      starX: 0,
      x: 0,
      isTouch: false
    }
  }
  // 监听手机事件
  componentDidMount() {
    window.addEventListener('deviceorientation', (e) => {
      if (!this.state.isTouch) {
        const box = this.refs.box
        const gamma = e.gamma
        box.style.transform = `rotateY(${gamma * 3}deg)`
      }
    }, true)
  }
  // 控制播放
  tab() {
    const audio = this.refs.audio
    if (audio.paused) {
      audio.play()
      this.setState({
        tab: '▶️'
      })
    } else {
      audio.pause()
      this.setState({
        tab: '⏸'
      })
    }
  }
  touchstart(e) {
    e.preventDefault()
    const touch = e.targetTouches[0]
    const startX = touch.pageX - this.state.x
    this.setState({
      starX: startX,
      isTouch: true
    })
  }
  touchmove(e) {
    e.preventDefault()
    const touch = e.targetTouches[0]
    const endX = touch.pageX
    const x = endX - this.state.starX
    this.refs.box.style.transform = `rotateY(${x}deg)`
    this.setState({
      isTouch: true
    })
  }
  touchend() {
    this.setState({
      isTouch: false
    })
  }
  render() {
    return (
      <div>
        <audio ref="audio" src={require('../public/audio/bgm.mp3')} type="audio/mpeg"></audio>
        <div className="audio-flag" onClick={() => this.tab()}>
         {this.state.tab}
        </div>
        <div className="contaniner">
          <div className="box"
            ref="box"
            onTouchStart={(e) => this.touchstart(e)}
            onTouchMove={(e) => this.touchmove(e)}
            onTouchEnd={(e) => this.touchend(e)}
          >
            {
              arr.map((v, i) => {
                return <div
                  style={
                    {
                      background: `url("${require(`../public/image/p${i + 1}.png`)}") no-repeat`,
                      WebkitTransform: `rotateY(${360 / arr.length * (i + 1)}deg) translatez(${radius}px)`
                    }
                  }
                  key={i}>
                  {i}
                </div>
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
