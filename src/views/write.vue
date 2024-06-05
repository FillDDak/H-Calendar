<template>
    <v-container>
        <v-card class="mx-auto my-5 card-elevation" max-width="800">
            <v-card-title class="headline">글쓰기</v-card-title>
            <v-card-text>
                <v-text-field ref="title" v-model="board.title" label="제목" outlined></v-text-field>
                <v-text-field ref="writer" v-model="board.writer" label="작성자" outlined></v-text-field>
                <v-textarea ref="content" v-model="board.content" label="내용" outlined rows="10"></v-textarea>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn color="primary" @click="submit" class="mx-2">작성</v-btn>
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
        }
    },
    methods: {
        submit() {
            console.log(this.board);
            if (this.board.title == "") {
                alert("제목을 입력하세요");
                this.$refs.title.focus();
                return;
            }
            if (this.board.writer == "") {
                alert("작성자를 입력하세요");
                this.$refs.writer.focus();
                return;
            }
            if (this.board.content == "") {
                alert("내용을 입력하세요");
                this.$refs.content.focus();
                return;
            }

            //TODO: 서버로 데이터 전송
            this.$axios.post("/board/write", this.board)
                .then(response => {
                    alert("글이 작성되었습니다")
                    this.$router.push("/view/" + response.data.no)
                })
        }
    }
}
</script>
  
<style scoped>
.v-card.card-elevation {
    background: #ffffff;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.v-card.card-elevation:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
}

.v-card-title {
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
    padding: 20px;
    text-align: center;
}

.v-card-text {
    padding: 20px;
}

.v-card-actions {
    justify-content: center;
    padding-bottom: 16px;
}

.v-btn {
    font-weight: bold;
    transition: background-color 0.3s, transform 0.3s;
}

.v-btn:hover {
    transform: translateY(-3px);
}

.v-btn:active {
    transform: translateY(1px);
}
</style>
  