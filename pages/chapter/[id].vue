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
        <div style="justify-content:center">
          <p class="chap-title"><b>{{ chapterData.data.relationships.find(e=>e.type==='manga').attributes.title[Object.keys(chapterData.data.relationships.find(e=>e.type==='manga').attributes.title)[0]] }} - Chapter {{ chapterData.data.attributes.chapter }}</b></p>
        </div>
        <div class="mode-parent">
          <button title="Dynamic Mode" @click="readingMode=0" :style="readingMode==0&&'background: #ff6740;'"><i class="icon arrows alternate"></i></button>
          <button @click="readingMode=1" :style="readingMode==1&&'background: #ff6740;'"><i class="icon arrows alternate vertical"></i></button>
          <button @click="readingMode=2" :style="readingMode==2&&'background: #ff6740;'"><i class="icon arrows alternate horizontal"></i></button>
          <button title="Webcomic Mode" @click="readingMode=3" :style="readingMode==3&&'background: #ff6740;'"><i class="icon minus square outline"></i></button>
        </div>
    </div>
    <div class="chap-root">
        <div style="display:flex;justify-content:center;" v-for="image in imageData.chapter.data" :key="image">
            <nuxt-img preload :alt='`page ${image[0]}`' :style="readingMode==0?'max-height:calc(100vh - 4.4rem);max-width:100vw;':`${readingMode==1?'height:calc(100vh - 4.4rem);':`width:100vw;${readingMode==3&&'max-width:700px'}`}`" loading="lazy" format='webp' :src="`${imageData.baseUrl}/data/${imageData.chapter.hash}/${image}`" quality='75'/>
        </div>
    </div>
  </div>
</template>

<style>
.chap-bar-root{
  display: grid;
  background: #1b1c1d;
  position: fixed;
  grid-template-columns: auto auto auto;
  color: white;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 5px 10px 1vh rgba(0, 0, 0, 0.15);
}

.chap-title{
  font-size: 1.4rem;
  padding: 1.4rem;
}

.chap-root{
  padding-top: 4.4rem;
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

.mode-parent{
  justify-content: right;
  padding: 1rem 1.5rem 1rem 0;
}

.mode-parent button:first-child{
  border-radius: 0.5rem 0 0 0.5rem;
}

.mode-parent button:last-child{
  border-radius: 0 0.5rem 0.5rem 0;
}

.mode-parent button{
  color: white;
  border: none;
  background: #323335;
}

.mode-parent button i{
  margin-right: 0.25rem;
  margin-left: 0.25rem;
}

.mode-parent button:hover{
  background: #444548;
}

@media only screen and (max-width: 765px) {
  .chap-title{
    display: none;
  }
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
const readingMode = useState('readingMode', ()=>0)
</script>

<script>
export default {
  mounted() {
    if(localStorage.readingMode){
      this.readingMode = localStorage.readingMode
    }
  }, 
  watch: {
    readingMode(val) {
      localStorage.readingMode = val
    }
  }
}
</script>