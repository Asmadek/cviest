<script>
	import { educations } from './stores/educations.js';

    let id = 0
	let initialEducation = {
		program: '',
		degree: '',
		place: '',
		start: '',
		end: '',
		description: ''
	}

	let form = null

    function showForm () {
        form = { ...initialEducation }
    }

	function edit (toEdit) {
		form = toEdit        
        educations.remove(form)
	}

	function update () {
        educations.add(form)
	}

	function add () {
        educations.add({ ...form, id: ++id })
	}

	function clearForm () {
		form = null
	}

	function save () {
		if (form.id) {
			update()
		} else {
			add()
		}
		clearForm()
	}
</script>

<style>
.input {
	display: block;
}
</style>


<div class="educations">
	{#each $educations as educaiton, i}
		<div>
			{ educaiton.program }
		</div>
		<div>
			{ educaiton.degree }
		</div>
		<div>
			{ educaiton.place }
		</div>
		<div>
			{ educaiton.start } - { educaiton.end }
		</div>
		<button on:click={() => edit(educaiton)}>Edit</button>
		<button on:click={() => educations.remove(educaiton)}>Remove</button>
	{/each}
</div>

{#if form}
    <div class="education-form">
        <input class="input" bind:value={ form.program } type="text" name="program"/>
		<select bind:value={ form.degree } name="degree">
			<option value="Bachelor">Bachelor</option>
			<option value="Master">Master</option>
		</select>
        <input class="input" bind:value={ form.place } type="text" name="place" />
        <input class="input" bind:value={ form.start } type="date" name="start" />
        <input class="input" bind:value={ form.end } type="date" name="end" />
        <textarea class="input" bind:value={ form.description } type="text" name="description"></textarea>
        <button on:click={save}>Save</button>
    </div>
{:else}
    <button on:click={showForm}>Add new education</button>
{/if}