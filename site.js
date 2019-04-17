//on site
 var customDimensions = {
   SERVICE_WORKER_STATUS: 'dimension1',
   METRIC_VALUE: 'dimension2'
 };



/*if('serviceWorker' in navigator)
{
  window.addEventListener('load', () =>
  {
    // Sends a pageview for the initial pageload.
    ga('send', 'pageview');

    // Sends an event with the time to first paint data.
    var d = new Date();
    var t= d.getTime();
    t='date:'+t+'rand:'+ Math.random();
    sendTimeToFirstPaint(t);
    sendTimePageLoadTime(t);
    navigator.serviceWorker
    .register('SW_stat.js')
    .then(reg => console.log('service worker: registered'))
    .catch(err => console.log(`service worker: error: ${err}`));
    sendServiceWorkerStatus(t);
  });
   
}
else
{
  window.addEventListener('load', () =>
  {
    // Sends a pageview for the initial pageload.
    ga('send', 'pageview');

    // Sends an event with the time to first paint data.
    var d = new Date();
    var t= d.getTime();
    t='date:'+t+'rand:'+ Math.random();
    sendTimeToFirstPaint(t);
    sendTimePageLoadTime(t);
    sendServiceWorkerStatus(t);
  });
}*/

displayView = function(view){
  document.getElementById("body").innerHTML = view.innerHTML;
   // the code required to display a view
};

window.onload = function(){
   page = document.getElementById("page");
 displayView(page);
  //ga('create', 'UA-137024514-2', {'sampleRate': 100});
  ga('set', customDimensions.SERVICE_WORKER_STATUS, getServiceWorkerStatus());
}

  window.addEventListener('offline', () =>
  {
   analytics.track('Video site', {
  category: 'online status',
  label: 'offline',
  value: 1
  });
  });
  window.addEventListener('online', () =>
  {
   analytics.track('Video site', {
  category: 'online status',
  label: 'online',
  value: 1
  });
  });
function getTimeToFirstPaintIfSupported() {
  // Ignores browsers that don't support the Performance Timing API.
  if (window.performance && window.performance.timing) {
    var navTiming = window.performance.timing;
    //var navStart = navTiming.navigationStart;
    var fpTime;
    var myTime;
    // If chrome, get first paint time from `chrome.loadTimes`.
    if (window.chrome && window.chrome.loadTimes) {
      fpTime = window.performance.getEntriesByType('paint');
      //fpTime = fpTime.startTime;
      fpTime.forEach((fpTime) =>{ myTime = fpTime.startTime;});
    }
    // If IE/Edge, use the prefixed `msFirstPaint` property.
    // See http://msdn.microsoft.com/ff974719
    else if (navTiming.msFirstPaint) {
      fpTime = navTiming.msFirstPaint;
    }

    if (fpTime) {
    
      return myTime;
    }
  }
}

function sendTimeToFirstPaint(id) {
  var timeToFirstPaint = getTimeToFirstPaintIfSupported();
  //console.log(timeToFirstPaint);
 timeToFirstPaint = Math.round(timeToFirstPaint);
 //console.log(timeToFirstPaint);
  analytics.track('Video site', {
  category: 'Time to paint',
  label: id,
  value: timeToFirstPaint
});
   /* console.log("PAINT1");
  //if (timeToFirstPaint) {
    console.log("PAINT2");
    var fields = {
      eventCategory: 'Performance',
      eventAction: 'firstpaint',
      // Rounds to the nearest millisecond since
      // event values in Google Analytics must be integers.
      eventValue: Math.round(timeToFirstPaint),
      // Sends this as a non-interaction event,
      // so it doesn't affect bounce rate.
      nonInteraction: true
      
      //dimension1: getServiceWorkerStatus()
    };
   fields[customDimensions.METRIC_VALUE] = String(fields.eventValue);

    ga('send', 'event', fields);
    //ga('set','metric1', timeToFirstPaint);
    console.log("PAINT3");
  //}*/
}
function sendTimePageLoadTime(id){

 var loadT = (window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart);
 analytics.track('Video site', {
  category: 'Page load time',
  label: id,
  value: loadT
});
}

function sendServiceWorkerStatus(id)
{
  var swStatus = getServiceWorkerStatus();
 console.log('Service Worker status:'+swStatus);
    analytics.track('Video site', {
   category: 'Service Worker status:'+swStatus,
   label: id,
   value: 1
 });
}

function getServiceWorkerStatus() {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.controller ? 'controlled' : 'supported';
  } else {
    return 'unsupported';
  }
}
