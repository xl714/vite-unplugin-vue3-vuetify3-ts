<script setup lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
export interface Props {
  selectedProfileId?: number | null;
  profiles?: Map | null;
  showAddButton?: boolean | null;
}
const props = withDefaults(defineProps<Props>(), {
  selectedProfileId: null,
  profiles: null,
  showAddButton: true,
});

const emits = defineEmits<{
  (e: 'onEmitOpenNewFormProfile'): void;
}>();

const emitOpenNewFormProfile = () => {
  console.log('Before onEmitOpenNewFormProfile');
  emits('onEmitOpenNewFormProfile');
  console.log('After onEmitOpenNewFormProfile');
};
</script>

<template>
  <header>
    <!-- <i-park-plus-cross />
    <i-mdi:account /> -->
    <v-row>
      <v-col cols="8" class="text-left">
        <div v-for="[id, item] in profiles" :key="id">
          <v-card
            :data-id="id"
            v-if="showAddButton"
            @click="emitOpenNewFormProfile"
            block
          >
            <i-mdi:account />
            <span class="profile">{{ item.name }}</span>
          </v-card>
        </div>
      </v-col>
      <v-col cols="2">
        <v-btn v-if="showAddButton" @click="emitOpenNewFormProfile" block>
          <i-park-plus-cross /> Ajouter un profile
        </v-btn>
      </v-col>
    </v-row>
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
