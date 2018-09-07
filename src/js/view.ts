import { User, Item } from "./item";
import { $, $on, $delegate, parseDom, $parent } from "./helpers";
import Template from "./template";
import { Render, LayOut } from "./constants";

const _itemId = element =>
  parseInt(
    element.parentNode.dataset.id || element.parentNode.parentNode.dataset.id,
    10
  );
const _itemUserId = element =>
  parseInt(
    element.parentNode.dataset.userid ||
      element.parentNode.parentNode.dataset.userid,
    10
  );

export default class View {
  private $app;

  constructor(private template: Template) {
    this.$app = $("#app");
  }

  // 登陆用户Id
  private superId = (): number => parseInt($("superUserId").textContent, 10);

  // 页面加载
  onLoad(handle: () => void) {
    $on(window, "load", () => {
      handle();
    });
  }

  // 切换登陆/注册页面
  onToggle(handle: (toggleFlag: string) => void) {
    $on(
      this.$app,
      "click",
      event => {
        handle(event.target.innerText);
      },
      { target: ".sign-btn span" }
    );
  }
  // 登陆/注册
  onApply(handle: (applyFlag: string, user: User) => void) {
    $on(
      this.$app,
      "click",
      event => {
        const name: string = $("#name", this.$app).value.trim();
        const password: string = $("#password", this.$app).value.trim();
        // var name = document.getElementById("name").value;
        // var password = document.getElementById("password").value;
        handle(event.target.innerText, { name, password });
      },
      { target: ".text-center .btn" }
    );
  }

  // 渲染页面
  render(command, parameter?) {
    this[command](parameter);
  }

  private [Render.登陆]() {
    this.$app.innerHTML = this.template.layOut([LayOut.LOGIN]);
  }

  private [Render.注册]() {
    this.$app.innerHTML = this.template.layOut([LayOut.SIGNUP]);
  }

  private [Render.请输入](query: User) {
    console.log("query :", query);
    debugger;
    const setStyle = (key, message) => {
      const input = $(`input[id="${key}"]`);
      const formItem = $parent(input, "div");
      formItem.style.borderBottomColor = "#e01717";
      const span = document.createElement("span");
      span.className = "error-msg";
      span.innerText = message;
      formItem.append(span);
    };

    for (const key in query) {
      switch (key) {
        case "name":
          setStyle("name", "请输入用户名");
          break;

        case "password":
          setStyle("password", "请输入密码");
          break;

        default:
          break;
      }
    }
  }
}

/**
 * 视图层的操作
 */
// export default class View {
//   $app: any;
//   $headerImg: any;
//   template: Template;
//   $selPhone: any;
//   /**
//    * @param {!Template} template A template instance
//    */
//   constructor(template: Template) {
//     this.template = template; //传入html模板
//     this.$app = $("#app"); //页面入口
//     this.$headerImg = $(".header-img"); //头部图片

//     // 选择图片文件
//     $delegate(
//       this.$app,
//       ".form-item #avator",
//       "change",
//       ({ target }) => {
//         this.inputImg(target);
//       },
//       true
//     );

//     // 退出登录
//     $delegate(
//       this.$app,
//       ".logOut",
//       "click",
//       ({ target }) => {
//         localStorage["userName"] = localStorage["passWord"] = JSON.stringify(
//           ""
//         );
//         this.showSign("logInDemo");
//       },
//       true
//     );

//     // // 编辑简介
//     // $delegate(this.$app, ".desc span", "click", ({ target }) => {
//     //   this.editItem(target);
//     // }); //编辑

//     // 编辑简介
//     $delegate(this.$app, ".desc", "dblclick", ({ target }) => {
//       // this.editItem(target);
//       alert("开始编辑");
//     }); //编辑
//   }

//   /**
//    * 编辑模式
//    * @param target 编辑按钮
//    */
//   editItem(target) {
//     var descDom = target.parentNode; //父节点
//     console.log("parent :", descDom);

//     descDom.classList.add("editing");

//     const input = document.createElement("input");
//     input.className = "edit";

//     input.value = $("#describes", descDom).textContent;
//     descDom.append(input);
//     input.focus();
//   }

//   editDiscDone(updateDesc) {
//     if (
//       updateDesc === Render.年龄大于99岁但是不能大于200岁的人才能出现在这里面
//     ) {
//       updateDesc = $("#describes").textContent;
//     }
//     const describes = $("#describes");

//     const input = $("input.edit");
//     describes.parentNode.removeChild(input);

//     describes.parentElement.classList.remove("editing");

//     $("#describes").textContent = updateDesc;
//   }

//   /**
//    * 登陆/注册页面
//    * @param flag string:logInDemo登陆，signUpDemo注册
//    */
//   showSign(flag) {
//     var node = $("section");
//     if (node) {
//       this.$app.removeChild(node);
//     }
//     this.$headerImg.hidden = false;
//     this.$app.appendChild(parseDom(this.template[flag]()));
//   }

//   /**
//    * 显示作品列表
//    * @param itemList 作品列表
//    */
//   showAllItemList(items: Item[]) {
//     this.$app.innerHTML = "";
//     // TODO 作品分类处理
//     // this.$app.innerHTML = this.template.topDemo(items);
//   }

//   /**
//    * 显示用户详情页面
//    */
//   showUserDetail(user: any) {
//     this.$headerImg.hidden = true;
//     var node = $("section");
//     if (node) {
//       this.$app.removeChild(node);
//     }
//     this.$app.appendChild(parseDom(this.template.uesrDetail(user)));
//   }

//   /**
//    * 选择图片
//    * @param {!Element} target input file Element
//    */
//   inputImg(target?: any) {
//     if (target.files.length != 0) {
//       var file = target.files[0],
//         reader = new FileReader();
//       if (!reader) {
//         target.value = "";
//         return;
//       }
//       // 判断类型
//       if (!/image\/\w+/.test(file.type)) {
//         alert("请确保文件为图像类型");
//         target.value = "";
//         target.setAttribute("data-id", null);
//         return false;
//       }

//       // 判断尺寸
//       if (file.size >= (1024 * 1024) / 2) {
//         alert("请上传小于512kb的图片!");
//         target.value = "";
//         target.setAttribute("data-id", null);
//         return;
//       }

//       // 暂存数据
//       reader.onload = (function(target) {
//         target.value = "";
//         return function(e) {
//           document.getElementById("avator").setAttribute("data-id", null); // 存
//           document
//             .getElementById("avator")
//             .setAttribute("data-id", this.result); // 存
//         };
//       })(file);
//       reader.readAsDataURL(file);
//     } else {
//       // 点击取消
//       target.value = "";
//       target.setAttribute("data-id", null);
//     }
//   }

//   /**
//    * 点赞
//    * @param heartdate 点赞数据
//    */
//   setPraise(heartdate: any) {
//     const { id, pv, likeType, allLikeNum } = heartdate;
//     console.log("allLikeNum :", allLikeNum);

//     $("#allLikeNum").innerHTML = allLikeNum;
//     if (allLikeNum > 0) {
//       $("#heardType").classList.toggle("heart-solid");
//     } else {
//       $("#heardType").classList.toggle("heart-void");
//       // $("#heardType").classList.add("heart-void");
//       // $("#heardType").classList.remove("heart-solid");
//     }
//     const listHearts = document.querySelectorAll(`[data-id="${id}"]`);

//     listHearts.forEach(item => {
//       $(".num", item).innerHTML = pv;
//       if (likeType) {
//         $(".icon", item).classList.remove("heart-void");
//         $(".icon", item).classList.add("heart-solid");
//       } else {
//         $(".icon", item).classList.remove("heart-solid");
//         $(".icon", item).classList.add("heart-void");
//       }
//     });
//   }

//   // TODO 事件的开始
//   /**
//    * 注册
//    * @param {Function} handler Function called on synthetic event.
//    */
//   bindSignUp(handler) {
//     $delegate(
//       this.$app,
//       "#signUp .submit",
//       "click",
//       ({ target }) => {
//         var name = document.getElementById("name").value;
//         var password = document.getElementById("password").value;
//         var describe = document.getElementById("describe").value;
//         var avator = document.getElementById("avator").getAttribute("data-id");
//         if (!name || !password || !describe || !avator) {
//           alert("完善客户资料");
//           return false;
//         }
//         handler({
//           name,
//           password,
//           describe,
//           avator
//         });
//       },
//       true
//     );
//   }

//   /**
//    * 登陆
//    * @param handler
//    */
//   bindLogIn(handler) {
//     $delegate(
//       this.$app,
//       "#logIn .submit",
//       "click",
//       ({ target }) => {
//         var flag = target.innerHTML.trim();
//         if (flag == "登陆") {
//           var name = document.getElementById("name").value;
//           var password = document.getElementById("password").value;

//           if (!name || !password) {
//             alert("请完善登陆信息");
//             return false;
//           }
//           handler({
//             name,
//             password
//           });
//         } else if (flag == "注册") {
//           this.showSign("signUpDemo");
//         }
//       },
//       true
//     );
//   }

//   /**
//    * 发表文章
//    */
//   bindAddTitle(handler) {
//     $delegate(
//       this.$app,
//       ".addtit",
//       "click",
//       ({ target }) => {
//         var title = prompt("请输入您的文章标题", "");
//         if (title) {
//           var id = userId();
//           //如果返回的有内容
//           handler({
//             id,
//             title
//           });
//         }
//       },
//       true
//     );
//   }

//   /**
//    * 点赞
//    */
//   bindClickPraise(handler) {
//     $delegate(
//       this.$app,
//       ".item .heart,.posts-icon ",
//       "click",
//       ({ target }) => {
//         // console.log(target);
//         var id = _itemId(target); //文章Id
//         var itemUserId = _itemUserId(target); //当前文章作者Id
//         var type = $(".heart-solid", target.parentNode); //选中类型
//         var pv = parseInt($(".num", target.parentNode).innerHTML, 10); //文章当前点赞数
//         var uid = userId(); //当前用户Id
//         var likeType = true; //选中状态
//         var allLikeNum = parseInt($("#allLikeNum").innerHTML, 10);

//         if (type == null) {
//           pv = pv + 1;
//           if (itemUserId === uid) {
//             allLikeNum = allLikeNum + 1;
//           }
//         } else {
//           pv = pv - 1;
//           likeType = false;
//           if (itemUserId === uid) {
//             allLikeNum = allLikeNum - 1;
//           }
//         }
//         handler({
//           id,
//           uid,
//           pv,
//           allLikeNum,
//           likeType
//         });
//       },
//       false
//     );
//   }

//   /**
//    * 编辑完成事件
//    * @param {*} handler above of all
//    */
//   bindEditDescSave(handler) {
//     $delegate(
//       this.$app,
//       ".desc .edit",
//       "blur",
//       ({ target }) => {
//         if (!target.dataset.iscanceled) {
//           var uid = userId(); //当前用户Id
//           handler(uid, target.value.trim());
//         }
//       },
//       true
//     );

//     // Remove the cursor from the input when you hit enter just like if it were a real form
//     $delegate(this.$app, ".desc .edit", "keypress", ({ target, keyCode }) => {
//       if (keyCode === ENTER_KEY) {
//         target.blur();
//       }
//     });
//   }

//   /**
//    * 键盘取消事件
//    * @param {} handler above of all
//    */
//   bindEditDescCancel(handler) {
//     $delegate(this.$app, "desc .edit", "keyup", ({ target, keyCode }) => {
//       if (keyCode === ESCAPE_KEY) {
//         target.dataset.iscanceled = true;
//         target.blur();
//         handler();
//       }
//     });
//   }
// }
