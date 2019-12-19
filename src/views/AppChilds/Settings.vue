<template>
	<v-container>
		<v-expansion-panels>
			<ChangePassword/>
			<Logout/>
		</v-expansion-panels>
	</v-container>
</template>

<script>

import ChangePassword from './SettingsChilds/ChangePassword.vue'
import Logout from './SettingsChilds/Logout.vue'

export default {
	components: {
		ChangePassword,
		Logout,
	}
}
</script>
