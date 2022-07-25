<template>
  <div class="page-p">
    <h1>Mangoes - Top {{ mangoes.data?.length }}</h1>
    <div class="ui seven column doubling grid">
        <a :href="`/mangoes/${mango.id}`" class="column" v-for="mango in mangoes.data" :key="mango.id" @click="e=>navigateTo(e, `/mangoes/${mango.id}`)">
            <div v-if="mangoImages[mango.id]" class="ui link inverted fluid card">
                <div class="image">
                    <nuxt-img preload :src="mangoImages[mango.id]"/>
                </div>
                <div class="content">
                    <p class="header">{{ mango.attributes?.title[Object.keys(mango.attributes?.title)[0]] }}</p>
                </div>
            </div>
        </a>
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

const router = useRouter()
const navigateTo = (e, page) =>{
    if(!e.ctrlKey){
        e.preventDefault()
        router.push({path: page})
    }
}
const mangoImages = reactive({})
const { data: mangoes } = await axios.get('https://api.mangadex.org/manga?limit=14&availableTranslatedLanguage[]=en&order[followedCount]=desc')
await mangoes.data.map(async(i) => {
    mangoImages[i.id] = `https://uploads.mangadex.org/covers/${i.id}/${await (await axios.get(`https://api.mangadex.org/cover/${i.relationships.find(i=>i.type=='cover_art').id}`)).data.data.attributes.fileName}.256.jpg`
});
</script>

