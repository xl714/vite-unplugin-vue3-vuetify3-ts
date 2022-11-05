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
            <v-col v-for="[id, item] in profiles" :key="id" cols="4">
              <v-card
                :data-id="item.id"
                @click="emitSelectProfile"
                :class="props.selectedProfileId == item.id ? `selected` : ``"
                :outlined="props.selectedProfileId == item.id ? `outlined` : ``"
              >
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-avatar class="ma-1" size="20">
                    <i-mdi:account />
                  </v-avatar>
                  <div class="c__text">
                    <v-card-title>
                      {{ item.name }} ({{ props.selectedProfileId }} -
                      {{ item.id }})
                    </v-card-title>
                    <v-card-subtitle>
                      > {{ item.targetWeight }} kg
                    </v-card-subtitle>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="3">
          <v-btn v-if="showAddButton" @click="emitOpenNewFormProfile" block>
            <i-park-plus-cross /> Ajouter un profile
          </v-btn>
        </v-col>
      </v-row>
    </header>
  </v-container>
</template>

<style lang="scss" scoped>
header {
  .v-card {
    cursor: ponter;
  }
  .selected {
    border: 1px solid gold;
  }
  .c__text {
    width: 200px;
    display: inline-flex;
    .v-card-title {
      font-size: 0.9em;
    }
    .v-card-subtitle {
      font-size: 0.7em;
    }
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
