//on site
 var customDimensions = {
   SERVICE_WORKER_STATUS: 'dimension1',
   METRIC_VALUE: 'dimension2'
 };

  var d = new Date();
  var t= d.getTime();

if('serviceWorker' in navigator)
{
  window.addEventListener('load', () =>
  {
    // Sends a pageview for the initial pageload.
    ga('send', 'pageview');

    // Sends an event with the time to first paint data.
    sendTimeToFirstPaint();
    sendTimePageLoadTime();
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
  //ga('create', 'UA-137024514-2', {'sampleRate': 100});
  ga('set', customDimensions.SERVICE_WORKER_STATUS, getServiceWorkerStatus());
}

function getTimeToFirstPaintIfSupported() {
  // Ignores browsers that don't support the Performance Timing API.
  if (window.performance && window.performance.timing) {
    var navTiming = window.performance.timing;
    var navStart = navTiming.navigationStart;
    var fpTime;

    // If chrome, get first paint time from `chrome.loadTimes`.
    if (window.chrome && window.chrome.loadTimes) {
      fpTime = window.performance.getEntriesByType('paint');
      fpTime = fpTime.startTime;
      //fpTime.forEach((fpTime) =>{console.log(fpTime.name+fpTime.startTime)});
    }
    // If IE/Edge, use the prefixed `msFirstPaint` property.
    // See http://msdn.microsoft.com/ff974719
    else if (navTiming.msFirstPaint) {
      fpTime = navTiming.msFirstPaint;
    }

    if (fpTime && navStart) {
      return fpTime - navStart;
    }
  }
}

function sendTimeToFirstPaint() {
  var timeToFirstPaint = getTimeToFirstPaintIfSupported();
    console.log("PAINT1");
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
  //}
}
function sendTimePageLoadTime(){
 console.log(window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart);
}
function getServiceWorkerStatus() {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.controller ? 'controlled' : 'supported';
  } else {
    return 'unsupported';
  }
}
