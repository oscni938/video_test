//on site
if('serviceWorker' in navigator)
{
  window.addEventListener('load', () =>
  {
    navigator.serviceWorker
    .register('SW_stat.js')
    .then(reg => console.log('service worker: registered'))
    .catch(err => console.log(`service worker: error: ${err}`));
  });
}

displayView = function(view){
  document.getElementById("body").innerHTML = view.innerHTML;
   // the code required to display a view
};

window.onload = function(){
   page = document.getElementById("page");
 displayView(page);
}
