<template>
  <!-- 导航栏包装 -->
  <div class="main-navbar" :style="{background:mainNavbarColor}">
    <navbar>
      <div slot="heade-img">
        <img id="heade-img" :src="headImg" alt />
      </div>
      <div slot="heade-name">
        <router-link to="/articleList">
          <img id="heade-name" :src="headName" alt />
        </router-link>
      </div>
      <div id="indexPage" slot="nav-control">
        <!-- url:跳转的路由 -->
        <el-tooltip effect="dark" content="返回首页" placement="bottom-start">
          <nav-control-item url="/articleList">
            <span slot="text" class="el-icon-arrow-left"></span>
          </nav-control-item>
        </el-tooltip>
        <el-tooltip effect="dark" content="回到经典白主题" placement="bottom-start">
          <div @click="whiteColor">
            <nav-control-item url>
              <span slot="text" class="el-icon-magic-stick"></span>
            </nav-control-item>
          </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="换个主题吧" placement="bottom-start">
          <div @click="changeColor">
            <nav-control-item url>
              <span slot="text" class="el-icon-brush"></span>
            </nav-control-item>
          </div>
        </el-tooltip>
      </div>
      <div slot="nav-search">
        <el-input
          @focus="cardDown"
          size="mini"
          placeholder="搜索..."
          v-model="searchVal"
          class="input-with-select"
          clearable
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
import { isObjectValueEqual } from "common/utils";
import { getColor } from "common/getColor";

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
      labbarTop: "-900px",
      searchVal: "",
      headImg: null,
      headName: null,
      labArr: [],
      backupLabArr: [],
      //这个用于返回给服务器
      labelArr: {},
      searchObj: {},
      mainNavbarColor: "#fff"
    };
  },
  // 接收注入的数据
  inject: ["reload"],
  computed: {},
  created() {
    //请求数据
    this.getTheme();
    this.getAllLabel();
  },
  methods: {
    // 改变颜色
    changeColor() {
      this.mainNavbarColor = getColor(50);
      document.body.style.background = getColor(50);
    },
    //返回经典白
    whiteColor() {
      this.mainNavbarColor = "#fff";
      document.body.style.background = "rgb(246, 246, 246)";
    },
    //请求主题数据函数
    getTheme() {
      getTheme().then(res => {
        this.headImg = res.headImg.substring(4, res.headName.length);
        this.headName = res.headName.substring(9, res.headName.length - 1);
        addIp("main-navbar");
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
      this.labbarTop = "-900px";
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
      if (
        this.searchVal != "" ||
        isObjectValueEqual(this.labArr, this.backupLabArr)
      ) {
        this.searchObj["searchVal"] = this.searchVal;
        for (const item of this.labArr) {
          this.labelArr["label" + item.i] = item.c != "rgb(119, 119, 119)";
        }
        this.searchObj["searchLab"] = JSON.stringify(this.labelArr);
        this.$router["searchObj"] = this.searchObj;
        if (this.$route.path == "/articleSearch") {
          // 刷新路由
          this.reload();
        } else {
          this.$router.push("/articleSearch");
        }
        this.cardUp();

        // console.log(this.$router);
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

<style>
.main-navbar input.el-input__inner {
  border-radius: 14px 0 0 14px;
}
.main-navbar div.el-input-group__append {
  border-radius: 0 14px 14px 0;
  border: none;
  background-color: rgb(0, 116, 229);
}
.main-navbar button.el-button--default {
  color: #fff;
}
</style>
<style scoped>
.main-navbar {
  position: fixed;
  top: 0;
  /* background: #fff; */
  width: 100%;
  z-index: 999;
}
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