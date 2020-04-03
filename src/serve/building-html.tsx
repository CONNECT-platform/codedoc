import { RendererLike } from '@connectv/html';
import { StatusCheckURL, StatusReadyResponse } from './config';


export function buildingHtml(renderer: RendererLike<any, any>) {
  return <html>
    <head>
      <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap" rel="stylesheet"/>
      <style>{`
        body {
          font-size: 48px;
          font-family: 'Work Sans', sans-serif;
          background: #eeeeee;
          color: #bdbdbd;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          border: 0;
        }
      `}</style>
    </head>
    <body>
      Building documents, please wait ...
      <script>{`
        setInterval(function(){
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '${StatusCheckURL}');
          xhr.onload = function() {
            if (xhr.responseText == '${StatusReadyResponse}')
              location.reload();
          };
          xhr.send();
        }, 500);
      `}</script>
    </body>
  </html>
}
