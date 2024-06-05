<template>
    <v-container>
      <v-card class="mx-auto my-5" max-width="800">
        <v-card-title class="headline">{{ board.title }}</v-card-title>
        <v-card-subtitle class="d-flex justify-space-between">
          <div>{{ board.writer }}</div>
          <div>{{ formattedDate(board.writeDate) }}</div>
        </v-card-subtitle>
        <v-card-text>
          <div class="view-count">조회수: {{ board.viewCount }}</div>
          <div class="content my-4">{{ board.content }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="moveList">목록</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="moveModify">수정</v-btn>
          <v-btn color="red" @click="removeBoard">삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import moment from "moment";
  export default {
    data() {
      return {
        board: {
          title: "",
          writer: "",
          writeDate: "",
          viewCount: 0,
          content: ""
        }
      };
    },
    mounted() {
      var no = this.$route.params.id;
      this.$axios.get("/board/" + no)
        .then(response => {
          this.board = response.data;
        })
    },
    methods: {
      formattedDate(date) {
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      moveModify() {
        this.$router.push("/modify/" + this.$route.params.id);
      },
      removeBoard() {
        this.$axios.delete("/board/" + this.$route.params.id)
          .then(response => {
            if (response.data.result == "success") {
              alert("삭제되었습니다.");
              this.$router.push("/list");
            }
          })
      },
      moveList() {
        this.$router.push("/list");
      }
    }
  };
  </script>
  
  <style scoped>
  .v-card {
    background: #f5f5f5;
    padding: 20px;
  }
  
  .v-card-title {
    font-size: 24px;
    font-weight: bold;
  }
  
  .v-card-subtitle {
    font-size: 16px;
    color: #757575;
  }
  
  .content {
    font-size: 16px;
    line-height: 1.6;
  }
  
  .view-count {
    font-size: 14px;
    color: #757575;
  }
  
  .v-card-actions {
    justify-content: flex-end;
  }
  </style>
  