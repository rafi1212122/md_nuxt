<template>
  <div>
    <Head>
      <Title>{{ chapterData.data.relationships.find(e=>e.type==='manga').attributes.title[Object.keys(chapterData.data.relationships.find(e=>e.type==='manga').attributes.title)[0]] }} - Chapter {{ chapterData.data.attributes.chapter }}</Title>
      <Meta name="description" :content="chapterData.data.relationships.find(e=>e.type==='manga').attributes.description.en?chapterData.data.relationships.find(e=>e.type==='manga').attributes.description.en:chapterData.data.relationships.find(e=>e.type==='manga').attributes.title[Object.keys(chapterData.data.relationships.find(e=>e.type==='manga').attributes.title)[0]]" />
    </Head>
    <div class="chap-bar-root">
        <div>
            <NuxtLink :to="`/mangoes/${chapterData.data.relationships.find(e=>e.type==='manga').id}`" class="chap-back-btn">Back</NuxtLink>
        </div>
    </div>
    <div style="padding-top:4rem">
        <div style="display:flex;justify-content:center" v-for="image in imageData.chapter.data" :key="image">
            <nuxt-img preload :alt='`page ${image[0]} Cover Art`' style="max-height:calc(100vh - 4rem);max-width:100vw;" loading="lazy" format='webp' :src="`${imageData.baseUrl}/data/${imageData.chapter.hash}/${image}`" quality='75'/>
        </div>
    </div>
  </div>
</template>

<style>
.chap-bar-root{
    display: flex;
    background: #1b1c1d;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 5px 10px 1vh rgba(0, 0, 0, 0.15);
}

.chap-bar-root div{
    display: flex;
}

.chap-back-btn{
    cursor: pointer;
    border: none;
    background: #1b1c1d;
    color: white;
    padding: 1.5rem;
    font-size: 1.2rem;
    font-weight: bold;
}

.chap-back-btn:hover{
    border-bottom: 0.3rem solid;
    color: white;
    padding-bottom: calc(1.5rem - 0.3rem);
    background: rgba(68, 70, 73, 0.145);
    border-bottom-color: #ff6740;
    font-weight: bolder;
    transition: ease 150ms;
}
</style>

<script setup>
import axios from 'axios'

const nuxtApp = useNuxtApp()
let host = ''
if(process.server) {
  host = `http://${nuxtApp.ssrContext.req.headers.host}`
}

const route = useRoute()
const { data: chapterData } = await axios.get(`${host}/api/chapter/${route.params.id}?includes[]=manga&includes[]=user&includes[]=scanlation_group`)
const { data: imageData } = await axios.get(`${host}/api/at-home/server/${route.params.id}`)

</script>