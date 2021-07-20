<template>
  <div class="popup-container" @click="back" style="background-color: rgba(0,0,0,0);">
    <div class="popup-container"></div>
    <div class="reg-container"
         @mousedown="isInBoxDown=true"
         @mouseup="isInBoxUp=true"
    >
      <form
      >
        <div class="choice-row">
          <div class="choice"
               v-bind:class="{'active-choice':choice==='Войти'}"
               @click="choice='Войти'
               required.passwordRepeat=false
               required.confidentiality=false
               required.name=false
               required.surname=false
               clearFormat()"
          >
            <BaseButtonText
                :text="`Войти`"
                :theme="`white`"
            />
          </div>
          <div class="choice"
               v-bind:class="{'active-choice':choice==='Регистрация'}"
               @click="choice='Регистрация'
               required.passwordRepeat=true
               required.confidentiality=true
               required.name=true
               required.surname=true
               clearFormat()"
          >
            <BaseButtonText
                :text="`Регистрация`"
                :theme="`white`"
            />
          </div>
        </div>
        <BaseInput
            v-if="choice==='Регистрация'"
            :placeholder="placeholders.surname"
            :type="`text`"
            :value="form.surname"
            :theme="theme.surname"
            @inputValue="form.surname=$event
            errors.surname=false"
        />
        <BaseInput
            v-if="choice==='Регистрация'"
            :placeholder="placeholders.name"
            :type="`text`"
            :value="form.name"
            :theme="theme.name"
            @inputValue="
            form.name=$event
            errors.name=false"
        />
        <BaseInput
            v-if="choice==='Регистрация'"
            :placeholder="placeholders.fathersName"
            :type="`text`"
            :value="form.fathersName"
            :theme="theme.fathersName"
            @inputValue="form.fathersName=$event
            errors.fathersName=false"
        />
        <BaseInput
            :placeholder="placeholders.email"
            :type="`text`"
            :theme="theme.email"
            :img="`${require('../../static/icons/email-input.svg')}`"
            @inputValue="form.email=$event
            errors.email=false"
            :key="updateKey"
        />
        <BaseInput
            :placeholder="placeholders.password"
            :type="`password`"
            :theme="theme.password"
            :img="`${require('../../static/icons/password-input.svg')}`"
            @inputValue="form.password=$event
            errors.password=false"
            :key="updateKey+1"
        />
        <BaseInput
            v-if="choice==='Регистрация'"
            :placeholder="placeholders.passwordRepeat"
            :type="`password`"
            :value="form.passwordRepeat"
            :theme="theme.passwordRepeat"
            :img="`${require('../../static/icons/password-input.svg')}`"
            @inputValue="form.passwordRepeat=$event
            errors.passwordRepeat=false"
            :key="updateKey+2"
        />
        <div class="confidentiality"
             v-if="choice==='Регистрация'"
        >
          <div
              v-bind:class="{'error':errors.confidentiality}"
              class="check-box"
              @click="form.confidentiality =!form.confidentiality"
          >
            <img
                v-if="form.confidentiality"
                src="../../static/icons/check-marker.svg"
                alt=""
            >
          </div>
          <div class="confidentiality-text">
            <BaseParagraphText
                style="margin-right: 1%;display: block"
                :text="`Согласиться с `"
            />
            <div class="confidentiality-link">
              <BaseParagraphText
                  style="display: block"
                  :text="`политикой конфиденциальности`"
                  :style-object="{color:`#00FFC2`}"
              />
            </div>
          </div>
        </div>

        <div class="log-in-row"
             v-if="choice==='Войти'"
        >
          <a href="" target="_blank">
            <BaseDescriptionText
                :text="`Забыли пароль?`"
            />
          </a>
          <div
              class="button-container"
              @click="checkForm"
          >
            <BaseButton
                :text="`Войти`"
            />
          </div>
        </div>
        <div class="log-up-column" v-else>
          <div
              class="button-container"
              @click="checkForm"
          >
            <BaseButton
                :text="`Зарегистрироваться`"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/baseComponents/BaseInput";
import BaseButtonText from "@/components/baseComponents/texts/BaseButtonText";
import BaseDescriptionText from "@/components/baseComponents/texts/BaseDescriptionText";
import BaseButton from "@/components/baseComponents/BaseButton";
import BaseParagraphText from "@/components/baseComponents/texts/BaseParagraphText";
// import {mapActions} from "vuex";

export default {
  name: "RegPopup",
  components: {
    BaseInput, BaseButtonText, BaseDescriptionText, BaseButton, BaseParagraphText
  },
  props: ['allPosition', 'allDivision','auth'],
  data() {
    return {
      updateKey: 0,
      choice: 'Войти',
      defaultPlaceholders: {
        email: 'Введите почту ДВФУ',
        password: 'Введите пароль',
        passwordRepeat: 'Повторите пароль',
        name: 'Введите имя',
        surname: 'Введите фамилию',
        fathersName: 'Введите отчество (если есть)',
      },
      placeholders: {
        email: 'Введите почту ДВФУ',
        password: 'Введите пароль',
        passwordRepeat: 'Повторите пароль',
        name: 'Введите имя',
        surname: 'Введите фамилию',
        fathersName: 'Введите отчество (если есть)',
      },
      required: {
        email: true,
        password: true,
        passwordRepeat: false,
        confidentiality: true,
        name: false,
        surname: false,
        fathersName: false,
      },
      form: {
        email: '',
        password: '',
        passwordRepeat: '',
        confidentiality: false,
        name: '',
        surname: '',
        fathersName: '',
      },
      errors: {
        email: false,
        password: false,
        passwordRepeat: false,
        confidentiality: false,
        name: false,
        surname: false,
        fathersName: false,
      },
    }
  },
  methods: {
    // ...mapActions(['createUser', 'authorization']),
    clearFormat: function () {
      for (let key of Object.keys(this.errors)) {
        this.errors[key] = false
      }
      this.placeholders = JSON.parse(JSON.stringify(this.defaultPlaceholders))
    },
    back: function () {
      if (!this.isInBoxDown && !this.isInBoxUp) {
        this.$router.push(this.$route.path)
      } else {
        this.isInBoxDown = false
        this.isInBoxUp = false
      }
      this.isInBoxDown = false
      this.isInBoxUp = false
    },
    checkForm: function () {
      this.clearFormat()
      if (!this.validEmail(this.form.email)) {
        this.errors.email = true
        this.placeholders.email = 'Email введен некорректно'
      }
      if (!this.form.email) {
        this.errors.email = true
        this.placeholders.email = 'Введите Email'
      }
      if (!this.form.password) {
        this.errors.password = true
      }
      let passwordCheck = this.validPassword(this.form.password)
      if (passwordCheck) {
        this.errors.password = true
        this.placeholders.password = passwordCheck
      }

      if (this.choice === 'Регистрация') {
        if (!this.form.name) {
          this.errors.name = true
        }
        if (!this.validName(this.form.name)) {
          this.placeholders.name = 'Имя должно быть на русском языке'
          this.errors.name = true
        }
        if (!this.form.surname) {
          this.errors.surname = true
        }
        if (!this.validName(this.form.surname)) {
          this.placeholders.surname = 'Фамилия должна быть на русском языке'
          this.errors.surname = true
        }
        if (this.form.fathersName && !this.validName(this.form.fathersName)) {
          this.placeholders.fathersName = 'Отчество должно быть на русском языке'
          this.errors.fathersName = true
        }
        if (!this.form.passwordRepeat) {
          this.errors.passwordRepeat = true
        }
        if (this.form.passwordRepeat !== this.form.password) {
          this.placeholders.passwordRepeat = 'Пароли не совпадают'
          this.errors.passwordRepeat = true
        }
        if (!this.form.confidentiality) {
          this.errors.confidentiality = true
        }
      }
      for (let error in this.errors) {
        if (this.errors[error]) {
          return false
        }
      }
      if (this.choice === 'Войти') {
        this.authFunction()
      } else {
        if (this.choice === 'Регистрация') {
          this.createUserFunc()
        }
      }
      this.back()
    },
    sortValue: function (a, b, param) {
      if (a[param] > b[param]) {
        return 1
      }
      if (a[param] < b[param]) {
        return -1
      }
      return 0
    },
    createUserFunc: function () {
      let codeLen = this.form.code.length
      let email = this.form.email
      let json = {
        'name': this.form.name,
        'surname': this.form.surname,
        'email': email,
        'code': this.actualNumber,
        'sub_code': this.form.code.slice(5, codeLen - 1),
        'position': this.actualPosition,
        'password': 'USNqItakH2m8X01',
      }
      this.createUser(json)
      this.choice = 'Войти'
      // this.updateKey+=1
      // this.form.email=email
    },
    authFunction: function () {
      let json = {
        email: this.form.email,
        password: this.form.code
      }
      localStorage.setItem('email',this.form.email)
      return this.authorization(json)
    },
    validPassword: function () {
      if (this.form.password.length <= 8) {
        return 'Длина пароля меньше 8 символов'
      }
      if (!/\d/.test(this.form.password)) {
        return 'Пороль должен содержать числа'
      }
      if (/[а-яА-Я]/.test(this.form.password)) {
        return 'Пароль не должен содержать кирилицу'
      }
      if (!/[A-Z]/.test(this.form.password)) {
        return 'Пороль должен содержать заглавные буквы'
      }
      if (!/[a-z]/.test(this.form.password)) {
        return 'Пороль должен содержать прописные буквы'
      } else {
        return false
      }
    },
    validName: function (name) {
      return /[а-яА-Я]+/.test(name)
    },
    validEmail: function (email) {
      var re = /^[a-z]+\.[a-z]{2}@(dvfu\.ru|students\.dvfu\.ru)$/;
      return re.test(email);
    },
    // ...mapActions(['login'])
  },
  computed: {
    theme: function () {
      let form = this.form
      let errors = this.errors
      let placeholders = this.placeholders
      let validEmail = this.validEmail
      let validPassword = this.validPassword
      let validName = this.validName
      return {
        email: function () {
          if (errors.email) {
            return 'error'
          }
          if (!form.email) {
            placeholders.email = 'Введите корпоративную почту'
            return 'default'
          }
          if (!validEmail(form.email)) {
            placeholders.email = 'Email введен некорректно'
            return 'error'
          } else {
            placeholders.email = 'Email введен корректно'
            return 'right'
          }
        }(),
        password: function () {
          if (errors.password) {
            return 'error'
          }
          if (!form.password) {
            placeholders.password = 'Введите пароль'
            return 'default'
          }
          let passwordPlaceholder = validPassword()
          if (passwordPlaceholder) {
            placeholders.password = passwordPlaceholder
            return 'error'
          } else {
            placeholders.password = 'Корректный пароль'
            return 'right'
          }
        }(),
        passwordRepeat: function () {
          if (errors.passwordRepeat) {
            return 'error'
          }
          if (!form.passwordRepeat) {
            placeholders.passwordRepeat = 'Повторите пароль'
            return 'default'
          }
          if (form.password !== form.passwordRepeat) {
            placeholders.passwordRepeat = 'Пароли не совпадают'
            return 'error'
          } else {
            placeholders.passwordRepeat = 'Пароли совпадают'
            return 'right'
          }
        }(),
        name: function () {
          if (errors.name) {
            return 'error'
          }
          if (!form.name) {
            placeholders.name = 'Введите имя'
            return 'default'
          }
          if (!validName(form.name)) {
            placeholders.name = 'Имя должно быть на русском языке'
            return 'error'
          } else {
            placeholders.name = 'Имя введено корректно'
            return 'right'
          }
        }(),
        surname: function () {
          if (errors.surname) {
            return 'error'
          }
          if (!form.surname) {
            placeholders.surname = 'Введите фамилию'
            return 'default'
          }
          if (!validName(form.surname)) {
            placeholders.surname = 'Фамилия должна быть на русском языке'
            return 'error'
          } else {
            placeholders.surname = 'Фамилия введена корректно'
            return 'right'
          }
        }(),
        fathersName: function () {
          if (errors.fathersName) {
            return 'error'
          }
          if (!form.fathersName) {
            placeholders.fathersName = 'Введите отчество (если есть)'
            return 'default'
          }
          if (!validName(form.fathersName)) {
            placeholders.fathersName = 'Отчество должно быть на русском языке'
            return 'error'
          } else {
            placeholders.fathersName = 'Отчество введено корректно'
            return 'right'
          }
        }(),
      }
    }
  },
  created() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  },
  destroyed() {
    document.getElementsByTagName('body')[0].style.overflow = 'visible'
  },
}
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 4;
  display: flex;
  cursor: pointer;
  transition: all 0.1s;
}
.popup-container:hover {
  background-color: rgba(0, 0, 0, 0.4);
}
.reg-container {
  width: 448px;
  cursor: default;
  z-index: 5;
  background: #323232;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin: auto;
  display: flex;
}
form {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: auto;
}
.choice-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 8%;
  padding-bottom: 8%;
}
.choice {
  transition: all 0.3s;
  opacity: 0.7;
}
.choice:hover {
  opacity: 1;
}
.active-choice {
  padding-left: 2%;
  padding-right: 2%;
  border-bottom: 1px solid #FFFFFF;
  opacity: 1;
}
.pseudo-input {
  margin-bottom: 4%;
}
.log-in-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 6%;
  margin-bottom: 10%;
}
.log-in-row .button-container {
  width: 40%;
  margin-left: 10%;
}
.log-in-row a p {
  opacity: 0.7;
  transition: all 0.3s;
}
.log-in-row a:hover p {
  opacity: 1;
}
.confidentiality {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2%;
}

.confidentiality input {
  margin-right: 4%;
}
.confidentiality-link {
  color: #00FFC2;
  transition: all 0.3s;
}

.confidentiality-text{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
  justify-content: left;
}

.check-box {
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 2px;
  transition: all 0.3s;
  height: 24px;
  width: 24px;
  display: flex;
  margin-right: 4%;
}
.check-box img {
  width: 90%;
  margin: auto;
}
.confidentiality:hover a p {
  text-decoration: underline;
}
.confidentiality .check-box {
  text-decoration: underline;
  border: 1px solid rgba(255, 255, 255, 0.7);
}
.log-up-column .button-container {
  width: 50%;
  margin-top: 10%;
  margin-bottom: 10%;
  margin-left: auto;
  margin-right: auto;
}
.confidentiality .error {
  border-color: rgba(231, 82, 82, 0.5);;
}
</style>