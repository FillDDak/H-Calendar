<template>
    <v-container>
        <v-card class="mx-auto my-5" max-width="800">
            <v-card-title class="headline">게시글 수정</v-card-title>
            <v-card-text>
                <v-text-field ref="title" v-model="board.title" label="제목"></v-text-field>
                <v-text-field ref="writer" v-model="board.writer" label="작성자"></v-text-field>
                <v-textarea ref="content" v-model="board.content" label="내용"></v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="submit">수정</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="moveView">취소</v-btn>
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
    mounted() {
        this.$axios.get("/board/" + this.$route.params.id)
            .then(response => {
                this.board = response.data;
            });
    },
    methods: {
        submit() {
            this.$axios.post("/board/modify", this.board)
                .then(response => {
                    if (response.data.result === "success") {
                        this.$router.push("/view/" + this.$route.params.id);
                    }
                });
        },
        moveView() {
            this.$router.push("/view/" + this.$route.params.id);
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

.v-card-text {
    font-size: 16px;
    line-height: 1.6;
}

.v-card-actions {
    justify-content: flex-end;
}
</style>
  