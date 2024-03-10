<script>
export default {
    name: 'ChipContainer',
};
</script>
<template>
    <div class="chip-container">
        <slot></slot>
    </div>
</template>
<style>
.chip-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 5px;
    padding: 5px;
}    
</style>