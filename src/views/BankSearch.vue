<script setup>
import { ref } from 'vue'
const bankInput = ref(null)

const focusBankInput = () => {
  bankInput.value.focus()
}

const branchInput = ref(null)
const focusBranchInput = () => {
  branchInput.value.focus()
}
</script>
<template>
  <div class="container p-3 w-full max-w-full mx-2 px-2 sm:mx-0">
    <h1 class="text-4xl sm:text-5xl font-thin mb-2">台灣銀行代碼查詢</h1>
    <div class="select-container sm:flex " >
      <div  class="relative sm:max-w-[245px] ">
        <label class="font-medium pl-1" for="bank-name">銀行名稱</label>
        <div  @click="focusBankInput" class=" cursor-default input-container mt-1 flex rounded items-center p-2 border-[2px] focus:border-blue-600" tabindex="0">
          <input ref="bankInput" @click.stop class="cursor-default border-0 outline-none w-[100%] sm:w-[200px] " name="bank-name" placeholder="請輸入關鍵字或銀行代碼..." type="text">
          <div class="w-px h-5 mx-2 border-r"></div>
          <div  class="w-3 h-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg> 
          </div>
        </div>  
        <p class="pl-1 mt-1 text-sm text-gray-400">可使用下拉選單或直接輸入關鍵字查詢</p>
        <div v-if="true" class="banks absolute w-full  z-1000 flex flex-col max-h-[200px]  pt-1 rounded border mt-1 overflow-auto">
          <span 
            class="p-2 bg-white border-b-[1px] hover:bg-blue-200 active:bg-blue-300" 
            v-for="(item, index) in 20" 
            :key="index"
          >
            005 台灣銀行
          </span>
        </div>
      </div>
      <div  class=" sm:max-w-[171px] sm:ml-2 mt-2 sm:mt-0">
        <label class="font-medium pl-1" for="bank-name">分行名稱</label>
        <div :class="{ 'disableClick' : true}" @click="focusBranchInput" class=" cursor-default input-container flex rounded items-center p-2 border-[2px] focus:border-blue-600 mt-1" tabindex="0">
          <input :class="{ 'disableClick' : true}" ref="branchInput" @click.stop class="cursor-default border-0 outline-none w-[100%] sm:w-[120px] " name="bank-name" placeholder="請選擇分行名稱" type="text">
          <div class="w-px h-5 mx-2 border-r"></div>
          <div  class="w-3 h-3 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"/></svg> 
          </div>
        </div>  
        <div v-if="false" class="banks absolute w-full  z-1000 flex flex-col max-h-[200px]  pt-1 rounded border mt-1 overflow-auto">
          <span 
            class="p-2 bg-white border-b-[1px] hover:bg-blue-200 active:bg-blue-300" 
            v-for="(item, index) in 20" 
            :key="index"
          >
            005 台灣銀行
          </span>
        </div>
      </div>
    </div>
    <div>
      <div class="w-full mt-4 flex-wrap border border-black  border-dotted bg-green-50 p-2 flex flex-col  rounded">
        <div>
          <h2 class="text-3xl mb-2 mt-1">合作金庫商業銀行(006)西門分行</h2>
          <div class="flex items-center">
            <span class="text-xl my-1">分行代碼：</span>
            <button class="border border-black hover:bg-green-400 bg-green-500 text-green-50 px-2 py-[2px] rounded">複製代碼</button>
          </div>
          <p class="text-xl my-1">地址：</p>
          <p class="text-xl my-1">電話：</p>
        </div>
        <a class="inline-block text-green-900 sm:mt-auto sm:ml-auto text-sm" href="#">資料來源：政府資料開放平臺</a>
      </div>
      <div class="mt-2">
        <button class="rounded border-black border py-[2px] px-[6px]">重新查詢</button>
        <button class="bg-blue-500 ml-1 rounded border border-black text-white py-[2px] px-[6px] hover:opacity-80">複製此頁面連結</button>
      </div>
    </div>

  </div>

</template>
<style scoped>
.input-container:focus-within {
  border-color: #2563eb;
}

.disableClick {
  background-color: #F2F2F2;
  pointer-events: none;
}


</style>