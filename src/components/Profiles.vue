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
console.log('Profiles.vue selectedProfileId', props.selectedProfileId);
console.log('Profiles.vue profiles', props.profiles.value);

const emits = defineEmits<{
  (e: 'onEmitOpenNewFormProfile'): void;
  (e: 'onEmitSelectProfile', id: number): void;
  (e: 'onEmitOpenEditFormProfile', id: number): void;
}>();

const emitOpenNewFormProfile = () => {
  console.log('Before onEmitOpenNewFormProfile');
  emits('onEmitOpenNewFormProfile');
  console.log('After onEmitOpenNewFormProfile');
};

const emitOpenEditFormProfile = (e) => {
  let id = parseInt(e.currentTarget.getAttribute('data-id'));
  console.log(`emitOpenEditFormProfile before emit (${id})`);
  emits('onEmitOpenEditFormProfile', id);
  console.log('emitOpenEditFormProfile after emit');
};
const emitSelectProfile = (e) => {
  let selectedId = parseInt(e.currentTarget.getAttribute('data-id'));
  console.log(`emitSelectProfile before emit (${selectedId})`);
  emits('onEmitSelectProfile', selectedId);
  //props.selectedProfileId.value = parseInt(selectedId);
  console.log('emitSelectProfile after emit');
};
</script>

<template>
  <v-container fluid max-width="500">
    <v-row class="mb-3">
      <v-col>
        <div class="text-h2">Profiles</div>
      </v-col>
      <v-col
        ><v-btn @click="emitOpenNewFormProfile" block>
          <i-park-plus-cross /> New profile
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="[id, item] in props.profiles.value" :key="id">
        <v-card
          :class="props.selectedProfileId == item.id ? `selected` : ``"
          :outlined="props.selectedProfileId == item.id ? `outlined` : ``"
          class="ma-5"
          max-width="400"
          outlined
        >
          <v-list-item three-line>
            <div>
              <div class="text-overline mb-4">Profile</div>
              <v-list-item-title class="text-h5 mb-1">
                {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle
                >From {{ item.startWeight }} to
                {{ item.targetWeight }}</v-list-item-subtitle
              >
            </div>

            <v-avatar class="m-1" size="80" color="grey">
              <i-mdi:account />
            </v-avatar>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text :data-id="item.id" @click="emitOpenEditFormProfile">
              Edit
            </v-btn>
            <v-btn text :data-id="item.id" @click="emitSelectProfile">
              Select
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<!-- 
<v-avatar class="m-1" size="150">
  <i-mdi:account />{{ item.name }}
</v-avatar>
-->
<style lang="scss" scoped>
header {
  .v-card {
    .v-avatar {
    }
    .v-card-title {
    }
    .v-card-subtitle {
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
}
</style>
