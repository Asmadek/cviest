import { writable } from 'svelte/store'

const JOBS_STORE = 'JOBS_STORE'

function createJobs() {
    const initialJobs = JSON.parse(localStorage.getItem(JOBS_STORE)) || []

	const { subscribe, set, update } = writable(initialJobs)

	return {
		subscribe,
		add: job => update(jobs => [...jobs, job]),
		remove: job => update(jobs => jobs.filter(j => job !== j)),
		reset: () => set([])
	};
}

export const jobs = createJobs()

const unsubscribeJobs = jobs.subscribe(value => {
    localStorage.setItem(JOBS_STORE, JSON.stringify(value))
});
