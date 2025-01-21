<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const searchBankInput = ref(null)
const searchBranchInput = ref(null)

const selectedBank = ref('')
const selectedBranch = ref('')
const bankOptions = ref([])
const branchOptions = ref([])
const searchBankValue = ref('')
const searchBranchValue = ref('')
const selectedBankIndex = ref(0)
const selectedBranchIndex = ref(0)
const bankContainerRef = ref(null)
const branchContainerRef = ref(null)
const isBankDropdownVisible = ref(false)
const isBranchDropdownVisible = ref(false)
const isValidBranch = ref(false)


const handleBankContainerFocus = () => {
  searchBankInput.value.focus()
  isBankDropdownVisible.value = !isBankDropdownVisible.value
}

const handleBranchContainerFocus = () => {
  searchBranchInput.value.focus()
  isBranchDropdownVisible.value = !isBranchDropdownVisible.value
}

const handleBankInputBlur = (e) => {
  if (!bankContainerRef.value?.contains(e.relatedTarget)) {
    setTimeout(() => {
      isBankDropdownVisible.value = false
      searchBankValue.value = ''
    }, 100)
  }
}

const handleBranchInputBlur = (e) => {
  if (!branchContainerRef.value?.contains(e.relatedTarget)) {
    setTimeout(() => {
      isBranchDropdownVisible.value = false
      searchBranchValue.value = ''
    }, 100)
  }
}

const isValidBank = computed(() => {
  return bankOptions.value.some((bankOption) => {
    return bankOption == selectedBank.value
  })
})

// 顯示選單
const fetchBankList = async () => {
  const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/banks')
  const { bank } = await res.json()
  const formattedBanks = bank.map((bank) => {
    return `${bank.code} ${bank.title}`
  })
  return formattedBanks
}

const fetchBranchList = async (code) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/banks/${code}/branches`
  const res = await fetch(url)
  const { branches } = await res.json()
  return branches
}

const filteredbankOptions = computed(() => {
  if (!searchBankValue.value) {
    return bankOptions.value
  }
  if (bankOptions.value.includes(searchBankValue.value)) {
    return bankOptions.value
  }
  return bankOptions.value.filter((singleBank) => {
    return singleBank.includes(searchBankValue.value)
  })
})

const filteredbranchOptions = computed(() => {
  if (!searchBranchValue.value) {
    return branchOptions.value
  }

  return branchOptions.value.filter((singleBranch) => {
    return singleBranch.title.includes(searchBranchValue.value)
  })
})

const handleBankSelection = async (bank) => {
  if (selectedBank.value == bank) {
    return
  }
  selectedBank.value = bank
  searchBankValue.value = ''
  selectedBankIndex.value = bankOptions.value.indexOf(bank)
  bankContainerRef.value.focus()

  const code = bank.split(' ')[0]
  try {
    selectedBranch.value = ''
    searchBranchValue.value = ''
    selectedBranchIndex.value = 0
    isValidBranch.value = false
    const res = await fetchBranchList(code)
    if (!res) {
      branchOptions.value = []
    } else {
      branchOptions.value = res
    }
  } catch {
    alert('發生錯誤，請稍後再試')
  }
}

const handleBranchSelection = (branch) => {
  selectedBranch.value = branch.title
  searchBranchValue.value = ''
  selectedBranchIndex.value = filteredbranchOptions.value.findIndex((branch) =>
    branch.title.includes(selectedBranch.value),
  )
  branchContainerRef.value.focus()
  isValidBranch.value = true
  const [bankCode, bankName] = selectedBank.value.split(' ')
  const detailBranch = filteredbranchOptions.value[selectedBranchIndex.value]
  const branchCode = detailBranch.code
  const branchName = detailBranch.title

  router.push({
    path: `/${bankCode}/${branchCode}/${bankName}-${branchName}.html`,
  })
}

const handleBankChoose = (e) => {
  if (e.key == 'Enter' && e.isComposing) return
  const optionsLength = filteredbankOptions.value.length
  if (optionsLength == 0) return
  if (isBankDropdownVisible.value) {
    if (e.key == 'ArrowDown') {
      selectedBankIndex.value = (selectedBankIndex.value + 1) % optionsLength
      bankRefs.value[selectedBankIndex.value]?.scrollIntoView({ block: 'nearest' })
    } else if (e.key == 'ArrowUp') {
      selectedBankIndex.value =
        selectedBankIndex.value <= 0 ? optionsLength - 1 : selectedBankIndex.value - 1
      bankRefs.value[selectedBankIndex.value]?.scrollIntoView({ block: 'nearest' })
    } else if (e.key == 'Enter' && selectedBankIndex.value >= 0) {
      handleBankSelection(filteredbankOptions.value[selectedBankIndex.value])
    }
  } else {
    isBankDropdownVisible.value = true
  }
}

const handleBranchChoose = (e) => {
  if (e.key == 'Enter' && e.isComposing) {
    return
  }

  const optionsLength = filteredbranchOptions.value.length
  if (optionsLength == 0) return
  if (isBranchDropdownVisible.value) {
    if (e.key == 'ArrowDown') {
      selectedBranchIndex.value = (selectedBranchIndex.value + 1) % optionsLength
      branchRefs.value[selectedBranchIndex.value]?.scrollIntoView({ block: 'nearest' })
    } else if (e.key == 'ArrowUp') {
      selectedBranchIndex.value =
        selectedBranchIndex.value <= 0 ? optionsLength - 1 : selectedBranchIndex.value - 1
      branchRefs.value[selectedBranchIndex.value]?.scrollIntoView({ block: 'nearest' })
    } else if (e.key == 'Enter' && selectedBranchIndex.value >= 0) {
      handleBranchSelection(filteredbranchOptions.value[selectedBranchIndex.value])
    }
  } else {
    isBranchDropdownVisible.value = true
  }
}
const branchRefs = ref([])

const branchDetail = computed(() => {
  if (isValidBranch.value) {
    const branchInfo = branchOptions.value.find((branch) => {
      return branch.title == selectedBranch.value
    })
    const [code, bankName] = selectedBank.value.split(' ')
    const branchFirstName = `${bankName}(${code})`
    const branchLastName = branchInfo.title
    return {
      branchFirstName,
      branchLastName,
      branchCode: branchInfo.code,
      address: branchInfo.address,
      tel: branchInfo.tel,
    }
  } else {
    return {
      branchFirstName: '',
      branchLastName: '',
      branchCode: '',
      address: '',
      tel: '',
    }
  }
})
const bankRefs = ref([])

const copyCodeBtn = ref(null)
const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code)
    copyCodeBtn.value.innerHTML = '已複製'
    setTimeout(() => {
      copyCodeBtn.value.innerHTML = '複製代碼'
    }, 500)
  } catch {
    alert('複製文字失敗')
  }
}

const copyLinkBtn = ref(null)
const copyLink = async () => {
  try {
    const currentUrl = window.location.origin
    const fullPath = `${currentUrl}${route.fullPath}`
    await navigator.clipboard.writeText(fullPath)
    copyLinkBtn.value.innerHTML = '已複製'
    setTimeout(() => {
      copyLinkBtn.value.innerHTML = '複製此頁面連結'
    }, 500)
  } catch {
    alert('複製頁面連結失敗')
  }
}

const goHome = () => {
  selectedBank.value = ''
  isValidBranch.value = false
  selectedBranch.value = ''
  router.push('/')
}

watch( filteredbankOptions,() => {
  selectedBankIndex.value = 0
})

watch(filteredbranchOptions, () => {
  selectedBranchIndex.value = 0
})

watch(isBankDropdownVisible, (nv) => {
  if(nv){
    setTimeout(() => {
      bankRefs.value[selectedBankIndex.value]?.scrollIntoView({ block: 'nearest' })
    }, 10)
  }
})

watch(isBranchDropdownVisible, (nv) => {
  if(nv){
    setTimeout(() => {
      branchRefs.value[selectedBranchIndex.value]?.scrollIntoView({ block: 'nearest' })
    }, 10)
  }
})

onMounted(async () => {
  try {
    const res = await fetchBankList()
    bankOptions.value = res

    if (route.params.bankCode && route.params.branchCode) {
      const res = await fetchBranchList(route.params.bankCode)
      if (res) {
        branchOptions.value = res
        const matchBank = bankOptions.value.find((bank) => bank.includes(route.params.bankCode))
        const matchBranch = branchOptions.value.find(
          (branch) => branch.code == route.params.branchCode,
        )
        if (matchBank) {
          selectedBank.value = matchBank
        }
        if (matchBranch) {
          isValidBranch.value = true
          selectedBranch.value = matchBranch.title
        }
      }
    }
  } catch {
    alert('發生錯誤，請稍後再試')
  }
})
</script>
<template>
  <div class="container p-3 w-full mx-auto">
    <span class="text-gray-400 mx-1 text-xs"
      >powered by <a href="https://github.com/Junwanghere">Jun</a></span
    >
    <h1 class="text-4xl sm:text-5xl font-thin my-2">台灣銀行代碼查詢</h1>
    <div class="sm:flex">
      <div class="relative sm:max-w-[280px]">
        <label class="font-medium pl-1" for="bank-name">銀行名稱</label>
        <div
          ref="bankContainerRef"
          @focus="handleBankContainerFocus"
          class="cursor-default p-2 input-container mt-1 flex rounded items-center border-[2px] focus:border-blue-600"
          tabindex="0"
        >
          <input
            @click="isBankDropdownVisible = !isBankDropdownVisible"
            @keydown="handleBankChoose"
            autocomplete="off"
            v-model="searchBankValue"
            @blur="handleBankInputBlur"
            ref="searchBankInput"
            class="cursor-default bg-white border-0 outline-none w-[100%] sm:w-[200px] truncate"
            :class="{ 'placeholder:text-black': selectedBank }"
            name="bank-name"
            :placeholder="selectedBank || '請輸入關鍵字或銀行代碼...'"
            type="text"
          />
          <div class="w-px h-5 mx-2 border-r"></div>
          <div class="w-3 h-3 cursor-pointer">
            <svg class="fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"
              />
            </svg>
          </div>
        </div>
        <p class="pl-1 mt-1 text-sm text-gray-400">可使用下拉選單或直接輸入關鍵字查詢</p>
        <div
          v-show="isBankDropdownVisible"
          class="absolute w-full bg-white z-[1000] max-h-[200px] py-1 top-full rounded border overflow-y-auto scroll-auto"
        >
          <div v-if="filteredbankOptions.length > 0">
            <p
              tabindex="-1"
              :ref="
                (el) => {
                  if (el) bankRefs[index] = el
                }
              "
              @mouseenter="selectedBankIndex = +index"
              :class="{
                'pre-chosen': selectedBankIndex == index && selectedBank != singleBank,
                selected: selectedBank == singleBank,
              }"
              @click="handleBankSelection(singleBank)"
              class="p-2 cursor-default bg-white border-b-[1px] active:bg-blue-300"
              v-for="(singleBank, index) in filteredbankOptions"
              :key="singleBank"
            >
              {{ singleBank }}
            </p>
          </div>
          <div v-else>
            <p class="text-center p-3 text-gray-400 bg-white">無相關資料</p>
          </div>
        </div>
      </div>
      <div class="relative sm:max-w-[171px] sm:ml-2 mt-2 sm:mt-0">
        <label class="font-medium pl-1" for="branch-name">分行名稱</label>
        <div
          @focus="handleBranchContainerFocus"
          ref="branchContainerRef"
          :class="{ disableClick: !isValidBank }"
          class="cursor-default input-container flex rounded items-center p-2 border-[2px] focus:border-blue-600 mt-1"
          tabindex="0"
        >
          <input
            @click="isBranchDropdownVisible = !isBranchDropdownVisible"
            @keydown="handleBranchChoose"
            :class="{ disableClick: !isValidBank, 'placeholder:text-black': selectedBranch }"
            ref="searchBranchInput"
            class="cursor-default truncate border-0 outline-none w-[100%] sm:w-[120px] placeholder:truncate"
            name="branch-name"
            type="text"
            autocomplete="off"
            v-model="searchBranchValue"
            @blur="handleBranchInputBlur"
            :placeholder="selectedBranch || '請選擇分行名稱'"
          />
          <div class="w-px h-5 mx-2 border-r"></div>
          <div class="w-3 h-3 cursor-pointer">
            <svg class="fill-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z"
              />
            </svg>
          </div>
        </div>
        <div
          v-show="isBranchDropdownVisible"
          class="absolute w-full bg-white z-[1000] flex flex-col max-h-[200px] py-1 rounded border mt-1 overflow-auto"
        >
          <div v-if="filteredbranchOptions.length > 0">
            <p
              tabindex="-1"
              :ref="
                (el) => {
                  if (el) branchRefs[index] = el
                }
              "
              :class="{
                'pre-chosen': selectedBranchIndex == index && selectedBranch != branch.title,
                selected: selectedBranch == branch.title,
              }"
              @mouseenter="selectedBranchIndex = +index"
              class="p-2 cursor-default bg-white border-b-[1px] active:bg-blue-300"
              v-for="(branch, index) in filteredbranchOptions"
              :key="`${branch.code} ${branch.title}`"
              @click="handleBranchSelection(branch)"
            >
              {{ branch.title }}
            </p>
          </div>
          <div v-else>
            <p class="text-center p-3 text-gray-400 bg-white">無相關資料</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isValidBranch">
      <div
        class="w-full mt-4 flex-wrap border border-black border-dotted bg-green-50 p-2 flex flex-col rounded"
      >
        <div>
          <h2 class="text-3xl mb-2 mt-1 flex flex-col sm:block">
            {{ branchDetail.branchFirstName }}<span>{{ branchDetail.branchLastName }}</span>
          </h2>
          <div class="flex items-center">
            <span class="text-xl my-1">分行代碼：{{ branchDetail.branchCode }}</span>
            <button
              @click="copyCode(branchDetail.branchCode)"
              class="border ml-2 border-black hover:bg-green-400 bg-green-500 text-green-50 px-2 py-[2px] rounded"
              ref="copyCodeBtn"
            >
              複製代碼
            </button>
          </div>
          <p class="text-xl my-1">地址：{{ branchDetail.address }}</p>
          <p class="text-xl my-1">電話：{{ branchDetail.tel }}</p>
        </div>
        <span class="text-green-900 inline-blocksm:mt-auto sm:ml-auto text-sm">
          資料來源：
          <a href="https://data.gov.tw/dataset/6041">政府資料開放平臺</a>
        </span>
      </div>
      <div class="mt-2">
        <button @click="goHome" class="rounded border-black border py-[2px] px-[6px]">
          重新查詢
        </button>
        <button
          class="bg-blue-500 ml-1 rounded border border-black text-white py-[2px] px-[6px] hover:opacity-80"
          @click="copyLink"
          ref="copyLinkBtn"
        >
          複製此頁面連結
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.input-container:focus-within {
  border-color: #2563eb;
}
.input-container:focus-within svg {
  fill: black;
}

.selected {
  background-color: #2684ff;
  color: white;
}

.disableClick {
  background-color: #f2f2f2;
  pointer-events: none;
}

.pre-chosen {
  background-color: rgb(199, 219, 254);
}
</style>
