webpackJsonp([1],{"/NZa":function(t,e){},0:function(t,e,a){a("u7Vc"),t.exports=a("NHnr")},"9M+g":function(t,e){},Jmt5:function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),n=a("e6fC"),i=a.n(n),o=(a("Jmt5"),a("9M+g"),a("Gu7T")),c=a.n(o),r=a("Xxa5"),l=a.n(r),d=a("exGp"),u=a.n(d),p=a("M4fF"),v=a.n(p),f=a("7t+N"),h=a.n(f),g=a("mtWM"),_=a.n(g),m=a("mw3O"),C=a.n(m),x=a("qK+J"),y=a.n(x),b={name:"Modal",props:["categories","selectedCategories","isFilterOn"],data:function(){return{checkedCategories:[]}},mounted:function(){var t=this;this.$nextTick(function(){t.setCheckedCategories()})},methods:{handleCategories:function(){console.log("save"),0===this.checkedCategories.length?alert("카테고리를 최소 1개는 선택해주세요."):(this.$emit("handle-category",this.checkedCategories),this.close())},close:function(){console.log("close"),this.$emit("handle-modal")},setCheckedCategories:function(){var t=this;this.selectedCategories.forEach(function(e){t.checkedCategories.push(e.name)})}}},k={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"modal",class:{on:t.isFilterOn},attrs:{tabindex:"-1",role:"dialog"}},[a("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title"},[t._v("필터")]),t._v(" "),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:t.close}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),t._v(" "),a("div",{staticClass:"modal-body"},t._l(t.categories,function(e){return a("b-form-checkbox",{key:e.no,attrs:{value:e.name},model:{value:t.checkedCategories,callback:function(e){t.checkedCategories=e},expression:"checkedCategories"}},[t._v("\n          "+t._s(e.name)+"\n        ")])}),1),t._v(" "),a("div",{staticClass:"modal-footer"},[a("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.handleCategories}},[t._v("저장")])])])])])},staticRenderFns:[]},w={name:"App",components:{Modal:a("VU/8")(b,k,!1,null,null,null).exports,InfiniteLoading:y.a},data:function(){return{categories:null,selectedCategories:null,page:1,ord:"asc",content:[],ad:null,lists:[],isFilterOn:!1,isDetailOn:!1,article:null,replies:null,isUpdated:!1}},mounted:function(){this.$nextTick(function(){})},updated:function(){var t=this;this.$nextTick(function(){t.isUpdated=!t.isUpdated})},watch:{isUpdated:function(){this.isUpdated&&this.splitContents()}},methods:{getData:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("get category before"),e.next=3,t.getCategory();case 3:return console.log("get content before"),e.next=6,t.getContent();case 6:return console.log("get Ad before"),e.next=9,t.getAd();case 9:console.log("split contents text");case 10:case"end":return e.stop()}},e,t)}))()},openDetailModal:function(t){var e,a=this;(e=u()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.getDetailInfo(t.no);case 2:a.isDetailOn=!a.isDetailOn;case 3:case"end":return e.stop()}},e,a)})),function(){return e.apply(this,arguments)})(),h()("body").css("overflow","hidden")},getCategory:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_()({method:"GET",url:"http://comento.cafe24.com/category.php"}).then(function(e){200===e.status&&(t.categories=e.data.list,null===t.selectedCategories&&(t.selectedCategories=e.data.list),console.log("get category!"))});case 2:case"end":return e.stop()}},e,t)}))()},getContent:function(){var t=this;return u()(l.a.mark(function e(){var a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("this.selectedCategories",t.selectedCategories),a=[],t.selectedCategories.forEach(function(t){a.push(parseInt(t.no,10))}),e.next=5,_()({method:"GET",url:"http://comento.cafe24.com/request.php",params:{page:t.page,ord:t.ord,category:a},paramsSerializer:function(t){return C.a.stringify(t)}}).then(function(e){200===e.status&&(t.content=e.data.list,console.log("get content!"))});case 5:case"end":return e.stop()}},e,t)}))()},getAd:function(){var t=this;return u()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_()({method:"GET",url:"http://comento.cafe24.com/ads.php",params:{page:t.page,limit:1}}).then(function(e){200===e.status&&(t.ad=e.data.list,t.ad[0].split=!1,console.log("get Ad!"))});case 2:case"end":return e.stop()}},e,t)}))()},getDetailInfo:function(t){var e=this;return u()(l.a.mark(function a(){return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,_()({method:"GET",url:"http://comento.cafe24.com/detail.php",params:{req_no:t}}).then(function(t){200===t.status&&(e.article=t.data.detail.article,e.replies=t.data.detail.replies,console.log("get detail!"))});case 2:case"end":return a.stop()}},a,e)}))()},handleModal:function(){this.isFilterOn=!this.isFilterOn,this.isFilterOn?h()("body").css("overflow","hidden"):h()("body").css("overflow","")},handleOrder:function(t){this.ord=t,this.reset(),this.$refs.infiniteLoading.stateChanger.reset()},handleCategory:function(t){var e=this;console.log("categories",t);var a=[];t.forEach(function(t){a.push(v.a.find(e.selectedCategories,["name",t]))}),this.selectedCategories=a,this.reset(),this.$refs.infiniteLoading.stateChanger.reset()},infiniteHandler:function(t){var e=this;console.log("is run?");var a,s=[];s.push.apply(s,c()(this.content)),(a=u()(l.a.mark(function a(){var n,i;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return console.log("now page",e.page),a.next=3,e.getData();case 3:console.log("end get data"),v.a.isEqual(s,e.content)?t.complete():((i=[]).push.apply(i,c()(e.content)),i.splice(4,0,e.ad[0]),console.log("tmp arr",i),(n=e.lists).push.apply(n,i),e.page+=1,t.loaded());case 5:case"end":return a.stop()}},a,e)})),function(){return a.apply(this,arguments)})()},reset:function(){this.lists=[],this.page=1},closeDetailModal:function(){this.isDetailOn=!this.isDetailOn,h()("body").css("overflow","")},splitContents:function(){var t=this,e=null,a=null,s=[],n=h()("<p>"),i=void 0,o=void 0;this.lists.forEach(function(r,l){if(l%11==4&&!r.split){var d=v.a.split(r.contents," ");for(s.push.apply(s,c()(d)),t.$refs.adContentsP.forEach(function(t){parseInt(h()(t).attr("index"),10)===l&&(i=t)}),t.$refs.adContentsDiv.forEach(function(t){parseInt(h()(t).attr("index"),10)===l&&(o=t)}),e=parseInt(h()(i).css("height"),10),a=parseInt(h()(o).css("height"),10);e>a;){s.pop();var u=v.a.join(s," ");if(n.text(u),h()(o).append(n),(e=parseInt(n.css("height"),10))<a){u=u.concat("..."),r.contents=u,r.split=!0,n.remove();break}}}})},closeAd:function(t){this.$refs.adBox.forEach(function(e){parseInt(h()(e).attr("index"),10)===t&&h()(e).css("display","none")})}}},O={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project"},[a("div",[a("b-button",{on:{click:t.handleModal}},[t._v("필터")]),t._v(" "),a("b-nav",[a("b-nav-item",{class:{active:"asc"===t.ord},on:{click:function(e){return t.handleOrder("asc")}}},[t._v("\n        오름차순\n      ")]),t._v(" "),a("b-nav-item",{class:{active:"desc"===t.ord},on:{click:function(e){return t.handleOrder("desc")}}},[t._v("\n        내림차순\n      ")])],1),t._v(" "),t._l(t.lists,function(e,s){return[s%11!=4?a("div",{key:s,staticClass:"contentBox",on:{click:function(a){return t.openDetailModal(e)}}},[a("div",{staticClass:"header"},["1"===e.category_no?a("div",{staticClass:"category"},[t._v("apple")]):t._e(),t._v(" "),"2"===e.category_no?a("div",{staticClass:"category"},[t._v("banana")]):t._e(),t._v(" "),"3"===e.category_no?a("div",{staticClass:"category"},[t._v("coconut")]):t._e(),t._v(" "),a("div",{staticClass:"no"},[t._v(t._s(e.no))])]),t._v(" "),a("div",{staticClass:"info"},[a("span",{staticClass:"email"},[t._v(t._s(e.email))]),t._v(" "),a("span",{staticClass:"date"},[t._v(t._s(e.updated_at))])]),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"title"},[t._v(t._s(e.title))]),t._v(" "),a("div",{staticClass:"contents"},[t._v(t._s(e.contents))])])]):t._e(),t._v(" "),s%11==4?a("div",{key:s,ref:"adBox",refInFor:!0,staticClass:"adBox",attrs:{index:s}},[a("div",{staticClass:"header"},[a("div",{staticClass:"title"},[t._v("Sponsered")]),t._v(" "),a("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){return t.closeAd(s)}}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),t._v(" "),a("div",{staticClass:"adContainer"},[a("div",{staticClass:"bg-wrap"},[a("div",{staticClass:"bg-img",style:{"background-image":"url(http://comento.cafe24.com/public/images/"+e.img+")"}})]),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"title"},[t._v(t._s(e.title))]),t._v(" "),a("div",{ref:"adContentsDiv",refInFor:!0,staticClass:"contents",attrs:{index:s}},[a("p",{ref:"adContentsP",refInFor:!0,attrs:{index:s}},[t._v(t._s(e.contents))])])])])]):t._e()]}),t._v(" "),a("infinite-loading",{ref:"infiniteLoading",on:{infinite:t.infiniteHandler}})],2),t._v(" "),t.isFilterOn?a("modal",{attrs:{categories:t.categories,selectedCategories:t.selectedCategories,isFilterOn:t.isFilterOn},on:{"handle-modal":t.handleModal,"handle-category":t.handleCategory}}):t._e(),t._v(" "),t.isDetailOn?a("div",{staticClass:"modal",class:{on:t.isDetailOn},attrs:{tabindex:"-1",role:"dialog"}},[a("div",{staticClass:"modal-detail",attrs:{role:"document"}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"modal-header"},[a("h5",{staticClass:"modal-title"},[t._v(t._s(t.article.title))]),t._v(" "),a("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:t.closeDetailModal}},[a("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])]),t._v(" "),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"detail-content"},[a("span",{staticClass:"email"},[t._v(t._s(t.article.email))]),t._v(" "),a("span",{staticClass:"date"},[t._v(t._s(t.article.updated_at))]),t._v(" "),a("p",{staticClass:"text"},[t._v(t._s(t.article.contents))])]),t._v(" "),a("div",{staticClass:"detail-comment"},[a("h5",[t._v("댓글 ("+t._s(t.replies.length)+")")]),t._v(" "),t._l(t.replies,function(e,s){return a("div",{key:s,staticClass:"comment-item"},[a("span",{staticClass:"email"},[t._v(t._s(e.email))]),t._v(" "),a("span",{staticClass:"date"},[t._v(t._s(e.updated_at))]),t._v(" "),a("p",{staticClass:"text"},[t._v(t._s(e.contents))])])})],2)]),t._v(" "),a("div",{staticClass:"modal-footer"})])])]):t._e()],1)},staticRenderFns:[]};var D=a("VU/8")(w,O,!1,function(t){a("/NZa")},null,null).exports;s.default.use(i.a),s.default.config.productionTip=!1,new s.default({el:"#app",components:{App:D},template:"<App/>"})}},[0]);
//# sourceMappingURL=comento-quiz.6db25b55e63c575ca6ee.js.map