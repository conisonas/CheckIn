function ChangeColor (event) {
  var ListItem = document.getElementById("list").getElementsByTagName("li");
  const parent = event.target.parentNode;
  if (parent.nodeName === 'LI') {
    if (parent.className.includes('actived')) {
      const classes = parent.className.split(' ');
      const i = classes.indexOf('actived');
      classes.splice(i, 1);
      parent.className = classes.join(' ');
    } else {
      parent.className = parent.className + " actived";
    }
  }
  console.log(event);
}

(function init () {
  let data = localStorage.getItem('data');
  if (data) {
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      const element = document.createElement('li');
      const el_name = document.createElement('div');
      const el_apart = document.createElement('div');
      const el_times = document.createElement('div');

      el_name.innerText = data[i].name;
      el_apart.innerText = data[i].apartment;
      const times = (data[i].endtime - data[i].starttime) / 1000;
      const timeString = `${Math.floor(times / 3600)}h ${Math.floor(times / 60 % 60)}min`;
      el_times.innerText = timeString;

      element.appendChild(el_name);
      element.appendChild(el_apart);
      element.appendChild(el_times);

      element.dataset.id = data[i].id;
      document.getElementById('list').appendChild(element);

    }
  } else {
    const initData = [
      { id: new Date().getTime(), name: '测试1', apartment: '研发部', starttime: 1670640587005, endtime: 1670660783005, totalTime: 0 },
      { id: new Date().getTime(), name: '测试2', apartment: '运维部', starttime: 1670650456009, endtime: 1670660783005, totalTime: 0 },
    ];
    localStorage.setItem('data', JSON.stringify(initData));
    window.location.reload();
  }
})();
