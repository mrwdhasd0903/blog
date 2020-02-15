<template>
  <div class="content">
    <!-- <h1>文章列表页</h1>
    <router-link slot="text" to="/articleList/18" tag="a">文章18</router-link>-->
    <div
      class="switch el-icon-s-comment"
      :class="{switchtransition:switchData}"
      @click="switchClick"
      ref="switch"
    ></div>

    <div class="info">
      <!-- 左边 -->
      <div class="left">
        <!-- 文章列表 -->
        <conbar>
          <div slot="conbar">
            <router-link
              v-for="(item,index) in articleList"
              :key="index"
              :to="'/articleList/'+item.id"
            >
              <conbar-item :articleItem="item"></conbar-item>
            </router-link>
          </div>
        </conbar>
        <!-- 分页组件 -->
        <div class="pageQuery">
          <el-pagination
            background
            small
            @current-change="handleCurrentChange"
            :current-page="pageMessage.currentPage"
            :page-size="pageMessage.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pageMessage.totalCount"
          ></el-pagination>
        </div>
      </div>
      <!-- 右边 -->
      <div class="right">
        <!-- 留言 -->
        <div class="leabar" ref="leabar" :class="{leabartransition:switchData}">
          <el-input size="mini" placeholder="欢迎留言" v-model="leaveObj.leaveContent">
            <el-button @click="leaved" slot="append">留言</el-button>
          </el-input>
          <leabar>
            <div class="leabar-content" slot="leabar">
              <leabar-item v-for="(item,index) in leaveList" :key="index" :leaveItem="item"></leabar-item>
            </div>
          </leabar>
        </div>
        <!-- 广告 -->
        <div class="advertising">
          <main-swiper></main-swiper>
        </div>
        <!-- 页脚 -->
        <div class="footer"><foobar></foobar></div>
      </div>
    </div>
  </div>
</template>

<script>
// 内容组件和留言组件
import Conbar from "components/common/conbar/Conbar";
import ConbarItem from "components/common/conbar/ConbarItem";

import Leabar from "components/common/leabar/Leabar";
import LeabarItem from "components/common/leabar/LeabarItem";

import MainSwiper from "components/content/mainSwiper/MainSwiper";
import Foobar from "components/common/foobar/Foobar";
// 请求组件
import { pageQuery, leaveShow, leaveUp } from "network/articleList";
// cookie操作函数
import { setCookie, getCookie } from "common/cookie";

export default {
  name: "ArticleList",
  components: { MainSwiper, Conbar, ConbarItem, Leabar, LeabarItem, Foobar },
  data() {
    return {
      switchData: false,
      articleList: [],
      pageMessage: {
        currentPage: 1,
        pageSize: 10,
        totalCount: null,
        totalPage: null
      },
      leaveObj: {
        leaveContent: "",
        leaveName: ""
      },
      leaveList: []
    };
  },
  computed: {},
  created() {
    //获取分页数据
    this.getArticleList();
    //获取留言数据
    this.leaveShow();
  },
  methods: {
    // 手机端留言板滑动类加载函数
    switchClick() {
      this.switchData = !this.switchData;
    },
    //当页码改变时触发的函数
    handleCurrentChange(val) {
      this.pageMessage.currentPage = val;
      this.getArticleList();
      // console.log(this.articleList);
    },
    //分页查询函数
    getArticleList() {
      pageQuery(this.pageMessage.currentPage, this.pageMessage.pageSize).then(
        res => {
          this.articleList = res.list;
          // console.log(this.articleList);
          // console.log(this.pageMessage.currentPage);
          // console.log(res);
          // this.pageMessage.currentPage = res.currentPage;
          // this.pageMessage.pageSize = res.pageSize;
          this.pageMessage.totalCount = res.totalCount;
          this.pageMessage.totalPage = res.totalPage;
        }
      );
    },
    //留言数据获取
    leaveShow() {
      leaveShow().then(res => {
        this.leaveList = res;
      });
    },
    //留言
    leaved() {
      this.leaveObj.leaveName = getCookie("leaveName");
      if (this.leaveObj.leaveContent == "") {
        this.$message({
          message: "你还没输入内容呢",
          type: "warning"
        });
      } else if (this.leaveObj.leaveName == "") {
        this.open();
      } else {
        leaveUp(this.leaveObj.leaveName, this.leaveObj.leaveContent).then(
          res => {
            if (res.flag) {
              this.$message({
                message: res.errorMsg,
                type: "success"
              });
            } else {
              this.$message({
                message: res.errorMsg,
                type: "warning"
              });
            }
            this.leaveObj.leaveContent = "";
            this.leaveShow();
          }
        );
      }
    },
    //响亮的名字
    open() {
      this.$prompt("给自己起个响亮的名字", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[^ ]+$/,
        inputErrorMessage: "不能包含空格"
      })
        .then(({ value }) => {
          setCookie("leaveName", value, 10);
          this.leaved();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  }
};
</script>
<style>
.el-message-box {
  max-width: 80%;
}
</style>
<style scoped>
.leabar-content {
  height: 550px;
  margin: 10px 0;
  overflow: auto;
}
.pageQuery {
  margin-top: 20px;
  margin-bottom: 20px;
  /* background-color: #fff; */
  text-align: center;
}
.switch {
  display: none;
  width: 44px;
  height: 44px;
  position: fixed;
  font-size: 25px;
  line-height: 44px;
  text-align: center;
  top: 0;
  right: 0;
  z-index: 999;
}
.content {
  display: flex;
  justify-content: space-around;
  margin-top: 54px;
  margin-bottom: 50px;
}
.left {
  width: 720px;
  margin-right: 10px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  background-color: #fff;
  min-height: 1028px;
  float: left;
}
.right {
  float: left;
}
.leabar {
  height: 600px;
  width: 350px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  background-color: #fff;
}
.advertising {
  margin-top: 10px;
  width: 350px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  background-color: #fff;
  min-height: 200px;
  overflow: hidden;
}
.footer {
  margin-top: 10px;
  width: 350px;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  height: 100px;
  background-color: #fff;
}
@media screen and (max-width: 1079px) {
  .switch {
    display: block;
    transition: all 0.5s ease;
  }
  .content {
    margin-left: calc((100% - 720px) / 2);
  }
  .leabar {
    position: fixed;
    top: 54px;
    right: -800px;
    transition: all 0.5s ease;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .switchtransition {
    transform: rotateY(180deg);
  }
  .leabartransition {
    right: 20px;
  }
  .left {
    margin-right: 0;
  }
  .advertising {
    width: 720px;
  }
  .footer {
    width: 720px;
  }
}
@media screen and (max-width: 749px) {
  .info {
    width: 100%;
  }
  .leabartransition {
    right: 0px;
  }
  .leabar {
    width: 100%;
  }
  .content {
    width: 100%;
    margin-left: 0;
  }
  .right {
    width: 100%;
  }
  .left {
    width: 100%;
  }
  .advertising {
    width: 100%;
  }
  .footer {
    width: 100%;
  }
}
</style>