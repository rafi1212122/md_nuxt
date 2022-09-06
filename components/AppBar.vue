<template>
  <div v-bind:style="[route.name=='chapter-id'&&{'display': 'none'}]" class="bar-root">
    <div>
        <NuxtLink to="/" class="nav-btn" v-bind:style="[route.name=='index'&&{'background': '#ff6740', 'border': 'none'}]">Home</NuxtLink>
        <NuxtLink to="/mangoes" class="nav-btn" v-bind:style="[route.name.includes('mangoes')&&{'background': '#ff6740', 'border': 'none'}]">Mangoes</NuxtLink>
    </div>
    <div>
        <NuxtLink @click="openModal" style="padding-top:0;padding-bottom:0;display:flex;align-items:center" class="nav-btn">
            <i class="search icon"></i>
        </NuxtLink>
        <a class="nav-btn">Sign In</a>
    </div>
  </div>
</template>

<style>
.bar-root{
    display: flex;
    background: #1b1c1d;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    box-shadow: 5px 10px 1vh rgba(0, 0, 0, 0.15);
}

.bar-root div{
    display: flex;
}

.nav-btn{
    cursor: pointer;
    border: none;
    background: #1b1c1d;
    color: white;
    padding: 1.5rem;
    font-size: 1.2rem;
    font-weight: bold;
}

.nav-btn:hover{
    border-bottom: 0.3rem solid;
    color: white;
    padding-bottom: calc(1.5rem - 0.3rem);
    background: rgba(68, 70, 73, 0.145);
    border-bottom-color: #ff6740;
    font-weight: bolder;
    transition: ease 150ms;
}
</style>

<script>
export default {
    props: ['openModal'],
}
</script>

<script setup>
const route = useRoute()
</script>