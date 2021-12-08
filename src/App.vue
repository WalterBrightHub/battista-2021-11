<template>
  <div id="app">
    <div class="title">Battista 国服特殊赛 2021-12</div>
    <div class="content">
      <div class="option-list">
        <div class="option" v-for="(car, index) in cars" :key="car">
          <div class="option-car">{{ car }}</div>
          <div class="radio-list">
            <div
              class="radio-item"
              v-for="(item,indexS) in carMaxStars[index]+1"
              :key="item"
              :class="'radio-item-' + indexS + form[index]"
            >
              <input
                type="radio"
                :id="car + item"
                :value="indexS"
                v-model="form[index]"
              />
              <label class="radio-label" :for="car + item">{{ indexS }}</label>
            </div>
          </div>
        </div>
        <div class="option">
          <div class="option-car battista-car">巴蒂斯塔完赛后的星级</div>
          <div class="radio-list ">
            <div
              class="radio-item"
              v-for="item in [0, 1, 2, 3, 4, 5, 6]"
              :key="item"
            >
              <input
                type="radio"
                :id="'battista' + item"
                :value="item"
                v-model="battista"
              />
              <label class="radio-label" :for="'battista' + item">{{
                item
              }}</label>
            </div>
          </div>
        </div>
        <div class="option">
          <div class="option-car battista-car">Lamborghini SCV12 钥匙</div>
          <div class="radio-list">
            <div
              class="radio-item"
            >
              <input
                type="radio"
                id="scv12-key-0"
                :value="0"
                v-model="scv12Key"
              />
              <label class="radio-label" for="scv12-key-0">无</label>
            </div><div
              class="radio-item"
            >
              <input
                type="radio"
                id="scv12-key-0"
                :value="1"
                v-model="scv12Key"
              />
              <label class="radio-label" for="scv12-key-1">有</label>
            </div>
          </div>
        </div>
      </div>
      <div class="stage-list">
        <div class="qr-area">
          <img src="@/assets/qr-battista-cn.png" width="75" height="75" alt="" />
          <div class="qr-desc">扫一扫二维码，查看锅服巴蒂特殊赛事！</div>
        </div>
        <div
          class="stage"
          :class="{ 'stage-unlock': stage.unlock }"
          v-for="(stage, index) in stages.reverse()"
          :key="index"
        >
          <div class="stage-label">阶段{{ 17 - index }} {{ shortNames[stageThemeCars[16 - index]] }}</div>
             
          <div class="stage-status">
            {{ stage.unlock ? "解锁" : "未解锁" }} ·
            {{ stageConditionsDoor[16 - index] }}
          </div>
          <div class="stage-condition">
            完成条件 {{ stage.stageConditionsTotalCurrent }}/{{
              stageConditionsTotal[16 - index]
            }}
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="stage-image-wrapper">
      <img src="@/assets/badi.jpg" alt="" class="stage-image" />
    </div> -->
    <div class="note">
      <div class="note-item">
        2021-12-08 version 1.0 简单粗暴地完成了基础功能
      </div>
      <div class="note-item">
        如有错误之处，请火速联系@水明
      </div>
    </div>
  </div>
</template>

<script>
const cars = ['Lamborghini Murcielago',
  'Aston Martin Valhalla',
  'Lamborghini SCV12',
  'Pagani Imola',
  'Genty Akylone',
  'Vanda',
  'Mclaren Senna']



  const shortNames={
    'Lamborghini Murcielago':'蝙蝠',
  'Aston Martin Valhalla':'英灵殿',
  'Lamborghini SCV12':'SCV12',
  'Pagani Imola':'Imola',
  'Genty Akylone':'阿卡龙',
  'Vanda':'万达',
  'Mclaren Senna':'塞纳',
  
  'Battista':'巴蒂',
  'Battista排行':'巴蒂排行'
  }

const carMaxStars = [5, 6, 5, 6, 6, 6, 6]
const stageConditionsDoor = [0, 15, 25, 50, 75,
  88, 118, 138, 158, 178,
  188, 218, 238, 258, 268,
  288, 288]
const stageThemeCars = ['Aston Martin Valhalla',
  'Lamborghini SCV12',
  'Battista',
  'Pagani Imola',
  'Genty Akylone',
  'Battista',
  'Vanda',
  'Mclaren Senna',
  'Battista',
  'Aston Martin Valhalla',
  'Lamborghini SCV12',
  'Pagani Imola',
  'Genty Akylone',
  'Vanda',
  'Mclaren Senna',
  'Battista',
  'Battista排行'
]
const stageConditions = [20, 20, 25, 20, 20,
  25, 20, 20, 25, 21,
  21, 21, 21, 21, 23,
  34, 0]
const stageConditionsTotal = stageConditions.slice()
for (let i = 1; i < stageConditionsTotal.length; i++) {
  stageConditionsTotal[i] += stageConditionsTotal[i - 1]
}
export default {
  name: 'App',
  data() {
    return {
      cars,
      carMaxStars,
      form: [0, 0, 1, 0, 0, 0, 0],
      scv12Key: 0,
      battista: 0,
      stageConditionsTotal,
      stageConditionsDoor,
      stageThemeCars,
      shortNames
    }
  },
  watch: {
    form: function (newForm) {
      localStorage.setItem('form-cn', JSON.stringify(newForm))
    },
    battista: function (newBattista) {

      localStorage.setItem('battista-cn', JSON.stringify(newBattista))
    },
    scv12Key: function (newScv12Key) {

      localStorage.setItem('scv12Key', JSON.stringify(newScv12Key))
    }
  },
  mounted() {
    let form = localStorage.getItem('form-cn')
    let battista = localStorage.getItem('battista-cn')
    let scv12Key = localStorage.getItem('scv12Key')
    console.log(form, battista, scv12Key)
    if (form) {
      this.form = JSON.parse(form)
    }
    if (battista) {
      this.battista = JSON.parse(battista)
    }
    if (scv12Key) {
      this.scv12Key = JSON.parse(scv12Key)
    }
  },
  computed: {
    state({ form }) {
      return form.reduce((res, curr, ind) => ({
        ...res,
        [cars[ind]]: curr
      }), {})
    },
    stages() {
      return Array(17).fill(0).map((item, index) => index).map(item => this['stage' + (item + 1)])
    },
    stage1({ state }) {
      let conditions = [0, 13, 18, 20][Math.min(3, state['Aston Martin Valhalla'])]
      if (conditions === 0 && state['Lamborghini Murcielago'] > 0) {
        conditions += 10
      }
      return {
        unlock: true,
        stageConditionsTotalCurrent: conditions
      }
    },
    stage2({ stage1, state }) {
      let maxStar = Math.min(3, state['Lamborghini SCV12'])
      if (!stage1.unlock || stage1.stageConditionsTotalCurrent < stageConditionsDoor[1]) {
        return {
          ...stage1,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage1.stageConditionsTotalCurrent + [13, 13, 18, 20][maxStar]
        }
      }
    },
    stage3({ stage2 }) {
      if (!stage2.unlock || stage2.stageConditionsTotalCurrent < stageConditionsDoor[2]) {
        return {
          ...stage2,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage2.stageConditionsTotalCurrent + 25
        }
      }
    },
    stage4({ stage3, state }) {
      let conditions = [0, 13, 18, 20][Math.min(3, state['Pagani Imola'])]
      if (conditions === 0 && state['Lamborghini Murcielago'] > 0) {
        conditions += 10
      }
      if (!stage3.unlock || stage3.stageConditionsTotalCurrent < stageConditionsDoor[3]) {
        return {
          ...stage3,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage3.stageConditionsTotalCurrent + conditions
        }
      }
    },
    stage5({ stage4, state }) {
      let conditions = [0, 13, 18, 20][Math.min(3, state['Genty Akylone'])]
      if (conditions === 0 && state['Lamborghini Murcielago'] > 0) {
        conditions += 10
      }
      if (!stage4.unlock || stage4.stageConditionsTotalCurrent < stageConditionsDoor[4]) {
        return {
          ...stage4,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage4.stageConditionsTotalCurrent + conditions
        }
      }
    },
    stage6({ stage5 }) {
      if (!stage5.unlock || stage5.stageConditionsTotalCurrent < stageConditionsDoor[5]) {
        return {
          ...stage5,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage5.stageConditionsTotalCurrent + 25
        }
      }
    },
    stage7({ stage6, state }) {
      let conditions = [0, 13, 18, 20][Math.min(3, state['Vanda'])]
      if (conditions === 0 && state['Lamborghini Murcielago'] > 0) {
        conditions += 10
      }
      if (!stage6.unlock || stage6.stageConditionsTotalCurrent < stageConditionsDoor[6]) {
        return {
          ...stage6,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage6.stageConditionsTotalCurrent + conditions
        }
      }
    },
    stage8({ stage7, state }) {
      let conditions = [0, 13, 18, 20][Math.min(3, state['Mclaren Senna'])]
      if (conditions === 0 && state['Lamborghini Murcielago'] > 0) {
        conditions += 10
      }
      if (!stage7.unlock || stage7.stageConditionsTotalCurrent < stageConditionsDoor[7]) {
        return {
          ...stage7,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage7.stageConditionsTotalCurrent + conditions
        }
      }
    },
    stage9({ stage8 }) {
      if (!stage8.unlock || stage8.stageConditionsTotalCurrent < stageConditionsDoor[8]) {
        return {
          ...stage8,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage8.stageConditionsTotalCurrent + 25
        }
      }
    },
    stage10({ stage9, state }) {
      if (!stage9.unlock || stage9.stageConditionsTotalCurrent < stageConditionsDoor[9]) {
        return {
          ...stage9,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage9.stageConditionsTotalCurrent + [0, 0, 0, 10, 16, 20, 21][state['Aston Martin Valhalla']]
        }
      }
    },

    stage11({ stage10, state }) {
      let conditions = this.scv12Key > 0
        ? [0, 0, 0, 10, 20, 21][state['Lamborghini SCV12']]
        : 0
      if (!stage10.unlock || stage10.stageConditionsTotalCurrent < stageConditionsDoor[10]) {
        return {
          ...stage10,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage10.stageConditionsTotalCurrent + conditions
        }
      }
    },
    stage12({ stage11, state }) {
      if (!stage11.unlock || stage11.stageConditionsTotalCurrent < stageConditionsDoor[11]) {
        return {
          ...stage11,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage11.stageConditionsTotalCurrent + [0, 0, 0, 0, 10, 20, 21][state['Pagani Imola']]
        }
      }
    },
    stage13({ stage12, state }) {
      if (!stage12.unlock || stage12.stageConditionsTotalCurrent < stageConditionsDoor[12]) {
        return {
          ...stage12,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage12.stageConditionsTotalCurrent + [0, 0, 0, 0, 10, 20, 21][state['Genty Akylone']]
        }
      }
    },
    stage14({ stage13, state }) {
      if (!stage13.unlock || stage13.stageConditionsTotalCurrent < stageConditionsDoor[13]) {
        return {
          ...stage13,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage13.stageConditionsTotalCurrent + [0, 0, 0, 0, 10, 20, 21][state['Vanda']]
        }
      }
    },
    stage15({ stage14, state }) {
      if (!stage14.unlock || stage14.stageConditionsTotalCurrent < stageConditionsDoor[14]) {
        return {
          ...stage14,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage14.stageConditionsTotalCurrent + [0, 0, 0, 0, 0, 10, 23][state['Mclaren Senna']]
        }
      }
    },
    stage16({ stage15, battista }) {
      if (!stage15.unlock || stage15.stageConditionsTotalCurrent < stageConditionsDoor[15]) {
        return {
          ...stage15,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage15.stageConditionsTotalCurrent + [0, 10, 15, 21, 27, 31, 34][battista]
        }
      }
    },
    stage17({ stage16, state }) {
      if (!stage16.unlock || stage16.stageConditionsTotalCurrent < stageConditionsDoor[16]) {
        return {
          ...stage16,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage16.stageConditionsTotalCurrent
        }
      }
    },

    // stages({state}){
    //   let res=Array(stageConditions.length).fill(null).map(()=>({
    //     finish:false,
    //     currentUserConditions:0,
    //     currentTotalConditions:0,
    //   }))
    //   res[0].currentTotalConditions=stageConditions[0]
    //   for(let i=1;i<res.length;i++){
    //     console.log(res[i])
    //     res[i].currentTotalConditions=res[i-1].currentTotalConditions+stageConditions[i]
    //   }

    //   const cannotPlay=stage=>res[stage-1].currentUserConditions<stageConditionsDoor[stage]
    //   const addCurrent=stage=>res[stage].currentUserConditions+=res[stage-1].currentUserConditions

    //   if(state['911GTS']===-1 &&state['F1LM']===-1){
    //     return res
    //   }
    //   // 阶段开始
    //   if(state['911GTS']!=-1){
    //     res[0].currentUserConditions=13
    //   }
    //   if(state['F1LM']!==-1){
    //     res[0].currentUserConditions=20
    //   }
    //   //阶段结束

    //   // 阶段开始
    //   if(cannotPlay(1)){
    //     return res
    //   }
    //   if(state['W12']!==-1){

    //   }
    //   if(state['911GTS']!=-1){
    //     res[0].currentUserConditions+=13
    //   }
    //   if(state['F1LM']!==-1){
    //     res[0].currentUserConditions+=7
    //   }
    //   //阶段结束

    //   return res
    // }
  }
}
</script>

<style lang="scss">
body {
  font-size: 15px;
}
.title {
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  padding: 20px 0;
}
.option {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  flex-direction: column;
  padding: 0.5em;
}
.option:nth-child(odd) {
  background-color: #efefef;
}
.option-car {
  // width: 4em;
  margin-left: 5px;
  margin-bottom: 5px;
  color: #ff0054;
  font-weight: bold;
  // max-width: 5em;
}
.radio-list {
  display: grid;
  grid-template-columns: repeat(7,1fr);
}
.radio-item {
  + .radio-item {
    // margin-left: 1em;
  }
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
}
.radio-label{
  flex: 1;
}
.battista-car {
  // width: 6em;
}
.battista-list {
  > .radio-item {
    padding: 0;
    margin-left: 1em;
  }
}
.radio-item-00 {
  background-color: #ddd;
}
.radio-item-11,
.radio-item-22,
.radio-item-33,
.radio-item-44,
.radio-item-55,
.radio-item-66
 {
  background-color: rgb(205, 233, 183);
}
// .radio-item-11 {
//   background-color: rgb(233, 232, 157);
// }
.stage-list {
  margin-top: 16px;
}
.stage {
  display: flex;
  justify-content: space-between;
  background-color: #ddd;
  padding: 10px;
}
.stage-label {
  width: 8em;
}
.stage-status {
  width: 6em;
  text-align: end;
}
.stage-unlock {
  background-color: rgb(205, 233, 183);
}
.stage-condition {
  width: 9em;
  text-align: end;
}
.radio-label {
  margin-left: 0.2em;
}
.option-list,
.stage-list {
  max-width: 600px;
  flex: 1;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-area {
  display: flex;
  align-items: center;
  margin: 0 0 1em 1em;
}

.qr-desc {
  margin-left: 2em;
}

@media screen and (min-width: 750px) {
  .content {
    flex-direction: row;
    justify-content: space-between;
    max-width: 1210px;
    margin: 0 auto;
    align-items: flex-start;
  }
  .stage-list {
    margin-top: 0;
  }
}

.note {
  text-align: center;
  margin: 1em 0;
}

.stage-image-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.stage-image {
  width: 100%;
  max-width: 1210px;
}
</style>
