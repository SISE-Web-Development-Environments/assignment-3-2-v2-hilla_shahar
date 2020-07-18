<template>
    <div>
        <div>
            <input type="checkbox" id="st" value="step" v-model="allSteps" @input="changeProgress">
            <label class="labelStatus" for="st"> {{step}}</label>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                checked: false,
            };
        },
        props: {
            step: {
                type: String,
                required: true
            }
        },
        methods:{
            changeProgress(event){
                this.checked=!this.checked;
                if(this.checked){
                    this.$emit('progressChangeUp');
                }else{
                    this.$emit('progressChangeDown');
                }


            }
        }

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
        font-family: 'Architects Daughter';
        text-align: center;
        font-weight: bold;
        font-size: 12pt;
    }
    input[type=checkbox]:checked + label.labelStatus{
        text-decoration: line-through;
        border-color: #bbb;
    }
    input[type=checkbox] {
        cursor: pointer;
        margin-right: 10px;
        color: #ffffff;
        font-weight: bold;
    }
    input[type=checkbox]:after {
        content: " ";
        background-color: #7BB257;
        display: inline-block;
        position: relative;
        top: -4px;
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    input[type=checkbox]:checked:after {
        content: "\00a0\2714";
    }
    label{
        margin: 11px;
        font-size: 17px;
    }
</style>
