<script setup lang="ts">
import { Profile } from '../classes/profile';
export interface Props {
  profile: Profile;
}
const props = withDefaults(defineProps<Props>(), {
  profile: new Profile(),
});
console.log('Profile.vue props', props.profile.name);

const emits = defineEmits<{
  (e: 'onEmitOpenEditFormProfile', id: number): void;
}>();

const emitOpenEditFormProfile = () => {
  //name.value && alert(`Hi ${name.value}`);
  console.log('emitOpenEditFormProfile before emit');
  emits('onEmitOpenEditFormProfile', parseInt(props.profile.id));
  console.log('emitOpenEditFormProfile after emit');
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="9" class="text-left">
        <div>PROFILE VIEW MAIN - {{ profile.name }}</div>
      </v-col>
      <v-col cols="3" class="text-left">
        <v-btn
          type="button"
          @click="emitOpenEditFormProfile"
          color="primary"
          fab
        >
          <i-mdi:edit />
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
