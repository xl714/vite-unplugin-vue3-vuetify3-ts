<script setup lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
export interface Props {
  profiles?: Map | null;
}
const props = withDefaults(defineProps<Props>(), {
  profiles: null,
});
</script>

<template>
  <header>
    <i-park-plus-cross />
    <i-mdi:account />

    <div v-for="[id, item] in profiles" :key="id">
      <p>
        <i-mdi:account />
        <span class="profile">{{ item.name }}</span>
        <button @click="removeProfile(id)">[remove]</button>
      </p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: repeat(11, min-content);
  grid-column-gap: 0.5rem;
  justify-content: center;
  svg {
    align-self: center;
    &:nth-child(even) {
      font-size: 2em;
    }
    &:last-of-type {
      color: rgb(0, 120, 207);
    }
  }
}
</style>
