<template>
  <!-- 导航栏包装 -->
  <div class>
    <navbar>
      <div slot="heade-img">
        <img id="heade-img" :src="headImg" alt />
      </div>
      <div slot="heade-name">
        <img id="heade-name" :src="headName" alt />
      </div>
      <div id="indexPage" slot="nav-control">
        <nav-control-item>
          <span slot="text">首页</span>
        </nav-control-item>
      </div>
      <div slot="nav-search">
        <el-input
          @focus="cardDown"
          size="small"
          placeholder="搜索..."
          v-model="searchVal"
          class="input-with-select"
        >
          <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </navbar>
    <!-- 标签筛选板块 -->
    <div class="labbar" ref="labbar" :style="{top:labbarTop}">
      <labbar @cardUp="cardUp" @pickAll="pickAll" @cancelAll="cancelAll">
        <div class="lab-arr" slot="lab-arr">
          <lab-item
            @labItemClick="labItemClick"
            v-for="(item,index) in labArr"
            :key="index"
            :labMessage="item"
          ></lab-item>
        </div>
      </labbar>
    </div>
  </div>
</template>

<script>
//子组件
import Navbar from "components/common/navbar/Navbar";
import NavControlItem from "components/common/navbar/NavControlItem";
//标签选择面板
import Labbar from "components/common/labbar/Labbar";
import LabItem from "components/common/labbar/LabItem";

//网络组件
import { getTheme, getAllLabel } from "network/navbar";
//工具js
import { addIp } from "common/addIp";
export default {
  name: "MainNavbar",
  components: {
    Navbar,
    NavControlItem,
    Labbar,
    LabItem
  },
  data() {
    return {
      labbarTop: "-100%",
      searchVal: "",
      headImg: null,
      headName: null,
      labArr: [],
      backupLabArr: [],
      //这个用于返回给服务器
      labelArr: {},
      searchObj: {}
    };
  },
  computed: {},
  created() {
    //请求数据
    this.getTheme();
    this.getAllLabel();
  },
  methods: {
    //请求主题数据函数
    getTheme() {
      getTheme().then(res => {
        this.headImg = res.headImg.substring(4, res.headName.length);
        this.headName = res.headName.substring(9, res.headName.length - 1);
        addIp();
      });
    },
    //请求标签数据函数
    getAllLabel() {
      getAllLabel().then(res => {
        this.labArr = res;
        this.backupLabArr = JSON.parse(JSON.stringify(res));
      });
    },
    //筛选标签面板收起
    cardUp() {
      this.labbarTop = "-100%";
    },
    //筛选标签面板下降
    cardDown() {
      this.labbarTop = "44px";
    },
    //全选
    pickAll() {
      this.labArr = JSON.parse(JSON.stringify(this.backupLabArr));
    },
    //取消全选
    cancelAll() {
      for (let i in this.labArr) {
        this.labArr[i].c = "rgb(119, 119, 119)";
      }
    },
    //标签被点击冒泡
    labItemClick(i, c) {
      if (c != "rgb(119, 119, 119)") {
        for (const item in this.labArr) {
          if (this.labArr[item].i === i) {
            this.labArr[item].c = "rgb(119, 119, 119)";
          }
        }
      } else {
        for (const item in this.labArr) {
          if (this.labArr[item].i === i) {
            this.labArr[item].c = this.backupLabArr[item].c;
          }
        }
      }
    },
    //搜索提交函数
    search() {
      if (this.searchVal != "") {
        this.searchObj["searchVal"] = this.searchVal;
        for (const item of this.labArr) {
          this.labelArr["label" + item.i] = item.c != "rgb(119, 119, 119)";
        }
        this.searchObj["searchLab"] = JSON.stringify(this.labelArr);
        console.log(this.searchObj);
      } else {
        this.$message({
          message: "你还没输入内容呢",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style scoped>
#heade-img {
  height: 44px;
  border-radius: 50%;
}
#heade-name {
  height: 44px;
}
.lab-arr {
  display: flex;
  flex-wrap: wrap;
}
.labbar {
  width: 500px;
  position: fixed;
  /* top: 44px; */
  right: 44px;
  transition: all 0.5s ease;
}
@media screen and (max-width: 767px) {
  .labbar {
    width: calc(100% - 14px);
    right: 7px;
  }
}
</style>