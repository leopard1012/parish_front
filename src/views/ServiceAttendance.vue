<template>
    <div>
        <!-- <input type="text" v-bind="code" /> -->
        <button v-on:click="search">검색</button>
    </div>
    <div>    
        <!-- <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th :key="index" v-for="{col,index} in cols">{{col}}</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(item,index) in list">
                    <td>{{item}}</td>
                    <td :key="i" v-for="(date,i) in cols">
                        {{list.date}}
                    </td>
                </tr>
            </tbody>
        </table> -->
        <v-main>
            <v-row>
                <div>
                    <v-card>
                        <v-data-table 
                         :headers="headers" 
                         :items="list">
                        </v-data-table>
                    </v-card>
                </div>
            </v-row>
        </v-main>
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
            headers: []
            // users: [],
            // cols: [],
            // onMap: {},
            // offMap: {},
            // response: {}
        };
    },
    // setup() {},
    // created() {
    //     // this.getList();
    // },
    // mounted() {},
    // unmounted() {},
    methods: {
        search() {
            // this.list = await this.$api("http://146.56.115.236:8080/v1/attendance/1/date/2022/05/29","get");
            // this.response = await this.$api("http://146.56.115.236:8080/v1/attendance/1/period/2022-05-01/2022-06-17","get");
            
            axios.get("http://146.56.115.236:8080/v1/attendance/1/period/2022-05-01/2022-06-17")
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

            
        }
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