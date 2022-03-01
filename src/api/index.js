import request from '@/utils/request'

// 获取推荐歌单，limit: 取出数量 , 默认为 30 (不支持 offset)
export const getPersonalized = (limit = 30) => {
  return request({
    url: '/personalized',
    params: { limit }
  })
}

// 获取全部歌单，一次20
export const getPlaylist = (page = 1) => {
  return request({
    url: '/top/playlist',
    params: {
      limit: 20,
      offset: (page - 1) * 20
    }
  })
}

// 获取歌单详情
export const getPlaylistDetail = (id) => {
  return request({
    url: `/playlist/detail?id=${id}`
  })
}

// 获取歌曲详情
export const getSongDetail = (ids) => {
  return request({
    url: `/song/detail?ids=${ids}`
  })
}

// 获取所有榜单
export const getToplistDetail = () => {
  return request({ url: '/toplist/detail' })
}

// 搜索歌曲
export const searchSongs = (keywords, page = 1) => {
  return request({
    url: '/search',
    params: {
      type: 1,
      keywords,
      limit: 20,
      offset: (page - 1) * 20
    }
  })
}

// 多重匹配
export const searchMultimatch = (keywords) => {
  return request({ url: `/search/multimatch?keywords=${keywords}` })
}

// 获取热门搜索列表
export const getSearchHot = () => {
  return request({ url: '/search/hot' })
}

// 获取搜索建议
export const getSearchSuggest = (keywords) => {
  return request({
    url: 'search/suggest',
    params: {
      type: 'mobile',
      keywords
    }
  })
}

// 获取专辑内容
export const getAlbum = (id) => {
  return request({ url: `/album?id=${id}` })
}

// 获取专辑评论
export const getAlbumComment = (id, page = 1) => {
  return request({
    url: '/comment/album',
    params: {
      id,
      offset: (page - 1) * 20
    }
  })
}

// 获取歌词
export const getLyric = (id) => {
  return request({ url: `/lyric?id=${id}` })
}

// 获取歌手部分信息和热门歌曲
export const getArtistMusic = (id) => {
  return request({ url: `/artists?id=${id}` })
}

// 获取歌手粉丝数量
export const getArtistFollowCount = (id) => {
  return request({ url: `/artist/follow/count?id=${id}` })
}

// 获取歌手信息
export const getArtistDetail = (id) => {
  return request({ url: `/artist/detail?id=${id}` })
}
