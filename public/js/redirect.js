
  
  if (window.localStorage.getItem('user')) {
      $('#post').load('/views/reguser.html')
  } else {
      $('#post').load('/views/create.html')
  }