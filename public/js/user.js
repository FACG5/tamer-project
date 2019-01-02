const mainUser = document.getElementsByClassName('main__conten--user');
const tabLinks = document.getElementsByClassName('main__header--nav-tablink');
const searchUser = document.getElementById('input-search-user');
const user = document.getElementById('table-user');
const searchBorower = document.getElementById('input-search-borower');
const borower = document.getElementById('table-borower');
const deleteUserButton = document.querySelectorAll('.delete');

const viewUser = (event, idUser) => {
  for (let i = 0; i < mainUser.length; i += 1) {
    mainUser[i].style.display = 'none';
    tabLinks[i].className = tabLinks[i].className.replace('active', '');
  }
  document.getElementById(idUser).style.display = 'block';
  event.currentTarget.classList.toggle('active');
};

search(searchUser, user);
search(searchBorower, borower);

deleteUserButton.forEach((button) => {
  const userId = button.getAttribute('id');
  const deleteData = { userId };
  const route = `/admin/user/${userId}`;
  const routeToRedirect = '/admin/users';
  deleteButtonFunction(button, route, routeToRedirect, deleteData);
});