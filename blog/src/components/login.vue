<template>
  <section v-if="showLogin" class="page">
    <div class="login">
      <ul class="nav nav-tabs">
        <li v-for="(item, idx) in tabs" :key="idx" :class="{active:idx === tabIdx}" @click="toggleTabs(idx)">{{ item }}</li>
      </ul>
      <!-- Tab Panes -->
      <div class="tab-content">
        <div class="tab-pane fade in" id="login" v-show="tabIdx === 0">
          <div class="signupForm text-center">
            <form class="form0" @submit.prevent="login($event)">
              <div class="form-group" v-for="(item, idx) in loginArr" :key="idx">
                <input type="text" v-if="idx===0" class="from-item" :name="item.name" :placeholder="item.placeholder" />
                <input type="password" v-if="idx===1" class="from-item" :name="item.name" :placeholder="item.placeholder" />
              </div>
              <button type="submit" class="loginBtn">登录</button>
            </form>
          </div>
        </div>
        <div class="tab-pane fade in" id="register" v-show="tabIdx === 1">
          <form class="form0" @submit.prevent="register($event)">
            <div class="form-group" v-for="(item, idx) in registerArr" :key="idx">
              <input type="email" v-if="idx===2" class="from-item" :name="item.name" :placeholder="item.placeholder" />
              <input type="password" v-else-if="idx===3 || idx===4" class="from-item" :name="item.name" :placeholder="item.placeholder" />
              <input type="text" v-else class="from-item" :name="item.name" :placeholder="item.placeholder" />
            </div>
            <button type="submit" class="registerBtn">注册</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const loginArr = [
  {
    name: 'username',
    placeholder: '请输入用户名或邮箱'
  }, {
    name: 'password',
    placeholder: '请输入密码'
  }
]
const registerArr = [
  {
    name: 'username',
    placeholder: '请输入账号'
  }, {
    name: 'realname',
    placeholder: '请输入用户名'
  }, {
    name: 'email',
    placeholder: '请输入绑定邮箱'
  }, {
    name: 'password',
    placeholder: '请输入密码，至少6位',
    type: 'pwd'
  }, {
    name: 'password1',
    placeholder: '请再次输入密码',
    type: 'pwd'
  }
]
export default {
  name: 'Login',
  data () {
    return {
      tabs: ['登录', '注册'],
      tabIdx: 0,
      loginArr,
      registerArr,
      showLogin: false
    }
  },
  methods: {
    _show () {
      this.showLogin = true
    },
    toggleTabs (idx) {
      this.tabIdx = idx
    },
    login (e) {
      console.log(e)
      sessionStorage.setItem('hasLogin', true)
      this.showLogin = false
    },
    register (e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  // margin: .2rem .8rem;
  top: 0;
  padding: .36rem .3rem;
  .login {
    margin: 3rem .4rem;
    padding: .3rem 0;
    border-radius: .3rem;
    font-size: .36rem;
    background-color: #fff;
    .loginBtn, .registerBtn {
      padding: .06rem .2rem;
      font-size: .32rem;
      background-color: #fce8a0;
      color: #f8a202;
      border: .02rem solid #f8a202;
      border-radius: .16rem;
    }
    .active {
      color: #face31;
    }
    .nav-tabs {
      text-align: center;
      font-size: .36rem;
      color: #666;
      li {
        display: inline-block;
        margin: .16rem .2rem;
      }
    }
    .tab-content {
      .form-group {
        margin-bottom: .3rem;
        input {
          border-radius: .4rem;
          font-size: .3rem;
          padding: .14rem .3rem;
          border: .02rem solid #face31;
        }
      }

    }
  }
}

</style>
