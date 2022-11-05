<script setup lang="ts">
import { Profile } from '../classes/profile';
export interface Props {
  profile: Profile;
}
const props = withDefaults(defineProps<Props>(), {
  profile: new Profile(),
});
console.log('Profile.vue props', props.profile.name);
</script>

<template>
  <div>PROFILE VIEW MAIN - {{ profile.name }}</div>
</template>
