<script lang="ts">
    let { commenterName, comment } = $props();
</script>

<div class="bg-[white]">
    <h3>{commenterName}</h3>
    <p>{comment}</p>
</div>