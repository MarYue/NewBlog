
<template>
  <div class="hash-calendar"
       :class="{'calendar_inline': model === 'inline'}"
       v-show="isShowDatetimePicker"
       :style="{'height': `${model === 'inline' ? calendarContentHeight + (isShowArrowImg ? 30 : 0) : undefined}px`}"
       @click="close">
    <div class="calendar_content"
         :style="{'height': `${calendarContentHeight}px`, 'bottom': `${isShowArrowImg ? 30 : 0}px`}"
         @click.stop>
      <div class="calendar_title"
           v-if="isShowAction"
           ref="calendarTitle">
        <slot name="action">
          <div class="calendar_title_date">
            <!-- @click="showCalendar" -->
            <span v-if="pickerType !== 'time'"
                  class="calendar_title_date_year"
                  :class="{'calendar_title_date_active': isShowCalendar}"
                  >{{ formatDate(`${checkedDate.year}/${this.checkedDate.month + 1}/${this.checkedDate.day}`, language.DEFAULT_DATE_FORMAT) }}</span>
            <span v-if="pickerType !== 'date'"
                  class="calendar_title_date_time"
                  :class="{'calendar_title_date_active': !isShowCalendar}"
                  @click="showTime">{{ formatDate(`${checkedDate.year}/${this.checkedDate.month + 1}/${this.checkedDate.day} ${fillNumber(checkedDate.hours)}:${fillNumber(checkedDate.minutes)}`, language.DEFAULT_TIME_FORMAT)}}</span>
          </div>
          <div v-if="showMonth"
               class="calendar_confirm"
               :class="{'today_disable': disabledDate(new Date())}"
               @click="showYearMonthPicker">
            <slot>
              月
            </slot>
          </div>
          <div v-if="showTodayButton"
               class="calendar_confirm"
               :class="{'today_disable': disabledDate(new Date())}"
               @click="today">
            <slot name="today">
              {{ language.TODAY }}
            </slot>
          </div>
          <div class="calendar_confirm"
               v-if="model === 'dialog'"
               @click="confirm">
            <slot name="confirm">
              {{ language.CONFIRM }}
            </slot>
          </div>
        </slot>
      </div>
      <calendar ref="calendar"
                v-if="pickerType !== 'time'"
                :show="isShowCalendar"
                :isShowWeekView.sync="isShowWeek"
                v-bind="{...$props, ...$attrs}"
                :calendarTitleHeight="calendarTitleHeight"
                @height="heightChange"
                :default-date="currDateTime"
                @touchstart="touchStart"
                @touchmove="touchMove"
                @touchend="touchEnd"
                @slidechange="slideChange"
                @change="dateChange"
                @click="dateClick">
        <template v-if="hasSlot('week')"
                  slot="week"
                  slot-scope="scope">
          <slot name="week"
                :week="scope.week">
          </slot>
        </template>
        <template v-if="hasSlot('day')"
                  slot="day"
                  slot-scope="scope">
          <slot name="day"
                :date="scope.date"
                :extendAttr="scope.extendAttr">
          </slot>
        </template>
      </calendar>

      <!-- <time-picker v-if="pickerType !== 'date'"
                   :show="!isShowCalendar"
                   :default-time="currDateTime"
                   :calendarDate="checkedDate"
                   v-bind="{...$props, ...$attrs}"
                   @change="timeChange"></time-picker> -->

      <year-month-picker v-if="changeYearFast"
                         :calendarTitleHeight="calendarTitleHeight"
                         :calendarContentHeight="calendarContentHeight"
                         :calendarDate="checkedDate"
                         @touchstart="touchStart"
                         @touchmove="touchMove"
                         @touchend="touchEnd"
                         @slidechange="slideChange"
                         v-bind="{...$props, ...$attrs}"
                         @click="dateClick"
                         :type="yearMonthType"></year-month-picker>

    </div>
    <!-- <div class="ctrl-img"
         v-if="isShowArrowImg"
         @click.stop="toggleWeek"
         :style="{'margin-top': `${calendarContentHeight}px`}">
      <slot name="arrow"
            :show="isShowWeek">
        <img :src="isShowWeek ? arrowDownImg : arrowUpImg">
      </slot>
    </div> -->
  </div>
</template>

<script>
import Calendar from './Calendar.vue'
import YearMonthPicker from './YearMonthPicker.vue'
import { formatDate } from './util'
// import { ARROW_DOWN_IMG, ARROW_UP_IMG } from '../constant/img'
import languageUtil from './language'

const defaultDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
}

export default {
  name: 'MyCalendar',
  props: {
    // // 是否支持点击日期区域快速切换年份
    // changeYearFast: {
    //   type: Boolean,
    //   default: false
    // },
    // 是否显示 周月视图切换指示箭头，model 等于 inline 时生效
    isShowArrow: {
      type: Boolean,
      default: false
    },
    // 是否展示周视图
    isShowWeekView: {
      type: Boolean,
      default: false
    },
    // 是否显示日历组件
    visible: {
      type: Boolean,
      default: false
    },
    // 是否显示日历组件操作栏
    isShowAction: {
      type: Boolean,
      default: true
    },
    pickerType: {// 选择器类型 datetime：日期+时间   date：日期   time：时间
      type: String,
      default: 'datetime'
    },
    // showTodayButton: {// 是否显示返回今日按钮
    //   type: Boolean,
    //   default: true
    // },
    defaultDatetime: {// 默认时间
      type: Date,
      default () {
        return new Date()
      }
    },
    format: null, // 确认选择之后，返回的日期格式
    model: {
      type: String,
      default: 'inline'
    },
    // 日期下面的标记
    markDate: {
      type: Array,
      default: () => []
    },
    // 禁用的日期
    disabledDate: {
      type: Function,
      default: () => {
        return false
      }
    },
    // 使用的语言包
    lang: {
      type: String,
      default: 'CN'
    }
  },
  components: {
    YearMonthPicker,
    Calendar
  },
  data () {
    return {
      // arrowDownImg: ARROW_DOWN_IMG,
      // arrowUpImg: ARROW_UP_IMG,
      changeYearFast: false,
      language: {}, // 使用的语言包
      checkedDate: defaultDate, // 被选中的日期
      isShowWeek: false,
      isShowCalendar: false, // 是否显示日历选择控件
      calendarBodyHeight: 0, // 日历内容的高度
      calendarTitleHeight: 0, // 日历组件标题高度
      firstTimes: true, // 第一次触发
      currDateTime: new Date(), // 当前日期
      yearMonthType: 'date', // 年月选择面板默认展示类型
      showMonth: true, // 是否显示月按钮
      showTodayButton: false // 是否显示返回今日按钮
    }
  },
  mounted () {
    if (this.model === 'inline') {
      this.isShowDatetimePicker = true
      this.showCalendar()
    }

    this.language = languageUtil[this.lang.toUpperCase()]
  },
  watch: {
    defaultDatetime: {
      handler (val) {
        if (!(val instanceof Date)) {
          throw new Error('The calendar component\'s defaultDate must be date type!')
        }

        this.currDateTime = val
      },
      immediate: true
    },
    pickerType: {
      handler (val) {
        if (val === 'time') {
          this.showTime()
        }
      },
      immediate: true
    },
    isShowAction (flag) {
      if (!flag) {
        this.calendarTitleHeight = 0
      } else {
        setTimeout(() => {
          this.calendarTitleHeight = this.$refs.calendarTitle ? this.$refs.calendarTitle.offsetHeight : 0
        })
      }
    },
    checkedDate: {
      handler () {
        let date = new Date(`${this.checkedDate.year}/${this.checkedDate.month + 1}/${this.checkedDate.day} ${this.checkedDate.hours}:${this.checkedDate.minutes}`)
        if (this.format) {
          date = formatDate(date, this.format, this.lang)
        }
        this.$emit('change', date)
      },
      deep: true
    },
    visible: {
      handler (val) {
        this.isShowCalendar = val

        setTimeout(() => {
          this.calendarTitleHeight = this.$refs.calendarTitle ? this.$refs.calendarTitle.offsetHeight : 0
        })
      },
      immediate: true
    },
    isShowWeekView: {
      handler (val) {
        this.isShowWeek = val
      },
      immediate: true
    }
  },
  computed: {
    isShowArrowImg () {
      return this.isShowArrow && this.model === 'inline'
    },
    // 是否显示周视图 (为兼容旧版本，舍弃这种方式)
    // isShowWeek: {
    //   get() {
    //     return this.isShowWeekView
    //   },
    //   set(val) {
    //     this.$emit('update:isShowWeekView', val)
    //   }
    // },
    // 是否显示日期控件
    isShowDatetimePicker: {
      get () {
        return this.visible
      },
      set (val) {
        this.$emit('update:visible', val)
      }
    },
    // 日历组件的高度
    calendarContentHeight () {
      return this.calendarBodyHeight + this.calendarTitleHeight
    }
  },
  methods: {
    // 判断是否有插槽
    hasSlot (slotName) {
      return !!this.$scopedSlots[slotName]
    },
    // 周视图开关
    toggleWeek () {
      this.isShowWeek = !this.isShowWeek

      if (this.isShowWeek) this.slideChange('up')
      else this.slideChange('down')
    },
    today () {
      if (this.disabledDate(new Date())) return
      this.showTodayButton = false
      this.$refs.calendar.today()
    },
    dateChange (date) {
      date.hours = this.checkedDate.hours
      date.minutes = this.checkedDate.minutes
      this.checkedDate = date
    },
    dateClick (date) {
      date.hours = this.checkedDate.hours
      date.minutes = this.checkedDate.minutes
      this.checkedDate = date

      let fDate = new Date(`${this.checkedDate.year}/${this.checkedDate.month + 1}/${this.checkedDate.day} ${this.checkedDate.hours}:${this.checkedDate.minutes}`)
      if (this.format) {
        fDate = formatDate(fDate, this.format, this.lang)
      }

      const checked = new Date(`${this.checkedDate.year}/${this.checkedDate.month + 1}/${this.checkedDate.day}`)
      const today = new Date(`${defaultDate.year}/${defaultDate.month + 1}/${defaultDate.day}`)
      if (checked.toDateString() === today.toDateString()) {
        this.showTodayButton = false
      } else {
        this.showTodayButton = true
      }

      // 控制点击之后进入下一选择面板
      if (date.type) {
        switch (date.type) {
          // case 'yearRange':
          //   this.yearMonthType = 'year'
          //   break
          // case 'year':
          //   this.yearMonthType = 'month'
          //   break

          // 只想要月视图
          case 'month':
            this.currDateTime = new Date(fDate)
            this.yearMonthType = 'date'
            break
        }

        this.$emit('calendarTypeChange', this.yearMonthType)
      }

      this.$emit('click', fDate)
    },
    timeChange (date) {
      date.year = this.checkedDate.year
      date.month = this.checkedDate.month
      date.day = this.checkedDate.day
      this.checkedDate = date
    },
    // 确认选择时间
    confirm () {
      let date = new Date(`${this.checkedDate.year}/${this.checkedDate.month + 1}/${this.checkedDate.day} ${this.checkedDate.hours}:${this.checkedDate.minutes}`)
      if (this.format) {
        date = formatDate(date, this.format, this.lang)
      }
      this.$emit('confirm', date)
      if (this.model === 'dialog') {
        this.close()
      }
    },
    show () {
      this.isShowDatetimePicker = true
    },
    close () {
      this.isShowDatetimePicker = false
    },
    // 小于10，在前面补0
    fillNumber (val) {
      return val > 9 ? val : '0' + val
    },
    formatDate (time, format) {
      return formatDate(time, format, this.lang)
    },
    // 显示日历控件
    showCalendar () {
      if (this.isShowCalendar) {
        this.showYearMonthPicker()
      }
      this.isShowCalendar = true
    },
    // 显示时间选择控件
    showTime () {
      this.isShowCalendar = false

      // 重置年月选择面板
      this.yearMonthType = 'date'
    },
    // 显示年月选择面板
    showYearMonthPicker () {
      this.changeYearFast = true
      if (!this.changeYearFast) return

      // if (this.yearMonthType === 'date') {
      //   this.yearMonthType = 'month'
      // } else if (this.yearMonthType === 'month') {
      //   this.yearMonthType = 'year'
      // } else if (this.yearMonthType === 'year') {
      //   this.yearMonthType = 'yearRange'
      // } else {
      //   this.yearMonthType = 'date'
      // }

      // 只保留月选择视图
      if (this.yearMonthType === 'date') {
        this.yearMonthType = 'month'
      } else {
        this.yearMonthType = 'date'
      }

      this.$emit('calendarTypeChange', this.yearMonthType)
    },
    // 高度变化
    heightChange (height) {
      if (!this.firstTimes && this.model === 'dialog') return

      this.calendarBodyHeight = height
      this.firstTimes = false
    },
    // 监听手指开始滑动事件
    touchStart (event) {
      this.$emit('touchstart', event)
    },
    // 监听手指开始滑动事件
    touchMove (event) {
      this.$emit('touchmove', event)
    },
    // 监听手指开始滑动事件
    touchEnd (event) {
      this.$emit('touchend', event)
    },
    // 滑动方向改变
    slideChange (direction) {
      this.$emit('slidechange', direction)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/common.scss';
$disabled-bg-color: #f5f7fa;
$disabled-font-color: #c0c4cc;
$main-color: #1c71fb;
$bg-color: #f4f4f4;
//主文字颜色
$main-font-color: #4c4c4c;
//副文字颜色
$vice-font-color: #898989;
.hash-calendar {
  position: fixed;
  width: 100vw;
  // height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  .calendar_content {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    // display: flex;
    padding-bottom: .26rem;
    flex-wrap: wrap;
    background: white;
    // height: 7.1rem;
    overflow: hidden;
    .calendar_title {
      position: absolute;
      width: 100%;
      @include flex-center(row, space-between);
      // left: 0;
      // top: 0;
      background: $bg-color;
      border-bottom: 1px solid $bg-color;
      font-size: .26rem;
      z-index: 1;
      .calendar_title_date {
        color: $vice-font-color;
        background: white;
        // padding: .3rem .15rem;
      }
      .calendar_title_date_active {
        color: $main-font-color;
        font-weight: bold;
      }
      .calendar_title_date_time {
        margin-left: .2rem;
      }
    }
  }
}
.calendar_inline {
  position: relative;
  width: 100%;
  height: auto;
  background: none;
  // height: 7.1rem;
  z-index: 1;
}

.calendar_confirm {
  color: $main-color;
  margin-right: .34rem;
}
.today_disable {
  color: $disabled-font-color;
}
.ctrl-img {
  width: 100%;
  text-align: center;
  img {
    width: 28px;
  }
}
</style>
