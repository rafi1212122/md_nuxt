<template>
  <div>
    <Head>
      <Title>{{ data.data.attributes.title[Object.keys(data.data.attributes.title)[0]] }} - Mango</Title>
      <Meta name="description" :content="data.data.attributes.description.en?data.data.attributes.description.en:data.data.attributes.title[Object.keys(data.data.attributes.title)[0]]" />
    </Head>
    <header>
      <div class="page-p header-bg" :style="{'background': `url(/_ipx/f_webp,q_75/${mangoCover['512']})`, 'filter': 'blur(0.25rem)','background-repeat': 'no-repeat', 'height': '25vh', 'background-size': 'cover', 'opacity': '0.6', 'background-color': '#000'}"></div>
      <div class="header-content page-m-p">
        <nuxt-img preload :alt='`${data.data.attributes.title[Object.keys(data.data.attributes.title)[0]]} Cover Art`' style="width:256px;object-fit:cover;" loading="lazy" format='webp' :style="{'border-radius': '0.4rem'}" ref="cover" class="cover" :src="mangoCover['512']" quality='75'/>
        <div class="header-details">
          <h1>{{ data.data.attributes.title[Object.keys(data.data.attributes.title)[0]] }}</h1>
          <div class="mango-tags">
            <div v-if="data.data.attributes.contentRating=='pornographic'" :style="{'padding': '0.35rem 0.25rem 0.35rem 0.25rem'}" class="ui red label">
              PORNOGRAPHIC
            </div>
            <div v-if="data.data.attributes.contentRating=='erotica'" :style="{'padding': '0.35rem 0.25rem 0.35rem 0.25rem'}" class="ui red label">
              EROTICA
            </div>
            <div v-if="data.data.attributes.contentRating=='suggestive'" :style="{'padding': '0.35rem 0.25rem 0.35rem 0.25rem', 'background-color': '#f79421', 'border': '1px solid rgba(255, 255, 255, 0.025)'}" class="ui red label">
              SUGGESTIVE
            </div>
            <div v-for="tag in data.data.attributes.tags.sort((a, b)=> {
                if(a.attributes.group>b.attributes.group){
                  return 1
                }else if(a.attributes.group==b.attributes.group){
                  return 0
                }else{
                  return -1
                }
              })" :key="tag.id" :style="{'padding': '0.35rem 0.25rem 0.35rem 0.25rem', 'background-color':  (tag.attributes.group!=='content')&&'rgba(255, 255, 255, 0.1)', 'border': '1px solid rgba(255, 255, 255, 0.025)'}" class="ui red label">
              {{ tag.attributes.name[Object.keys(tag.attributes.name)[0]].toUpperCase() }}
            </div>
          </div>
        </div>
      </div>
      <div class="description page-x-p" id="description" v-html="data.data.attributes.description.en?marked.parse(data.data.attributes.description.en):''"></div>
    </header>
    <div id="chapter-list" class="page-x-p">
      <div v-if="pending" style="height:40vh" class="ui inverted segment">
        <div class="ui active dimmer">
          <div class="ui loader"></div>
        </div>
      </div>
      <div v-else v-for="chapter in chapterData?.data" :key="chapter.id" id="chapter-item" class="ui inverted segment">
        <div id="chapter-name">
          <NuxtLink id="chapter-num">Chapter {{ chapter.attributes.chapter }}</NuxtLink>
          <div style="display:flex;gap:0.5rem;">
            <NuxtLink>{{ chapter.attributes.title }}</NuxtLink>
            <NuxtLink id="ext-link" :to="chapter.attributes.externalUrl" target="_blank" v-if="chapter.attributes.externalUrl&&!chapter.attributes.pages"><i class="external alternate icon"></i></NuxtLink>
          </div>
        </div>
        <div id="chapter-info" :style="{'display': 'flex', 'gap': '0.5rem', 'justify-content': 'space-between', 'min-width': '33%'}">
          <p><i style="margin-right:0.25rem" :class="chapter.relationships.find(i=>i.type=='scanlation_group')?'group icon':'user icon'"></i> {{ chapter.relationships.find(i=>i.type=='scanlation_group')?chapter.relationships.find(i=>i.type=='scanlation_group')?.attributes?.name:chapter.relationships.find(i=>i.type=='user')?.attributes.username }}</p>
          <p><i style="margin-right:0.25rem" :class="'clock icon'"></i> {{ dayjs(chapter.attributes.readableAt).fromNow() }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

#chapter-item{
  background: #323335;
  padding: 0.5rem 1rem;
  margin: 0.75rem 0;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  outline: 1px solid rgba(255, 255, 255, 0.1);
}

#chapter-item #chapter-name{
  display: flex;
  gap: 1rem;
}

#chapter-item #chapter-name *{
  color: #ffffff;
}

#chapter-item:first-child{
  margin-top: 0;
}

#chapter-item #chapter-name #chapter-num{
  font-weight: bold;
}

#chapter-item *{
  margin: 0;
}

.header-content{
  position: relative;
  display: flex;
  margin-bottom: 1vh;
}

.header-details{
  color: rgba(255,255,255,.9);
}

.mango-tags{
  margin: 0.25rem 0 0.25rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  font-family: 'SF Pro Display', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.header-content h1{
  font-family: 'Poppins', sans-serif;
  font-display: swap;
  margin-top: 1rem;
  word-break: break-word;
  margin-bottom: 0;
  color: white;
  font-size: 3rem;
}

.description{
  color: white;
  white-space: pre-wrap;
  font-size: 1.15rem;
}

.header-content img{
  margin-top: -18vh;
  margin-right: 1rem;
  box-shadow: 0 0 7px rgba(0,0,0,.4);
}

@media only screen and (max-width: 1024px) {
  .cover{
    width: 25vw!important;
  }
}

@media only screen and (max-width: 1440px) {
  .header-content h1{
    font-size: 2.5rem;
  }
}

@media only screen and (max-width: 768px) {
  .header-details{
    margin-top: -18vh;
    text-shadow: 0 0 3px #000;
  }
  
  .header-bg{
    opacity: 0.4!important;
  }

  #chapter-item #chapter-name{
    display: block;
  }

  #chapter-item #chapter-info{
    min-width: none;
    display: block!important;
    text-align: end;
  }
}

@media only screen and (max-width: 512px) {
  /* For mobile users: */
  .cover{
    width: 30vw!important;
  }

  .ui.label{
    font-size: 0.7rem;
  }

  .header-content h1{
    font-size: 1.75rem;
  }

}
</style>

<script setup>
import axios from 'axios'
import { marked } from 'marked'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
dayjs.extend(relativeTime)

const route = useRoute()
const mangoCover = reactive({})
const { data } = await axios.get(`https://api.mangadex.org/manga/${route.params.id}`)
const { data: chapterData, pending } = useLazyFetch(`https://api.mangadex.org/chapter?manga=${route.params.id}&order[chapter]=desc&translatedLanguage[]=en&includes[]=user&includes[]=scanlation_group`, { initialCache: false })
mangoCover['256'] = `https://uploads.mangadex.org/covers/${route.params.id}/${await (await axios.get(`https://api.mangadex.org/cover/${data.data.relationships.find(i=>i.type=='cover_art').id}`)).data.data.attributes.fileName}.256.jpg`
mangoCover['512'] = `https://uploads.mangadex.org/covers/${route.params.id}/${await (await axios.get(`https://api.mangadex.org/cover/${data.data.relationships.find(i=>i.type=='cover_art').id}`)).data.data.attributes.fileName}.512.jpg`
mangoCover['original'] = `https://uploads.mangadex.org/covers/${route.params.id}/${await (await axios.get(`https://api.mangadex.org/cover/${data.data.relationships.find(i=>i.type=='cover_art').id}`)).data.data.attributes.fileName}`
</script>