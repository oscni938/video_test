//on site


if('serviceWorker' in navigator)
{
  window.addEventListener('load', () =>
  {
    // Sends a pageview for the initial pageload.
    ga('send', 'pageview');

    // Sends an event with the time to first paint data.
    sendTimeToFirstPaint();

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
 var customDimensions = {
   SERVICE_WORKER_STATUS: 'dimension1'
 };
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
      fpTime = window.performance.firstPaintTime() * 1000;
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

  if (timeToFirstPaint) {
    ga('send', 'event', {
      eventCategory: 'Performance',
      eventAction: 'firstpaint',
      // Rounds to the nearest millisecond since
      // event values in Google Analytics must be integers.
      eventValue: Math.round(timeToFirstPaint),
      // Sends this as a non-interaction event,
      // so it doesn't affect bounce rate.
      nonInteraction: true
    });
  }
}

function getServiceWorkerStatus() {
  if ('serviceWorker' in navigator) {
    return navigator.serviceWorker.controller ? 'controlled' : 'supported';
  } else {
    return 'unsupported';
  }
}
