<template>
  <div>
    <AppBar />
    <div class="page-root">
      <NuxtPage />
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
export default {
  head () {
    return {
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/semantic.min.js' }
      ],
      script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/fomantic-ui/2.8.8/semantic.min.css' },
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
  }
}
</script>