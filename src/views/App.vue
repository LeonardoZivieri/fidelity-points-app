<template>
	<AppLayout>
		<template v-slot:title>
			App do Zivieri
		</template>

		<template v-slot:default>
			<router-view/>
		</template>
	</AppLayout>
</template>

<script>
import AppLayout from '@/components/Layouts/MenuBarBottom.vue'

export default {
	components: {
		AppLayout
	},
	methods: {
	}
}
</script>
