<template>
  <div class="content">
    <div
      class="switch el-icon-s-comment"
      :class="{switchtransition:switchData}"
      @click="switchClick"
      ref="switch"
    ></div>

    <div class="info">
      <!-- 左边 -->
      <div
        class="left"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        v-loading="loadingLeft"
      >
        <conbar>
          <div slot="conbar">
            <conbar-item v-if="articleItem.id" :articleItem="articleItem"></conbar-item>
            <div v-highlight class="articleContent" v-html="articleContent">{{articleContent}}</div>
          </div>
        </conbar>
      </div>
      <!-- 右边 -->
      <div class="right">
        <!-- 留言 -->
        <div class="leabar" ref="leabar" :class="{leabartransition:switchData}">
          <div class="leabar-input">
            <el-input
              size="mini"
              maxlength="100"
              show-word-limit
              placeholder="欢迎评论"
              v-model="replyObj.replyContent"
            >
              <el-button @click="replyed" slot="append">评论</el-button>
            </el-input>
          </div>
          <leabar>
            <div class="leabar-content" slot="leabar">
              <repbar-item v-for="(item,index) in replyList" :key="index" :replyItem="item"></repbar-item>
              <p class="ifNull" v-if="replyList.length==0">还是空的,留下第一条评论~</p>
            </div>
          </leabar>
        </div>

        <!-- 广告 -->
        <div class="advertising">
          <main-swiper></main-swiper>
        </div>
        <!-- 页脚 -->
        <div class="footer">
          <foobar></foobar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 内容组件和留言组件
import Conbar from "components/common/conbar/Conbar";
import ConbarItem from "components/common/conbar/ConbarItem";

import Leabar from "components/common/leabar/Leabar";
import RepbarItem from "components/common/leabar/RepbarItem";

import MainSwiper from "components/content/mainSwiper/MainSwiper";
import Foobar from "components/common/foobar/Foobar";
// 请求组件
import { findOneArticle, replyShow, replyUp } from "network/articleContent";
import { addIp } from "common/addIp";
// cookie操作函数
import { setCookie, getCookie } from "common/cookie";

export default {
  name: "ArticleContent",
  components: {
    MainSwiper,
    Foobar,
    ConbarItem,
    Leabar,
    RepbarItem,
    Conbar
  },
  data() {
    return {
      switchData: false,
      articleContent: "",
      articleItem: {},
      replyList: [],
      replyObj: {
        replyContent: "",
        replyName: ""
      },
      loadingLeft: true
    };
  },
  activated() {
    this.replyShow();
    this.getArticle();
    window.scrollTo(0, 0);
  },
  deactivated() {
    this.articleContent = null;
    this.articleItem = {};
    this.replyList = [];
    this.loadingLeft = true;
  },
  computed: {},
  methods: {
    //获取文章数据
    getArticle() {
      findOneArticle(this.$route.params.aid).then(res => {
        this.loadingLeft = false;
        this.articleContent = res.content;
        this.articleItem.labelArray = res.labelArray;
        this.articleItem.publishedTime = res.publishedTime;
        this.articleItem.readCount = res.readCount;
        this.articleItem.title = res.title;
        this.articleItem.id = res.id;
        this.articleItem.rank = res.rank;
        addIp("articleContent");
      });
    },
    // 手机端留言板滑动类加载函数
    switchClick() {
      this.switchData = !this.switchData;
    },
    //回复数据获取
    replyShow() {
      replyShow(this.$route.params.aid).then(res => {
        this.replyList = res;
      });
    },
    //回复
    replyed() {
      this.replyObj.replyName = getCookie("leaveName");
      if (this.replyObj.replyContent == "") {
        this.$message({
          message: "你还没输入内容呢",
          type: "warning"
        });
      } else if (this.replyObj.replyName == "") {
        this.open();
      } else {
        replyUp(
          this.replyObj.replyName,
          this.replyObj.replyContent,
          this.$route.params.aid
        ).then(res => {
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
          this.replyObj.replyContent = "";
          this.replyShow();
        });
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
          this.replyed();
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
blockquote {
  padding: 5px;
  background: #f9f9f9;
  border-left: 10px solid #e3e3e3;
}
pre {
  font-family: "微软雅黑";
}
.el-message-box {
  max-width: 80%;
}
.articleContent img {
  max-width: 100%;
}
</style>
<style scoped>
.leabar-input {
  padding: 10px;
}
.ifNull {
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
}
.articleContent {
  padding: 10px;
  padding-bottom: 40px;
  font-size: 15px;
  line-height: 1.5;
  /* font-family: '微软雅黑'; */
}
.leabar-content {
  height: 550px;
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
    z-index: 99;
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