<template>
  <v-container class="calendar-container">
    <v-navigation-drawer v-model="drawer" app temporary left width="400">
      <template v-if="selectedDay">
        <v-list-item class="date-item">
          <v-list-item-content>
            <v-list-item-title class="date-title">{{ selectedDay.date }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-text-field v-model="newEventTitle" label="운동 기록" outlined dense color="primary"></v-text-field>
            <v-btn @click="saveEvent" color="primary" class="mt-3">저장</v-btn>
            <v-list>
              <v-list-item v-for="(event, index) in selectedDay.events" :key="index" class="event-item">
                <v-list-item-content>{{ event }}</v-list-item-content>
                <v-list-item-action>
                  <v-btn icon @click="deleteEvent(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-row justify="center">
      <v-col cols="12" md="6" lg="2">
        <v-card class="calendar-card">
          <v-card-title class="headline">캘린더 작성</v-card-title>
          <v-card-text>
            <vc-calendar v-model="focus" is-expanded :events="events" @dayclick="dayClicked"></vc-calendar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script>
export default {
  name: 'Calendar',
  data() {
    return {
      drawer: false,
      focus: new Date(),
      events: [],
      selectedDay: null,
      newEventTitle: ''
    }
  },
  methods: {
    dayClicked(day) {
      this.selectedDay = {
        date: day.date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }),
        events: []
      };
      this.drawer = true;
    },
    saveEvent() {
      if (this.newEventTitle) {
        this.selectedDay.events.push(this.newEventTitle);
        this.newEventTitle = '';
      }
    },
    deleteEvent(index) {
      this.selectedDay.events.splice(index, 1);
    }
  }
}
</script>
  
<style scoped>
.calendar-container {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.date-item {
  background-color: #f7f7f7;
}

.date-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.calendar-card {
  background-color: #f0f0f0;
}

.headline {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.event-item {
  background-color: #fafafa;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-item:hover {
  background-color: #e0e0e0;
}
</style>
