<template>
  <div id='athlete-detail'>
    <h1>{{athlete.name}}</h1>
    <table>
      <tbody>
        <tr>
          <td> AGE </td>
          <td> {{athlete.age}} </td>
        </tr>
        <tr>
          <td> CITY </td>
          <td> {{athlete.locations[0].city}} </td>
        </tr>
        <tr>
          <td> PROVINCE </td>
          <td> {{athlete.locations[0].province}} </td>
        </tr>
        <tr>
          <td> COUNTRY </td>
          <td> {{athlete.locations[0].country}} </td>
        </tr>
      </tbody>
    </table>
    <button class='delete-btn' v-on:click="deleteAthelete(athlete.id)">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'Athlete',
  data: () => {
    return {
      athlete: {
        locations: [
          {
            city: '',
            country: '',
            province: ''
          }
        ]
      }
    }
  },
  mounted () {
    let playerId = this.$route.params.id;
    this.$http
      .get(`${this.$hostname}/players/${playerId}`)
      .then(response => (this.athlete = response.data))
  },
  methods: {
    deleteAthelete(id) {
      const self = this;

      this.$http
      .delete(`${this.$hostname}/players/${id}`)
      .then(() => {
        self.flashMessage.show({
              status: 'success',
              title: 'Deleted successfully'
          });

        this.$router.push(`/athletics`);
      })
    }
  }
}
</script>

<style scoped>
table{
  width: 450px;
  margin: 30px 0;
  border-spacing: 0;
  border: 1px solid #ddd;
}

td, th{
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

td:first-child{
  width: 40%;
  text-align: right;
  background: #f7f8f8;
}

td:last-child{
  text-align: left;
}

.delete-btn{
  background: #036CE6;
  color: #ffffff;
  padding: 10px 25px;
  cursor: pointer;
  font: bold;
  border-radius: 5px;
  font-size: 15px;
}

#athlete-detail{
  margin: 50px;
}

</style>
