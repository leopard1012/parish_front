<template>
    <div>
        <!-- <input type="text" v-bind="code" /> -->
        <button v-on:click="search">검색</button>
    </div>
    <div>    
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>이름</th>
                    <th>목자</th>
                    <th>예배날짜</th>
                    <th>예배타입</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(item,i) in list">
                    <td>{{item.row}}</td>
                    <td>{{item.userName}}</td>
                    <td>{{item.pastoralName}}</td>
                    <td>{{item.serviceDate}}</td>
                    <td>{{item.attendanceType}}</td>
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
            list: []
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
            this.list = await this.$api("http://146.56.115.236:8080/v1/attendance/1/date/2022/05/29","get");
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