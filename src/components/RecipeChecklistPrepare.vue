<template>
    <div>
        <div>
            <input type="checkbox" id="jack" value="Jack" v-model="allSteps" @input="changeProgress">
            <label class="labelStatus" for="jack">
                {{step.step}}
                <span v-if="step.equipment.equipment.length>0">
                    ({{step.equipment.equipment[0].name}})<br>
                </span>
            </label>
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

    input[type=checkbox]:checked + label.labelStatus{
        text-decoration: line-through;
        border-color: #bbb;
        /* vertical-align:middle; */
    }
    input[type=checkbox] {
        cursor: pointer;
        margin-right: 10px;
        color: #ffffff;
        font-weight: bold;
        text-align: center;
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
