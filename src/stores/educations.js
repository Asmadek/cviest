import { writable } from 'svelte/store'

const EDUCATIONS_STORE = 'EDUCATIONS_STORE'

function createEducations() {
    const initialEducations = JSON.parse(localStorage.getItem(EDUCATIONS_STORE)) || []

	const { subscribe, set, update } = writable(initialEducations)

	return {
		subscribe,
		add: edu => update(educations => [...educations, edu]),
		remove: edu => update(educations => educations.filter(e => edu !== e)),
		reset: () => set([])
	};
}

export const educations = createEducations()

const unsubscribeEducations = educations.subscribe(value => {
    localStorage.setItem(EDUCATIONS_STORE, JSON.stringify(value))
});
