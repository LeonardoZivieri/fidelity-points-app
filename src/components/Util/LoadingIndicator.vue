<template>
	<v-row class="force-align" no-gutters align-content="center">
		<v-col align="center">
			<v-progress-circular
				:size="50"
				color="primary"
				indeterminate
			/>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'LoadingIndicator',
	props: ['visible'],
})
</script>

<style scoped>
	.force-align {
		position: absolute;
		top: 50%;
		left: 50%;
		transform-origin: center;
		transform: translateX(-50%) translateY(-50%);
		width: 100%;
		height: 100%;
		background-color: #fffd;
		z-index: 1000
	}
</style>
