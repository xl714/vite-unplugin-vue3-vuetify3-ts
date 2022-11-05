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
  let selectedId = e.currentTarget.getAttribute('data-id');
  console.log('Before onEmitSelectProfile');
  emits('onEmitSelectProfile', selectedId);
  props.selectedProfileId.value = selectedId;
  console.log('After onEmitSelectProfile');
};
</script>

<template>
  <v-container>
    <header>
      <!-- <i-park-plus-cross />
    <i-mdi:account /> -->
      <v-row>
        <v-col cols="9" class="text-left">
          <v-row dense>
            <v-col v-for="[id, item] in profiles" :key="id" cols="3">
              <v-card
                :data-id="item.id"
                @click="emitSelectProfile"
                :class="props.selectedProfileId == item.id ? `selected` : ``"
                :outlined="props.selectedProfileId == item.id ? `outlined` : ``"
                class="text-left"
              >
                <v-avatar class="m-1" size="20">
                  <i-mdi:account />
                </v-avatar>
                <v-card-title>
                  {{ item.name }}
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-btn v-if="showAddButton" @click="emitOpenNewFormProfile" block>
            <i-park-plus-cross /> New profile
          </v-btn>
        </v-col>
      </v-row>
    </header>
  </v-container>
</template>

<style lang="scss" scoped>
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
  /*
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
  */
}
</style>
