<template>
	<v-container>
		<v-expansion-panels>
			<ChangePassword/>
		</v-expansion-panels>
	</v-container>
</template>

<script>

import ChangePassword from './SettingsChilds/ChangePassword.vue'

export default {
	components: {
		ChangePassword
	}
}
</script>
