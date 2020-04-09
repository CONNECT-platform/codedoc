export function polyfillCustomEvent() {
  if ( typeof window.CustomEvent === "function" ) return false; //If not IE

  function CustomEvent ( event: any, params: any ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  (window as any).CustomEvent = CustomEvent;
}

