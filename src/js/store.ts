import { User, Item } from "./item";
import { ajax } from "./ajax";
import { Cookies } from "./interface";

export default class Store {
  constructor(private name: string) {
    localStorage[this.name] = localStorage[this.name] || JSON.stringify({});
  }

  // 获取暂存用户名与密码
  getCookies = (): Cookies => JSON.parse(localStorage[this.name]);

  /**
   * 注册
   * @param {any} item Item to intert
   * @param {function} callback Called when item is inserted
   */
  signUp(user: User, callback: () => void) {
    ajax({
      url: "http://10.18.204.142:7000/signup",
      type: "POST", //请求方式
      data: user, //请求参数
      dataType: "json",
      success: function(response, xml) {
        var res = JSON.parse(response);
        if (res.code == 200) {
          alert(res.message);
          // console.log(res.message);
          callback && callback();
        } else {
          alert(res.message);
          return false;
        }
      },
      fail: function(status) {
        // 此处放失败后执行的代码status为0
        alert("网络异常");
        return false;
      }
    });
  }

  /**
   *  登陆
   * @param user
   * @param callback
   */
  logIn(user: User, callback) {
    ajax({
      url: "http://10.18.204.142:7000/signin",
      type: "POST", //请求方式
      data: user, //请求参数
      dataType: "json",
      success: function(response, xml) {
        var res = JSON.parse(response);
        if (res.code == 200) {
          console.log("res :", res);
          localStorage["userName"] = JSON.stringify(res.info.name);
          localStorage["passWord"] = JSON.stringify(res.info.pass);
          callback && callback(res);
        } else {
          alert(res.message);
          localStorage["userName"] = localStorage["passWord"] = JSON.stringify(
            ""
          );
          return false;
        }
      },
      fail: function(status) {
        // 此处放失败后执行的代码status为0
        alert("网络异常");
        localStorage["userName"] = localStorage["passWord"] = JSON.stringify(
          ""
        );
        return false;
      }
    });
  }

  /**
   * 获取所有作品
   * @param callback 返回作品列表
   */
  getItemList(callback) {
    ajax({
      url: "",
      type: "GET", //请求方式
      // data: "", //请求参数
      dataType: "json",
      success: function(response, xml) {
        var res = JSON.parse(response);
        // console.log("res :", res);
        if (res.length > 0) {
          callback(res);
        }
      },
      fail: function(status) {
        // 此处放失败后执行的代码status为0
        alert("网络异常");
        return false;
      }
    });
  }

  /**
   *
   * 发表文章
   * @param {ItemUpdate} update Record with an id and a property to updat
   * @param {function} callback
   */
  updateTitle(title, callback: () => void) {
    ajax({
      url: "http://10.18.204.142:7000/create",
      type: "POST", //请求方式
      data: title, //请求参数
      dataType: "json",
      success: function(response, xml) {
        var res = JSON.parse(response);
        console.log("res :", res);
        if (res.code == 200) {
          alert(res.message);
          callback && callback();
        } else {
          alert(res.message);
          return false;
        }
      },
      fail: function(status) {
        // 此处放失败后执行的代码status为0
        alert("网络异常");
        return false;
      }
    });
  }

  /**
   * 点赞
   * @param herat 点赞信息
   * @param callback 回调函数
   */
  updatePosts(posts, callback: () => void) {
    ajax({
      url: "http://10.18.204.142:7000/like",
      type: "POST", //请求方式
      data: posts, //请求参数
      dataType: "json",
      success: function(response, xml) {
        var res = JSON.parse(response);
        console.log("res :", res);
        if (res.code == 200) {
          callback && callback();
        } else {
          alert(res.message);
          return false;
        }
      },
      fail: function(status) {
        // 此处放失败后执行的代码status为0
        // alert("点赞失败");
        alert("网络异常");
        return false;
      }
    });
  }
  /**
   * 修改编辑
   * @param posts 参数集合
   * @param callback 回调
   */
  updateDisc(posts, callback: () => void) {
    ajax({
      url: "http://10.18.204.142:7000/user_des",
      type: "POST", //请求方式
      data: posts, //请求参数
      dataType: "json",
      success: function(response, xml) {
        var res = JSON.parse(response);
        console.log("res :", res);
        if (res.code == 200) {
          callback && callback();
        } else {
          alert(res.message);
          return false;
        }
      },
      fail: function(status) {
        // 此处放失败后执行的代码status为0
        alert("网络异常");
        return false;
      }
    });
  }
}
