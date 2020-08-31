<template>
  <div>
    <div>
      <h1>Athletes</h1>
      <table>
        <thead>
          <th> NAME </th>
          <th> AGE </th>
          <th> LOCATIONS </th>
          <th> ACTIONS </th>
        </thead>
        <tbody>
        <tr v-for="(athlete, index) in athletes" :key="index">
          <td>{{ athlete.name }}</td>
          <td>{{ athlete.age }}</td>
          <td><span v-if="athlete.locations.length">
            {{athlete.locations[0].city}},
            {{athlete.locations[0].province}}
            </span>
          </td>
          <td>
            <span class="view-link" v-on:click="selectAthelete(athlete.id)">VIEW</span>
            <span class="delete-link" v-on:click="deleteAthelete(athlete.id)">DELETE</span>
          </td>
        </tr>
        <tr v-if="noAthletics" class="no-athletics">
          <td colspan="4">No Athletics are listed</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Athlete from './Athlete'

export default {
  name: 'Athletes',
  component: {
    Athlete
  },
  data: () => {
    return {
      athletes: [],
      noAthletics: false
    }
  },
  mounted () {
    this.getAthletes();
  },
  methods: {
    getAthletes(){
      this.$http
      .get(`${this.$hostname}/players`)
      .then(response => {
        this.athletes = response.data
        this.noAthletics = response.data.length === 0
      })
    },
    selectAthelete(id) {
      this.$router.push(`athletic/${id}`)
    },
    deleteAthelete(id) {
      const self = this;

      this.$http
      .delete(`${this.$hostname}/players/${id}`)
      .then(() => {
        self.flashMessage.show({
            status: 'success',
            title: 'Deleted successfully'
        });

        this.getAthletes();
      })
    }
  }
}
</script>

<style scoped>
table{
  width: 100%;
  margin-top: 30px;
  border-spacing: 0;
  border: 1px solid #ddd;
}

thead{
  background: #f7f8f8;
}

td, th{
  width: 25%;
  width: 100px;
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

th:first-child, td:first-child{
  text-align: left;
}

th:last-child, td:last-child{
  text-align: right;
}

.view-link{
  color: #036CE6;
  margin-right: 10px;
  cursor: pointer;
}

.delete-link{
  color: #036CE6;
  cursor: pointer;
}

tr.no-athletics td{
  text-align: center;
}
</style>
