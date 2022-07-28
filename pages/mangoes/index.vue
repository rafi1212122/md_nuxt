<template>
  <div class="page-p">
    <h1>Mangoes - Top {{ mangoes.data?.length }}</h1>
    <div class="ui seven column doubling grid">
        <NuxtLink :to="`/mangoes/${mango.id}`" class="column" v-for="mango in mangoes.data" :key="mango.id">
            <div class="ui link inverted fluid card">
                <div class="image">
                    <nuxt-img preload :src="`https://uploads.mangadex.org/covers/${mango.id}/${mango.relationships.find(i=>i.type=='cover_art')?.attributes.fileName}.256.jpg`"/>
                </div>
                <div class="content">
                    <p class="header">{{ mango.attributes?.title[Object.keys(mango.attributes?.title)[0]] }}</p>
                </div>
            </div>
        </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
    head() {
      return {
        title: 'Mangoes'
      }
    }
}
</script>

<script setup>
import axios from 'axios'

const nuxtApp = useNuxtApp()
let host = ''
if(process.server) {
  host = `http://${nuxtApp.ssrContext.req.headers.host}`
}

const { data: mangoes } = await axios.get(`${host}/api/manga?limit=14&availableTranslatedLanguage[]=en&order[followedCount]=desc&includes[]=cover_art`)
</script>

