<template>
  <my-calendar visible.sync="true" style="display: block;"
    :picker-type="'date'"
    :is-show-week-view="true"
    :change-year-fast="true"
    :scroll-change-date="false"
    :max-date="maxDate"
  ></my-calendar>
</template>

<script>
import MyCalendar from '@/components/calendar/DatetimePicker'
export default {
  components: { MyCalendar },
  data () {
    return {
      maxDate: new Date('2023-12-31')
    }
  }
}
</script>

<style>

</style>
