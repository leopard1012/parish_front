<template>
    <div>
        <input type="text" v-bind="code" />
        <b-button v-on:click="search">검색</b-button>
        <!-- <b-form-checkbox-group
            v-model="selectedMonths"
            :options="months"
            class="mb-3"
            value-field="monthValue"
            text-field="monthName"
            disabled-field="notEnabled"
        ></b-form-checkbox-group> -->
        <b-form-radio-group
            v-model="selectedMonths"
            :options="months"
            class="mb-3"
            value-field="monthValue"
            text-field="monthName"
        />
        
    </div>
    <div>
        <b-table
            striped hover
            :items="list"
        ></b-table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    // name: '',
    // components: {},
    data() {
        return {
            list: [],
            headers: [],
            months: [
                { monthName: '1월', monthValue: '01'},
                { monthName: '2월', monthValue: '02'},
                { monthName: '3월', monthValue: '03'},
                { monthName: '4월', monthValue: '04'},
                { monthName: '5월', monthValue: '05'},
                { monthName: '6월', monthValue: '06'},
                { monthName: '7월', monthValue: '07'},
                { monthName: '8월', monthValue: '08'},
                { monthName: '9월', monthValue: '09'},
                { monthName: '10월', monthValue: '10'},
                { monthName: '11월', monthValue: '11'},
                { monthName: '12월', monthValue: '12'}
            ],
            selectedMonths: []
        };
    },
    // setup() {},
    // created() {
    //     // this.getList();
    // },
    mounted() {
        axios.get("http//146.56.115.236")
    },
    // unmounted() {},
    methods: {
        search() {
            // let params = {};
            let months = [];
            // params.pastoralCode = 1;
            this.selectedMonths.forEach(function(value) {
                months.push(value);
            });

            // params.months.push(months);

            // this.list = await this.$api("http://146.56.115.236:8080/v1/attendance/1/date/2022/05/29","get");
            // this.response = await this.$api("http://146.56.115.236:8080/v1/attendance/1/period/2022-05-01/2022-06-17","get");
            
            // axios.get("http://146.56.115.236:8080/v1/attendance/1/period/2022-05-01/2022-06-27")
            axios.post("http://146.56.115.236:8080/v1/attendance/months",{
                pastoralCode: 1,
                months: months
            })
                .then(response => {
                    let cols = response.data.cols;
                    let users = response.data.pastoralUserList;
                    let onMap = response.data.onLineMap;
                    let offMap = response.data.offLineMap;

                    let i = 0
                    let j = 0;
                    let k = 0;

                    for(i = 0 ; i < users.length ; i++) {
                        let userData = {};
                        userData.name = users[i];
                        for(j = 0 ; j < cols.length ; j++) {
                            let type = '';
                            if (onMap[users[i]].includes(cols[j])) {
                                type = '온라인';
                            } else if (offMap[users[i]].includes(cols[j])) {
                                type = '현장';
                            }
                            userData[cols[j]] = type;
                        }
                        this.list.push(userData);
                    }

                    this.headers = [{ text:'이름', value:'name', align:'center', sortalbe:true }];
                    for(k = 0 ; k < cols.length ; k++) {
                        let colData = { text:cols[k], value:cols[k], align:'center', sortable:false };
                        this.headers.push(colData);
                    }
                    
                    // users.forEach(function(value) {
                    //     let userData = {};
                    //     userData.name = value;
                    //     cols.forEach(function(date){
                    //         let type = '';
                    //         if (onMap.get(value).includes(date)) {
                    //             type = '온라인';
                    //         } else if (offMap.get(value).includes(date)) {
                    //             type = '현장';
                    //         }
                    //         userData.date = type;
                    //     });
                    //     this.list.put(userData);
                    // });
                })
                .catch(error => {
                    alert(error)
                });

            // this.cols = this.response.cols;
            // this.users = this.response.pastoralUserList;
            // this.onMap = this.response.onMap;
            // this.offMap = this.response.offMap;

            
        },

        
    }
}
</script>
<style scoped>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }
    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
</style>