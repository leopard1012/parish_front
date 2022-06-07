<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>No</th>
                    <th>이름</th>
                    <th>구분</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="i" v-for="(user,i) in userList">
                    <td>{{user.userId}}</td>
                    <td>{{user.userName}}</td>
                    <td>{{user.userNameSeparator}}</td>
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
            userList: []
        };
    },
    setup() {},
    created() {
        this.getList();
    },
    mounted() {},
    unmounted() {},
    methods: {
        async getList() {
            this.userList = await this.$api("http://146.56.115.236:8080/v1/users/","get");
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