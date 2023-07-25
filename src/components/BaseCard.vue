<template>
    <div>
        <slot></slot>
    </div>
</template>


<style scoped>
div {
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-bottom: none;
    border-radius: 10px;
   
    padding: 10px;
    margin: 0 20px;
    min-height: 250px;
    height: 90%;
    overflow-y: scroll;
    overflow-x: hidden;

}

/* width */
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: transparent;
    margin-top: 5px;
    margin-bottom: 5px;

}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #0c0c0c;
    border-radius: 10px;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
    border-radius: 10px;
}
</style>