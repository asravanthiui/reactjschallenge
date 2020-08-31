<template>
  <div>
    <h1>
      Upload Athletes
    </h1>
    <div id="add-athletics">
      <label>File</label>
      <div>
        <input class='hide' type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
        <input readonly ref="filePath" id="file-upload" v-on:click="browseFile" />
        <button class='browse-btn' v-on:click="browseFile">Browse</button>
      </div>
      <button class="submit-btn" v-on:click="submitFile()">Upload</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'file-upload',
  data: () => {
    return {
      file: ''
    }
  },
  methods: {
    submitFile(){
      const self =this; 

      if(self.file === ''){
          self.flashMessage.show({
              status: 'error',
              title: 'File should require',
          });
        return;
      }

      let formData = new FormData();
      formData.append('file', self.file);

      self.$http.post( `${this.$hostname}/players`,
          formData,
          {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function(){
          self.clearFilePaths();
          self.flashMessage.show({
              status: 'success',
              title: 'Upload successfully',
              message: 'Players added to system'
          });
        })
        .catch(function(){
          self.clearFilePaths();
          self.flashMessage.show({
              status: 'error',
              title: 'Upload failed',
              message: 'Unable to uplaod files'
          });
        });
      },

      browseFile(){
        var elem = this.$refs.file;
        elem.click()
      },

      clearFilePaths(){
        this.$refs.filePath.value = '';
        this.file = '';
      },

      handleFileUpload(){
        this.file = this.$refs.file.files[0];
        this.$refs.filePath.value = this.file.name;
      }
  }
}
</script>

<style scoped>
.submit-btn{
  padding: 5px 10px;
  color: white;
  background: #036CE6;
  padding: 7px;
  font-size: 17px;
  width: 100%;
  margin-top: 20px;
}

.hide{
  display: none;
}

#file-upload{
  height: 31px;
  width: 279px;
}

.browse-btn{
  color: #036CE6;
  border: 1px solid #036CE6;
  border-radius: 5px;
  padding: 5px 15px;
  background: #ffffff;
  padding: 13px 28px;
  margin-left: 10px;
}

#add-athletics{
  width: 400px;;
}
</style>
