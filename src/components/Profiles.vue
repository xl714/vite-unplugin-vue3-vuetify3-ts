<script setup lang="ts">
// https://vuejs.org/api/sfc-script-setup.html#typescript-only-features
export interface Props {
  selectedProfileId?: number | null;
  profiles: Map | null;
}
const props = withDefaults(defineProps<Props>(), {
  selectedProfileId: null,
  profiles: Map | null,
});
console.log('profiles', props.profiles);

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

<!-- <template>
  <div v-for="[id, item] in profiles" :key="id">
    <v-card
      :data-id="item.id"
      @click="emitSelectProfile"
      :class="props.selectedProfileId == item.id ? `selected` : ``"
      :outlined="props.selectedProfileId == item.id ? `outlined` : ``"
      class="text-left"
    >
      <v-avatar class="m-1" size="150">
        <i-mdi:account />{{ item.name }}
      </v-avatar>
      <v-card-title> </v-card-title>
    </v-card>
  </div>

  
</template> -->
<template>
  <v-container fluid max-width="500">
    <v-row>
      <v-btn @click="emitOpenNewFormProfile" block>
        <i-park-plus-cross /> New profile
      </v-btn>
    </v-row>
    <v-row dense>
      <v-col v-for="[id, item] in profiles" :key="id">
        <v-card
          @click="emitSelectProfile"
          :class="props.selectedProfileId == item.id ? `selected` : ``"
          :outlined="props.selectedProfileId == item.id ? `outlined` : ``"
        >
          <i-mdi:account
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          />
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <i-mdi:account />
            </v-btn>
            <v-btn icon>
              <i-mdi:account />
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
