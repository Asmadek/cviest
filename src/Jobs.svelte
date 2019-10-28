<script>
	import { jobs } from './stores/jobs.js';

    let id = 0
	let initialJob = {
		title: '',
		company: '',
		start: '',
		end: '',
		description: ''
	}

	let job = null

    function showForm () {
        job = { ...initialJob }
    }

	function editJob (jobToEdit) {
		job = jobToEdit        
        jobs.remove(job)
	}

	function updateJob () {
        jobs.add(job)
	}

	function addJob () {
        jobs.add({ ...job, id: ++id })
	}

	function clearJobForm () {
		job = null
	}

	function saveJob () {
		if (job.id) {
			updateJob()
		} else {
			addJob()
		}
		clearJobForm()
	}
</script>

<style>
.input {
	display: block;
}
</style>


<div class="jobs">
	{#each $jobs as job, i}
		<div>
			{ job.title }
		</div>
		<div>
			{ job.company }
		</div>
		<div>
			{ job.start } - { job.end }
		</div>
		<button on:click={() => editJob(job)}>Edit</button>
		<button on:click={() => jobs.remove(job)}>Remove</button>
	{/each}
</div>

{#if job}
    <div class="jobs-form">
        <input class="input" bind:value={ job.title } type="text" name="title"/>
        <input class="input" bind:value={ job.company } type="text" name="company" />
        <input class="input" bind:value={ job.start } type="date" name="start" />
        <input class="input" bind:value={ job.end } type="date" name="end" />
        <textarea class="input" bind:value={ job.description } type="text" name="description"></textarea>
        <button on:click={saveJob}>Save</button>
    </div>
{:else}
    <button on:click={showForm}>Add new job</button>
{/if}