<template>
    <v-container>
        <v-card class="mx-auto my-5" max-width="800">
            <v-card-title class="headline">글쓰기</v-card-title>
            <v-card-text>
                <v-text-field ref="title" v-model="board.title" label="제목" outlined></v-text-field>
                <v-text-field ref="writer" v-model="board.writer" label="작성자" outlined></v-text-field>
                <v-textarea ref="content" v-model="board.content" label="내용" outlined rows="10"></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="submit">작성</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="moveList">취소</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
  
<script>
export default {
    data() {
        return {
            board: {
                title: "",
                writer: "",
                content: ""
            }
        };
    },
    methods: {
        submit() {
            console.log(this.board);
            if (this.board.title === "") {
                alert("제목을 입력하세요");
                this.$refs.title.focus();
                return;
            }
            if (this.board.writer === "") {
                alert("작성자를 입력하세요");
                this.$refs.writer.focus();
                return;
            }
            if (this.board.content === "") {
                alert("내용을 입력하세요");
                this.$refs.content.focus();
                return;
            }

            // 서버로 데이터 전송
            this.$axios.post("/board/write", this.board)
                .then(response => {
                    alert("글이 작성되었습니다");
                    this.$router.push("/view/" + response.data.no);
                });
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
  