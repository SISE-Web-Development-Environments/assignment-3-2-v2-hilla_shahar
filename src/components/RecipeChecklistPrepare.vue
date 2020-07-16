<template>
    <div>
        <div>
            <input type="checkbox" id="jack" value="Jack" v-model="allSteps">
            <label for="jack">{{step}}</label>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
    checked: {
        get() {
            return this.step;
        },
        set(step) {
            this.$emit("step", step);
        }
    }
},
        props: {
            step: {
                type: String,
                required: true
            }
        },
        
        async created(){
            this.step=this.step.step;
        },

    };
</script>

<style scoped>
    .recipe-preview {
        width: 180px;
        height: 280px;
        position: relative;
        margin: 10px 10px;
        background:rgba(255, 255, 255, 0.75);
    }

    .recipe-body .recipe-image {
        margin-left: auto;
        margin-right: auto;
        margin-top: auto;
        margin-bottom: auto;
        display: block;
        width: 200px;
        height: 180px;
    }

    .recipe-title {
        padding: 10px 10px;
        width: 180px;
        word-wrap: break-word;
        color: #7a512f;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        text-align: center;
        font-weight: bold;
        font-size: 12pt;
    }
    #values{
        text-align: center;
        font-size: 15px;
        color: #7BB257;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
</style>
