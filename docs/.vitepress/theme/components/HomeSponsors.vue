<script setup lang="ts">
import { VPHomeSponsors } from 'vitepress/theme'
import { useSponsor } from '../composables/sponsor'

const { data } = useSponsor()
</script>

<template>
  <VPHomeSponsors
    v-if="data"
    message="Webuum is free and open source. If you like the project and want to support the development, please consider becoming a sponsor."
    action-text="Become a sponsor"
    action-link="mailto:lubomir.blazek@newlogic.cz"
    :data="data"
  />
</template>
