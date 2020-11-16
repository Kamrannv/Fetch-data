import {state, useState} from './state.js';

const setpost= useState({

  posts : [],
  users : []

})


const getUsers = () => fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json());
const getPosts = () => fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json());

Promise.all([getPosts(), getUsers()]).then(data => {
  const [posts, users] = data;
  setpost({
    posts:posts,
    users:users
  });

  postData(state);
  setPage();
 
}).then(()=>{
  $(document).ready(function(){
    Array.from(document.getElementsByClassName('pageitem')).forEach(x=>x.addEventListener('click',function(e){
      //paginationHandling
      let from = e.currentTarget.getAttribute("data-from");
      let to= e.currentTarget.getAttribute("data-to");
      paginationHandling(from,to)
    }));
    Array.from(document.getElementsByClassName('showpost')).forEach(x=>x.addEventListener('click',function(e){
      let id = e.currentTarget.getAttribute("data-id");
      showComments(id)
    }));
  });
})

function postData(state, from=0, to=10){
  const postsContainer = document.querySelector('#list_comment');
  postsContainer.innerHTML = state.posts.map(post => `
      <div class="box_result row">
       <div class="avatar_comment col-md-1">
        <img src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg" alt="avatar"/>
       </div>
       <div class="result_comment col-md-11">
           <h4 class="user-data">${state.users.find( user => post.userId === user.id ).name}</h4>
          <h5 class="user-data">${post.title}</h5>
          <button class="btn btn-modal showpost" data-id="${post.id}">${post.body}</button>
        </div>
      </div>
      
    `).slice(from, to).join('');
}

const showComments = (id) => {

 
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(response => response.json())
    .then(comments => {
      const commentsContainer = document.getElementById('comments');
      commentsContainer.innerHTML = `
      	
          ${comments.map(comment => `
          
            <th>${comment.email}</th>
            </tr>
            <tr>
            <td>${comment.body}</td>
            </tr>
          `).join('')}
        
      `;
			openModal();
    })
}

const openModal = () => document.querySelector('#overlay').classList.add('is-visible');

const closeModal = () => document.querySelector('#overlay').classList.remove('is-visible');

document.querySelector('#close-button').addEventListener('click', closeModal);
document.querySelector('#overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

//pagination

function paginationHandling(from, to){
  postData(state, from, to);
}
  
let pageContainer = document.getElementById('page-selection');
function setPage(){
  for (let i = 0; i < state.posts.length/10; i++) {
    
  pageContainer.innerHTML += `<li class="page-item pageitem" data-from = "${i*10}" data-to="${(i+1)*10}"><a class="page-link" href="javascript:void(0)">${i+1}</a></li>
    `
    
  }
}

//search
let input = document.getElementById('search_input')
input.addEventListener("keyup",funcSearch)
function funcSearch() {
  let input = document.getElementById('search_input').value
  input=input.toLowerCase();
  let x = document.getElementsByClassName('user-data');

  for (let i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display="none";
    }
    else {
      x[i].style.display="block";
    }
  }
}


