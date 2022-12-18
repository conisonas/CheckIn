function GetDate () {
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  var hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
  var min = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
  var sec = date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();

  var time = hour + ":" + min + ":" + sec;
  document.getElementById('year').innerHTML = str;
  const week = {
    0: '星期天',
    1: '星期一',
    2: '星期二',
    3: '星期三',
    4: '星期四',
    5: '星期五',
    6: '星期六'
  };
  document.getElementById('weekday').innerHTML = week[date.getDay()];
  document.getElementById('time').innerHTML = time;
}

GetDate();
setInterval(function () {
  GetDate();
}, 1000);

var list = JSON.parse(localStorage.getItem('data1'));
var count = 0;
var total = list.length;
var uncheck = total - count;

function check () {
  document.getElementById('total').innerHTML = total;
  document.getElementById('check').innerHTML = count;
  document.getElementById('uncheck').innerHTML = uncheck;
}
check();

function ChangeColor (event) {
  var data = JSON.parse(localStorage.getItem('data1'));
  const parent = event.target.parentNode;
  var Id = parent.getAttribute('data-id');
  if (parent.nodeName === 'LI') {
    if (parent.className.includes('actived')) {
      const classes = parent.className.split(' ');
      const i = classes.indexOf('actived');
      classes.splice(i, 1);
      parent.className = classes.join(' ');
      count = count - 1;
      for (let j = 0; j < data.length; j++) {
        if (data[j].id == Id) {
          data[j].endtime = new Date().getTime();
        }
      }
      localStorage.setItem('data1', JSON.stringify(data));

    } else {
      parent.className = parent.className + " actived";
      count = count + 1;
      for (let j = 0; j < data.length; j++) {
        if (data[j].id == Id) {
          data[j].starttime = new Date().getTime();
        }
      }
      localStorage.setItem('data1', JSON.stringify(data));

    }
    uncheck = total - count;
    check();
  }
  console.log(event);
}



function init () {
  var data1 = JSON.parse(localStorage.getItem('data1'));
  var id;
  if (data1 != null) {
    for (let i = 0; i < data1.length; i++) {
      const element = document.createElement('li');
      const el_name = document.createElement('div');
      const el_apart = document.createElement('div');
      const el_times = document.createElement('div');
      const el_corporation = document.createElement('div');
      const el_corporation1 = document.createElement('p');
      const el_corporation2 = document.createElement('p');
      element.dataset.id = data1[i].id;
      el_corporation.dataset.id = data1[i].id;
      el_times.dataset.id = data1[i].id;
      el_name.innerText = data1[i].name;
      el_apart.innerText = data1[i].apartment;
      el_corporation1.innerText = '编辑';
      el_corporation2.innerText = '删除';
      var times,timeString2;
      setInterval(()=>{
        times = (data1[i].endtime-data1[i].starttime) / 1000;
        times = times > 0 ? times : 0;
        timeString2 = `${Math.floor(times / 3600)}h ${Math.floor(times / 60 % 60)}min`;
        console.log('data1[i].endtime');
        console.log(times);
        console.log(timeString2);
      }, 1000);
     
      console.log(timeString2);
      setInterval(() => {

        el_times.innerText = timeString2;
      }, 1000);

      element.appendChild(el_name);
      element.appendChild(el_apart);
      element.appendChild(el_times);
      element.appendChild(el_corporation);;
      el_corporation.appendChild(el_corporation1);
      el_corporation.appendChild(el_corporation2);
      document.getElementById('list').appendChild(element);
      el_corporation1.onclick = function (event) {

        const parent = event.target.parentNode;
        console.log(parent);
        id = parent.getAttribute('data-id');
        console.log('id值为: ' + id);
        console.log('编辑111111111111');
        var ss = data1.filter((p) => {
          return p.id == id;
        });

        localStorage.setItem('id', id);
        document.getElementById('demo').style.display = 'block';
        document.getElementById('dialog-submit').value = '修改';
        document.getElementById('dialog-name').innerHTML = '修改';
        document.getElementById('name').value = ss[0].name;
        document.getElementById('apartment').value = ss[0].apartment;

      };

      el_corporation2.onclick = function (e) {
        let x = confirm("确认删除");
        const parent = event.target.parentNode;
        console.log(parent);
        id = parent.getAttribute('data-id');
        if (x) {
          var index = data1.findIndex(function (item) {
            return item.id == id;
          });
          data1.splice(index, 1);
          localStorage.setItem('data1', JSON.stringify(data1));
          window.location.reload();
        } else {
        }

      };
    }


  } else {
    const initData = [
      { id: 0, name: '测试1', apartment: '研发部', starttime: 1670640587005, endtime: 1670660783005, totalTime: 0 },
      { id: 0, name: '测试2', apartment: '运维部', starttime: 1670650456009, endtime: 1670660783005, totalTime: 0 },
    ];
    localStorage.setItem('data1', JSON.stringify(initData));
    window.location.reload();
  }
}

init();



function Change () {
  document.getElementById('demo').style.display = 'block';
  document.getElementById('dialog-name').innerHTML = '增加';
  document.getElementById('dialog-submit').value = '提交';

}

function append () {
  var name1 = document.getElementById('name').value;
  var apartment1 = document.getElementById('apartment').value;
  var sub = document.getElementById('dialog-submit').value;
  var drophistory = JSON.parse(localStorage.getItem("data1")) || [];
  if (sub == '提交') {
    var list = { id: new Date().getTime(), name: name1, apartment: apartment1, starttime: 0, endtime: 0, totalTime: 0 };
    for (let i = 0; i < drophistory.length; i++) {
      if (drophistory[i].id == 0) {
        drophistory.splice(i, 2);
      }
    }
    drophistory.push(list);
    localStorage.setItem('data1', JSON.stringify(drophistory));
    // window.location.reload();
  } else {
    console.log('这是修改');
    var Id = localStorage.getItem('id');
    for (let j = 0; j < drophistory.length; j++) {
      if (drophistory[j].id == Id) {
        drophistory[j].name = name1;
        drophistory[j].apartment = apartment1;
      }
    }
    localStorage.setItem('data1', JSON.stringify(drophistory));
    //window.location.reload();
  }

}

function exit () {
  document.getElementById('demo').style.display = 'none';
  var sub = document.getElementById('dialog-submit').value;
  if (sub == '修改') {
    window.location.reload();
  }
}

