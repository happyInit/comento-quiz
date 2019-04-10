<template>
  <div class="project">
    <div>
      <b-button @click="handleModal">필터</b-button>
      <b-nav>
        <b-nav-item
          :class="{ active: ord === 'asc'}"
          @click="handleOrder('asc')"
        >
          오름차순
        </b-nav-item>
        <b-nav-item
          :class="{ active: ord === 'desc'}"
          @click="handleOrder('desc')"
        >
          내림차순
        </b-nav-item>
      </b-nav>
      
      <template v-for="(list, index) in lists">
        <div @click="openDetailModal(list)" :key="index" class="contentBox" v-if="index%11 !== 4">
          <div class="header">
            <div v-if="list.category_no === '1'" class="category">apple</div>
            <div v-if="list.category_no === '2'" class="category">banana</div>
            <div v-if="list.category_no === '3'" class="category">coconut</div>
            <div class="no">{{list.no}}</div>
          </div>
          <div class="info">
            <span class="email">{{list.email}}</span>
            <span class="date">{{list.updated_at}}</span>
          </div>
          <div class="content">
            <div class="title">{{list.title}}</div>
            <div class="contents">{{list.contents}}</div>
          </div>
        </div>

        <div class="adBox" ref="adBox" :index="index" :key="index" v-if="index%11 === 4">
          <div class="header">
            <div class="title">Sponsered</div>
            <button type="button" @click="closeAd(index)" class="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="adContainer">
            <div class="bg-wrap">
              <div class="bg-img" 
                :style="{'background-image': `url(${'http://comento.cafe24.com/public/images/'+list.img})`}"
              ></div>
            </div>
            <div class="content">
              <div class="title">{{list.title}}</div>
              <div ref="adContentsDiv" :index="index" class="contents">
                <p ref="adContentsP" :index="index">{{list.contents}}</p>
              </div>
            </div>
          </div>
        </div>
      </template>

      <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading"></infinite-loading>
    </div>

    <modal
      v-if="isFilterOn"
      @handle-modal="handleModal"
      @handle-category="handleCategory"
      :categories="categories"
      :selectedCategories="selectedCategories"
      :isFilterOn="isFilterOn"
    >
    </modal>

    <div class="modal" v-if="isDetailOn" :class="{ on: isDetailOn }" tabindex="-1" role="dialog">
      <div class="modal-detail" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{article.title}}</h5>
            <button type="button" @click="closeDetailModal" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="detail-content">
              <span class="email">{{article.email}}</span>
              <span class="date">{{article.updated_at}}</span>
              <p class="text">{{article.contents}}</p>
            </div>
            <div class="detail-comment">
              <h5>댓글 ({{replies.length}})</h5>
              <div v-for="(reply, index) in replies" :key="index" class="comment-item">
                <span class="email">{{reply.email}}</span>
                <span class="date">{{reply.updated_at}}</span>
                <p class="text">{{reply.contents}}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import _ from 'lodash';
import $ from 'jquery';
import axios from 'axios';
import qs from 'qs';
import InfiniteLoading from 'vue-infinite-loading';
import Modal from './Modal';

export default {
  name: 'App',
  components: {
    Modal,
    InfiniteLoading,
  },
  data() {
    return {
      categories: null,
      selectedCategories: null,
      page: 1,
      ord: 'asc',
      content: [],
      ad: null,
      lists: [],
      isFilterOn: false,
      isDetailOn: false,
      article: null,
      replies: null,
      isUpdated: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
 
    });
  },
  updated() {
    this.$nextTick(() => {
      this.isUpdated = !this.isUpdated;
    });
  },
  watch: {
    isUpdated() {
      if(this.isUpdated) {
        this.splitContents();
      }
    },
  },
  methods: {
    async getData() {
      console.log('get category before');
      await this.getCategory();
      console.log('get content before');
      await this.getContent();
      console.log('get Ad before');
      await this.getAd();
      console.log('split contents text');
      //this.splitContents();
    },
    // 디테일 모달 열기
    openDetailModal(info) {
      const openDetail = async () => {
        await this.getDetailInfo(info.no);
        this.isDetailOn = !this.isDetailOn;
      };
      openDetail();
      $('body').css('overflow', 'hidden');
    },
    // 필터 카테고리
    async getCategory() {
      await axios({
        method: 'GET',
        url: 'http://comento.cafe24.com/category.php',
      }).then((response) => {
        if (response.status === 200) {
          this.categories = response.data.list;
          // 초기 로딩시...
          if(this.selectedCategories === null) {
            this.selectedCategories = response.data.list;
          }
          console.log('get category!');
        }
      });
    },
    // 글 리스트
    async getContent() {
      console.log('this.selectedCategories', this.selectedCategories);
      let paramArr = [];
      this.selectedCategories.forEach((category) => {
        paramArr.push(parseInt(category.no, 10));
      })
      await axios({
        method: 'GET',
        url: 'http://comento.cafe24.com/request.php',
        params: {
          page: this.page,
          ord: this.ord,
          category: paramArr,
        },
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      }).then((response) => {
        if (response.status === 200) {
          this.content = response.data.list;
          console.log('get content!');
        }
      });
    },
    // 광고 리스트
    async getAd() {
      await axios({
        method: 'GET',
        url: 'http://comento.cafe24.com/ads.php',
        params: {
          page: this.page,
          limit: 1,
        },
      }).then((response) => {
        if (response.status === 200) {
          this.ad = response.data.list;
          this.ad[0].split = false;
          console.log('get Ad!');
        }
      });
    },
    // 필터 카테고리
    async getDetailInfo(no) {
      await axios({
        method: 'GET',
        url: 'http://comento.cafe24.com/detail.php',
        params: {
          req_no: no,
        },
      }).then((response) => {
        if (response.status === 200) {
          this.article = response.data.detail.article;
          this.replies = response.data.detail.replies;
          console.log('get detail!');
        }
      });
    },
    // 모달 창 컨트롤
    handleModal() {
      this.isFilterOn = !this.isFilterOn;
      if(this.isFilterOn) {
        $('body').css('overflow', 'hidden');
      }
      else {
        $('body').css('overflow', '');
      }
    },
    // 정렬 방법 컨트롤
    handleOrder(order) {
      this.ord = order;
      // 리스트 불러오기 전 조건 초기화
      this.reset();
      // 이후 리스트 다시 불러와야함
      this.$refs.infiniteLoading.stateChanger.reset();
    },
    // 모달 창에서 카테고리 저장한 부분 처리
    handleCategory(categories) {
      console.log('categories', categories);
      let tmp = [];
      categories.forEach((name) => {
        tmp.push(_.find(this.selectedCategories, ['name', name]));
      });
      // 선택된 카테고리에 맞게 카테고리 배열 업데이트 
      this.selectedCategories = tmp;
      // 리스트 다시 불러오기 전 조건 초기화
      this.reset();
      // 이후 리스트 다시 불러와야함
      this.$refs.infiniteLoading.stateChanger.reset();
    },
    infiniteHandler($state) {
      console.log('is run?');
      let beforeContent = [];
      beforeContent.push(...this.content);
      const loadData = async () => {
        console.log('now page', this.page);
        await this.getData();
        console.log('end get data');
        if(!_.isEqual(beforeContent, this.content)) {
          let tmp = [];
          // 그려줄 리스트 배열 생성
          tmp.push(...this.content);
          tmp.splice(4, 0, this.ad[0]);
          console.log('tmp arr', tmp);
          this.lists.push(...tmp);
          this.page += 1;
          $state.loaded();
        } else {
          $state.complete();
        }
      }
      loadData();
    },
    reset() {
      this.lists = [];
      this.page = 1;
    },
    closeDetailModal() {
      this.isDetailOn = !this.isDetailOn;
      $('body').css('overflow', '');
    },
    // 글 내용 여러줄 줄이기
    splitContents() {
      let pHeight = null;
      let divHeight = null;
      let words = [];
      let tmpP = $('<p>');
      let pTag;
      let divTag;

      this.lists.forEach((list, index) => {
        if(index%11 === 4 && !list.split) {
          let tmp = _.split(list.contents, ' ');
          words.push(...tmp);
          this.$refs.adContentsP.forEach((p) => {
            if(parseInt($(p).attr('index'), 10) === index) {
              pTag = p;
            }
          });
          this.$refs.adContentsDiv.forEach((div) => {
            if(parseInt($(div).attr('index'), 10) === index) {
              divTag = div;
            }
          });
          pHeight = parseInt($(pTag).css('height'), 10);
          divHeight = parseInt($(divTag).css('height'), 10);

          while(pHeight > divHeight) {
            words.pop();
            let string = _.join(words, ' ');
            tmpP.text(string);
            $(divTag).append(tmpP);
            pHeight = parseInt(tmpP.css('height'), 10);
            if(pHeight < divHeight) {
              string = string.concat('...');
              list.contents = string;
              list.split = true;
              tmpP.remove();
              break;
            }
          }

        }
      });
    },
    closeAd(index) {
      this.$refs.adBox.forEach((adBox) => {
        if(parseInt($(adBox).attr('index'), 10) === index) {
          $(adBox).css('display', 'none');
        }
      });
      //this.lists.splice(index, 1);
    },
    // 다음 메소드 자리
  },
};
</script>

<style lang="less">
@mobile: ~'(max-width: 480px)';
@default-margin: 2%;
div.project {
  width: 90%;
  max-width: 720px;
  min-width: auto;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
}
li.nav-item {
  a {
    color: black;
  }
  &.active {
    a {
      color: red;
    }
  }
}
ul.nav {
  float: right;
}
div.contentBox {
  border: 1px solid #777;
  margin-top: @default-margin;
  border-radius: 0.3rem;
  .header {
    border-bottom: 1px solid #777;
    padding: @default-margin;
    overflow: hidden;
    .category {
      float: left;
    }
    .no {
      float: right;
    }
  }

  .info {
    padding: @default-margin;
    background-color: #f1f1f1;
    font-size: .8rem;
    border-bottom:1px solid #777;
    .email {
      &::after {
        content: '|';
        margin: 0 3%;
      }
    }
  }

  .content {
    padding: @default-margin;
    .title {
      font-size: 18px;
      font-weight: bold;
      text-overflow: ellipsis!important;
      white-space: nowrap!important;
      overflow: hidden;
    }
    .contents {
      margin-top: @default-margin;
      margin-bottom: @default-margin * 2;
      text-overflow: ellipsis!important;
      white-space: nowrap!important;
      overflow: hidden;
    }
  }
}
div.adBox {
  border: 1px solid #777;
  margin-top: @default-margin;
  padding: @default-margin;
  border-radius: 0.3rem;
  .header {
    overflow: hidden;
    margin-bottom: @default-margin;
    .title {
      float: left;
    }
    .close {
      float: right;
      height: 1rem;
      span {
        line-height: 0.5rem;
      }
    }
  }
  .adContainer {
    overflow: hidden;
    .bg-wrap {
      @media @mobile {
        width: 100%;
      }
      float: left;
      width: 50%;
      .bg-img { 
        width: 100%;
        height: 216px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
    .content {
      @media @mobile {
        width: 100%;
      }
      float: left;
      width: 50%;
      padding: @default-margin @default-margin @default-margin @default-margin * 2;
      .title {
        font-size: 18px;
        font-weight: bold;
        text-overflow: ellipsis!important;
        white-space: nowrap!important;
        overflow: hidden;
      }
      .contents {
        margin-top: 1%;
        text-overflow: ellipsis!important;
        overflow: hidden;
        max-height: 156px;
        white-space: normal;
        line-height: 1.3;
      }
    }
  }
}
.modal-detail {
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 720px;
  height: 100%;
  margin: 0 auto;
  .modal-header {
    border-color: #b9b9b9;
  }
  .modal-body {    
    max-height: 70vh;
    overflow: auto;
    padding: 0;
  }
  .modal-footer {
    border: 0;
  }
  .detail-content {
    padding: 1rem 1rem 2rem;
    span {
      font-size: 0.8rem;
      color: #898989;
    }
    .date {
      float: right;
    }
    .text {
      margin: 1rem 0 0;
      user-select: none;
    }
  }
  .detail-comment {
    padding: 2rem 1rem 1rem 1rem;
    border-top: 1px solid #b9b9b9;
    background-color: #f1f1f1;
    h5 {
      padding: 0 0.5rem;
      font-size: 1rem;
    }
    .text {
      margin: 0;
    }
  }
  .comment-item {
    margin: 0;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid #dedede;
    span {
      font-size: 0.8rem;
      color: #898989;
    }
    .date {
      float: right;
    }
    .text {
      padding-top: .5rem;
      font-size: 0.9rem;
    }
  }
}
div.custom-control {
  padding-left: 5.5rem;
  display: inline-flex;
}
div.modal {
  background-color: rgba(0,0,0,0.7);
}
div.modal-dialog {
  height: 90%;
  min-height: calc(100% - 1rem);
  display: flex;
  align-items: center;
}
div.modal.on {
  display: block;
}
.custom-control-input:checked ~ .custom-control-label {
  &::before {
    background-color: #000;
    border-color: #000;
  }
}
.btn-primary {
  background-color: #000;
  border-color: #000;
}
</style>
