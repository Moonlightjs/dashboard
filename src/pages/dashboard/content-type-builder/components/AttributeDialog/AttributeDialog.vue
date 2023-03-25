<template>
	<v-dialog v-model="isOpen" width="800">
		<v-card>
			<v-card-title>
				Select a field for your collection type
			</v-card-title>
			<v-divider></v-divider>
			<v-card-text>
				<v-form>
					<v-row class="pa-2">
						<v-col @click="onOpenDialogField('text')" class="hover-btn" style="cursor: pointer; margin-right:10px">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/text-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols="10">
									<h4>Text</h4>
									<h6>Small or long text like title or description</h6>
								</v-col>
							</v-row>
						</v-col>
						<v-col @click="onOpenDialogField('email')" class="hover-btn" style="cursor: pointer">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/email-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols="10">
									<h4>Email</h4>
									<h6>Email field with validations format</h6>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row class="pa-2">
						<v-col @click="onOpenDialogField('richtext')" class=" hover-btn"
							style="cursor: pointer; margin-right:10px">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/rich-text-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols=" 8">
									<h4>Rich text</h4>
									<h6>A rich text editor with formatting options</h6>
								</v-col>
							</v-row>
						</v-col>
						<v-col @click="onOpenDialogField('password')" class="hover-btn" style="cursor: pointer">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/password-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols=" 8">
									<h4>Password</h4>
									<h6>Password field with encryption</h6>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row class="pa-2">
						<v-col @click="onOpenDialogField('integer')" class="hover-btn" style="cursor: pointer; margin-right:10px">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/number-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols=" 8">
									<h4>Number</h4>
									<h6>Numbers (integer, float, decimal)</h6>
								</v-col>
							</v-row>
						</v-col>
						<v-col @click="onOpenDialogField('enumeration')" class="hover-btn" style="cursor: pointer">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/enum-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols=" 8">
									<h4>Enumeration</h4>
									<h6>List of values, then pick one</h6>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row class="pa-2">
						<v-col @click="onOpenDialogField('date')" class="hover-btn" style="cursor: pointer; margin-right:10px">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/date-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols=" 8">
									<h4>Date</h4>
									<h6>A date picker with hours, minutes and seconds</h6>
								</v-col>
							</v-row>
						</v-col>
						<v-col @click="onOpenDialogField('media')" class="hover-btn" style="cursor: pointer">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/media-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols=" 8">
									<h4>Media</h4>
									<h6>Files like images, videos, etc</h6>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row class="pa-2">
						<v-col @click="onOpenDialogField('boolean')" class="hover-btn" style="cursor: pointer; margin-right:10px">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/boolean-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols=" 8">
									<h4>Boolean</h4>
									<h6>Yes or no, 1 or 0, true or false</h6>
								</v-col>
							</v-row>
						</v-col>
						<v-col @click="onOpenDialogField('json')" class="hover-btn" style="cursor: pointer">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/JSON-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols=" 8">
									<h4>JSON</h4>
									<h6>Data in JSON format</h6>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
					<v-row class="pa-2">
						<v-col @click="onOpenDialogField('relation')" class="hover-btn" style="cursor: pointer; margin-right:10px">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/relation-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols=" 8">
									<h4>Relation</h4>
									<h6>Refers to a Collection Type</h6>
								</v-col>
							</v-row>
						</v-col>
						<v-col @click="onOpenDialogField('uuid')" class="hover-btn" style="cursor: pointer">
							<v-row class="rounded" style=" border: 1px solid black">
								<v-col cols="2">
									<v-img src="@/assets/images/uuid-icon.svg" style="width:32px; height:24px;">
									</v-img>
								</v-col>
								<v-col cols="10">
									<h4>UID</h4>
									<h6>Unique identifier</h6>
								</v-col>
							</v-row>
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
<script setup lang="ts">
import { CollationTypeAttributeType } from "@/service/content-type-builder.service";
import { computed, ref, toRefs } from "vue";

const emit = defineEmits(['update:isOpen']);

interface Props {
	isOpen: boolean,
	onOpenDialogField: (type: CollationTypeAttributeType) => void,
}

const props = withDefaults(defineProps<Props>(), {
	isOpen: false,
});

const isOpen = computed({
	get() { return props.isOpen },
	set(newValue: boolean) { emit('update:isOpen', newValue) }
});

const { onOpenDialogField } = toRefs(props);
</script>


<style scoped>
.hover-btn:hover {
	background: rgb(0, 233, 250);
}
</style>
