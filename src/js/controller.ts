import Store from "./store";
import View from "./view";
import { Cookies } from "./interface";
import { Render } from "./constants";
import { User } from "./item";

export default class Controller {
  constructor(private store: Store, private view: View) {
    //事件集合
    this.on();
  }
  private on() {
    this.view.onLoad(() => {
      this.load();
    });

    this.view.onToggle(toggleFlag => {
      this.toggle(toggleFlag);
    });

    this.view.onApply((applyFlag, user) => {
      this.apply(applyFlag, user);
    });
  }

  private load() {
    const { name, password }: Cookies = this.store.getCookies();

    if (name && password) {
      console.log("开始请求数据进入用户主页");
    } else {
      this.view.render(Render.登陆);
    }
  }

  private toggle(toggleFlag: string) {
    toggleFlag.indexOf("注册") > -1 && this.view.render(Render.注册);
    toggleFlag.indexOf("登陆") > -1 && this.view.render(Render.登陆);
  }

  private apply(applyFlag: string, user: User) {
    const { name, password } = user;
    switch (applyFlag) {
      case "注册":
        console.log("注册事件");

        break;
      case "登陆":
        console.log("登陆事件");

        if (name && password) {
          this.store.logIn({ name, password }, () => {
            alert("登陆成功");
          });
        } else {
          !name && this.view.render(Render.请输入, { name });
          !password && this.view.render(Render.请输入, { password });
        }
        break;

      default:
        break;
    }
    // if (applyFlag.indexOf("注册") > -1) {
    //   console.log("进入注册页面");
    // }
  }
}

// export default class Controller {
//   store: Store;
//   view: View;
//   constructor(store, view) {
//     this.store = store;
//     this.view = view;

//     // TODO事件初始化
//     /**
//      * 注册
//      */
//     view.bindSignUp(this.signUp.bind(this));
//     /**
//      * 登陆
//      */
//     view.bindLogIn(this.logIn.bind(this));

//     /**
//      * 发表文章
//      */
//     view.bindAddTitle(this.addTitle.bind(this));
//     /**
//      * 点击星星
//      */
//     view.bindClickPraise(this.clickPraise.bind(this));

//     // let name = this.store.getLocalStorage("userName"); //用户名
//     // let password = this.store.getLocalStorage("passWord"); //密码

//     // if (name && password) {
//     //   this.logIn({ name, password });
//     // } else {
//     //   this._filter();
//     // }
//   }

//   /**
//    *  Set and render the active route.
//    * @param {string} raw
//    */
//   setView(raw?: any) {
//     // 显示页面入口
//     this._filter(true);
//   }

//   /**
//    * 界面显示
//    * @param {booleac} force
//    */
//   _filter(force?: any) {
//     var self = this;
//     // const route = self._login;
//     let name = this.store.getLocalStorage("userName"); //用户名
//     let password = this.store.getLocalStorage("passWord"); //密码

//     if (force && (name.length > 0 && password.length > 0)) {
//       console.log("欢迎来到用户个人页面");
//       this.logIn({ name, password });
//     } else {
//       // 渲染注册/登陆页
//       self.view.showSign("logInDemo");
//     }
//   }

//   // //TODO 具体方法
//   // 注册
//   signUp(user: any) {
//     // console.log("user :", user);
//     this.store.signUp(user, () => {
//       this._filter(false);
//     });
//   }

//   // 登陆
//   logIn(user: any) {
//     this.store.logIn(user, userInfo => {
//       this.view.showUserDetail(userInfo);
//     });
//   }

//   // 发表文章
//   addTitle(title: any) {
//     this.store.updateTitle(title, () => {
//       this._filter(true);
//     });
//   }

//   clickPraise(start: any) {
//     console.log(start);
//     this.store.updatePosts(start, () => {
//       this.view.setPraise(start);
//     });
//   }
// }
