/**
 * 防抖函数
 * @param {Function} fn
 * @param {Number} wait
 * @returns {Function}
 */

export function debounce(fn, wait) {
  let timer = null

  return function (...args) {
    timer && clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

/**
 * 判断对象是否为空
 * @param {Object} data
 * @returns {Boolean}
 */
export const isEmptyObject = (data) => {
  return Object.keys(data).length === 0
}

/**
 * 格式化播放数量
 * @param {Number} num 
 * @returns {String}
 */
export const formatPlayCount = (num) => {
  if (num < 10000) {
    return num
  }

  if (num >= 100000000) {
    const W = num / 100000000
    return W % 1 >= 0.1 ? `${W.toFixed(1)}亿` : `${Math.floor(W)}亿`
  }
  
  const W = num / 10000
  return W % 1 >= 0.1 ? `${W.toFixed(1)}万` : `${Math.floor(W)}万`
}

/**
 * 格式化歌词数据
 * @param {String} lyric 
 * @returns
 */
export const parseLyric = (lyric) => {
  let lrcIndex = []
  let lrcData = []

  lyric.trim().split('\n').forEach((value) => {
    const index = value.indexOf(']')
    lrcIndex.push(value.slice(1, index))
    lrcData.push(value.slice(index + 1).trim())
  })

  return { lrcIndex, lrcData }
}
