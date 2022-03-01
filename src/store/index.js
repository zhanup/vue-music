import { defineStore } from 'pinia'
import { getLyric } from '@/api'

export const useStore = defineStore('main', {
  state: () => ({
    showPlayer: false, //Player显示状态
    playList: [], //播放列表
    currentIndex: -1, //当前音乐索引
    currentMusic: {}, //当前音乐
    lyric: ''
  }),
  getters: {
    musicLength() {
      return this.playList.length
    }
  },
  actions: {
    // 设置歌词
    async setLyric () {
      const id = this.currentMusic.id
      const { lrc } = await getLyric(id)
      this.lyric= lrc.lyric
    },
    setCurrentMusic(payload) {
      this.currentMusic = payload
      this.setLyric()
    },
    // 初始化播放列表（替换歌单列表）
    setAllPlay(playList, currentIndex) {
      this.playList = playList
      this.currentIndex = currentIndex
      this.setCurrentMusic(playList[currentIndex])
      this.setLyric()
      this.showPlayer = true
    },
    // 清除播放列表
    clearAllPlay() {
      this.playList = []
      this.currentIndex = -1
      this.currentMusic = {}
      this.showPlayer = false
      this.lyric = ''
    },
    addPlay(payload) {
      // 查看歌曲列表是否已存在该歌曲
      let index = this.playList.findIndex((item) => item.id === payload.id)
      // 若不存在，先进行添加到播放列表，再进行播放
      if (index === -1) {
        index = this.playList.push(payload) - 1
      }
      this.currentIndex = index
      this.setCurrentMusic(this.playList[index])
      this.showPlayer = true
    },
    deleteItem(index) {
      this.playList.splice(index, 1)

      if (this.playList.length === 0) {
        this.clearAllPlay()
        return
      }

      // 删除的是当前音乐，修正当前歌曲信息和所需
      if (index === this.currentIndex) {
        let idx = (index === this.playList.length) ? 0 : index
        this.currentIndex = idx
        this.setCurrentMusic(this.playList[idx])
      } 

      // 删除的音乐在当前音乐前
      if (index < this.currentIndex) {
        this.currentIndex = this.currentIndex - 1
      }
    }
  }
})
