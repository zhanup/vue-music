<template>
  <div class="m-searchresult">
    <div class="m-multimatch">
      <div class="title">最佳匹配</div>
      <div>
        <!-- 歌手 -->
        <div class="matchitem artist" v-for="item in matchData.artist">
          <div class="linkcover f-bd f-bd-btm" @click="toArtist(item.id)">
            <div class="piccover">
              <img class="pic" :src="item.img1v1Url" />
            </div>
            <div class="describe">
              <div class="maindes f-thide">
                歌手：{{ item.name }}{{ alias(item.alias) }}
              </div>
            </div>
            <i class="u-svg u-svg-arr"></i>
          </div>
        </div>

        <!-- 专辑 -->
        <div class="matchitem album" v-for ="item in matchData.album" :key="item.id">
          <div class="linkcover f-bd f-bd-btm" @click="toAlbum(item.id)">
            <div class="piccover">
              <img class="pic" :src="item.picUrl" />
            </div>
            <div class="describe">
              <div class="maindes f-thide">
                专辑：{{ item.name }}
              </div>
              <div class="hcover addtional f-thide">
                {{ item.artist.name }}
              </div>
            </div>
            <i class="u-svg u-svg-arr"></i>
          </div>
        </div>

        <!-- 歌单 -->
        <div class="matchitem playlist" v-for ="item in matchData.playlist" :key="item.id">
          <div class="linkcover f-bd f-bd-btm" @click="toPlaylist(item.id)">
            <div class="piccover">
              <img class="pic" :src="item.coverImgUrl" />
            </div>
            <div class="describe">
              <div class="maindes f-thide">
                歌单：{{ item.name }}
              </div>
              <div class="hcover addtional f-thide">
                by {{ item.creator.nickname }}
              </div>
            </div>
            <i class="u-svg u-svg-arr"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <div class="m-songlist">
      <song-list :data="songs" :show-index="false" @item-click="itemClick" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import SongList from '@/components/songList/SongList.vue'
import { getSongDetail } from '@/api'

defineProps(['matchData', 'songs'])
const router = useRouter()
const store = useStore()

const itemClick = async (index, id) => {
  const { songs } = await getSongDetail(id)
  const music = {
    id: songs[0].id,
    name: songs[0].name,
    singer: songs[0].ar[0].name,
    album: songs[0].al.name,
    image: songs[0].al.picUrl,
    duration: songs[0].dt,
    url: `https://music.163.com/song/media/outer/url?id=${songs[0].id}.mp3`
  }
  store.addPlay(music)
}

const alias = (alias) => {
  const name = alias.join(',')
  return alias.length > 0 ? `（${name}）` : ''
}

const toArtist = (id) => {
  router.push(`/artist/${id}`)
}

const toAlbum = (id) => {
  router.push(`/album/${id}`)
}

const toPlaylist = (id) => {
  router.push(`/playlist/${id}`)
}

</script>

<style scoped lang="scss">
.m-multimatch {
  padding: 8px 0 4px;

  .title {
    margin-left: 10px;
    font-size: 12px;
    line-height: 16px;
    color: #666;
    font-weight: 400;
  }

  .matchitem {
    position: relative;
    height: 66px;
  }

  .linkcover {
    display: flex;
    align-items: center;
    height: 66px;
    margin-left: 10px;
    padding: 8px 10px 8px 0;
    box-sizing: border-box;
  }

  .piccover {
    position: relative;
    width: 50px;
    height: 50px;
    margin-right: 30px;
    line-height: 0;
    flex: 0 0 auto;
    display: inline-block;
  }

  .pic {
    display: block;
    width: 100%;
    height: auto;
    border: 0;
  }

  .describe {
    flex: 1;
    display: inline-block;
    width: 1%;
  }

  .maindes {
    font-size: 17px;
    line-height: 30px;
    color: #333;
  }

  .addtional {
    font-size: 12px;
    line-height: 15px;
    color: #999;
    width: 100%;
    display: inline-block;
  }

  .u-svg-arr {
    margin-right: 8px;
    margin-left: 10px;
    flex: 0 0 auto;
    display: inline-block;
  }

  .album {
    .piccover {
      &:after {
        content: '';
        position: absolute;
        top: 2px;
        right: -10px;
        width: 10px;
        height: 46px;
        background-repeat: no-repeat;
        background-size: 166px 97px;
        background-image: url(https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=);
        background-position: 0 -30px;
      }
    }
  }
}

.m-songlist {
  &:deep(.m-sglst) {
    position: relative;
  }

  &:deep(.m-sgitem) {
    display: flex;
    padding-left: 10px;
  }
}
</style>
