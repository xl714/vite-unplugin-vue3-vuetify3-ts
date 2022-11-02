<template>
  <header>
    <i-logos-vitejs />
    <i-park-plus-cross />
    <i-logos-typescript-icon />
    <i-park-plus-cross />
    <i-logos-vue />
    <i-park-plus-cross />
    <i-logos-vuetifyjs />
    <i-park-plus-cross />
    <i-mdi:lightning-bolt />
  </header>
</template>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: repeat(9, min-content);
  grid-column-gap: 0.5rem;
  justify-content: center;
  svg {
    align-self: center;
    &:nth-child(odd) {
      font-size: 2em;
    }
    &:last-of-type {
      color: rgb(0, 120, 207);
    }
  }
}
</style>
