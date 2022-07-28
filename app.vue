<template>
  <div>
    <AppBar :openModal='showModal' />
    <div id="search-modal" class="ui large long inverted modal">
      <div style="padding-bottom:0" class="header">Search</div>
      <div class="header">
        <div class="ui left icon input transparent inverted fluid">
          <i style="color:#fff" class="search icon"></i>
          <input @input="(e)=> searchInput = e.target.value" type="text" placeholder="Search...">
        </div>
      </div>
      <div class="content">
        <div v-if="searchLoading" style="height:40vh" class="ui inverted segment">
          <div class="ui active dimmer">
            <div class="ui loader"></div>
          </div>
        </div>
        <NuxtLink @click="hideModal" style="display:flex" class="ui segment inverted" v-else v-for="mango in searchResult" :key="mango.id" :to="`/mangoes/${mango.id}`">
          <nuxt-img id="res-img" width='128' format='webp' quality='75' :src="`https://uploads.mangadex.org/covers/${mango.id}/${mango.relationships.find(i=>i.type=='cover_art')?.attributes.fileName}.256.jpg`" :alt="`${mango.attributes?.title[Object.keys(mango.attributes?.title)[0]]} Cover`"/>
          <div id="res-details">
            <div>
              <p class="header" style="font-weight:bold;margin-bottom:0.25rem">{{ mango.attributes?.title[Object.keys(mango.attributes?.title)[0]] }}</p>
              <div :style="{'padding': '0.35rem 0.25rem 0.35rem 0.25rem', 'background-color': 'rgba(255, 255, 255, 0.1)', 'border': '1px solid rgba(255, 255, 255, 0.025)', 'font-family': `'SF Pro Display', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`}" class="ui red label">{{ mango.attributes?.status?.toUpperCase() }}</div>
            </div>
            <p style="font-weight:bold">Last Uploaded Chapter: {{ lastChapters[mango.id] || '-' }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="page-root">
      <NuxtPage/>
    </div>
  </div>
</template>

<style>
body {
  margin: 0 auto;
}

:root{
  font-family: 'SF Pro Text', Geneva, Verdana, sans-serif!important;
}

h1{
  color: rgba(255,255,255,.9);
}

.page-root{
  padding-top: 4rem;
  background: #1b1c1d;
  min-height: 100vh;
}

.page-p{
  padding: 3rem;
}

.page-x-p{
  padding-left: 3rem;
  padding-right: 3rem;
}

.page-m-p{
  margin-left: 3rem;
  margin-right: 3rem;
}

#search-modal .header{
  font-size: 1.4rem!important;
}

#search-modal .header .input{
  padding: 1rem;
  border-radius: 0.3rem;
  outline: 1px solid rgba(255, 255, 255, 0.25);
  transition: outline-color 250ms ease-in-out;
}

#search-modal{
  transition: 250ms ease-in-out;
}

#search-modal .header .input:focus-within{
  outline: 1px solid #ff6740;
}

#res-img{
  height: 7.5rem;
  width: 5rem;
  object-fit: cover;
  border-radius: 0.2rem;
}

#res-details{
  padding-left: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#search-modal .header .input i{
  margin-left: 1rem;
}

@media only screen and (max-width: 768px) {
  /* For mobile users: */
  .page-root{
    padding-top: 4rem;
  }
  .page-p{
    padding: 1rem;
  }
  .page-x-p{
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .page-m-p{
    margin-left: 1rem;
    margin-right: 1rem;
  }
  #search-modal .header{
    font-size: 1.2rem!important;
  }
  #res-img{
    height: 5.625rem;
    width: 3.75rem;
  }
}

img {
  animation: skeleton-loading 500ms linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: #c2cfd6;
  }
  100% {
    background-color: #f0f3f5;
  }
}
</style>

<script setup>
import 'normalize.css';
</script>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      searchInput: 'default',
      searchResult: [],
      searchLoading: false,
      debouncer: null,
      lastChapters: []
    }
  },
  head () {
    return {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/semantic.min.js' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/components/modal.min.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/semantic.min.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/components/modal.min.css' },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com/",
          crossorigin: true
        },
        {
          rel: "preconnect",
          href: "https://api.mangadex.org/",
          crossorigin: true
        }
      ],
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  methods: {
    showModal() {
      $('#search-modal').modal({
        dimmerSettings: { opacity: 0.30 }
      }).modal('show')
    },
    hideModal() {
      $('#search-modal').modal('hide')
    },
    async getSearchResult(query) {
      this.lastChapters = []
      if(!query){
        this.searchLoading = false
        return this.searchResult = []
      }
      const { data } = await axios.get(`/api/manga?title=${query}&limit=5&order[relevance]=desc&includes[]=cover_art`)
      await data.data.forEach(async (e) => {
        let lastChapter = await (await axios.get(`/api/chapter?manga=${e.id}&order[chapter]=desc&limit=1&translatedLanguage[]=en`)).data.data
        this.lastChapters[e.id] = lastChapter[0]?.attributes.title=='Oneshot'?'Oneshot':lastChapter[0]?.attributes.chapter
      });
      this.searchLoading = false
      this.searchResult = data.data
    }
  },
  watch: {
    searchInput(val) {
      this.searchLoading = true
      clearTimeout(this.debouncer)
      this.debouncer = setTimeout(() => {
        this.getSearchResult(val)
      }, 900)
    }
  }
}
</script>