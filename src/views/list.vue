<template>
  <div :style="{ backgroundImage: 'url(' + backgroundImage + ')' }" class="board-list-container">
    <v-card>
      <v-card-title>
        게시판 목록
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <table class="styled-table">
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>조회수</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="board in boardList" :key="board.no" @click="moveView(board)" class="table-row">
              <td>{{ board.no }}</td>
              <td>{{ board.title }}</td>
              <td>{{ board.viewCount }}</td>
              <td>{{ board.writer }}</td>
              <td>{{ formattedWriteDate(board.writeDate) }}</td>
            </tr>
          </tbody>
        </table>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="primary" variant="outlined" @click="moveWrite">글쓰기</v-btn>
      </v-card-actions>
      <v-card-actions class="justify-center">
        <v-pagination v-model="page" :length="totalPage" :total-visible="5" @input="updatePage" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  data() {
    return {
      page: 1,
      totalPage: 0,
      boardList: [],
      backgroundImage: ''
    };
  },
  watch: {
    page() {
      this.getBoardList();
    }
  },
  mounted() {
    this.getBoardList();
    this.getRandomImage();
  },
  methods: {
    formattedWriteDate(date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },
    updatePage(page) {
      this.page = page;
    },
    getBoardList() {
      this.$axios
        .post('/board/list', { page: this.page })
        .then(response => {
          this.boardList = response.data.boardList;
          this.totalPage = response.data.totalPage;
        })
        .catch(error => {
          console.error('Error fetching board list:', error);
        });
    },
    moveWrite() {
      this.$router.push('/write');
    },
    moveView(board) {
      this.$router.push('/view/' + board.no);
    },
    async getRandomImage() {
      try {
        const response = await axios.get('https://picsum.photos/1920/1080');
        this.backgroundImage = response.request.responseURL;
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    }
  }
};
</script>

<style scoped>
.board-list-container {
  background-size: cover;
  background-position: center;
  padding: 20px;
  min-height: 100vh;
}

.v-card {
  margin: 20px;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.styled-table tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.v-card-actions.justify-center {
  justify-content: center;
  display: flex;
}

.v-card-actions.justify-end {
  justify-content: flex-end;
  display: flex;
}
</style>
