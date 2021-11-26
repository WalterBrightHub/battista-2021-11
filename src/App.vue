<template>
  <div id="app">
    <div class="title">Battista 特殊赛 2021-11</div>
    <div class="content">
          <div class="option-list">
      
      <div class="option" v-for="(car, index) in cars" :key="car">
        <div class="option-car">{{ car }}</div>
        <div class="radio-list">
          <div
            class="radio-item"
            v-for="item in [-1, 0, 1]"
            :key="item"
            :class="'radio-item-' + item + form[index]"
          >
            <input
              type="radio"
              :id="car + item"
              :value="item"
              v-model="form[index]"
            />
            <label  class="radio-label" :for="car + item">{{
              ["未解锁", "解锁未满星", "解锁满星"][item + 1]
            }}</label>
          </div>
        </div>
      </div><div class="option">
        <div class="option-car battista-car">巴蒂斯塔完赛后的星级</div>
        <div class="radio-list battista-list">
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
            <label class="radio-label" :for="'battista' + item">{{ item }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="stage-list">
      <div class="qr-area">
        <img src="@/assets/qr.png" width="75" height="75" alt="">
        <div class="qr-desc">扫一扫二维码，查看巴蒂特殊赛事！</div>
      </div>
      <div
        class="stage"
        :class="{ 'stage-unlock': stage.unlock }"
        v-for="(stage, index) in stages.reverse()"
        :key="index"
      >
        <div class="stage-label">阶段{{ 19-index  }} {{stageThemeCars[18-index]}}</div>
        <div class="stage-status">{{ stage.unlock ? "解锁" : "未解锁" }} · {{stageConditionsDoor[18-index]}}</div>
        <div class="stage-condition">
          完成条件 {{ stage.stageConditionsTotalCurrent }}/{{
            stageConditionsTotal[18-index]
          }}
        </div>
      </div>
    </div>
    </div>
    <div class="stage-image-wrapper">

    <img src="@/assets/badi.jpg" alt="" class="stage-image">
    </div>
    <div class="note">
      <div class="note-item">version 1.1 修复了阶段描述倒转问题，添加了 <a target="_blank" href="https://www.yuque.com/asphalt9/global/special-events"> 阶段图</a></div>
      <div class="note-item">version 1.0 简单粗暴地完成了基础功能</div>
      </div>
  </div>
</template>

<script>
const cars = ['911GTS', 'DB11', '火神', 'GTR', '百年牛', 'FXX K', '狼崽', 'F1LM', 'W12', 'Imola', '阿卡龙', '毒药', 'C2', 'SSC']
const stageConditionsDoor = [0, 10, 20, 30, 50, 75, 100, 115, 125, 140, 170, 200, 230, 250, 275, 285, 300, 320, 350]
const stageThemeCars=['F1LM','W12','巴蒂','Imola','阿卡龙','巴蒂','毒药','C2','SSC','巴蒂','F1LM','W12','Imola','阿卡龙','毒药','C2','SSC','巴蒂','巴蒂排行']
const stageConditions = [20, 20, 25, 20, 20, 25, 20, 20, 20, 25, 21, 21, 21, 21, 21, 23, 23, 34, 0]
const stageConditionsTotal = stageConditions.slice()
for (let i = 1; i < stageConditionsTotal.length; i++) {
  stageConditionsTotal[i] += stageConditionsTotal[i - 1]
}
export default {
  name: 'App',
  data() {
    return {
      cars,
      form: Array(7).fill(1).concat(Array(7).fill(-1)),
      battista: 0,
      stageConditionsTotal,
      stageConditionsDoor,
      stageThemeCars
    }
  },
  watch:{
    form:function(newForm){
      localStorage.setItem('form',JSON.stringify(newForm))
    },
    battista:function(newBattista){
      
      localStorage.setItem('battista',JSON.stringify(newBattista))
    }
  },
  mounted(){
    let form=localStorage.getItem('form')
    let battista=localStorage.getItem('battista')
    console.log(form,battista)
    if(form){
      this.form=JSON.parse(form)
    }
    if(battista){
      this.battista=JSON.parse(battista)
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
      return Array(19).fill(0).map((item, index) => index).map(item => this['stage' + (item + 1)])
    },
    stage1({ state }) {
      return {
        unlock: true,
        stageConditionsTotalCurrent: state['F1LM'] !== -1 ? 20 : (state['911GTS'] !== -1 ? 13 : 0)
      }
    },
    stage2({ stage1, state }) {
      if (!stage1.unlock || stage1.stageConditionsTotalCurrent < stageConditionsDoor[1]) {
        return {
          ...stage1,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage1.stageConditionsTotalCurrent + (state['W12'] !== -1 ? 20 : (state['DB11'] !== -1 ? 13 : 0))
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
      if (!stage3.unlock || stage3.stageConditionsTotalCurrent < stageConditionsDoor[3]) {
        return {
          ...stage3,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage3.stageConditionsTotalCurrent + (state['Imola'] !== -1 ? 20 : (state['火神'] !== -1 ? 13 : 0))
        }
      }
    },
    stage5({ stage4, state }) {
      if (!stage4.unlock || stage4.stageConditionsTotalCurrent < stageConditionsDoor[4]) {
        return {
          ...stage4,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage4.stageConditionsTotalCurrent + (state['阿卡龙'] !== -1 ? 20 : (state['GTR'] !== -1 ? 13 : 0))
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
      if (!stage6.unlock || stage6.stageConditionsTotalCurrent < stageConditionsDoor[6]) {
        return {
          ...stage6,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage6.stageConditionsTotalCurrent + (state['毒药'] !== -1 ? 20 : (state['百年牛'] !== -1 ? 13 : 0))
        }
      }
    },
    stage8({ stage7, state }) {
      if (!stage7.unlock || stage7.stageConditionsTotalCurrent < stageConditionsDoor[7]) {
        return {
          ...stage7,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage7.stageConditionsTotalCurrent + (state['C2'] !== -1 ? 20 : (state['FXX K'] !== -1 ? 13 : 0))
        }
      }
    },
    stage9({ stage8, state }) {
      if (!stage8.unlock || stage8.stageConditionsTotalCurrent < stageConditionsDoor[8]) {
        return {
          ...stage8,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage8.stageConditionsTotalCurrent + (state['SSC'] !== -1 ? 20 : (state['狼崽'] !== -1 ? 13 : 0))
        }
      }
    },
    stage10({ stage9 }) {
      if (!stage9.unlock || stage9.stageConditionsTotalCurrent < stageConditionsDoor[9]) {
        return {
          ...stage9,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage9.stageConditionsTotalCurrent + 25
        }
      }
    },

    stage11({ stage10, state }) {
      if (!stage10.unlock || stage10.stageConditionsTotalCurrent < stageConditionsDoor[10]) {
        return {
          ...stage10,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage10.stageConditionsTotalCurrent + (state['F1LM'] === 1 ? 21 : (state['911GTS'] !== -1 ? 10 : 0))
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
          stageConditionsTotalCurrent: stage11.stageConditionsTotalCurrent + (state['W12'] === 1 ? 21 : (state['DB11'] !== -1 ? 10 : 0))
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
          stageConditionsTotalCurrent: stage12.stageConditionsTotalCurrent + (state['Imola'] === 1 ? 21 : (state['火神'] !== -1 ? 10 : 0))
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
          stageConditionsTotalCurrent: stage13.stageConditionsTotalCurrent + (state['阿卡龙'] === 1 ? 21 : (state['GTR'] !== -1 ? 10 : 0))
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
          stageConditionsTotalCurrent: stage14.stageConditionsTotalCurrent + (state['毒药'] === 1 ? 21 : (state['百年牛'] !== -1 ? 10 : 0))
        }
      }
    },
    stage16({ stage15, state }) {
      if (!stage15.unlock || stage15.stageConditionsTotalCurrent < stageConditionsDoor[15]) {
        return {
          ...stage15,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage15.stageConditionsTotalCurrent + (state['C2'] === 1 ? 23 : (state['FXX K'] !== -1 ? 10 : 0))
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
          stageConditionsTotalCurrent: stage16.stageConditionsTotalCurrent + (state['SSC'] === 1 ? 23 : (state['狼崽'] !== -1 ? 10 : 0))
        }
      }
    },

    stage18({ stage17, battista }) {
      if (!stage17.unlock || stage17.stageConditionsTotalCurrent < stageConditionsDoor[17]) {
        return {
          ...stage17,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage17.stageConditionsTotalCurrent + [0,10, 15, 21, 27, 31, 34][battista]
        }
      }
    },
    stage19({ stage18, battista }) {
      if (battista < 1 || !stage18.unlock || stage18.stageConditionsTotalCurrent < stageConditionsDoor[18]) {
        return {
          ...stage18,
          unlock: false,
        }
      }
      else {
        return {
          unlock: true,
          stageConditionsTotalCurrent: stage18.stageConditionsTotalCurrent
        }
      }
    }
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
.title{
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  padding: 20px 0;
}
.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  padding: 0.5em;
}
.option:nth-child(odd){
  background-color: #efefef;
}
.option-car {
  width: 4em;
  margin-left: 5px;
  color: #ff0054;
  font-weight: bold;
  max-width: 5em;
}
.radio-list {
  display: flex;
  flex:1;
  justify-content: space-between;
}
.radio-item {
  + .radio-item {
    // margin-left: 1em;
  }
  padding: 10px;
  border-radius: 6px;
  
}
  .battista-car{
    width: 6em;
  }
.battista-list{
  >.radio-item{
  padding: 0;
  margin-left:1em;
}
}
.radio-item--1-1 {
  background-color: #ddd;
}
.radio-item-00 {
  background-color: rgb(205, 233, 183);
}
.radio-item-11 {
  background-color: rgb(233, 232, 157);
}
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
  width:6em;
  text-align: end;
}
.stage-unlock {
  background-color: rgb(205, 233, 183);
}
.stage-condition {
  width: 9em;
  text-align: end;
}
.radio-label{
  margin-left: 0.2em;
}
.option-list,
.stage-list{
  max-width: 600px;
  flex:1;
  width:100%;
}
.content{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-area{
  display: flex;
  align-items: center;
  margin:0 0 1em 1em;
}

.qr-desc{
  margin-left: 2em;
}

@media screen and (min-width:750px) {
  .content{
    flex-direction: row;
    justify-content: space-between;
    max-width:1210px;
    margin:0 auto;
    align-items: flex-start;
  }
  .stage-list{
    margin-top: 0;
  }
}

.note{
  text-align: center;
  margin:1em 0
}

.stage-image-wrapper{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.stage-image{
  width:100%;
  max-width: 1210px;
}

</style>
