<template>
  <v-btn @click="toggle">{{ myBool }}</v-btn>
  <div v-show="myBool">= TRUE</div>
  <div v-show="!myBool">= FALSE</div>
</template>

<script setup lang="ts">
let myBool = false;
const toggle = () => {
  console.log('toggle');
  console.log('myBool before', myBool);
  myBool = !myBool;
  console.log('myBool after', myBool);
};
</script>
