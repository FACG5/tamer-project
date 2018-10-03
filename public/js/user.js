const x = document.getElementsByClassName('main__conten--user');
const tablinks = document.getElementsByClassName('main__header--nav-tablink');

const viewUser = (event, idUser) => {
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
    tablinks[i].className = tablinks[i].className.replace('active', '');
  }
  document.getElementById(idUser).style.display = 'block';
  event.currentTarget.classList.toggle('active');
};
