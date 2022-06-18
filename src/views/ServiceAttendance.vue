<template>
    <div>
        <!-- <input type="text" v-bind="code" /> -->
        <button v-on:click="search">검색</button>
    </div>
    <div>    
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th :key="index" v-for="{col,index} in cols">{{col}}</th>
                    <!-- <th>No</th>
                    <th>이름</th>
                    <th>목자</th>
                    <th>예배날짜</th>
                    <th>예배타입</th> -->
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
        </table>
    </div>
</template>
<script>
export default {
    // name: '',
    // components: {},
    data() {
        return {
            list: [],
            users: [],
            cols: [],
            onMap: {},
            offMap: {},
            response: {}
        };
    },
    setup() {},
    created() {
        // this.getList();
    },
    mounted() {},
    unmounted() {},
    methods: {
        async search() {
            // this.list = await this.$api("http://146.56.115.236:8080/v1/attendance/1/date/2022/05/29","get");
            this.response = await this.$api("http://146.56.115.236:8080/v1/attendance/1/period/2022-05-01/2022-06-17","get");
            this.cols = this.response.cols;
            this.users = this.response.pastoralUserList;
            this.onMap = this.response.onMap;
            this.offMap = this.response.offMap;

            this.users.forEach(function(value) {
                let userData = {};
                userData.name = value;
                this.cols.forEach(function(date){
                    let type = '';
                    if (this.onMap.get(value).includes(date)) {
                        type = '온라인';
                    } else if (this.offMap.get(value).includes(date)) {
                        type = '현장';
                    }
                    userData.date = type;
                });
                this.list.put(userData);
            });
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