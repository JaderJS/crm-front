import { Html, Head, Main, NextScript } from "next/document"
import { getCssText } from "../styles"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from "@vercel/analytics/react";

export default function Document() {
  return (
    <Html lang='pt-BR'>
      <Head>
        
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link
          href='https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700&family=Syne:wght@800&display=swap'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Plus+Jakarta+Sans:wght@400;700&display=swap'
          rel='stylesheet'
        />
        <link href='https://api.fontshare.com/v2/css?f[]=panchang@700,400&display=swap' rel='stylesheet' />
        <style id='stitches' dangerouslySetInnerHTML={{ __html: getCssText() }} />
        <link rel='apple-touch-icon' sizes='180x180' href='../../public/apple-touch-icon.png' />
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "j9xaioijug");
	`,
          }}
        />
        {/* <script async src='https://www.googletagmanager.com/gtag/js?id=G-1B0S36NCSX' />
        <script
          type='text/javascript'
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-1B0S36NCSX');
`,
          }}
        /> */}
        <meta property='og:url' content='https://www.fwo.collieassociados.com' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='FWO - V4Company' />
        <meta property='og:description' content='FWO - V4Company' />
      </Head>

      <body>
        <Main />
        <NextScript />

      </body>
    </Html>
  )
}
