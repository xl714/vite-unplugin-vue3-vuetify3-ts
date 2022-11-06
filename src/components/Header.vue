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
  (e: 'onEmitSelectProfile', id: number): void;
  (e: 'onEmitOpenNewFormProfile'): void;
}>();

const emitOpenNewFormProfile = () => {
  console.log('Before onEmitOpenNewFormProfile');
  emits('onEmitOpenNewFormProfile');
  console.log('After onEmitOpenNewFormProfile');
};

const emitSelectProfile = (e) => {
  let selectedId = parseInt(e.currentTarget.getAttribute('data-id'));
  console.log('Before onEmitSelectProfile');
  emits('onEmitSelectProfile', selectedId);
  //props.selectedProfileId.value = parseInt(selectedId);
  console.log('After onEmitSelectProfile');
};
</script>

<template>
  <v-app-bar app color="teal" dark>
    <v-app-bar-nav-icon><i-mdi:fire /></v-app-bar-nav-icon>
    <v-toolbar-title>Application</v-toolbar-title>
    <div v-for="[id, item] in profiles" :key="id">
      <v-card
        :data-id="item.id"
        @click="emitSelectProfile"
        :class="props.selectedProfileId == item.id ? `selected` : ``"
        :outlined="props.selectedProfileId == item.id ? `outlined` : ``"
        class="text-left"
      >
        <v-avatar class="m-1" size="150">
          <!-- <i-mdi:account /> -->{{ item.name }}
        </v-avatar>
        <v-card-title> </v-card-title>
      </v-card>
    </div>
    <v-spacer />
    <v-btn v-if="showAddButton" @click="emitOpenNewFormProfile" block>
      <i-park-plus-cross /> New profile
    </v-btn>
  </v-app-bar>
</template>

<style lang="scss" scoped>
/*
header {
  .v-card {
    cursor: pointer;
    .v-avatar {
      display: inline-flex;
    }
    .v-card-title {
      display: inline-flex;
      font-size: 0.9em;
    }
    .v-card-subtitle {
      display: inline-flex;
      font-size: 0.7em;
    }
  }
  .selected {
    border: 1px solid gold;
  }
  svg {
    align-self: center;
    font-size: 2em;
    color: rgb(0, 120, 207);
  }
  /*********
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
 */
</style>
