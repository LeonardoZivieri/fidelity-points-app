<template>
	<v-app>
		<router-view></router-view>
	</v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'App',
	mounted: function () {
		this.$store.dispatch('init')
	},
	data: () => ({
		//
	}),
})
</script>
